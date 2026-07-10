# Premium Personal Portfolio — Abishek K

A world-class, premium, dark-themed personal portfolio website designed to showcase Full Stack Web Development and AI projects. Inspired by the high-end product launch interfaces of Apple, Tesla, Stripe, and Linear.

## 🚀 Live Demo & Hosting
The portfolio is designed to build and run seamlessly on **Vercel** with optimized security headers and asset caching settings out of the box.

*   **Vercel Target Domain**: 
https://abishek-portfolio-phi.vercel.app/
---

## 🛠️ Features & Interactive Mechanics

*   **Cinematic Hero Screen**: Features dynamic interactive canvas particles reacting to mouse vectors and a floating 3D profile picture framed in a high-tech glass card.
*   **Dynamic Typing Effect**: Cycles through professional roles ("Full Stack Developer", "AI Developer", etc.).
*   **3D Card Tilt & Glow**: Real-time cursor coordinates trigger interactive tilt physics on skills and certification cards, casting a colored cursor-tracking ambient spotlight.
*   **Scroll-Progress & Sticky Blur Headers**: Dynamic visual scrollbar indicator, sticky frosted-glass header navbar, and scroll-activated viewport fade-in states.
*   **A11y & SEO Best Practices**:
    *   Dynamic copyright year generation.
    *   Full structured LD-JSON data schema, Open Graph (OG) tags, and Twitter Cards.
    *   Proper ARIA roles, skip-link navigation, and no-JS static fallback safety.
    *   Optimized assets and custom caching rules via Vercel headers.
*   **Responsive layouts**: Mobile-first design elements scaling dynamically from mobile viewports to ultra-wide desktop setups.
*   **Validated Contact Flow**: Form validation overlay triggering a smooth vector checkmark transmission success frame.

---

## 📁 Project Directory Layout

```
abishek-portfolio/
│
├── assets/
│   ├── abishek-profile.png             # Your uploaded professional profile photo
│   └── Abishek_Professional_Resume.pdf  # Your uploaded PDF Resume
│
├── index.html                           # Semantic SEO-optimized HTML5 structure
├── styles.css                           # Glassmorphic grid and styling system
├── script.js                            # Interactive canvas, cursor, and reveal engines
│
├── vercel.json                          # Custom build routing & security header rules
├── robots.txt                           # Search engine crawling rules
├── sitemap.xml                          # XML indexing roadmap
└── README.md                            # Documentation file (This file)
```

---

## ⚡ Quick Deployment Steps

The local repository has been initialized and linked to your remote origin. To deploy:

### 1. Push to GitHub
Run the following commands in your terminal from this directory:
```bash
git add README.md
git commit -m "docs: Add portfolio documentation"
git branch -M main
git push -u origin main
```

### 2. Connect to Vercel
1. Go to your **Vercel Dashboard**.
2. Click **Add New** > **Project**.
3. Import the repository **`Abishek-portfolio`**.
4. Leave everything as default and click **Deploy**.
