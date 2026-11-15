/* No dependencies, audio, theme preference, or motion preference controls. */
(() => {
  "use strict";
  const menu = document.querySelector(".menu-toggle");
  const nav = document.getElementById("main-nav");
  const navLinks = [...nav.querySelectorAll("a")];
  function closeMenu() {
    nav.classList.remove("is-open");
    menu.setAttribute("aria-expanded", "false");
    menu.setAttribute("aria-label", "Open navigation");
  }
  menu.addEventListener("click", () => {
    const open = menu.getAttribute("aria-expanded") !== "true";
    nav.classList.toggle("is-open", open);
    menu.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-label", open ? "Close navigation" : "Open navigation");
  });
  navLinks.forEach((link) => link.addEventListener("click", closeMenu));
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && nav.classList.contains("is-open")) {
      closeMenu();
      menu.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".header-inner")) closeMenu();
  });
  window.addEventListener("resize", () => {
    if (window.innerWidth > 680) closeMenu();
  });

  const main = document.getElementById("main");
  const sections = [...main.querySelectorAll(":scope > section[id]")];
  const linksByHash = new Map(navLinks.map((link) => [link.hash, link]));
  const root = document.documentElement;
  let currentLink;
  let navFrame = null;

  function updateActiveSection() {
    navFrame = null;
    // Match the anchor scroll offset, with a pixel of tolerance for rounding.
    const readingLine = (Number.parseFloat(getComputedStyle(root).scrollPaddingTop) || 0) + 1;
    const atEnd = root.scrollTop > 0 && root.scrollTop + root.clientHeight >= root.scrollHeight - 1;
    // A short final section may reach the end of the page before the reading line.
    const section = atEnd
      ? sections.at(-1)
      : sections.findLast((section) => section.getBoundingClientRect().top <= readingLine);
    const nextLink = section && linksByHash.get(`#${section.id}`);
    if (nextLink === currentLink) return;
    currentLink?.removeAttribute("aria-current");
    nextLink?.setAttribute("aria-current", "location");
    currentLink = nextLink;
  }

  function scheduleNavUpdate() {
    if (navFrame === null) navFrame = requestAnimationFrame(updateActiveSection);
  }

  window.addEventListener("scroll", scheduleNavUpdate, { passive: true });
  window.addEventListener("resize", scheduleNavUpdate);
  window.addEventListener("pageshow", scheduleNavUpdate);
  if ("ResizeObserver" in window) new ResizeObserver(scheduleNavUpdate).observe(main);
  updateActiveSection();

  // Content remains visible without JavaScript or IntersectionObserver support.
  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    document.querySelectorAll(".reveal").forEach((element) => {
      element.classList.add("will-reveal");
      revealObserver.observe(element);
    });
  }

  // The frame is deliberately empty until the owner supplies this exact file.
  const portrait = new Image();
  portrait.alt = "Habiba Khaled Hassan";
  portrait.width = 600;
  portrait.height = 600;
  portrait.onload = () => {
    document.querySelectorAll("[data-profile-frame]").forEach((frame) => {
      frame.append(portrait.cloneNode(true));
    });
  };
  portrait.onerror = () => {}; // Missing optional portrait is not shown as a broken image.
  portrait.src = "images/profile.jpeg";

  function initializeSkillButtons(scope) {
    scope.querySelectorAll(".skill-button").forEach((button) => {
      let bounds;
      let frame;
      const reset = () => {
        cancelAnimationFrame(frame);
        bounds = null;
        button.style.removeProperty("--magnet-x");
        button.style.removeProperty("--magnet-y");
      };
      button.addEventListener("pointerenter", (event) => {
        if (event.pointerType !== "touch") bounds = button.getBoundingClientRect();
      });
      button.addEventListener("pointermove", (event) => {
        if (!bounds || event.pointerType === "touch") return;
        const offsetX = event.clientX - bounds.left - bounds.width / 2;
        const offsetY = event.clientY - bounds.top - bounds.height / 2;
        const x = Math.max(-6, Math.min(6, offsetX * 0.22));
        const y = Math.max(-5, Math.min(5, offsetY * 0.22));
        cancelAnimationFrame(frame);
        frame = requestAnimationFrame(() => {
          button.style.setProperty("--magnet-x", x + "px");
          button.style.setProperty("--magnet-y", y + "px");
        });
      });
      button.addEventListener("pointerleave", reset);
      button.addEventListener("pointercancel", reset);
      button.addEventListener("blur", reset);
    });
  }
  initializeSkillButtons(document);

  function skillKey(label) {
    const aliases = {
      "ETL · SSIS": "ssis",
      "T-SQL": "sql",
      "Data Warehousing": "warehouse",
      "Exploratory Analysis": "analysis",
    };
    return aliases[label] || label.toLowerCase().replaceAll(" ", "-");
  }

  const cards = [...document.querySelectorAll(".project-card")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      const category = button.dataset.filter;
      filters.forEach((filter) => {
        const selected = button === filter;
        filter.classList.toggle("active", selected);
        filter.setAttribute("aria-pressed", String(selected));
      });
      let shown = 0;
      cards.forEach((card) => {
        card.hidden = category !== "all" && card.dataset.category !== category;
        if (!card.hidden) {
          shown++;
          card.classList.add("is-visible");
        }
      });
      document.getElementById("project-count").textContent =
        `Showing ${shown} project${shown === 1 ? "" : "s"}`;
    }),
  );

  // Project notes are intentionally easy to edit. No API keys or backend needed.
  const projects = {
    telecom: {
      title: "Telecom Data Warehouse",
      category: "ETL · DATA ENGINEERING",
      challenge:
        "Turn recurring telecom transaction CSV files into clean records that can be traced back to their source.",
      approach: [
        "Extract incoming CSV files with SQL Server Integration Services (SSIS).",
        "Validate required fields and timestamps, transform device identifiers, and look up subscriber information.",
        "Load valid rows into SQL Server. Keep invalid records in a rejection table with the source filename.",
        "Archive processed files after successful loading.",
      ],
      outcome:
        "A documented ETL workflow covering extraction, validation, transformation, loading, rejection handling, and file archiving. The repository includes SSIS screenshots and transformation rules.",
      tools: ["SQL Server", "ETL · SSIS", "T-SQL", "CSV"],
      url: "https://github.com/Habibakhaled216/Telecom_Project",
    },
    wuzzuf: {
      title: "Wuzzuf Job Scraper",
      category: "AUTOMATION · WEB SCRAPING",
      challenge:
        "Gather job information across multiple searches without manually copying each listing.",
      approach: [
        "Use Python and Selenium to search Wuzzuf for several technology roles.",
        "Collect job title, company, location, required experience, description, and job URL.",
        "Visit the first three results pages by default, with a configurable page count.",
        "Export the collected records to CSV using Pandas.",
      ],
      outcome:
        "A structured dataset for further analysis or storage. The repository contains the scraping notebook and an exported jobs CSV.",
      tools: ["Python", "Selenium", "Pandas", "CSV"],
      url: "https://github.com/Habibakhaled216/WUZZUF_Project",
    },
    sql: {
      title: "Text-to-SQL Web Interface",
      category: "AI INTEGRATION · DATABASES",
      challenge:
        "Explore how people can ask questions about structured data using natural language instead of writing SQL themselves.",
      approach: [
        "Pass the user question and database schema to the Gemini API.",
        "Generate SQL using the supplied schema as context.",
        "Connect to SQL Server with PyODBC and load query results through Pandas pd.read_sql().",
        "Use a simple Flask interface to show the question, generated SQL, and results.",
      ],
      outcome:
        "A learning prototype connecting natural-language input, query generation, database access, and a web interface. Explore the notebook and implementation notes in the repository.",
      tools: ["Python", "Gemini API", "SQL Server", "Pandas", "PyODBC", "Flask", "HTML", "CSS"],
      url: "https://github.com/Habibakhaled216/From-text-to-SQL_By_Gemini",
    },
    sales: {
      title: "Supermarket Sales Analysis",
      category: "DATA CLEANING · ANALYSIS",
      challenge:
        "Prepare supermarket transaction data and use it to answer practical business questions.",
      approach: [
        "Inspect missing values, duplicate records, and data types in SuperMarket.csv.",
        "Rename columns, correct data types, sort records, and extract date fields.",
        "Analyze revenue, profit, product categories, payment methods, and sales patterns.",
        "Group customer satisfaction using the dataset’s rating field.",
      ],
      outcome:
        "A Python analysis script and documented findings across sales and transaction questions. The dataset and code are available on the master branch.",
      tools: ["Python", "Pandas", "CSV", "Exploratory Analysis"],
      url: "https://github.com/Habibakhaled216/SuperMarketDataHandling/tree/master",
    },
  };
  const dialog = document.getElementById("project-dialog");
  const content = document.getElementById("dialog-content");
  const escapeHTML = (text) =>
    text.replace(
      /[&<>"']/g,
      (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[char],
    );
  let lastTrigger;
  function openProject(key, trigger) {
    const project = projects[key];
    if (!project) return;
    lastTrigger = trigger;
    const tools = project.tools
      .map((tool) => `<button type="button" class="skill-button" data-skill="${escapeHTML(skillKey(tool))}">${escapeHTML(tool)}</button>`)
      .join("");
    content.innerHTML = `
      <h2 class="dialog-title" id="dialog-title">${escapeHTML(project.title)}</h2>
      <p class="dialog-category">${escapeHTML(project.category)}</p>
      <section class="dialog-section">
        <h3>The challenge</h3><p>${escapeHTML(project.challenge)}</p>
      </section>
      <section class="dialog-section">
        <h3>The approach</h3>
        <ul>${project.approach.map((item) => `<li>${escapeHTML(item)}</li>`).join("")}</ul>
      </section>
      <section class="dialog-section">
        <h3>The output</h3><p>${escapeHTML(project.outcome)}</p>
      </section>
      <div class="tags">${tools}</div>
      <a class="button primary" href="${project.url}" target="_blank" rel="noopener noreferrer">
        Explore the repository <span aria-hidden="true">↗</span>
      </a>
      <p class="dialog-note">Learning project · Public source code and documentation</p>`;
    initializeSkillButtons(content);
    dialog.showModal();
    dialog.scrollTop = 0;
    document.body.classList.add("dialog-open");
    dialog.querySelector(".dialog-close").focus();
  }
  document
    .querySelectorAll("[data-project]")
    .forEach((button) =>
      button.addEventListener("click", () => openProject(button.dataset.project, button)),
    );
  document.querySelectorAll("[data-show-project]").forEach((link) =>
    link.addEventListener("click", (event) => {
      event.preventDefault();
      openProject(link.dataset.showProject, link);
    }),
  );
  dialog.querySelector(".dialog-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    const rect = dialog.getBoundingClientRect();
    if (
      event.target === dialog &&
      (event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom)
    )
      dialog.close();
  });
  dialog.addEventListener("close", () => {
    document.body.classList.remove("dialog-open");
    lastTrigger?.focus({ preventScroll: true });
  });

  const email = "habibakhaledhassan216@gmail.com";
  document.getElementById("copy-email").addEventListener("click", async () => {
    const status = document.getElementById("copy-status");
    try {
      if (!navigator.clipboard || !window.isSecureContext) throw new Error("Clipboard unavailable");
      await navigator.clipboard.writeText(email);
      status.textContent = "Email address copied.";
    } catch {
      // Select the address so it can still be copied when opened directly from disk.
      const range = document.createRange();
      range.selectNodeContents(document.querySelector(".contact-email"));
      const selection = window.getSelection();
      selection.removeAllRanges();
      selection.addRange(range);
      status.textContent = "Copy this address: " + email;
    }
  });
  document.getElementById("year").textContent = new Date().getFullYear();
})();
