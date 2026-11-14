from html.parser import HTMLParser
VOID={'area','base','br','col','embed','hr','img','input','link','meta','source','track','wbr'}
class Node:
    def __init__(s,tag,attrs,parent=None):
        s.tag=tag; s.attrs=dict(attrs); s.children=[]; s.parent=parent
    def cls(s): return s.attrs.get('class') or ''
    def find_all(s,pred):
        out=[]
        for c in s.children:
            if isinstance(c,Node):
                if pred(c): out.append(c)
                out+=c.find_all(pred)
        return out
    def find(s,pred):
        r=s.find_all(pred); return r[0] if r else None
    def text(s):
        return ''.join(c if isinstance(c,str) else c.text() for c in s.children)
class B(HTMLParser):
    def __init__(s):
        super().__init__(convert_charrefs=True); s.root=Node('root',{}); s.cur=s.root
    def handle_starttag(s,t,a):
        n=Node(t,a,s.cur); s.cur.children.append(n)
        if t not in VOID: s.cur=n
    def handle_startendtag(s,t,a):
        s.cur.children.append(Node(t,a,s.cur))
    def handle_endtag(s,t):
        n=s.cur
        while n is not s.root and n.tag!=t: n=n.parent
        if n is not s.root: s.cur=n.parent
    def handle_data(s,d): s.cur.children.append(d)
def parse(h):
    b=B(); b.feed(h); return b.root
