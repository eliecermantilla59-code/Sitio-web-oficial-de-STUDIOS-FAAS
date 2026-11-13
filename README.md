# STUDIOS FAAS 🚀💻

Official website and repository for **STUDIOS FAAS**, an innovative technology company focused on software development, specialized hardware engineering, and game development.

---

## 👔 Executive Leadership

- **Founder, CEO & Lead Developer:** Fabio Ardila  
  *(Specialized in Electronics Engineering, Embedded Systems, and Software Development)*

---

## 💻 Core Capabilities & Expertise

STUDIOS FAAS develops both open-source and proprietary (closed-source) technological solutions, bridging physical hardware with modern software ecosystems.

### 🌐 Web & Software Development
Custom web platforms, interactive e-commerce applications, and high-performance front-end/back-end systems built using standard and modern programming languages:
- **Languages:** HTML5, CSS3, JavaScript, TypeScript, Python, C++, C#, Java, PHP, Rust.

### ⚙️ Specialized Hardware Engineering
Design, prototyping, and deployment of custom circuits, embedded systems, microcontrollers, and dedicated hardware components tailored for specific industrial and commercial projects.

### 🎮 Game Development & Interactive Systems
Designing immersive mechanics, dynamic environments, and cross-platform interactive experiences using industry-leading game engines:
- **Engines & Frameworks:** Roblox Studio, Unity, Unreal Engine, Godot.

---

## 🛠️ Featured Portfolio & Projects

- **STUDIOS FAAS Official Web Platform:** Interactive digital storefront, showcase catalog, dynamic light/dark theme system, and custom digital tools.
- **Embedded Electronics & Hardware Modules:** Microcontroller-driven routines, custom PCBs, and hardware integration for specialized projects.
- **Open-Source Utilities:** Community-driven repositories and public code modules.
- **Proprietary Software Solutions:** Closed-source commercial products and custom client builds.

---

## 🌐 Official Web Platform Source

The base platform is implemented with standard **HTML5, CSS3 and JavaScript**. It has no dependencies, package manager or build step.

### Project files

| File | Purpose |
| --- | --- |
| `index.html` | Semantic structure, SEO/Open Graph metadata, JSON-LD organization data and all page sections. |
| `style.css` | Design tokens, RGB cyber-futuristic theme, responsive layout, components, animations and reduced-motion/forced-colors support. |
| `script.js` | Mobile navigation, scroll spy, reveal animations, pointer glow, accessible form validation and `mailto:` handoff. |
| `logo-faas.jpg` | Official STUDIOS FAAS logo (optimized 256×256 JPEG) used in the navigation, footer, favicon and social metadata. |
| `apple-touch-icon.png` | 180×180 PNG icon derived from the official logo for iOS home screens. |

### Brand palette

The interface uses the official RGB cyber-futuristic identity:

| Token | Value | Usage |
| --- | --- | --- |
| `--red` | `#ff2a4b` | Primary accents, highlights and gradient start. |
| `--green` | `#00e676` | Main action color, success states and gradient center. |
| `--blue` | `#00b0ff` | Secondary accents, links and gradient end. |

Dynamic gradients, glowing borders and metallic text highlights are defined as reusable custom properties in the `:root` block of `style.css`.

### Local preview

Open `index.html` directly in the browser, or serve the folder with any static server:

```bash
# Python
python -m http.server 8080

# PHP
php -S localhost:8080
```

Then visit `http://localhost:8080`.

### Customization

- Update `CONTACT_EMAIL` in `script.js` and the `mailto:` link in `index.html` when the production mailbox is provisioned.
- Replace the GitHub handle in `index.html` and the JSON-LD with the official account if it changes.
- Design tokens (colors, typography, radii, shadows) live in the `:root` block of `style.css`.
- Section copy lives in `index.html`.

### Quality checks

- Responsive layout with accessible navigation, skip link, visible focus states and `aria-current` scroll tracking.
- Client-side form validation with accessible error messages; the site does not store personal data.
- Reveal animations respect `prefers-reduced-motion`.
- No external asset requests; the site works offline.
- Lighthouse audit: **100 Accessibility · 100 Best Practices · 100 SEO**.

### Licensing

The source code, designs and brand assets in this repository are proprietary. See the copyright section below. Open-source projects published by STUDIOS FAAS are governed by the license declared in their respective repositories.

---

## 🔒 Copyright & Terms of Use

© 2026 **STUDIOS FAAS**. All rights reserved. 

This repository and its source code, assets, hardware schematics, and design elements are proprietary. Unauthorized copying, distribution, modification, or reuse of any part of this project is strictly prohibited without explicit written consent from the author.
