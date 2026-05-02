const cases = window.DB_DESIGN_ITEMS || [];
const studyHome = document.querySelector("[data-study-home]");
const courseButtons = document.querySelectorAll("[data-course]");
const progressRows = document.querySelectorAll("[data-progress-course]");
const courseViews = document.querySelectorAll("[data-course-view]");
const topicLists = document.querySelectorAll("[data-topic-list]");
const listEl = document.querySelector("[data-case-list]");
const detailEl = document.querySelector("[data-case-detail]");
const searchEl = document.querySelector("[data-study-search]");
const modeButtons = document.querySelectorAll("[data-view-mode]");
const combinedPopupButton = document.querySelector("[data-combined-popup]");
const dbViewSwitch = document.querySelector("[data-db-view-switch]");
const lightbox = document.querySelector("[data-lightbox]");
const lightboxImage = document.querySelector("[data-lightbox-image]");
const studyModal = document.querySelector("[data-study-modal]");
const studyModalContent = document.querySelector("[data-study-modal-content]");
const themeToggle = document.querySelector("[data-theme-toggle]");
const scrollTopButton = document.querySelector("[data-scroll-top]");
const lldRoot = document.querySelector("[data-lld-root]");
const lldData = window.LLD_STUDY_DATA || { sections: [] };
const springRoot = document.querySelector("[data-spring-root]");
const springData = window.SPRING_BOOT_STUDY_DATA || { sections: [] };
const hldRoot = document.querySelector("[data-hld-root]");
const hldCheatSheetPages = window.HLD_CHEAT_SHEET_PAGES || [];

let activeId = null;
let viewMode = "question";
let activeCourse = "home";
let activeLldSection = "home";
let activeLldTopic = "";
let lldSearchQuery = "";
let lldProblemViewMode = "problem";
let activeSpringSection = "home";
let activeSpringTopic = "";
let activeHldSection = "home";
let hldSearchQuery = "";
const progressKey = "study-progress-v1";
const themeKey = "site-theme";
const legacyStudyThemeKey = "study-theme-v1";
const legacyPortfolioThemeKey = "portfolio-theme";
let activeTheme = getStoredTheme();

const lldVideoReferences = window.LLD_VIDEO_REFERENCES || {};

function getStoredTheme() {
  try {
    const stored =
      localStorage.getItem(themeKey) ||
      localStorage.getItem(legacyStudyThemeKey) ||
      localStorage.getItem(legacyPortfolioThemeKey);
    return stored === "light" || stored === "dark" ? stored : "dark";
  } catch {
    return "dark";
  }
}

function persistTheme(theme) {
  localStorage.setItem(themeKey, theme);
  localStorage.setItem(legacyStudyThemeKey, theme);
  localStorage.setItem(legacyPortfolioThemeKey, theme);
}

function getOppositeTheme(theme) {
  return theme === "light" ? "dark" : "light";
}

function renderCodeThemeIcon(theme) {
  return `
    <span class="sun" aria-hidden="true"></span>
    <span class="moon" aria-hidden="true"></span>
  `;
}

function renderBackButton(attributes = "", label = "Back") {
  return `
    <div class="study-back-row">
      <button class="study-back-icon" type="button" ${attributes} aria-label="${escapeHtml(label)}">
        <span aria-hidden="true">←</span>
      </button>
    </div>
  `;
}

function applyTheme(theme) {
  activeTheme = theme === "light" ? "light" : "dark";
  document.documentElement.dataset.theme = activeTheme;
  document.body.dataset.theme = activeTheme;
  try {
    persistTheme(activeTheme);
  } catch {
    // Theme still applies even when storage is unavailable.
  }
  themeToggle?.setAttribute("aria-label", `Switch to ${getOppositeTheme(activeTheme)} mode`);
  document.querySelectorAll("[data-code-theme-toggle]").forEach((button) => {
    const card = button.closest(".lld-code-card");
    const codeTheme = card?.dataset.codeTheme || activeTheme;
    button.dataset.codeThemeCurrent = codeTheme;
    button.innerHTML = renderCodeThemeIcon(codeTheme);
    button.setAttribute("aria-label", `Switch code editor to ${getOppositeTheme(codeTheme)} mode`);
  });
}
const courseTopics = window.DEV_VAULT_COURSE_TOPICS || {};

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function getSpringSections() {
  return springData.sections || [];
}

function getSpringTopicKey(sectionId, topicId) {
  return `${sectionId}:${topicId}`;
}

function getAllSpringTopicKeys() {
  return getSpringSections().flatMap((section) =>
    (section.topics || []).map((topic) => getSpringTopicKey(section.id, topic.id))
  );
}

function findSpringSection(sectionId) {
  return getSpringSections().find((section) => section.id === sectionId);
}

function findSpringTopic(topicKey) {
  const [sectionId, topicId] = String(topicKey || "").split(":");
  const section = findSpringSection(sectionId);
  const topic = section?.topics?.find((item) => item.id === topicId);
  return topic ? { section, topic, topicKey } : null;
}

function getLldSections() {
  return lldData.sections || [];
}

function getLldTopicKey(sectionId, topicId) {
  return `${sectionId}:${topicId}`;
}

function getLldVideos(topicKey, topic = {}) {
  const mappedVideos = lldVideoReferences[topicKey] || [];
  const mappedSources = new Set(mappedVideos.map((video) => video.source));
  const existingVideos = (topic.videos || []).filter((video) => !mappedSources.has(video.source));
  return [...existingVideos, ...mappedVideos];
}

function normalizeYoutubeVideoUrl(url = "") {
  return String(url).replace("youtube.com/playlist?", "youtube.com/watch?");
}

function getVideoSourceShortName(source = "") {
  const normalized = String(source).toLowerCase();
  if (normalized.includes("coder")) return "CA";
  if (normalized.includes("shubh")) return "SP";
  if (normalized.includes("shrayansh")) return "SY";
  if (normalized.includes("caleb")) return "CC";
  return source
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

function getAllLldTopicKeys() {
  return getLldSections().flatMap((section) =>
    (section.topics || []).map((topic) => getLldTopicKey(section.id, topic.id))
  );
}

function findLldSection(sectionId) {
  return getLldSections().find((section) => section.id === sectionId);
}

function findLldTopic(topicKey) {
  const [sectionId, topicId] = String(topicKey || "").split(":");
  const section = findLldSection(sectionId);
  const topic = section?.topics?.find((item) => item.id === topicId);
  return topic ? { section, topic, topicKey } : null;
}

function getLldThinking(section, topic) {
  if (section.id === "oops") {
    return [
      `Start by asking what responsibility ${topic.title} clarifies in the object model.`,
      "Keep the mental model simple: identify state, behavior, visibility, and the relationships between objects.",
      "Before adding abstractions, check whether they make the code easier to change or only make the diagram look clever.",
      "A strong LLD answer should make future changes predictable without hiding the core domain idea.",
    ];
  }

  if (section.id === "patterns") {
    return [
      `Use ${topic.title} only after you can name the variation point it is protecting.`,
      "Separate the stable part of the workflow from the part that changes across implementations.",
      "Prefer small interfaces and composition so the caller depends on behavior, not concrete classes.",
      "In an interview, explain the trade-off too: the pattern adds structure, so it should buy extensibility, testability, or simpler client code.",
    ];
  }

  return [
    `For ${topic.title}, first freeze the requirements, actors, and main workflows before drawing classes.`,
    "Convert nouns into candidate entities, verbs into services or behaviors, and repeated choices into strategies or factories.",
    "Keep repositories, services, models, and strategies separated so responsibilities stay readable.",
    "Once the happy path is clear, add edge cases such as concurrency, validation, cancellation, retries, or ranking rules.",
  ];
}

function renderLldNotesPopup(topicKey) {
  const match = findLldTopic(topicKey);
  if (!match || !studyModal || !studyModalContent) return;

  const { section, topic } = match;
  const notes = (topic.notes || [])
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");

  studyModalContent.innerHTML = `
    <header class="study-modal-head lld-note-modal-head">
      <p class="eyebrow">Your Notes / ${escapeHtml(section.title)}</p>
      <h2>${escapeHtml(topic.title)}</h2>
      <p>Original notes kept separately from the cleaned explanation.</p>
    </header>
    <section class="lld-note-modal">
      ${
        notes
          ? `<ul>${notes}</ul>`
          : `<p class="lld-empty">No personal notes are available for this topic yet.</p>`
      }
    </section>
  `;
  studyModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function isLldProblemSection(section) {
  return section?.id === "problems";
}

function getLldProblemRequirements(topic) {
  const requirementSections = (topic.textSections || []).filter((section) =>
    String(section.title || "").toLowerCase().includes("requirement")
  );
  const requirements = requirementSections.flatMap((section) => [
    ...(section.paragraphs || []),
    ...(section.items || []),
  ]);

  if (requirements.length) return requirements;
  if (topic.notes?.length) return topic.notes;
  return ["Define the core actors, main workflow, object responsibilities, and extension points before writing classes."];
}

function getLldSolutionTextSections(topic) {
  return (topic.textSections || []).filter(
    (section) => !String(section.title || "").toLowerCase().includes("requirement")
  );
}

function renderLldVideoActions(topicKey, topic) {
  const videos = getLldVideos(topicKey, topic);
  const useShortLabels = videos.length > 1;
  return videos
    .map(
      (video) => {
        const shortName = getVideoSourceShortName(video.source);
        return `
        <a class="lld-video-action" href="${escapeHtml(normalizeYoutubeVideoUrl(video.url))}" target="_blank" rel="noreferrer" ${useShortLabels ? `data-source-label="${escapeHtml(shortName)}"` : ""} title="${escapeHtml(useShortLabels ? shortName : video.source)}: ${escapeHtml(video.title)}" aria-label="Open ${escapeHtml(video.title)} from ${escapeHtml(video.source)}">
          <span aria-hidden="true">▶</span>
        </a>
      `;
      }
    )
    .join("");
}

function renderLldImageCards(topic) {
  return (topic.images || [])
    .map(
      (image) => `
        <button class="lld-image-card" type="button" data-open-diagram="${escapeHtml(image.src)}" data-title="${escapeHtml(`${topic.title} ${image.label}`)}">
          <img src="${escapeHtml(image.src)}" alt="${escapeHtml(`${topic.title} ${image.label}`)}" loading="lazy" />
          <span>${escapeHtml(image.label)}</span>
        </button>
      `
    )
    .join("");
}

function renderLldTextSections(topic, sections = topic.textSections || []) {
  return sections
    .map((section) => {
      const paragraphs = (section.paragraphs || [])
        .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
        .join("");
      const items = (section.items || [])
        .map((item) => `<li>${escapeHtml(item)}</li>`)
        .join("");
      return `
        <section class="lld-text-panel">
          <h3>${escapeHtml(section.title || "Notes")}</h3>
          ${paragraphs}
          ${items ? `<ul>${items}</ul>` : ""}
        </section>
      `;
    })
    .join("");
}

function renderLldCodeBlocks(topic) {
  return (topic.code || [])
    .map(
      (file) => `
        <article class="lld-code-card">
          <div class="lld-code-head">
            <span>${escapeHtml(file.label)}</span>
            <button class="code-theme-toggle" type="button" data-code-theme-toggle data-code-theme-current="${escapeHtml(activeTheme)}" aria-label="Switch code editor to ${getOppositeTheme(activeTheme)} mode">${renderCodeThemeIcon(activeTheme)}</button>
          </div>
          <pre><code>${escapeHtml(file.content)}</code></pre>
        </article>
      `
    )
    .join("");
}

function renderLldProblemQuestionPanel(topic) {
  const requirements = getLldProblemRequirements(topic)
    .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
    .join("");

  return `
    <section class="question-panel">
      <div class="panel-title">
        <h4>Problem</h4>
      </div>
      <div class="question-card">
        <h4>${escapeHtml(`Design ${topic.title}`)}</h4>
        <p>${escapeHtml(topic.description)}</p>
      </div>
      <div class="requirements-card">
        <div class="panel-title">
          <h4>Requirements</h4>
          <span>${getLldProblemRequirements(topic).length} points</span>
        </div>
        <ol class="requirement-list">${requirements}</ol>
      </div>
    </section>
  `;
}

function renderLldProblemSolutionPanel(topicKey, section, topic) {
  const thinking = getLldThinking(section, topic)
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");
  const images = renderLldImageCards(topic);
  const codeBlocks = renderLldCodeBlocks(topic);
  const solutionTextSections = renderLldTextSections(topic, getLldSolutionTextSections(topic));
  const videoActions = renderLldVideoActions(topicKey, topic);

  return `
    <section class="answer-panel">
      <div class="panel-title">
        <h4>Solution</h4>
      </div>
      <div class="solution-article">
        <div class="lld-panel-head">
          <div>
            <p class="eyebrow">Approach</p>
            <h3>How to think about it</h3>
          </div>
          <div class="lld-panel-actions">
            ${videoActions}
            <button class="lld-note-action" type="button" data-lld-note-popup="${escapeHtml(topicKey)}" aria-label="Open personal notes">
              <span aria-hidden="true">✎</span>
            </button>
          </div>
        </div>
        <ul class="lld-solution-list">${thinking}</ul>
      </div>
      ${solutionTextSections}
      <section class="lld-gallery-panel">
        <h3>Diagrams</h3>
        ${images ? `<div class="lld-image-grid">${images}</div>` : `<p class="lld-empty">No diagram added for this topic yet.</p>`}
      </section>
      <section class="lld-code-panel">
        <h3>Code</h3>
        ${codeBlocks ? `<div class="lld-code-stack">${codeBlocks}</div>` : `<p class="lld-empty">Code sample will be added for this topic later.</p>`}
      </section>
    </section>
  `;
}

function renderLldProblemCombinedPopup(topicKey) {
  const match = findLldTopic(topicKey);
  if (!match || !studyModal || !studyModalContent) return;

  const { section, topic } = match;
  const requirements = getLldProblemRequirements(topic)
    .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
    .join("");
  const thinking = getLldThinking(section, topic)
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");
  const images = renderLldImageCards(topic);
  const codeBlocks = renderLldCodeBlocks(topic);
  const solutionTextSections = renderLldTextSections(topic, getLldSolutionTextSections(topic));
  const videoActions = renderLldVideoActions(topicKey, topic);

  studyModalContent.innerHTML = `
    <header class="study-modal-head">
      <p class="eyebrow">Low-Level Design / Problem + Solution</p>
      <h2>${escapeHtml(`Design ${topic.title}`)}</h2>
      <p>${escapeHtml(topic.description)}</p>
    </header>

    <div class="study-modal-grid">
      <section>
        <div class="panel-title">
          <h4>Problem</h4>
          <span>${getLldProblemRequirements(topic).length} points</span>
        </div>
        <ol class="requirement-list modal-requirements">${requirements}</ol>
      </section>

      <section class="lld-modal-solution">
        <div class="solution-article">
          <div class="lld-panel-head">
            <div>
              <p class="eyebrow">Solution</p>
              <h3>How to think about it</h3>
            </div>
            <div class="lld-panel-actions">
              ${videoActions}
              <button class="lld-note-action" type="button" data-lld-note-popup="${escapeHtml(topicKey)}" aria-label="Open personal notes">
                <span aria-hidden="true">✎</span>
              </button>
            </div>
          </div>
          <ul class="lld-solution-list">${thinking}</ul>
        </div>
        ${solutionTextSections}
        <section class="lld-gallery-panel">
          <h3>Diagrams</h3>
          ${images ? `<div class="lld-image-grid">${images}</div>` : `<p class="lld-empty">No diagram added for this topic yet.</p>`}
        </section>
        <section class="lld-code-panel">
          <h3>Code</h3>
          ${codeBlocks ? `<div class="lld-code-stack">${codeBlocks}</div>` : `<p class="lld-empty">Code sample will be added for this topic later.</p>`}
        </section>
      </section>
    </div>
  `;
  studyModalContent.querySelectorAll("[data-open-diagram]").forEach((button) => {
    button.addEventListener("click", () => openDiagram(button.dataset.openDiagram, button.dataset.title));
  });
  studyModalContent.querySelectorAll("[data-lld-note-popup]").forEach((button) => {
    button.addEventListener("click", () => renderLldNotesPopup(button.dataset.lldNotePopup));
  });
  studyModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function openDiagram(src, title = "Study diagram") {
  if (!lightbox || !lightboxImage) return;
  lightboxImage.src = src;
  lightboxImage.alt = `${title} study diagram`;
  lightbox.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeDiagram() {
  if (!lightbox || !lightboxImage) return;
  lightbox.hidden = true;
  lightboxImage.src = "";
  if (!studyModal || studyModal.hidden) {
    document.body.style.overflow = "";
  }
}

function readProgress() {
  try {
    return JSON.parse(localStorage.getItem(progressKey) || "{}");
  } catch {
    return {};
  }
}

function writeProgress(progress) {
  localStorage.setItem(progressKey, JSON.stringify(progress));
}

function topicKey(course, id) {
  return `${course}:${id}`;
}

function isTopicDone(course, id) {
  return Boolean(readProgress()[topicKey(course, id)]);
}

function setTopicDone(course, id, done) {
  const progress = readProgress();
  const key = topicKey(course, id);
  if (done) {
    progress[key] = true;
  } else {
    delete progress[key];
  }
  writeProgress(progress);
  renderProgress();
  renderTopicLists();
  renderCaseList();
  renderCaseDetail();
  if (course === "lld") {
    renderLld();
  }
  if (course === "springboot") {
    renderSpringBoot();
  }
  if (course === "hld") {
    renderHldCheatSheet();
  }
}

function getCourseTopicIds(course) {
  if (course === "db-design") return cases.map((item) => item.id);
  if (course === "springboot") return getAllSpringTopicKeys();
  if (course === "lld") return getAllLldTopicKeys();
  if (course === "hld") return hldCheatSheetPages.map((item) => item.id);
  return (courseTopics[course] || []).map(([id]) => id);
}

function getCourseStats(course) {
  const ids = getCourseTopicIds(course);
  const done = ids.filter((id) => isTopicDone(course, id)).length;
  return {
    done,
    total: ids.length,
    percent: ids.length ? Math.round((done / ids.length) * 100) : 0,
  };
}

function renderProgress() {
  courseButtons.forEach((button) => {
    const course = button.dataset.course;
    const stats = getCourseStats(course);
    button.setAttribute("aria-label", `${button.textContent.trim()}, ${stats.done}/${stats.total} done`);
  });

  progressRows.forEach((row) => {
    const course = row.dataset.progressCourse;
    const stats = getCourseStats(course);
    const label = row.querySelector("span");
    const bar = row.querySelector("i");
    if (label) label.textContent = `${stats.done}/${stats.total} done`;
    if (bar) bar.style.setProperty("--progress", `${stats.percent}%`);
    row.setAttribute("aria-label", `Open ${row.querySelector("strong")?.textContent?.trim() || course}, ${stats.done}/${stats.total} done`);
  });
}

function renderTopicLists() {
  topicLists.forEach((list) => {
    const course = list.dataset.topicList;
    const topics = courseTopics[course] || [];
    list.classList.add("topic-list");
    list.innerHTML = topics
      .map(([id, title, description]) => {
        const done = isTopicDone(course, id);
        return `
          <article class="topic-item ${done ? "is-done" : ""}">
            <button class="progress-radio" type="button" data-topic-check="${escapeHtml(id)}" data-topic-course="${escapeHtml(course)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
            <div>
              <h3>${escapeHtml(title)}</h3>
              <p>${escapeHtml(description)}</p>
            </div>
          </article>
        `;
      })
      .join("");
  });

  document.querySelectorAll("[data-topic-check]").forEach((button) => {
    button.addEventListener("click", () => {
      const course = button.dataset.topicCourse;
      const id = button.dataset.topicCheck;
      setTopicDone(course, id, !isTopicDone(course, id));
    });
  });
}

function caseSearchText(item) {
  return [
    item.title,
    item.difficulty,
    item.focus,
    item.prompt,
    ...(item.requirements || []),
    ...(item.article || []),
    item.reference || "",
  ]
    .join(" ")
    .toLowerCase();
}

function getFilteredCases() {
  const query = searchEl?.value.trim().toLowerCase() || "";
  if (!query) return cases;
  return cases.filter((item) => caseSearchText(item).includes(query));
}

function renderCaseList() {
  const filtered = getFilteredCases();

  if (!filtered.length) {
    listEl.innerHTML = `<div class="empty-state">No matching DB Design case found.</div>`;
    return;
  }

  listEl.innerHTML = filtered
    .map(
      (item) => {
        const done = isTopicDone("db-design", item.id);
        return `
        <article class="case-button ${item.id === activeId ? "is-active" : ""} ${done ? "is-done" : ""}" role="button" tabindex="0" data-case-id="${item.id}">
          <strong>${String(item.number).padStart(2, "0")}</strong>
          <span>
            <span class="case-title">${escapeHtml(item.title)}</span>
            <span class="case-meta">${escapeHtml(item.difficulty)}</span>
          </span>
          <button class="progress-radio case-check" type="button" data-db-case-check="${item.id}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
        </article>
      `;
      }
    )
    .join("");

  listEl.querySelectorAll("[data-case-id]").forEach((card) => {
    card.addEventListener("click", () => {
      activeId = card.dataset.caseId;
      render();
    });
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        activeId = card.dataset.caseId;
        render();
      }
    });
  });

  listEl.querySelectorAll("[data-db-case-check]").forEach((button) => {
    button.addEventListener("click", (event) => {
      event.stopPropagation();
      const id = button.dataset.dbCaseCheck;
      setTopicDone("db-design", id, !isTopicDone("db-design", id));
    });
  });
}

function renderCaseDetail() {
  const dbWorkspace = document.querySelector("[data-db-workspace]");
  const hasSelection = Boolean(activeId);
  dbWorkspace?.classList.toggle("has-selection", hasSelection);
  dbWorkspace?.classList.toggle("is-menu-only", !hasSelection);

  if (!hasSelection) {
    detailEl.hidden = true;
    detailEl.innerHTML = "";
    if (dbViewSwitch) {
      dbViewSwitch.hidden = true;
    }
    modeButtons.forEach((button) => {
      button.hidden = true;
    });
    if (combinedPopupButton) {
      combinedPopupButton.hidden = true;
    }
    return;
  }

  if (dbViewSwitch) {
    dbViewSwitch.hidden = false;
  }
  modeButtons.forEach((button) => {
    button.hidden = false;
  });
  if (combinedPopupButton) {
    combinedPopupButton.hidden = false;
  }
  detailEl.hidden = false;

  const item = cases.find((caseItem) => caseItem.id === activeId) || cases[0];

  if (!item) {
    detailEl.innerHTML = `<div class="empty-state">No DB Design material available yet.</div>`;
    return;
  }

  detailEl.dataset.mode = viewMode;
  const requirements = (item.requirements || [])
    .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
    .join("");
  const article = (item.article || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const approaches = item.answerApproaches || [
    {
      label: item.number === 15 ? "Approach 2" : "Solution",
      title: item.number === 15 ? "Improved database design" : "Database design diagram",
      description: "The diagram opens in a focused popup so the question screen stays clean while studying.",
      image: item.answerImage,
    },
  ];
  const answerCards = approaches
    .map(
      (approach) => `
        <button class="answer-diagram-card" type="button" data-open-diagram="${escapeHtml(approach.image)}" data-title="${escapeHtml(approach.title)}">
          <img src="${escapeHtml(approach.image)}" alt="${escapeHtml(approach.title)}" loading="lazy" />
          <div>
            <p class="eyebrow">${escapeHtml(approach.label)}</p>
            <h4>${escapeHtml(approach.title)}</h4>
            <p>${escapeHtml(approach.description)}</p>
          </div>
        </button>
      `
    )
    .join("");
  const reference = item.reference
    ? `
      <details class="reference-block">
        <summary>${escapeHtml(item.referenceTitle || "Reference material")}</summary>
        <pre>${escapeHtml(item.reference)}</pre>
      </details>
    `
    : "";
  const videoAction = item.video
    ? `
      <a class="db-video-action" href="${escapeHtml(normalizeYoutubeVideoUrl(item.video.url))}" target="_blank" rel="noreferrer" title="CC: ${escapeHtml(item.video.title)}" aria-label="Open ${escapeHtml(item.video.title)} video">
        <span aria-hidden="true">▶</span>
      </a>
    `
    : "";

  detailEl.innerHTML = `
    <header class="case-header">
      <div class="case-header-row">
        <div>
          <p class="eyebrow">Case ${String(item.number).padStart(2, "0")}</p>
          <h3>${escapeHtml(item.title)}</h3>
        </div>
      </div>
      <p class="focus-note">${escapeHtml(item.focus)}</p>
      <div class="db-case-actions">
        ${videoAction}
        <button class="progress-radio detail-check" type="button" data-detail-case-check="${item.id}" aria-label="${isTopicDone("db-design", item.id) ? "Mark incomplete" : "Mark complete"}" aria-pressed="${isTopicDone("db-design", item.id)}"></button>
      </div>
    </header>

    <div class="case-body">
      <section class="question-panel">
        <div class="panel-title">
          <h4>Problem</h4>
        </div>
        <div class="question-card">
          <h4>${escapeHtml(item.prompt || `Design ${item.title}`)}</h4>
          <p>${escapeHtml(item.focus)}</p>
        </div>
        <div class="requirements-card">
          <div class="panel-title">
            <h4>Requirements</h4>
            <span>${item.requirements?.length || 0} points</span>
          </div>
          <ol class="requirement-list">${requirements}</ol>
        </div>
        ${reference}
      </section>

      <section class="answer-panel">
        <div class="panel-title">
          <h4>Solution</h4>
        </div>
        <div class="solution-article">
          <p class="eyebrow">${escapeHtml(item.articleTitle || "Explanation")}</p>
          ${article}
        </div>
        ${answerCards}
      </section>
    </div>
  `;

  detailEl.querySelectorAll("[data-open-diagram]").forEach((button) => {
    button.addEventListener("click", () => openDiagram(button.dataset.openDiagram, button.dataset.title));
  });

  detailEl.querySelector("[data-detail-case-check]")?.addEventListener("click", (event) => {
    const id = event.currentTarget.dataset.detailCaseCheck;
    setTopicDone("db-design", id, !isTopicDone("db-design", id));
  });
}

function renderCombinedPopup() {
  if (!activeId) return;
  const item = cases.find((caseItem) => caseItem.id === activeId) || cases[0];
  if (!item || !studyModal || !studyModalContent) return;

  const requirements = (item.requirements || [])
    .map((requirement) => `<li>${escapeHtml(requirement)}</li>`)
    .join("");
  const article = (item.article || [])
    .map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`)
    .join("");
  const approaches = item.answerApproaches || [
    {
      label: item.number === 15 ? "Approach 2" : "Solution",
      title: item.number === 15 ? "Improved design" : "Database design diagram",
      description: "Open the diagram in a focused popup for a larger view.",
      image: item.answerImage,
    },
  ];
  const modalDiagrams = approaches
    .map(
      (approach) => `
        <article class="approach-block">
          <div class="panel-title">
            <h4>${escapeHtml(approach.label)}${approach.title ? `: ${escapeHtml(approach.title)}` : ""}</h4>
          </div>
          ${approach.description ? `<p>${escapeHtml(approach.description)}</p>` : ""}
          <div class="answer-popup-card modal-answer-card">
            <div>
              <p class="eyebrow">Diagram</p>
              <h4>${escapeHtml(approach.title || "Database design diagram")}</h4>
              <p>Open this diagram in a dedicated popup with its own close button.</p>
            </div>
            <button type="button" data-open-diagram="${escapeHtml(approach.image)}" data-title="${escapeHtml(approach.title || approach.label)}">View diagram</button>
          </div>
        </article>
      `
    )
    .join("");
  const reference = item.reference
    ? `
      <details class="reference-block modal-reference">
        <summary>${escapeHtml(item.referenceTitle || "Reference material")}</summary>
        <pre>${escapeHtml(item.reference)}</pre>
      </details>
    `
    : "";

  studyModalContent.innerHTML = `
    <header class="study-modal-head">
      <p class="eyebrow">Case ${String(item.number).padStart(2, "0")} / Problem + Solution</p>
      <h2>${escapeHtml(item.prompt || `Design ${item.title}`)}</h2>
      <p>${escapeHtml(item.focus)}</p>
    </header>

    <div class="study-modal-grid">
      <section>
        <div class="panel-title">
          <h4>Requirements</h4>
          <span>${item.requirements?.length || 0} points</span>
        </div>
        <ol class="requirement-list modal-requirements">${requirements}</ol>
        ${reference}
      </section>

      <section>
        <div class="solution-article">
          <p class="eyebrow">${escapeHtml(item.articleTitle || "Explanation")}</p>
          ${article}
        </div>
        ${modalDiagrams}
      </section>
    </div>
  `;
  studyModalContent.querySelectorAll("[data-open-diagram]").forEach((button) => {
    button.addEventListener("click", () => openDiagram(button.dataset.openDiagram, button.dataset.title));
  });
  studyModal.hidden = false;
  document.body.style.overflow = "hidden";
}

function renderSpringTabs(activeSectionId = "") {
  return `
    <div class="spring-section-tabs" aria-label="Spring Boot modules">
      ${getSpringSections()
        .map(
          (section) => `
            <button class="${section.id === activeSectionId ? "is-active" : ""}" type="button" data-spring-section="${escapeHtml(section.id)}">
              ${escapeHtml(section.title)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function renderSpringHome() {
  const sections = getSpringSections();
  springRoot.innerHTML = `
    ${renderBackButton("data-study-home-link")}
    <div class="spring-topbar subject-home-head">
      <div>
        <p class="eyebrow">Spring Boot</p>
        <h2>Build backend systems from first controller to production patterns.</h2>
      </div>
      <div class="subject-home-copy">
        <p>
          A focused path from Spring Boot fundamentals into REST APIs, persistence,
          MVC screens, security, advanced mappings, AOP, microservice notes, and testing.
        </p>
      </div>
    </div>
    ${renderSpringTabs("")}
    <div class="spring-section-grid">
      ${sections
        .map((section) => {
          const total = section.topics?.length || 0;
          const done = (section.topics || []).filter((topic) =>
            isTopicDone("springboot", getSpringTopicKey(section.id, topic.id))
          ).length;
          return `
            <button class="spring-track-card" type="button" data-spring-section="${escapeHtml(section.id)}">
              <span class="spring-track-meta">${done}/${total} done</span>
              <strong>${escapeHtml(section.title)}</strong>
              <p>${escapeHtml(section.description)}</p>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderSpringSection(sectionId) {
  const section = findSpringSection(sectionId) || getSpringSections()[0];
  if (!section) {
    renderSpringHome();
    return;
  }

  activeSpringSection = section.id;
  activeSpringTopic = "";
  springRoot.innerHTML = `
    ${renderBackButton("data-spring-home")}
    <div class="spring-topbar">
      <div>
        <p class="eyebrow">Spring Boot / ${escapeHtml(section.title)}</p>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.description)}</p>
      </div>
    </div>
    ${renderSpringTabs(section.id)}
    <div class="spring-topic-grid">
      ${(section.topics || [])
        .map((topic) => {
          const key = getSpringTopicKey(section.id, topic.id);
          const done = isTopicDone("springboot", key);
          return `
            <article class="spring-topic-card ${done ? "is-done" : ""}" role="button" tabindex="0" data-spring-topic="${escapeHtml(key)}">
              <button class="progress-radio spring-check" type="button" data-spring-topic-check="${escapeHtml(key)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
              <span class="spring-topic-meta">${escapeHtml(topic.source || "Spring Boot notes")}</span>
              <strong>${escapeHtml(topic.title)}</strong>
              <p>${escapeHtml(topic.description)}</p>
            </article>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderSpringTopic(topicKey) {
  const match = findSpringTopic(topicKey);
  if (!match) {
    renderSpringSection(activeSpringSection === "home" ? getSpringSections()[0]?.id : activeSpringSection);
    return;
  }

  const { section, topic } = match;
  const done = isTopicDone("springboot", topicKey);
  const summary = (topic.summary || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const article = (topic.article || []).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  const slideConcepts = (topic.slideConcepts || [])
    .map((concept) => `<span>${escapeHtml(concept)}</span>`)
    .join("");
  const visuals = (topic.visuals || [])
    .map(
      (visual) => `
        <article class="spring-visual-card">
          <div>
            <p class="eyebrow">Slide visual</p>
            <h4>${escapeHtml(visual.title)}</h4>
            <p>${escapeHtml(visual.caption)}</p>
          </div>
          <button class="spring-slide-card" type="button" data-open-diagram="${escapeHtml(visual.image)}" data-title="${escapeHtml(visual.title)}">
            <img src="${escapeHtml(visual.image)}" alt="${escapeHtml(visual.title)}" loading="lazy" />
          </button>
        </article>
      `
    )
    .join("");
  const keyPoints = (topic.keyPoints || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const flow = (topic.flow || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("");
  const codeBlocks = (topic.code || [])
    .map(
      (file) => `
        <article class="lld-code-card spring-code-card">
          <div class="lld-code-head">
            <span>${escapeHtml(file.label)}</span>
            <button class="code-theme-toggle" type="button" data-code-theme-toggle data-code-theme-current="${escapeHtml(activeTheme)}" aria-label="Switch code editor to ${getOppositeTheme(activeTheme)} mode">${renderCodeThemeIcon(activeTheme)}</button>
          </div>
          <pre><code>${escapeHtml(file.content)}</code></pre>
        </article>
      `
    )
    .join("");

  activeSpringSection = section.id;
  activeSpringTopic = topicKey;
  springRoot.innerHTML = `
    ${renderBackButton(`data-spring-section="${escapeHtml(section.id)}"`)}
    <div class="spring-topbar">
      <div>
        <p class="eyebrow">Spring Boot / ${escapeHtml(section.title)}</p>
        <h2>${escapeHtml(topic.title)}</h2>
        <p>${escapeHtml(topic.description)}</p>
      </div>
      <div class="spring-top-actions">
        <button class="progress-radio spring-check" type="button" data-spring-topic-check="${escapeHtml(topicKey)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
      </div>
    </div>
    ${renderSpringTabs(section.id)}
    <div class="spring-detail-grid">
      <section class="spring-note-panel">
        <div class="spring-panel-head">
          <h3>Core idea</h3>
          <span>${escapeHtml(topic.source || "Spring Boot course")}</span>
        </div>
        <div class="spring-summary">${summary}</div>
      </section>
      ${
        article
          ? `
            <section class="spring-article-panel">
              <div class="spring-panel-head">
                <h3>${escapeHtml(topic.articleTitle || "Article")}</h3>
              </div>
              <div class="spring-summary">${article}</div>
              ${slideConcepts ? `<div class="spring-chip-row">${slideConcepts}</div>` : ""}
            </section>
          `
          : ""
      }
      ${
        visuals
          ? `<section class="spring-visual-panel"><h3>How the pieces connect</h3>${visuals}</section>`
          : ""
      }
      <section class="spring-text-panel">
        <h3>What to remember</h3>
        <ul>${keyPoints}</ul>
      </section>
      <section class="spring-text-panel">
        <h3>How to build it</h3>
        <ol>${flow}</ol>
      </section>
      ${
        codeBlocks
          ? `<section class="spring-code-panel"><h3>Demo code</h3><div class="lld-code-stack">${codeBlocks}</div></section>`
          : ""
      }
    </div>
  `;
}

function renderSpringBoot() {
  if (!springRoot) return;
  if (!getSpringSections().length) {
    springRoot.innerHTML = `<div class="empty-state">No Spring Boot material available yet.</div>`;
    return;
  }
  if (activeSpringTopic) {
    renderSpringTopic(activeSpringTopic);
  } else if (activeSpringSection !== "home") {
    renderSpringSection(activeSpringSection);
  } else {
    renderSpringHome();
  }
}

function renderLldTabs(activeSectionId = "") {
  const sections = getLldSections();
  return `
    <div class="lld-section-tabs" aria-label="LLD sections">
      ${sections
        .map(
          (section) => `
            <button class="${section.id === activeSectionId ? "is-active" : ""}" type="button" data-lld-section="${escapeHtml(section.id)}">
              ${escapeHtml(section.title)}
            </button>
          `
        )
        .join("")}
    </div>
  `;
}

function getLldSearchResults(query = lldSearchQuery, sectionId = "") {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  return getLldSections().flatMap((section) => {
    if (sectionId && section.id !== sectionId) return [];
    return (section.topics || [])
      .filter((topic) =>
        [
          section.title,
          section.description,
          topic.title,
          topic.description,
          ...(topic.notes || []),
          ...(topic.textSections || []).flatMap((section) => [
            section.title,
            ...(section.items || []),
            ...(section.paragraphs || []),
          ]),
          ...(topic.code || []).map((file) => `${file.label} ${file.content}`),
          ...getLldVideos(getLldTopicKey(section.id, topic.id), topic).map(
            (video) => `${video.source} ${video.title} ${video.url}`
          ),
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized)
      )
      .map((topic) => ({ section, topic, key: getLldTopicKey(section.id, topic.id) }));
  });
}

function renderLldSearch(sectionId = "") {
  return `
    <label class="lld-search-box">
      <input type="search" placeholder="Search topics in this section..." value="${escapeHtml(lldSearchQuery)}" data-lld-search="${escapeHtml(sectionId)}" />
    </label>
  `;
}

function renderLldHome() {
  const sections = getLldSections();
  lldRoot.innerHTML = `
    ${renderBackButton("data-study-home-link")}
    <div class="lld-topbar subject-home-head">
      <div>
        <p class="eyebrow">Low-Level Design</p>
        <h2>Build object models that survive real requirements.</h2>
      </div>
      <div class="subject-home-copy">
        <p>
          Start with object-oriented basics, move through reusable design patterns,
          then practice interview-style machine coding problems with diagrams
          and Java implementations.
        </p>
      </div>
    </div>
    ${renderLldTabs("")}
    <div class="lld-section-grid">
      ${sections
        .map((section) => {
          const total = section.topics?.length || 0;
          const done = (section.topics || []).filter((topic) =>
            isTopicDone("lld", getLldTopicKey(section.id, topic.id))
          ).length;
          return `
            <button class="lld-track-card" type="button" data-lld-section="${escapeHtml(section.id)}">
              <span class="lld-track-meta">${done}/${total} done</span>
              <strong>${escapeHtml(section.title)}</strong>
              <p>${escapeHtml(section.description)}</p>
            </button>
          `;
        })
        .join("")}
    </div>
  `;
}

function renderLldSection(sectionId) {
  const section = findLldSection(sectionId) || getLldSections()[0];
  if (!section) {
    renderLldHome();
    return;
  }

  activeLldSection = section.id;
  activeLldTopic = "";
  lldRoot.innerHTML = `
    ${renderBackButton("data-lld-home")}
    <div class="lld-topbar">
      <div>
        <p class="eyebrow">Low-Level Design / ${escapeHtml(section.title)}</p>
        <h2>${escapeHtml(section.title)}</h2>
        <p>${escapeHtml(section.description)}</p>
      </div>
    </div>
    ${renderLldTabs(section.id)}
    ${renderLldSearch(section.id)}
    <div class="lld-topic-grid">
      ${
        (!lldSearchQuery.trim()
          ? section.topics || []
          : getLldSearchResults(lldSearchQuery, section.id).map((result) => result.topic)
        )
          .map((topic) => {
          const key = getLldTopicKey(section.id, topic.id);
          const done = isTopicDone("lld", key);
          return `
            <article class="lld-topic-card ${done ? "is-done" : ""}" role="button" tabindex="0" data-lld-topic="${escapeHtml(key)}">
              <button class="progress-radio lld-check" type="button" data-lld-topic-check="${escapeHtml(key)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
              <span class="lld-topic-meta">${escapeHtml(topic.images?.length || 0)} visuals / ${escapeHtml(topic.code?.length || 0)} code</span>
              <strong>${escapeHtml(topic.title)}</strong>
              <p>${escapeHtml(topic.description)}</p>
            </article>
          `;
        })
        .join("") || `<p class="lld-empty">No topic matched this search in ${escapeHtml(section.title)}.</p>`
      }
    </div>
  `;
}

function renderLldTopic(topicKey) {
  const match = findLldTopic(topicKey);
  if (!match) {
    renderLldSection(activeLldSection === "home" ? getLldSections()[0]?.id : activeLldSection);
    return;
  }

  const { section, topic } = match;
  const done = isTopicDone("lld", topicKey);
  activeLldSection = section.id;
  activeLldTopic = topicKey;

  if (isLldProblemSection(section)) {
    lldRoot.innerHTML = `
      ${renderBackButton(`data-lld-section="${escapeHtml(section.id)}"`)}
      <div class="lld-topbar">
        <div>
          <p class="eyebrow">Low-Level Design / ${escapeHtml(section.title)}</p>
          <h2>${escapeHtml(topic.title)}</h2>
          <p>${escapeHtml(topic.description)}</p>
        </div>
        <div class="lld-top-actions">
          <button class="progress-radio lld-check" type="button" data-lld-topic-check="${escapeHtml(topicKey)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
        </div>
      </div>
      ${renderLldTabs(section.id)}
      <div class="lld-problem-tools">
        <div class="view-switch" aria-label="LLD problem view">
          <button class="${lldProblemViewMode === "problem" ? "is-active" : ""}" type="button" data-lld-problem-mode="problem">Problem</button>
          <button class="${lldProblemViewMode === "solution" ? "is-active" : ""}" type="button" data-lld-problem-mode="solution">Solution</button>
          <button type="button" data-lld-combined-popup="${escapeHtml(topicKey)}">Problem + Solution</button>
        </div>
      </div>
      <div class="case-detail lld-problem-detail" data-mode="${escapeHtml(lldProblemViewMode)}">
        <div class="case-body">
          ${renderLldProblemQuestionPanel(topic)}
          ${renderLldProblemSolutionPanel(topicKey, section, topic)}
        </div>
      </div>
    `;
    return;
  }

  const thinking = getLldThinking(section, topic)
    .map((note) => `<li>${escapeHtml(note)}</li>`)
    .join("");
  const images = renderLldImageCards(topic);
  const textSections = renderLldTextSections(topic);
  const codeBlocks = renderLldCodeBlocks(topic);
  const videoActions = renderLldVideoActions(topicKey, topic);
  lldRoot.innerHTML = `
    ${renderBackButton(`data-lld-section="${escapeHtml(section.id)}"`)}
    <div class="lld-topbar">
      <div>
        <p class="eyebrow">Low-Level Design / ${escapeHtml(section.title)}</p>
        <h2>${escapeHtml(topic.title)}</h2>
        <p>${escapeHtml(topic.description)}</p>
      </div>
      <div class="lld-top-actions">
        <button class="progress-radio lld-check" type="button" data-lld-topic-check="${escapeHtml(topicKey)}" aria-label="${done ? "Mark incomplete" : "Mark complete"}" aria-pressed="${done}"></button>
      </div>
    </div>
    ${renderLldTabs(section.id)}
    <div class="lld-detail-grid">
      <section class="lld-note-panel">
        <div class="lld-panel-head">
          <h3>How to think about it</h3>
          <div class="lld-panel-actions">
            ${videoActions}
            <button class="lld-note-action" type="button" data-lld-note-popup="${escapeHtml(topicKey)}" aria-label="Open personal notes">
              <span aria-hidden="true">✎</span>
            </button>
          </div>
        </div>
        <ul>${thinking}</ul>
      </section>
      ${textSections}
      <section class="lld-gallery-panel">
        <h3>Diagrams</h3>
        ${images ? `<div class="lld-image-grid">${images}</div>` : `<p class="lld-empty">No diagram added for this topic yet.</p>`}
      </section>
      <section class="lld-code-panel">
        <h3>Code</h3>
        ${codeBlocks ? `<div class="lld-code-stack">${codeBlocks}</div>` : `<p class="lld-empty">Code sample will be added for this topic later.</p>`}
      </section>
    </div>
  `;
}

function renderLld() {
  if (!lldRoot) return;
  if (!getLldSections().length) {
    lldRoot.innerHTML = `<div class="empty-state">No LLD material available yet.</div>`;
    return;
  }
  if (activeLldTopic) {
    renderLldTopic(activeLldTopic);
  } else if (activeLldSection !== "home") {
    renderLldSection(activeLldSection);
  } else {
    renderLldHome();
  }
}

function renderHldCheatSheet() {
  if (!hldRoot) return;
  const total = hldCheatSheetPages.length;
  const done = hldCheatSheetPages.filter((page) => isTopicDone("hld", page.id)).length;
  const hldTracks = [
    {
      id: "cheatsheet",
      title: "Cheat Sheet",
      description: "Fast revision for scalability, availability, caching, messaging, sharding, and distributed-system tradeoffs.",
      done,
      total,
    },
    {
      id: "concepts",
      title: "Concepts",
      description: "A focused HLD concept path for turning architecture fundamentals into clear design decisions.",
      done: 0,
      total: 0,
    },
    {
      id: "problems",
      title: "Problems",
      description: "System design practice cases with structured approaches, tradeoffs, and design reasoning.",
      done: 0,
      total: 0,
    },
  ];
  const activeHldTrack = hldTracks.find((track) => track.id === activeHldSection);
  const hldHeaderTitle =
    activeHldSection === "home" ? "Design systems that scale with clarity." : activeHldTrack?.title || "High-Level Design";
  const hldHeaderDescription =
    activeHldSection === "home"
      ? "Revise the building blocks of scalable architecture, from load balancing and caching to consistency, messaging, sharding, and distributed-system tradeoffs."
      : activeHldTrack?.description || "";
  const hldEyebrow = activeHldSection === "home" ? "High-Level Design" : `High-Level Design / ${activeHldTrack?.title || ""}`;
  const normalizedHldSearch = hldSearchQuery.trim().toLowerCase();
  const hldCheatSheetMatches = hldCheatSheetPages
    .map((page, index) => ({ page, index }))
    .filter(({ page }) => {
      if (!normalizedHldSearch) return true;
      const sectionText = (page.sections || [])
        .flatMap((section) => [section.title, ...(section.items || [])])
        .join(" ");
      return [page.title, page.intro, page.realWorld, page.interviewTip, sectionText]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(normalizedHldSearch);
    });
  hldRoot.innerHTML = `
    ${renderBackButton(activeHldSection === "home" ? "data-study-home-link" : "data-hld-section=\"home\"")}
    <div class="hld-topbar subject-home-head">
      <div>
        <p class="eyebrow">${escapeHtml(hldEyebrow)}</p>
        <h2>${escapeHtml(hldHeaderTitle)}</h2>
      </div>
      <div class="subject-home-copy">
        <p>${escapeHtml(hldHeaderDescription)}</p>
      </div>
    </div>

    <nav class="hld-section-tabs" aria-label="HLD sections">
      <button class="${activeHldSection === "cheatsheet" ? "is-active" : ""}" type="button" data-hld-section="cheatsheet">
        Cheat Sheet
      </button>
      <button class="${activeHldSection === "concepts" ? "is-active" : ""}" type="button" data-hld-section="concepts">
        Concepts
      </button>
      <button class="${activeHldSection === "problems" ? "is-active" : ""}" type="button" data-hld-section="problems">
        Problems
      </button>
    </nav>

    ${
      activeHldSection === "home"
        ? `
          <div class="hld-section-grid">
            ${hldTracks
              .map(
                (track) => `
                  <button class="hld-track-card" type="button" data-hld-section="${escapeHtml(track.id)}">
                    <span class="hld-track-meta">${track.total ? `${track.done}/${track.total} done` : "Coming soon"}</span>
                    <strong>${escapeHtml(track.title)}</strong>
                    <p>${escapeHtml(track.description)}</p>
                  </button>
                `
              )
              .join("")}
          </div>
        `
        : activeHldSection === "cheatsheet"
        ? `
          <div class="hld-subtopic-head">
            <div>
              <p class="eyebrow">Progress</p>
              <h3>System design fundamentals.</h3>
            </div>
            <div class="hld-progress-pill">${done}/${total} done</div>
          </div>

          <label class="hld-search-box">
            <input type="search" placeholder="Search ${total} cheat sheet topics..." value="${escapeHtml(hldSearchQuery)}" data-hld-search />
          </label>

          <div class="hld-page-stack">
            ${hldCheatSheetMatches.length
              ? hldCheatSheetMatches
              .map(({ page, index }) => {
                const pageDone = isTopicDone("hld", page.id);
                const sections = (page.sections || [])
                  .map(
                    (section) => `
                      <section class="hld-content-section">
                        <h4>${escapeHtml(section.title)}</h4>
                        <ul>
                          ${(section.items || []).map((item) => `<li>${escapeHtml(item)}</li>`).join("")}
                        </ul>
                      </section>
                    `
                  )
                  .join("");
                const diagram = page.diagram
                  ? `
                    <button class="hld-diagram-card" type="button" data-open-diagram="${escapeHtml(page.diagram)}" data-title="${escapeHtml(`${page.title} diagram`)}">
                      <img src="${escapeHtml(page.diagram)}" alt="${escapeHtml(`${page.title} diagram`)}" loading="lazy" />
                    </button>
                  `
                  : "";
                return `
                  <details class="hld-sheet-page ${pageDone ? "is-done" : ""}" id="${escapeHtml(page.id)}">
                    <summary>
                      <div>
                        <p class="eyebrow">Cheat Sheet ${String(index + 1).padStart(2, "0")}</p>
                        <h3>${escapeHtml(page.title)}</h3>
                      </div>
                      <span class="hld-collapse-cue" aria-hidden="true"></span>
                      <button class="progress-radio hld-check" type="button" data-hld-topic-check="${escapeHtml(page.id)}" aria-label="${pageDone ? "Mark incomplete" : "Mark complete"}" aria-pressed="${pageDone}"></button>
                    </summary>
                    <div class="hld-card-body ${diagram ? "has-diagram" : ""}">
                      <div class="hld-text-content">
                        <p class="hld-intro">${escapeHtml(page.intro)}</p>
                        ${sections}
                        <div class="hld-callouts">
                          <div>
                            <span>Real world</span>
                            <p>${escapeHtml(page.realWorld)}</p>
                          </div>
                          <div>
                            <span>Interview tip</span>
                            <p>${escapeHtml(page.interviewTip)}</p>
                          </div>
                        </div>
                      </div>
                      ${diagram}
                    </div>
                  </details>
                `;
              })
              .join("")
              : `<p class="hld-empty">No cheat sheet topic matched this search.</p>`}
          </div>
        `
        : `
          <section class="hld-coming-soon">
            <span class="hld-coming-icon" aria-hidden="true">↗</span>
            <div>
              <p class="eyebrow">${activeHldSection === "concepts" ? "Concepts" : "Problems"}</p>
              <h3>${activeHldSection === "concepts" ? "Concepts track is coming next." : "Problem practice is coming next."}</h3>
              <p>
                ${activeHldSection === "concepts"
                  ? "This section will organize the core HLD ideas into a focused learning path."
                  : "This section will collect system design problems with structured approaches and tradeoffs."}
              </p>
            </div>
          </section>
        `
    }
  `;
}

springRoot?.addEventListener("click", (event) => {
  const checkButton = event.target.closest("[data-spring-topic-check]");
  if (checkButton) {
    event.stopPropagation();
    const key = checkButton.dataset.springTopicCheck;
    setTopicDone("springboot", key, !isTopicDone("springboot", key));
    return;
  }

  const diagramButton = event.target.closest("[data-open-diagram]");
  if (diagramButton) {
    openDiagram(diagramButton.dataset.openDiagram, diagramButton.dataset.title);
    return;
  }

  const topicCard = event.target.closest("[data-spring-topic]");
  if (topicCard) {
    activeSpringTopic = topicCard.dataset.springTopic;
    renderSpringTopic(activeSpringTopic);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const sectionButton = event.target.closest("[data-spring-section]");
  if (sectionButton) {
    activeSpringSection = sectionButton.dataset.springSection;
    activeSpringTopic = "";
    renderSpringSection(activeSpringSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (event.target.closest("[data-spring-home]")) {
    activeSpringSection = "home";
    activeSpringTopic = "";
    renderSpringHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

springRoot?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const topicCard = event.target.closest("[data-spring-topic]");
  if (!topicCard) return;
  event.preventDefault();
  activeSpringTopic = topicCard.dataset.springTopic;
  renderSpringTopic(activeSpringTopic);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

lldRoot?.addEventListener("click", (event) => {
  const checkButton = event.target.closest("[data-lld-topic-check]");
  if (checkButton) {
    event.stopPropagation();
    const key = checkButton.dataset.lldTopicCheck;
    setTopicDone("lld", key, !isTopicDone("lld", key));
    return;
  }

  const diagramButton = event.target.closest("[data-open-diagram]");
  if (diagramButton) {
    openDiagram(diagramButton.dataset.openDiagram, diagramButton.dataset.title);
    return;
  }

  const noteButton = event.target.closest("[data-lld-note-popup]");
  if (noteButton) {
    renderLldNotesPopup(noteButton.dataset.lldNotePopup);
    return;
  }

  const problemModeButton = event.target.closest("[data-lld-problem-mode]");
  if (problemModeButton) {
    lldProblemViewMode = problemModeButton.dataset.lldProblemMode === "solution" ? "solution" : "problem";
    renderLldTopic(activeLldTopic);
    return;
  }

  const combinedProblemButton = event.target.closest("[data-lld-combined-popup]");
  if (combinedProblemButton) {
    renderLldProblemCombinedPopup(combinedProblemButton.dataset.lldCombinedPopup);
    return;
  }

  const topicCard = event.target.closest("[data-lld-topic]");
  if (topicCard) {
    activeLldTopic = topicCard.dataset.lldTopic;
    const match = findLldTopic(activeLldTopic);
    if (isLldProblemSection(match?.section)) {
      lldProblemViewMode = "problem";
    }
    renderLldTopic(activeLldTopic);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const sectionButton = event.target.closest("[data-lld-section]");
  if (sectionButton) {
    activeLldSection = sectionButton.dataset.lldSection;
    activeLldTopic = "";
    lldSearchQuery = "";
    lldProblemViewMode = "problem";
    renderLldSection(activeLldSection);
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  if (event.target.closest("[data-lld-home]")) {
    activeLldSection = "home";
    activeLldTopic = "";
    lldSearchQuery = "";
    lldProblemViewMode = "problem";
    renderLldHome();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});

lldRoot?.addEventListener("input", (event) => {
  const searchInput = event.target.closest("[data-lld-search]");
  if (!searchInput) return;
  lldSearchQuery = searchInput.value;
  if (!activeLldTopic && activeLldSection !== "home") {
    renderLldSection(activeLldSection);
    const nextInput = lldRoot.querySelector("[data-lld-search]");
    nextInput?.focus();
    nextInput?.setSelectionRange(lldSearchQuery.length, lldSearchQuery.length);
  }
});

lldRoot?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const topicCard = event.target.closest("[data-lld-topic]");
  if (!topicCard) return;
  event.preventDefault();
  activeLldTopic = topicCard.dataset.lldTopic;
  const match = findLldTopic(activeLldTopic);
  if (isLldProblemSection(match?.section)) {
    lldProblemViewMode = "problem";
  }
  renderLldTopic(activeLldTopic);
  window.scrollTo({ top: 0, behavior: "smooth" });
});

hldRoot?.addEventListener("click", (event) => {
  const sectionButton = event.target.closest("[data-hld-section]");
  if (sectionButton) {
    activeHldSection = sectionButton.dataset.hldSection;
    hldSearchQuery = "";
    renderHldCheatSheet();
    window.scrollTo({ top: 0, behavior: "smooth" });
    return;
  }

  const checkButton = event.target.closest("[data-hld-topic-check]");
  if (checkButton) {
    event.preventDefault();
    event.stopPropagation();
    const id = checkButton.dataset.hldTopicCheck;
    const openId = checkButton.closest(".hld-sheet-page")?.id;
    setTopicDone("hld", id, !isTopicDone("hld", id));
    if (openId) {
      hldRoot.querySelector(`#${CSS.escape(openId)}`)?.setAttribute("open", "");
    }
    return;
  }

  const openLink = event.target.closest("[data-hld-open]");
  if (openLink) {
    event.preventDefault();
    const target = hldRoot.querySelector(`#${CSS.escape(openLink.dataset.hldOpen)}`);
    target?.setAttribute("open", "");
    target?.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }

  const diagramButton = event.target.closest("[data-open-diagram]");
  if (diagramButton) {
    openDiagram(diagramButton.dataset.openDiagram, diagramButton.dataset.title);
  }
});

hldRoot?.addEventListener("input", (event) => {
  const searchInput = event.target.closest("[data-hld-search]");
  if (!searchInput) return;
  hldSearchQuery = searchInput.value;
  renderHldCheatSheet();
  const nextInput = hldRoot.querySelector("[data-hld-search]");
  nextInput?.focus();
  nextInput?.setSelectionRange(hldSearchQuery.length, hldSearchQuery.length);
});

function render() {
  renderCaseList();
  renderCaseDetail();
  renderSpringBoot();
  renderLld();
  renderHldCheatSheet();
}

function showCourse(course) {
  activeCourse = course;
  if (activeCourse === "springboot") {
    activeSpringSection = "home";
    activeSpringTopic = "";
    renderSpringBoot();
  }
  if (activeCourse === "lld") {
    activeLldSection = "home";
    activeLldTopic = "";
    renderLld();
  }
  if (activeCourse === "hld") {
    activeHldSection = "home";
    renderHldCheatSheet();
  }
  if (studyHome) {
    studyHome.hidden = activeCourse !== "home";
  }
  courseViews.forEach((view) => {
    view.hidden = activeCourse === "home" || view.dataset.courseView !== activeCourse;
  });
  courseButtons.forEach((button) => {
    const isActive = button.dataset.course === activeCourse;
    button.classList.toggle("is-active", isActive);
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

courseButtons.forEach((button) => {
  button.addEventListener("click", () => showCourse(button.dataset.course));
});

progressRows.forEach((row) => {
  row.addEventListener("click", () => showCourse(row.dataset.progressCourse));
  row.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    showCourse(row.dataset.progressCourse);
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest("[data-study-home-link]")) return;
  showCourse("home");
});

function updateScrollTopButton() {
  scrollTopButton?.classList.toggle("is-visible", window.scrollY > 260);
}

scrollTopButton?.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

window.addEventListener("scroll", updateScrollTopButton, { passive: true });

themeToggle?.addEventListener("click", () => {
  const nextTheme = getOppositeTheme(activeTheme);
  try {
    persistTheme(nextTheme);
  } catch {
    // Theme still changes for this session if storage is unavailable.
  }
  applyTheme(nextTheme);
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => {
    viewMode = button.dataset.viewMode;
    modeButtons.forEach((item) => item.classList.toggle("is-active", item === button));
    renderCaseDetail();
  });
});

combinedPopupButton?.addEventListener("click", renderCombinedPopup);

searchEl?.addEventListener("input", () => {
  if (activeId && !getFilteredCases().some((item) => item.id === activeId)) {
    activeId = null;
  }
  render();
});

document.querySelector("[data-close-lightbox]")?.addEventListener("click", () => {
  closeDiagram();
});

document.querySelectorAll("[data-close-study-modal]").forEach((button) => {
  button.addEventListener("click", () => {
    studyModal.hidden = true;
    studyModalContent.innerHTML = "";
    document.body.style.overflow = "";
  });
});

lightbox?.addEventListener("click", (event) => {
  if (event.target === lightbox) {
    closeDiagram();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox && !lightbox.hidden) {
    closeDiagram();
  }
  if (event.key === "Escape" && studyModal && !studyModal.hidden) {
    studyModal.hidden = true;
    studyModalContent.innerHTML = "";
    document.body.style.overflow = "";
  }
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : event.target?.parentElement;
  const button = target?.closest("[data-code-theme-toggle]");
  if (!button) return;
  const card = button.closest(".lld-code-card");
  if (!card) return;
  const currentTheme = card.dataset.codeTheme || activeTheme;
  const nextTheme = getOppositeTheme(currentTheme);
  card.dataset.codeTheme = nextTheme;
  button.dataset.codeThemeCurrent = nextTheme;
  button.innerHTML = renderCodeThemeIcon(nextTheme);
  button.setAttribute("aria-label", `Switch code editor to ${getOppositeTheme(nextTheme)} mode`);
});

render();
renderTopicLists();
renderProgress();
applyTheme(activeTheme);
showCourse(activeCourse);
updateScrollTopButton();
