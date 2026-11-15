# Handoff verification

Checked on 15 November 2026 using the local browser preview.

- Desktop layout at 1280 px; tablet at 768 px; mobile at 390 px and 320 px. No horizontal page overflow at these widths.
- All four bundled project photographs loaded successfully.
- Fixed light theme verified while the browser reported a dark system preference.
- The animated hero portrait frame was running while the browser reported `prefers-reduced-motion: reduce`.
- All / Data pipelines / Automation / Analysis filters returned 4 / 1 / 2 / 1 projects respectively.
- All four case-study dialogs opened with their corresponding project content. Close control and Escape dismissal worked.
- Supermarket project repository link points to the `master` branch.
- Mobile navigation opens and closes, and selecting a section closes the menu.
- Email-copy button reported successful copying on localhost.
- Résumé page loads with Habiba's supplied background and projects.
- Both profile frames remain empty while `images/profile.png` is absent, as requested.
- HTML local file references and section-anchor targets resolve.
- JavaScript syntax checks passed.
- No runtime console errors or warnings were reported in the browser check.

The optional profile image is intentionally not included. External email/phone applications and GitHub/LinkedIn account availability are outside the static website. No hosting deployment or message sending was performed.

## Portrait and skill revision

- Removed the greeting above the main headline.
- Hero and About frames both load the same `images/profile.png` when provided.
- About photo frame is square: 280 px maximum on desktop and 240 px on mobile, with the full photo contained inside.
- All 19 technical skill labels are individually colored buttons.
- Verified blue Python and red Java hover backgrounds and colored glow shadows.
- Verified magnetic translation near the button edge and keyboard-focus glow.
- Verified no horizontal overflow at 390 px after the changes.
- Rebuilt the ZIP with current source files.
