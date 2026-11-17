// ==========================================================================
// Minimal Personal Site — Unified Final Design
// ==========================================================================

const CURRENT_YEAR = 2026;

const PROJECTS = [
  {
    id: "portfolio-studio",
    title: "Git-Backed Content Studio",
    year: "2026",
    desc: "In-browser markdown editor with instant ISR revalidation and R2 media uploads.",
    detail:
      "Built to replace third-party CMS lock-in. Edits commit directly to GitHub via API in production and local disk in dev, paired with Shiki server-side highlighting and a Web-MCP endpoint.",
    tags: ["Next.js 16", "Tailwind v4", "Shiki", "Web-MCP"]
  },
  {
    id: "kiku-audio",
    title: "Kiku",
    year: "2026",
    desc: "Low-latency local transcription and voice-note workspace.",
    detail:
      "Focused on keyboard-first navigation, crisp waveform scrubbing, and zero-jank streaming text reveal.",
    tags: ["TypeScript", "AudioWorklet", "Local AI"]
  },
  {
    id: "photo-journal",
    title: "Photography Archive",
    year: "2025",
    desc: "Minimal photo essays and 35mm / digital galleries at photos.shouryannikam.com.",
    detail:
      "Fast, distraction-free gallery with EXIF metadata, responsive image grids, and zero-egress edge caching.",
    tags: ["Photography", "R2", "Edge"]
  },
  {
    id: "instrument-checkout",
    title: "Instrument Checkout",
    year: "2025",
    desc: "Fast lab equipment tracking with barcode scan and instant state sync.",
    detail:
      "Designed for high-contrast legibility under harsh lab lighting, with optimistic UI updates and audit trails.",
    tags: ["React", "Postgres", "Systems"]
  }
];

const SKILLS = [
  {
    name: "view-transitions-audit",
    desc: "Verify shared-element morphs and fallback timing without layout stretch.",
    meta: "CSS / Motion"
  },
  {
    name: "local-first-sync",
    desc: "Placeholder skill — optimistic UI state and conflict-free local storage.",
    meta: "Systems"
  },
  {
    name: "markdown-pipeline",
    desc: "Placeholder skill — server-rendered Shiki syntax highlighting and Zod schemas.",
    meta: "Tooling"
  },
  {
    name: "minimal-ui-craft",
    desc: "Placeholder skill — hairline grids, tabular numerals, and keyboard-first flows.",
    meta: "Design"
  }
];

const ARTICLES = [
  // Current Year (2026) — paginated
  {
    slug: "blur-reveal-and-restraint",
    title: "On Blur Reveals and Restraint",
    date: "Nov 2026",
    year: 2026,
    excerpt: "Why 680ms of soft Gaussian blur feels calmer than a bounce.",
    body: [
      "Most web animations announce themselves too loudly. When an element slides in from 40 pixels away, your eye has to track its trajectory before it can read the words.",
      "A subtle blur reveal—starting at <code>blur(10px)</code> and <code>translateY(8px)</code>, settling with an exponential out curve—lets typography materialize in place. It feels less like a PowerPoint slide and more like ink focusing on paper.",
      "<h2>Timing as a material</h2>",
      "Interactive state changes (hover, press, tab switches) should stay between 140ms and 240ms. Entry reveals can breathe a little longer—around 600ms—as long as stagger delays stay tight (50–70ms per block) so the page never feels slow.",
      "<blockquote>Animation should clarify spatial relationships or reward curiosity, never delay reading.</blockquote>",
      "<pre><code>@keyframes blurReveal {\n  from {\n    opacity: 0;\n    filter: blur(10px);\n    transform: translateY(8px);\n  }\n  to {\n    opacity: 1;\n    filter: blur(0px);\n    transform: translateY(0);\n  }\n}</code></pre>",
      "Pair this with <code>prefers-reduced-motion: reduce</code> so visitors who prefer static pages get instant, crisp text with zero delay."
    ]
  },
  {
    slug: "file-over-app-for-personal-sites",
    title: "File Over App for Personal Sites",
    date: "Oct 2026",
    year: 2026,
    excerpt: "Keeping essays in plain Markdown so your writing outlives your framework.",
    body: [
      "Hosted blogging platforms come and go, change their pricing, or lock your drafts behind proprietary exports. Keeping every essay as a plain <code>.md</code> file with minimal YAML frontmatter means your archive is always portable.",
      "<h2>Typography does the heavy lifting</h2>",
      "When you strip away hero banners, sidebar widgets, and newsletter popups, only three things remain: measure (60–68 characters per line), contrast, and rhythm. A 1px hairline divider and a monospace timestamp are often all the chrome an essay needs.",
      "<pre><code>---\ntitle: File Over App\npublishedAt: 2026-10-14\n---</code></pre>"
    ]
  },
  {
    slug: "shared-element-view-transitions",
    title: "Shared-Element View Transitions Without a Framework",
    date: "Sep 2026",
    year: 2026,
    excerpt: "Using the native View Transitions API for tactile page and portrait morphs.",
    body: [
      "The browser's <code>document.startViewTransition</code> API lets a title in a list morph directly into an article header, or a small hero portrait expand into an About page frame—without shipping a single kilobyte of animation runtime.",
      "Keep the rules simple: assign matching <code>view-transition-name</code> values only to the elements actively transitioning so nothing collides."
    ]
  },
  {
    slug: "designing-for-light-and-dark",
    title: "Designing for Pure White and Deep Ink",
    date: "Aug 2026",
    year: 2026,
    excerpt: "Balancing hairline borders and muted metadata across both themes.",
    body: [
      "In light mode, a <code>#e6e6e8</code> border looks crisp against <code>#ffffff</code>. Invert blindly and you get harsh gray boxes. Dark mode needs slightly softer foreground ink (<code>#ededed</code> instead of pure <code>#ffffff</code>) and subtler borders (<code>#1f1f22</code>) so text hierarchy stays calm.",
      "Testing both themes side-by-side—especially hover states and code blocks—catches contrast regressions before they ship."
    ]
  },
  {
    slug: "notes-on-local-first-audio",
    title: "Notes on Local-First Audio Tools",
    date: "May 2026",
    year: 2026,
    excerpt: "Placeholder essay on low-latency capture and offline transcription.",
    body: [
      "Placeholder article content. Local-first tools feel immediate because every keystroke and waveform scrub happens without waiting on a round-trip.",
      "More notes to be added here."
    ]
  },
  {
    slug: "minimal-web-typography",
    title: "A Field Guide to Minimal Web Typography",
    date: "Feb 2026",
    year: 2026,
    excerpt: "Placeholder essay on scale, tracking, and tabular numerals.",
    body: [
      "Placeholder article content. Good typography is mostly about subtraction: consistent line-height, restrained weight contrast, and generous whitespace."
    ]
  },

  // Archive (Before 2026)
  {
    slug: "building-a-personal-photo-site",
    title: "Building a Fast Personal Photography Site",
    date: "Nov 2025",
    year: 2025,
    excerpt: "Placeholder archive note on edge-cached galleries and color profiles.",
    body: [
      "Placeholder archive article. Putting photos on a dedicated subdomain keeps the main writing site lean while giving images room to breathe."
    ]
  },
  {
    slug: "keyboard-first-interfaces",
    title: "Keyboard-First Web Interfaces",
    date: "Jul 2025",
    year: 2025,
    excerpt: "Placeholder archive note on single-key shortcuts and discoverability.",
    body: [
      "Placeholder archive article. Subtle shortcut hints inside hover tooltips teach power-user keys without cluttering the page."
    ]
  },
  {
    slug: "systems-that-stay-small",
    title: "Systems That Stay Small",
    date: "Oct 2024",
    year: 2024,
    excerpt: "Placeholder archive note on zero-dependency tooling and longevity.",
    body: [
      "Placeholder archive article. The easiest codebase to maintain a year later is the one with the fewest moving parts."
    ]
  },
  {
    slug: "first-principles-of-fast-uis",
    title: "First Principles of Fast UIs",
    date: "Mar 2023",
    year: 2023,
    excerpt: "Placeholder archive note on perceived performance and optimistic state.",
    body: [
      "Placeholder archive article. Responding within 16ms makes an interface feel physical."
    ]
  }
];

// ==========================================================================
// Theme, View Transition Helpers & Toast
// ==========================================================================
const themeBtn = document.getElementById("theme-btn");
const toastEl = document.getElementById("toast");
let toastTimer = null;
let lastArticleSlug = null;
let archiveOpen = false;
let archiveYear = null;

function runVT(fn) {
  if (document.startViewTransition) {
    return document.startViewTransition(fn);
  }
  fn();
  return null;
}

function getTheme() {
  return document.documentElement.getAttribute("data-theme") || "light";
}

function renderThemeIcon() {
  const dark = getTheme() === "dark";
  themeBtn.innerHTML = dark
    ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>`
    : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>`;
}

function toggleTheme() {
  const next = getTheme() === "dark" ? "light" : "dark";
  document.documentElement.setAttribute("data-theme", next);
  try {
    localStorage.setItem("theme", next);
  } catch {}
  renderThemeIcon();
}

function showToast(msg) {
  toastEl.textContent = msg;
  toastEl.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
}

// ==========================================================================
// Reusable Photo Placeholder
// ==========================================================================
function renderPhotoPlaceholder(large = false) {
  const cls = large
    ? "photo-placeholder photo-placeholder--large vt-portrait-shared"
    : "photo-placeholder vt-portrait-shared";
  return `
    <div class="${cls}" aria-label="Portrait photo placeholder">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3" />
        <circle cx="9" cy="9" r="1.8" />
        <path d="m21 15-4.5-4.5a2 2 0 0 0-2.8 0L6 18" />
      </svg>
      <span>photo</span>
    </div>
  `;
}

// ==========================================================================
// Views
// ==========================================================================
function renderHome(animateReveal = true) {
  const r = (d) => (animateReveal ? `reveal" style="--d:${d}` : `" style="opacity:1`);
  const recentArticles = ARTICLES.filter((a) => a.year === CURRENT_YEAR).slice(0, 4);

  return `
    <section class="hero">
      <div>
        <h1 class="hero-title ${r(0)}">
          Software engineer &amp; photographer.
        </h1>
        <p class="hero-subtitle ${r(1)}">
          Placeholder bio — building fast, calm interfaces and AI-native tools.
          Explore open-source work on
          <a href="https://github.com" target="_blank" rel="noreferrer" class="inline-link">GitHub</a>
          or photos on
          <a href="https://photos.shouryannikam.com/" target="_blank" rel="noreferrer" class="inline-link">photos.shouryannikam.com</a>.
        </p>
      </div>

      <a href="/about" data-link class="${animateReveal ? "reveal" : ""}" style="--d:1" title="About me">
        ${renderPhotoPlaceholder(false)}
      </a>
    </section>

    <section class="section ${animateReveal ? "reveal" : ""}" style="--d:2;">
      <div class="section-header">
        <h2 class="section-title"><span class="section-badge">P</span> Projects</h2>
        <a href="/projects" data-link class="section-action">All projects →</a>
      </div>
      <div class="list-group">
        ${PROJECTS.slice(0, 3)
          .map(
            (p) => `
          <div class="project-item" data-project="${p.id}" style="view-transition-name: project-${p.id}">
            <div class="list-row" role="button" tabindex="0" aria-expanded="false">
              <div class="row-main">
                <span class="row-title">${p.title} <span class="row-arrow">↗</span></span>
                <span class="row-desc">${p.desc}</span>
              </div>
              <span class="row-meta">${p.year}</span>
            </div>
            <div class="project-detail">
              <p>${p.detail}</p>
              <div class="tag-row">
                ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
              </div>
            </div>
          </div>
        `
          )
          .join("")}
      </div>
    </section>

    <section class="section ${animateReveal ? "reveal" : ""}" style="--d:3;">
      <div class="section-header">
        <h2 class="section-title"><span class="section-badge">W</span> Writing</h2>
        <a href="/writing" data-link class="section-action">All writing →</a>
      </div>
      <div class="list-group">
        ${recentArticles
          .map(
            (a) => `
          <a href="/writing/${a.slug}" data-link data-slug="${a.slug}" class="list-row" style="view-transition-name: post-${a.slug}">
            <div class="row-main">
              <span class="row-title" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-title" : ""}">${a.title}</span>
              <span class="row-desc">${a.excerpt}</span>
            </div>
            <span class="row-meta" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-meta" : ""}">${a.date}</span>
          </a>
        `
          )
          .join("")}
      </div>
    </section>

    ${"" /* Skills section temporarily commented out
    <section class="section ${animateReveal ? "reveal" : ""}" style="--d:4;">
      <div class="section-header">
        <h2 class="section-title"><span class="section-badge">S</span> Skills</h2>
        <span class="row-meta">${SKILLS.length} capabilities</span>
      </div>
      <div class="list-group">
        ${SKILLS.map(
          (s) => `
          <div class="list-row" style="cursor: default;">
            <div class="row-main">
              <span class="row-title" style="font-family: var(--font-mono); font-size: 0.875rem;">${s.name}</span>
              <span class="row-desc">${s.desc}</span>
            </div>
            <span class="row-meta">${s.meta}</span>
          </div>
        `
        ).join("")}
      </div>
    </section>
    */}
  `;
}

function renderProjectsPage(animateReveal = true) {
  return `
    <section class="section">
      <h1 class="hero-title ${animateReveal ? "reveal" : ""}" style="--d:0">Projects</h1>
      <p class="hero-subtitle ${animateReveal ? "reveal" : ""}" style="--d:1; margin-bottom: 28px;">
        Placeholder overview of selected software, experiments, and tools. Click any item to expand.
      </p>

      <div class="list-group ${animateReveal ? "reveal" : ""}" style="--d:2">
        ${PROJECTS.map(
          (p) => `
          <div class="project-item" data-project="${p.id}" style="view-transition-name: project-${p.id}">
            <div class="list-row" role="button" tabindex="0" aria-expanded="false">
              <div class="row-main">
                <span class="row-title">${p.title} <span class="row-arrow">↗</span></span>
                <span class="row-desc">${p.desc}</span>
              </div>
              <span class="row-meta">${p.year}</span>
            </div>
            <div class="project-detail">
              <p>${p.detail}</p>
              <div class="tag-row">
                ${p.tags.map((t) => `<span class="tag">${t}</span>`).join("")}
              </div>
            </div>
          </div>
        `
        ).join("")}
      </div>
    </section>
  `;
}

function renderWriting(animateReveal = true) {
  const currentArticles = ARTICLES.filter((a) => a.year === CURRENT_YEAR);
  const archiveArticles = ARTICLES.filter((a) => a.year < CURRENT_YEAR);
  const archiveYears = [...new Set(archiveArticles.map((a) => a.year))].sort((a, b) => b - a);
  if (!archiveYear || !archiveYears.includes(archiveYear)) {
    archiveYear = archiveYears[0];
  }
  const yearIndex = archiveYears.indexOf(archiveYear);
  const yearItems = archiveArticles.filter((a) => a.year === archiveYear);

  return `
    <section class="section">
      <h1 class="hero-title ${animateReveal ? "reveal" : ""}" style="--d:0">Writing</h1>
      <p class="hero-subtitle ${animateReveal ? "reveal" : ""}" style="--d:1; margin-bottom: 28px;">
        Essays and notes on interfaces, engineering, and craft.
      </p>

      <div class="section-header ${animateReveal ? "reveal" : ""}" style="--d:2">
        <h2 class="section-title">${CURRENT_YEAR}</h2>
        <span class="row-meta">${currentArticles.length} posts</span>
      </div>

      <div class="list-group ${animateReveal ? "reveal" : ""}" style="--d:3">
        ${currentArticles
          .map(
            (a) => `
          <a href="/writing/${a.slug}" data-link data-slug="${a.slug}" class="list-row" style="view-transition-name: post-${a.slug}">
            <div class="row-main">
              <span class="row-title" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-title" : ""}">${a.title}</span>
              <span class="row-desc">${a.excerpt}</span>
            </div>
            <span class="row-meta" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-meta" : ""}">${a.date}</span>
          </a>
        `
          )
          .join("")}
      </div>
    </section>

    ${
      archiveYears.length > 0
        ? `
      <section class="section ${animateReveal ? "reveal" : ""}" style="--d:4; view-transition-name: archive-section;">
        <div class="archive-header">
          <button
            type="button"
            id="archive-toggle"
            class="archive-toggle"
            aria-expanded="${String(archiveOpen)}"
          >
            <span class="archive-toggle-left">
              <span class="archive-chevron">▸</span>
              <span>Archive</span>
            </span>
          </button>

          ${
            archiveOpen
              ? `
            <div class="year-pills">
              ${archiveYears
                .map(
                  (y) =>
                    `<button type="button" class="year-pill ${y === archiveYear ? "active" : ""}" data-archive-year="${y}">${y}</button>`
                )
                .join("")}
            </div>
          `
              : ""
          }
        </div>

        ${
          archiveOpen
            ? `
          <div class="list-group" style="view-transition-name: archive-list">
            ${yearItems
              .map(
                (a) => `
              <a href="/writing/${a.slug}" data-link data-slug="${a.slug}" class="list-row">
                <div class="row-main">
                  <span class="row-title" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-title" : ""}">${a.title}</span>
                  <span class="row-desc">${a.excerpt}</span>
                </div>
                <span class="row-meta" style="${lastArticleSlug === a.slug ? "view-transition-name: vt-article-meta" : ""}">${a.date}</span>
              </a>
            `
              )
              .join("")}
          </div>
        `
            : ""
        }
      </section>
    `
        : ""
    }
  `;
}

function renderArticle(slug) {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) {
    return `
      <a href="/writing" data-link class="back-link">← Back to writing</a>
      <h1 class="hero-title">Article not found</h1>
    `;
  }

  lastArticleSlug = slug;

  return `
    <a href="/writing" data-link class="back-link">← Writing</a>
    <article>
      <header class="article-header">
        <h1 class="article-title" style="view-transition-name: vt-article-title">${article.title}</h1>
        <div class="article-meta" style="view-transition-name: vt-article-meta">
          <span>${article.date}</span>
        </div>
      </header>
      <div class="prose reveal" style="--d:1">
        ${article.body.map((block) => (block.startsWith("<") ? block : `<p>${block}</p>`)).join("")}
      </div>
    </article>
  `;
}

function renderAboutPage(animateReveal = true) {
  return `
    <section class="about-hero">
      <div class="${animateReveal ? "reveal" : ""}" style="--d:0">
        ${renderPhotoPlaceholder(true)}
      </div>
      <div>
        <h1 class="hero-title ${animateReveal ? "reveal" : ""}" style="--d:1">About</h1>
        <p class="hero-subtitle ${animateReveal ? "reveal" : ""}" style="--d:2">
          Placeholder bio — I'm Shouryan, a software engineer interested in developer tools,
          applied AI, and quiet, responsive user interfaces.
        </p>
      </div>
    </section>

    <section class="section prose ${animateReveal ? "reveal" : ""}" style="--d:3">
      <h2>Now</h2>
      <p>
        Placeholder text — currently exploring fast local-first software, clean design systems,
        and building this minimal portfolio from scratch.
      </p>

      <h2>Photography</h2>
      <p>
        Outside of engineering, I keep a separate gallery of street and travel frames at
        <a href="https://photos.shouryannikam.com/" target="_blank" rel="noreferrer" class="inline-link">photos.shouryannikam.com ↗</a>.
      </p>
    </section>
  `;
}

// ==========================================================================
// Router & Lifecycle
// ==========================================================================
const appEl = document.getElementById("app");

function getNavPill() {
  const group = document.querySelector(".nav-group");
  if (!group) return null;
  let pill = group.querySelector(".nav-bg-pill");
  if (!pill) {
    pill = document.createElement("span");
    pill.className = "nav-bg-pill";
    pill.setAttribute("aria-hidden", "true");
    group.prepend(pill);
  }
  return pill;
}

function positionNavPill(targetEl) {
  const pill = getNavPill();
  if (!pill) return;
  pill.style.transition =
    "transform 280ms var(--ease-spring), width 280ms var(--ease-spring), opacity 160ms ease";
  if (!targetEl) {
    pill.style.opacity = "0";
    return;
  }
  pill.style.opacity = "1";
  pill.style.width = `${targetEl.offsetWidth}px`;
  pill.style.transform = `translate3d(${targetEl.offsetLeft}px, 0, 0)`;
}

function setActiveNav(path) {
  let activeEl = null;
  document.querySelectorAll("[data-nav]").forEach((el) => {
    const key = el.getAttribute("data-nav");
    const active =
      (key === "projects" && path.startsWith("/projects")) ||
      (key === "writing" && path.startsWith("/writing")) ||
      (key === "about" && path.startsWith("/about"));

    el.classList.toggle("active", active);
    if (active) activeEl = el;
  });
  positionNavPill(activeEl);
}

function bindPageEvents() {
  // Expandable project rows wrapped in View Transitions
  document.querySelectorAll(".project-item").forEach((item) => {
    const row = item.querySelector(".list-row");
    const toggle = () => {
      runVT(() => {
        const open = item.classList.toggle("open");
        row.setAttribute("aria-expanded", String(open));
      });
    };
    row.addEventListener("click", toggle);
    row.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });
  });

  // Archive collapse & year selector
  const archiveToggle = document.getElementById("archive-toggle");
  if (archiveToggle) {
    archiveToggle.addEventListener("click", () => {
      archiveOpen = !archiveOpen;
      renderRoute("/writing", true, false);
    });
  }

  document.querySelectorAll("[data-archive-year]").forEach((btn) => {
    btn.addEventListener("click", () => {
      archiveYear = Number(btn.getAttribute("data-archive-year"));
      renderRoute("/writing", true, false);
    });
  });
}

function renderRoute(path, useTransition = true, animateReveal = true) {
  const updateDOM = () => {
    if (path === "/" || path === "") {
      appEl.innerHTML = renderHome(animateReveal);
    } else if (path === "/projects" || path === "/projects/") {
      appEl.innerHTML = renderProjectsPage(animateReveal);
    } else if (path === "/writing" || path === "/writing/") {
      appEl.innerHTML = renderWriting(animateReveal);
    } else if (path.startsWith("/writing/")) {
      appEl.innerHTML = renderArticle(path.replace("/writing/", ""));
    } else if (path === "/about" || path === "/about/") {
      appEl.innerHTML = renderAboutPage(animateReveal);
    } else {
      appEl.innerHTML = renderHome(animateReveal);
    }
    setActiveNav(path);
    bindPageEvents();
    if (animateReveal) {
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  };

  if (useTransition) {
    runVT(updateDOM);
  } else {
    updateDOM();
  }
}

function navigate(href, clickedLink) {
  if (href === window.location.pathname) return;

  if (clickedLink && clickedLink.dataset.slug) {
    document.querySelectorAll("[data-slug]").forEach((el) => {
      const t = el.querySelector(".row-title");
      const m = el.querySelector(".row-meta");
      if (t) t.style.viewTransitionName = "";
      if (m) m.style.viewTransitionName = "";
    });
    const titleEl = clickedLink.querySelector(".row-title");
    const metaEl = clickedLink.querySelector(".row-meta");
    if (titleEl) titleEl.style.viewTransitionName = "vt-article-title";
    if (metaEl) metaEl.style.viewTransitionName = "vt-article-meta";
  }

  history.pushState({}, "", href);
  renderRoute(href, true, false);
}

document.addEventListener("click", (e) => {
  const link = e.target.closest("a[data-link]");
  if (!link) return;
  e.preventDefault();
  navigate(link.getAttribute("href"), link);
});

window.addEventListener("popstate", () => {
  renderRoute(window.location.pathname, true, false);
});

themeBtn.addEventListener("click", toggleTheme);

// Bot-safe email copy: assembled only on user click, never stored as a static mailto:
document.getElementById("copy-email").addEventListener("click", async () => {
  const addr = `${atob("aGVsbG8=")}@${atob("c2hvdXJ5YW5uaWthbS5jb20=")}`;
  try {
    await navigator.clipboard.writeText(addr);
  } catch {}
  showToast("Copied email to clipboard");
});

document.addEventListener("keydown", (e) => {
  if (e.metaKey || e.ctrlKey || e.altKey) return;
  const tag = document.activeElement?.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  const key = e.key.toLowerCase();
  if (key === "h") navigate("/");
  if (key === "p") navigate("/projects");
  if (key === "w") navigate("/writing");
  if (key === "a") navigate("/about");
  if (key === "t") toggleTheme();
});

// Boot
initNavMagnet();
renderThemeIcon();
renderRoute(window.location.pathname, false, true);

function initNavMagnet() {
  const group = document.querySelector(".nav-group");
  if (!group) return;

  group.addEventListener("pointermove", (e) => {
    const activeTab = group.querySelector(".nav-link.active");
    const pill = getNavPill();
    if (!activeTab || !pill) return;

    const hoveredLink = e.target.closest(".nav-link");
    if (!hoveredLink || hoveredLink === activeTab) {
      pill.style.transition =
        "transform 280ms var(--ease-spring), width 280ms var(--ease-spring), opacity 160ms ease";
      pill.style.transform = `translateX(${activeTab.offsetLeft}px)`;
      return;
    }

    const activeRect = activeTab.getBoundingClientRect();
    const activeCenterX = activeRect.left + activeRect.width / 2;
    const activeCenterY = activeRect.top + activeRect.height / 2;

    const dx = Math.max(-7, Math.min(7, (e.clientX - activeCenterX) * 0.08));
    const dy = Math.max(-2, Math.min(2, (e.clientY - activeCenterY) * 0.12));

    pill.style.transition = "transform 70ms linear, width 280ms var(--ease-spring), opacity 160ms ease";
    pill.style.transform = `translate3d(${(activeTab.offsetLeft + dx).toFixed(1)}px, ${dy.toFixed(1)}px, 0)`;
  });

  group.addEventListener("pointerleave", () => {
    const activeTab = group.querySelector(".nav-link.active");
    const pill = getNavPill();
    if (!pill) return;
    pill.style.transition =
      "transform 300ms var(--ease-spring), width 280ms var(--ease-spring), opacity 160ms ease";
    positionNavPill(activeTab);
  });
}
