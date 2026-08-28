from pathlib import Path
import io

import fitz
from PIL import Image, ImageDraw, ImageFilter, ImageFont

PDF = Path("public/pdfs/ruido-operativo.pdf")
if not PDF.exists():
    raise SystemExit("ruido-operativo.pdf not found")

doc = fitz.open(PDF)
page = doc[0]
scale = 2.0
pix = page.get_pixmap(matrix=fitz.Matrix(scale, scale), alpha=False)
image = Image.frombytes("RGB", [pix.width, pix.height], pix.samples)

# The original cover contains the incorrect flattened credit "De isa gil".
# Replace only that small credit area, reusing the original paper texture.
x0, y0, x1, y1 = 1060, 1090, 1370, 1155
patch = image.crop((800, 1090, 1110, 1155)).resize((x1 - x0, y1 - y0)).filter(ImageFilter.GaussianBlur(0.25)).convert("RGBA")

mask = Image.new("L", patch.size, 255)
mask_draw = ImageDraw.Draw(mask)
fade = 14
for i in range(fade):
    alpha = int(255 * (i + 1) / fade)
    mask_draw.rectangle((i, i, patch.width - 1 - i, patch.height - 1 - i), outline=alpha)
mask = mask.filter(ImageFilter.GaussianBlur(2.2))
patch.putalpha(mask)

draw = ImageDraw.Draw(patch)
font_candidates = [
    "/usr/share/fonts/truetype/dejavu/DejaVuSerif.ttf",
    "/usr/share/fonts/truetype/liberation2/LiberationSerif-Regular.ttf",
]
font_path = next((p for p in font_candidates if Path(p).exists()), None)
if font_path is None:
    raise SystemExit("No serif font available on runner")
font = ImageFont.truetype(font_path, 24)
text = "De Almudena Urbieta"
bbox = draw.textbbox((0, 0), text, font=font)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
draw.text(((patch.width - tw) / 2, (patch.height - th) / 2 - 2), text, font=font, fill=(78, 70, 61, 255))

buffer = io.BytesIO()
patch.save(buffer, format="PNG", optimize=True)
rect = fitz.Rect(x0 / scale, y0 / scale, x1 / scale, y1 / scale)
page.insert_image(rect, stream=buffer.getvalue(), overlay=True)

tmp = PDF.with_suffix(".tmp.pdf")
doc.save(tmp, garbage=4, deflate=True)
doc.close()
tmp.replace(PDF)

# Integrity checks: author correction does not alter page count.
check = fitz.open(PDF)
if len(check) != 10:
    raise SystemExit(f"Unexpected page count after patch: {len(check)}")
check.close()
print("Corrected visible author credit in ruido-operativo.pdf")
