# Habiba Khaled Hassan — Data Engineering Portfolio

A standalone, responsive portfolio in cherry red and white. Plain HTML, CSS, and JavaScript: no build tools, package installation, backend, or API keys required.

## Open the site

1. Extract `habiba.zip`.
2. Open `habiba/index.html` in a modern browser.
3. For a local web preview, run `python -m http.server 8000` **inside the habiba folder**, then visit `http://localhost:8000`.

The website, fonts, and project photos are included locally. External links need an internet connection. The email-copy button uses the clipboard on HTTPS or localhost; when unavailable, it selects the address and explains how to copy it.

## Add the portrait

Place the owner's photo at **`images/profile.png`** and reload. The hero and About frames both use this file and display it at its original aspect ratio. A square image around 600 × 600 pixels works well. The hero frame scales with the viewport up to 470 px. The About frame is up to 280 px on desktop and 240 px on mobile. Both frames appear empty until the file is supplied.

The browser may log a missing optional `profile.png` request before you add the image. This does not prevent the portfolio from working.

## Edit the content

| File | What to change |
| --- | --- |
| `index.html` | Page copy, contact details, skills, DEPI training, education, project cards, links |
| `js/main.js` | The four project case studies in the `projects` object; email-copy address; interaction behavior |
| `css/style.css` | Layout, responsive rules, animation, and color tokens at the top |
| `resume.html` | The separate, printable CV |
| `js/resume.js` | Print button behavior |
| `images/` | Project photos, optional profile photo, favicon, source credits |
| `fonts/` | Local fonts and their licenses |

When changing a project or contact detail, update both the homepage and résumé, plus the corresponding case study or email constant in `js/main.js` if applicable. All names, dates, and skills are based on the supplied CV. The project summaries were cross-checked against the public repository READMEs on 15 November 2026.

## Intentional design choices

- Fixed **light** theme. No theme toggle or operating-system theme detection.
- **Cherry red (#b91436) and white**, with pale cherry backgrounds.
- Motion runs by default, including with reduced-motion OS preferences. There is no animation toggle or saved preference logic. Animations are subtle; no flashing or audio.
- **No sound code, sound files, audio controls, or sound dependencies.**
- DEPI is shown as current **training**, starting July 2026. University graduation is expected in 2028.
- No certificates, employers, client testimonials, years-of-experience claims, or unverified performance metrics have been added.
- Four projects with working repository links. The supermarket project links directly to **`master`**.
- Project images are illustrative online photography, not screenshots of the actual applications. Credits and source links are in `CREDITS.md`.
- Project filters, keyboard-accessible dialogs, responsive navigation, email and phone links, and a printable résumé are included.
- The public contact action opens an email client. No contact-form backend, analytics, trackers, or AI API calls are embedded.

## Skill button effects

All 19 technical skills use individual colored buttons. Python glows blue, Java and SQL Server red, Pandas purple, Selenium green, and Power BI yellow. The remaining skills have complementary individual tones. Hover causes a subtle magnetic movement toward the pointer; leaving the button returns it to center. Keyboard focus and touch also reveal the glow. Colors are controlled by the `[data-skill]` rules in `css/style.css`, and movement by the `.skill-button` handlers in `js/main.js`.

## Publish

Upload the **contents** of this folder to any static web host. `index.html` must be at the published root. Keep `css`, `js`, `images`, and `fonts` beside it and preserve the filenames and letter casing.

For GitHub Pages, place these files at the root of the customer's repository and choose that branch and root folder in the Pages publishing settings. `.nojekyll` is included. Relative asset paths also work when the portfolio is hosted in a subdirectory.

After deciding the public domain, add its canonical URL and an absolute social-preview image URL to the head of `index.html`. No deployment URL is assumed in this package.

## Résumé

Open `resume.html` and choose **Print / Save as PDF**. The print stylesheet removes navigation and formats the CV for A4. Review the browser's preview before saving; page count can differ by browser and print settings.

## Handoff

Send `habiba.zip` to the customer. They can edit the extracted files in any text editor. The original reference portfolio is not a dependency of this site.
