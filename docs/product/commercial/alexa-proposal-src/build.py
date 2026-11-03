import subprocess, pathlib, pymupdf
here=pathlib.Path(__file__).parent.resolve()
url=(here/"proposta.html").as_uri()
out=here/"out.pdf"
if out.exists(): out.unlink()
r=subprocess.run([r"C:\Program Files\Google\Chrome\Application\chrome.exe","--headless=new","--disable-gpu","--no-pdf-header-footer","--virtual-time-budget=15000",f"--print-to-pdf={out}",url],capture_output=True,text=True,timeout=180)
print(r.stderr[-300:])
d=pymupdf.open(out); print(len(d), d[0].rect)
for i,p in enumerate(d): p.get_pixmap(matrix=pymupdf.Matrix(0.9,0.9)).save(str(here/f"r{i+1:02d}.png"))
