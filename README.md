# ALA Dates Atelier — Website

A premium, single-page marketing website for ALA Dates Atelier.

## Folder Structure

```
ala-dates/
├── index.html              # Main HTML entry point
├── css/
│   └── styles.css          # All styles (tokens, layout, components)
├── js/
│   └── main.js             # Interactivity & variety grid
└── assets/
    ├── favicon.svg         # Brand favicon
    └── images/
        ├── hero/
        │   └── hero-main.jpg          # 1400 × 788 px  (16:9)
        ├── gallery/
        │   ├── gallery-signature.jpg  # 1200 × 675 px  (16:9)
        │   ├── gallery-boxed.jpg      # 760  × 760 px  (1:1)
        │   └── gallery-orchard.jpg    # 1100 × 619 px  (~16:9)
        └── thumbs/
            ├── thumb-1.jpg            # 200 × 200 px   (1:1)
            ├── thumb-2.jpg            # 200 × 200 px   (1:1)
            ├── thumb-3.jpg            # 200 × 200 px   (1:1)
            ├── thumb-4.jpg            # 200 × 200 px   (1:1)
            └── thumb-5.jpg            # 200 × 200 px   (1:1)
```

## Image Sizing Notes

| Image             | Native Size  | CSS Display       | Aspect Ratio Used |
|-------------------|-------------|-------------------|-------------------|
| hero-main.jpg     | 1400 × 788  | full column width | 16 / 9            |
| gallery-signature | 1200 × 675  | large gallery card| 4 / 3             |
| gallery-boxed     | 760 × 760   | small gallery card| 1 / 1             |
| gallery-orchard   | 1100 × 619  | small gallery card| 1 / 1             |
| thumb-1..5        | 200 × 200   | variety card thumb| 1 / 1             |

All images use `object-fit: cover` with explicit `width` and `height` attributes to prevent layout shift (CLS).

## Typography

| Role    | Font                  | Weights              |
|---------|-----------------------|----------------------|
| Display | Cormorant Garamond    | 400, 500, 600, 700 + italic |
| Body    | DM Sans               | 300, 400, 500, 600   |

## Deployment

Open `index.html` in any browser. No build step required.

For production, upload the entire folder to any static host (Netlify, Vercel, GitHub Pages, etc.).

## Contact

- Email: info@aladatesme.com
- Phone: +971 56 256 1401
- Location: Jurf 3, Ajman, UAE
