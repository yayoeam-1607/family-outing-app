"""Original vector-like artwork. Developer-only: python + Pillow, not a build dependency."""
from pathlib import Path
from PIL import Image, ImageDraw
SIZE = 2048
SCALE = SIZE / 512
image = Image.new('RGB', (SIZE, SIZE), '#faf5e9')
draw = ImageDraw.Draw(image)
def cubic(a,b,c,d):
    return [tuple((1-t)**3*a[i]+3*(1-t)**2*t*b[i]+3*(1-t)*t*t*c[i]+t**3*d[i] for i in range(2)) for t in [j/80 for j in range(81)]]
def scaled(points):return [(round(x*SCALE),round(y*SCALE)) for x,y in points]
# Soft route, behind the pin; all essential artwork is in the maskable safe circle.
route=cubic((107,359),(146,334),(182,335),(218,360))+cubic((218,360),(282,391),(355,375),(407,354))
draw.line(scaled(route),fill='#cbd8c0',width=round(11*SCALE),joint='curve')
for x,y in [route[0],route[-1]]:draw.ellipse(((x-5.5)*SCALE,(y-5.5)*SCALE,(x+5.5)*SCALE,(y+5.5)*SCALE),fill='#cbd8c0')
pin=cubic((255,105),(191,105),(148,158),(148,221))+cubic((148,221),(148,282),(219,357),(249,389))+cubic((249,389),(253,394),(259,394),(263,388))+cubic((263,388),(292,355),(365,280),(365,221))+cubic((365,221),(365,157),(318,105),(255,105))
draw.polygon(scaled(pin),fill='#667e68')
draw.ellipse((206*SCALE,166*SCALE,308*SCALE,268*SCALE),fill='#faf5e9')
star=cubic((257,184),(262,201),(272,210),(288,217))+cubic((288,217),(273,222),(263,234),(257,250))+cubic((257,250),(251,233),(241,224),(226,217))+cubic((226,217),(244,210),(251,200),(257,184))
draw.polygon(scaled(star),fill='#d58b6c')
root=Path(__file__).resolve().parents[1]/'public/icons'
for name,size in [('icon-192.png',192),('icon-512.png',512),('icon-maskable-512.png',512),('apple-touch-icon.png',180)]:image.resize((size,size),Image.Resampling.LANCZOS).save(root/name,optimize=True)
print('Generated 192 / 512 / maskable 512 / Apple 180 PNG icons')
