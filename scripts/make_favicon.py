from PIL import Image, ImageDraw
import base64
import os

im = Image.open('attached_assets/emblem_cropped.png').convert('RGBA')
cx, cy = 440, 440
r = 406

# Create an anti-aliased circular mask using 4x supersampling
scale = 4
mask_large = Image.new('L', (im.width * scale, im.height * scale), 0)
draw = ImageDraw.Draw(mask_large)
draw.ellipse(
    (
        (cx - r) * scale,
        (cy - r) * scale,
        (cx + r) * scale,
        (cy + r) * scale
    ),
    fill=255
)
mask = mask_large.resize((im.width, im.height), Image.Resampling.LANCZOS)

# Apply mask to image
clean = Image.new('RGBA', im.size, (0, 0, 0, 0))
clean.paste(im, (0, 0), mask=mask)

# Crop to circle boundary
clean_cropped = clean.crop((cx - r, cy - r, cx + r, cy + r))

# Save 512x512
clean_512 = clean_cropped.resize((512, 512), Image.Resampling.LANCZOS)
os.makedirs('artifacts/vasista-trading/public/assets', exist_ok=True)
clean_512.save('artifacts/vasista-trading/public/favicon.png', 'PNG')
clean_512.save('artifacts/vasista-trading/public/apple-touch-icon.png', 'PNG')
clean_512.save('artifacts/vasista-trading/public/assets/ve-emblem.png', 'PNG')
clean_512.save('attached_assets/ve-emblem.png', 'PNG')

# Save ICO with multiple sizes
clean_cropped.save(
    'artifacts/vasista-trading/public/favicon.ico',
    format='ICO',
    sizes=[(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
)

# Also create SVG containing the embedded base64 PNG so SVG favicons work everywhere!
with open('artifacts/vasista-trading/public/favicon.png', 'rb') as f:
    b64 = base64.b64encode(f.read()).decode('utf-8')

svg_content = f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <image href="data:image/png;base64,{b64}" width="512" height="512" />
</svg>'''

with open('artifacts/vasista-trading/public/favicon.svg', 'w', encoding='utf-8') as f:
    f.write(svg_content)

print('Favicons created successfully!')
