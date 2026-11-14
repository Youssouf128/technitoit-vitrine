"""Convertit des pages CMS Technitoit (HTML Astro/UnoCSS) en arbres JSON rendus par <CmsTree/>.

Usage : convert_pages.py <dossier_html> <dossier_sortie_json> <slug1> [slug2 …]
Chaque <slug>.html (chemin « / » remplacé par « __ ») produit <slug>.json + images.json (url -> chemin local).
"""
import html as H
import json
import os
import re
import sys

sys.path.insert(0, os.path.dirname(__file__))
from dom import Node, parse  # noqa: E402

SRC, OUT = sys.argv[1], sys.argv[2]
SLUGS = sys.argv[3:]
SITE = "https://www.technitoit.com"
IMG_LIST = os.path.join(OUT, "_images.json")
images = json.load(open(IMG_LIST)) if os.path.exists(IMG_LIST) else {}
videos = {}

ATTRS_KEEP = {"href", "id", "alt", "target", "rel", "role", "aria-label", "title", "colspan", "rowspan", "for",
              "type", "viewBox", "fill", "xmlns", "width", "height", "d", "stroke", "stroke-width", "stroke-linecap",
              "stroke-linejoin", "stroke-miterlimit", "fill-rule", "clip-rule", "transform", "x", "y", "rx", "ry",
              "cx", "cy", "r", "points", "x1", "x2", "y1", "y2", "mask", "clip-path", "maskUnits", "data-name",
              "preserveAspectRatio", "opacity", "fill-opacity", "gradientUnits", "offset", "stop-color", "style"}
DROP = {"script", "noscript", "template", "style", "link", "meta", "input", "form", "textarea", "button", "select"}


def base_url(src):
    m = re.match(r"(https://a\.storyblok\.com/f/\d+/[^/]+/[0-9a-f]+/[^/?#]+)", src or "")
    return m.group(1) if m else None


def local_media(src, kind="images"):
    b = base_url(src)
    if not b:
        return src
    parts = b.split("/")
    name = re.sub(r"[^a-z0-9._-]", "-", f"{parts[-2]}-{parts[-1]}".lower())
    path = f"/{kind}/pages/{name}"
    (images if kind == "images" else videos)[b] = path
    return path


def dims(src):
    m = re.search(r"/f/\d+/(\d+)x(\d+)/", src or "")
    return (int(m.group(1)), int(m.group(2))) if m else (None, None)


def rewrite_href(href):
    href = (href or "").strip()
    if href.startswith(SITE):
        href = href[len(SITE):] or "/"
    if href.startswith("/") and len(href) > 1:
        href = href.rstrip("/")
    if href.startswith("/foire-aux-questions/"):
        href = "/foire-aux-questions"
    if href.startswith("/agence/"):
        href = "/agence"
    if href.startswith("#formulaire_anchor") or href.startswith("#configurator-anchor"):
        href = "#configurator-anchor"
    return href


def fix_classes(cls):
    """UnoCSS -> Tailwind 4 : opacités séparées, raccourcis « .5 », etc."""
    if not cls:
        return ""
    parts = cls.split()
    out = []
    opac = {}
    for p in parts:
        m = re.match(r"^((?:[a-z0-9-]+:)*)(bg|text|border)-opacity-(\d+)$", p)
        if m:
            opac[(m.group(1), m.group(2))] = m.group(3)
            continue
        p = re.sub(r"-\.(\d)", r"-0.\1", p)  # bottom-.5 -> bottom-0.5
        if p.startswith("data-astro-cid"):
            continue
        out.append(p)
    if opac:
        res = []
        for p in out:
            m = re.match(r"^((?:[a-z0-9-]+:)*)(bg|text|border)-((?:\[#?[0-9a-fA-F]+\])|white|black|tt-[a-z-]+|gray-\d+)$", p)
            if m and (m.group(1), m.group(2)) in opac:
                p = f"{p}/{opac[(m.group(1), m.group(2))]}"
            res.append(p)
        out = res
    # h-2xl (UnoCSS) -> 42rem
    out = ["h-[42rem]" if p == "h-2xl" else p for p in out]
    return " ".join(dict.fromkeys(out))


def island_name(n):
    return (n.attrs.get("component-url") or "").split("/")[-1].split(".")[0]


def props_of(n):
    raw = H.unescape(n.attrs.get("props") or "{}")

    def dv(x):  # décodage du format « [type, valeur] » d'Astro
        if isinstance(x, list) and len(x) == 2 and isinstance(x[0], int):
            t, v = x
            if t == 0:
                return {k: dv(v2) for k, v2 in v.items()} if isinstance(v, dict) else v
            if t == 1:
                return [dv(i) for i in v]
            return v
        if isinstance(x, dict):
            return {k: dv(v) for k, v in x.items()}
        return x

    try:
        return {k: dv(v) for k, v in json.loads(raw).items()}
    except Exception:
        return {}


def convert(n):
    if isinstance(n, str):
        t = re.sub(r"\s+", " ", n)
        return t if t.strip() or t == " " else None
    tag = n.tag
    if tag == "astro-island":
        name = island_name(n)
        p = props_of(n)
        if name == "ContainerBackground":
            return {"x": "bg", "anchor": p.get("anchorId"), "offset": p.get("anchorOffset") or "0"}
        if name == "Configurator":
            return {"x": "configurator"}
        if name == "AccordionContentFranchisee":
            tpl = n.find(lambda x: x.tag == "template") or n
            return {"x": "accordion", "title": p.get("title", ""), "k": children(tpl)}
        if name == "ImageSlider":
            return {
                "x": "beforeAfter",
                "before": local_media(p.get("firstImgSrc")),
                "after": local_media(p.get("secondImgSrc")),
                "w": (p.get("firstImgDimensions") or {}).get("width") or 1200,
                "h": (p.get("firstImgDimensions") or {}).get("height") or 800,
                **({"ratio": float(p["ratio"])} if p.get("ratio") else {}),
            }
        if name == "Carousel":
            slides = [s for s in (convert(c) for c in n.find_all(lambda x: x.tag == "astro-island" and island_name(x) == "ImageSlider"))]
            return {"x": "carousel", "slides": slides}
        # composant inconnu : on garde le rendu SSR
        tpl = n.find(lambda x: x.tag == "template")
        return {"t": "div", "c": "contents", "k": children(tpl or n)}
    if tag == "script":
        txt = n.text()
        if '"@context"' in txt and "schema.org" in txt:
            return {"x": "jsonld", "json": txt}
        return None
    if tag in DROP:
        return None
    if tag == "img":
        src = n.attrs.get("src")
        w, h = dims(src)
        node = {"t": "img", "src": local_media(src), "alt": n.attrs.get("alt") or "", "c": fix_classes(n.attrs.get("class"))}
        if w:
            node["w"], node["h"] = w, h
        if n.attrs.get("style"):
            node["s"] = n.attrs["style"]
        return node
    if tag == "video":
        src = n.attrs.get("src") or (n.find(lambda x: x.tag == "source") or Node("x", {})).attrs.get("src")
        # Vidéos (~30-45 Mo chacune) laissées sur le CDN d'origine
        return {"t": "video", "src": src, "c": fix_classes(n.attrs.get("class")),
                "auto": "autoplay" in n.attrs, "loop": "loop" in n.attrs, "muted": "muted" in n.attrs,
                "controls": "controls" in n.attrs}
    if tag == "picture":
        img = n.find(lambda x: x.tag == "img")
        return convert(img) if img else None
    if tag == "svg":
        return {"x": "svg", "html": serialize(n)}
    node = {"t": tag}
    c = fix_classes(n.attrs.get("class"))
    if c:
        node["c"] = c
    a = {}
    for k, v in n.attrs.items():
        if k in ATTRS_KEEP and k not in ("style",) and v is not None:
            a[k] = rewrite_href(v) if k == "href" else v
    if n.attrs.get("style"):
        node["s"] = n.attrs["style"]
    if a:
        node["a"] = a
    k = children(n)
    if k:
        node["k"] = k
    return node


def children(n):
    out = []
    for c in n.children:
        r = convert(c)
        if r is None:
            continue
        if isinstance(r, str) and out and isinstance(out[-1], str):
            out[-1] += r
        else:
            out.append(r)
    # supprime les blancs de début/fin purement décoratifs
    while out and isinstance(out[0], str) and not out[0].strip():
        out.pop(0)
    while out and isinstance(out[-1], str) and not out[-1].strip():
        out.pop()
    return out


def serialize(n):
    if isinstance(n, str):
        return H.escape(n, quote=False)
    attrs = "".join(f' {k}="{H.escape(v or "", quote=True)}"' for k, v in n.attrs.items()
                    if not k.startswith("data-v-") and k not in ("data-icon",))
    inner = "".join(serialize(c) for c in n.children)
    return f"<{n.tag}{attrs}>{inner}</{n.tag}>"


for slug in SLUGS:
    raw = open(os.path.join(SRC, slug.replace("/", "__") + ".html"), encoding="utf-8").read()
    root = parse(raw)
    main = root.find(lambda x: x.tag == "main")
    hdr = root.find(lambda x: x.tag == "div" and "tt-header" in x.cls().split())
    variant = "transparent" if hdr and "header-transparent" in hdr.cls() else "white"
    title = re.search(r"<title>([^<]*)</title>", raw)
    desc = re.search(r'<meta name="description" content="([^"]*)"', raw)
    tree = children(main)
    page = {
        "path": "/" + slug,
        "title": H.unescape(title.group(1)).replace(" - Technitoit", "").replace(" | Technitoit", "").strip() if title else slug,
        "description": H.unescape(desc.group(1)) if desc else "",
        "header": variant,
        "tree": tree,
    }
    json.dump(page, open(os.path.join(OUT, slug.replace("/", "__") + ".json"), "w"), ensure_ascii=False)
    print(slug, variant, len(json.dumps(tree)) // 1024, "Ko")

json.dump(images, open(IMG_LIST, "w"), ensure_ascii=False, indent=0)
json.dump(videos, open(os.path.join(OUT, "_videos.json"), "w"), ensure_ascii=False, indent=0)
print(len(images), "images,", len(videos), "vidéos")
