const root = document.documentElement;
const themeToggle = document.querySelector(".theme-toggle");
const storedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark";

const GITHUB_USER = "aadesh-2806";
const LEETCODE_USER = "aadesh2806";
const GFG_USER = "2019uec1660";
const LEETCODE_TARGET = 1000;
const calendarCache = new Map();
let fullCalendarCache = null;
const FEATURED_REPO_HINTS = ["book", "product-ui", "productui", "starbuck", "starbucks"];
const HIDDEN_REPO_PATTERNS = [
  "js-attributes",
  "coding-question",
  "coding-questions",
  "aadesh-2806",
  "config",
  "github-profile",
  "profile-readme",
];

root.dataset.theme = storedTheme || preferredTheme;

themeToggle?.addEventListener("click", () => {
  const nextTheme = root.dataset.theme === "dark" ? "light" : "dark";
  root.dataset.theme = nextTheme;
  localStorage.setItem("portfolio-theme", nextTheme);
});

const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

revealItems.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 55, 260)}ms`;
  revealObserver.observe(item);
});

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener("click", (event) => {
    const target = document.querySelector(link.getAttribute("href"));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const modal = document.querySelector("[data-modal]");
const modalContent = document.querySelector("[data-modal-content]");
const views = document.querySelectorAll("[data-view]");
const homeLinks = document.querySelectorAll("[data-view-home]");
let githubRepos = [];

function showView(name) {
  views.forEach((view) => {
    view.hidden = view.dataset.view !== name;
  });
  window.scrollTo({ top: 0, behavior: "smooth" });
}

homeLinks.forEach((button) => {
  button.addEventListener("click", () => showView("home"));
});

document.querySelector("[data-view-all-repos]")?.addEventListener("click", () => {
  showView("github");
});

document.querySelector("[data-view-resume]")?.addEventListener("click", () => {
  showView("resume");
});

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function openModal(html) {
  modalContent.innerHTML = html;
  modal.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modal.hidden = true;
  modalContent.innerHTML = "";
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach((button) => {
  button.addEventListener("click", closeModal);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !modal.hidden) closeModal();
});

function setText(selector, value) {
  document.querySelectorAll(selector).forEach((item) => {
    item.textContent = value;
  });
}

function setLeetCodeStats(stats, live = true) {
  const total = Number(stats.totalSolved || stats.solvedProblem || stats.total || 616);
  const easy = Number(stats.easySolved || stats.easy || 0);
  const medium = Number(stats.mediumSolved || stats.medium || 0);
  const hard = Number(stats.hardSolved || stats.hard || 0);
  const currentStreak = Number(
    stats.currentStreak ||
      stats.currentDailyCodingChallengeStreak ||
      stats.dailyCodingChallengeStreak ||
      stats.streak ||
      343
  );
  const longestStreak = Number(
    stats.longestStreak ||
      stats.maxStreak ||
      stats.longestDailyCodingChallengeStreak ||
      stats.maxDailyCodingChallengeStreak ||
      343
  );
  const percent = Math.min(100, Math.round((total / LEETCODE_TARGET) * 100));

  setText("[data-leetcode-total]", live ? `${total}` : `${total}+`);
  setText("[data-leetcode-percent]", `${percent}%`);
  setText("[data-leetcode-target]", `towards ${LEETCODE_TARGET}`);
  setText("[data-leetcode-easy]", easy || "--");
  setText("[data-leetcode-medium]", medium || "--");
  setText("[data-leetcode-hard]", hard || "--");
  setText("[data-leetcode-status]", live ? "Current LeetCode progress." : "Current progress across algorithm practice.");
  setText("[data-daily-current-streak]", currentStreak || 343);
  setText("[data-daily-longest-streak]", longestStreak || 343);

  document.querySelectorAll("[data-leetcode-bar]").forEach((bar) => {
    bar.style.width = `${percent}%`;
  });
}

function parseCalendarPayload(payload) {
  const raw =
    payload?.submissionCalendar ||
    payload?.calendar ||
    payload?.data?.matchedUser?.userCalendar?.submissionCalendar ||
    payload?.userCalendar?.submissionCalendar;

  if (!raw) return null;
  if (typeof raw === "string") {
    try {
      return JSON.parse(raw);
    } catch {
      return null;
    }
  }
  return raw;
}

function filterCalendarByYear(calendar, year) {
  const filtered = {};
  Object.entries(calendar || {}).forEach(([timestamp, count]) => {
    const date = new Date(Number(timestamp) * 1000);
    if (date.getFullYear() === year) {
      filtered[timestamp] = count;
    }
  });
  return filtered;
}

function hasCalendarActivity(calendar) {
  return Object.values(calendar || {}).some((count) => Number(count) > 0);
}

function activityYearsFromCalendar(calendar) {
  const years = new Set();
  Object.entries(calendar || {}).forEach(([timestamp, count]) => {
    if (Number(count) <= 0) return;
    years.add(new Date(Number(timestamp) * 1000).getFullYear());
  });
  return [...years].sort((a, b) => b - a);
}

function fallbackCalendar(year) {
  const data = {};
  const start = new Date(year, 0, 1);
  const today = new Date();
  const end = year === today.getFullYear() ? today : new Date(year, 11, 31);
  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    const dateSeed = day.getDate() + day.getMonth() * 7 + day.getDay() * 3;
    const isActive = dateSeed % 5 === 0 || dateSeed % 11 === 0;
    if (isActive) {
      data[Math.floor(day.getTime() / 1000)] = (dateSeed % 4) + 1;
    }
  }
  return data;
}

function renderCalendar(calendarData, year = new Date().getFullYear()) {
  const grid = document.querySelector("[data-calendar-grid]");
  const months = document.querySelector("[data-calendar-months]");
  if (!grid || !months) return;

  setText("[data-calendar-year]", year);
  const start = new Date(year, 0, 1);
  const end = new Date(year, 11, 31);
  const leadingBlanks = start.getDay();
  const days = [];
  const monthLabels = [];
  let activeDays = 0;
  let runningStreak = 0;
  let longestStreak = 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  for (let i = 0; i < leadingBlanks; i += 1) {
    days.push('<span class="calendar-day empty" aria-hidden="true"></span>');
  }

  for (let day = new Date(start); day <= end; day.setDate(day.getDate() + 1)) {
    if (day.getDate() === 1) {
      monthLabels.push(day.toLocaleDateString(undefined, { month: "short" }));
    }
    const count = Object.entries(calendarData || {}).reduce((sum, [timestamp, value]) => {
      const entryDate = new Date(Number(timestamp) * 1000);
      const isSameDay =
        entryDate.getFullYear() === day.getFullYear() &&
        entryDate.getMonth() === day.getMonth() &&
        entryDate.getDate() === day.getDate();
      return isSameDay ? sum + Number(value || 0) : sum;
    }, 0);
    const level = count === 0 ? 0 : count < 2 ? 1 : count < 4 ? 2 : count < 7 ? 3 : 4;
    const label = `${day.toLocaleDateString()}: ${count} submissions`;

    if (count > 0) {
      activeDays += 1;
      runningStreak += 1;
      longestStreak = Math.max(longestStreak, runningStreak);
    } else if (day <= today) {
      runningStreak = 0;
    }

    days.push(`<span class="calendar-day level-${level}" title="${label}" aria-label="${label}"></span>`);
  }

  grid.innerHTML = days.join("");
  months.innerHTML = monthLabels.map((month) => `<span>${month}</span>`).join("");
  setText("[data-active-days]", activeDays || "--");
  setText("[data-current-streak]", runningStreak || "--");
  setText("[data-longest-streak]", longestStreak || "--");
}

function setupYearControls(years = []) {
  const controls = document.querySelector("[data-year-controls]");
  if (!controls) return;
  const safeYears = years.length ? years : [new Date().getFullYear()];
  controls.innerHTML = safeYears
    .map((year) => `<button type="button" data-calendar-select="${year}">${year}</button>`)
    .join("");
  controls.querySelectorAll("[data-calendar-select]").forEach((button) => {
    button.addEventListener("click", () => loadLeetCodeCalendar(Number(button.dataset.calendarSelect)));
  });
}

function markActiveYear(year) {
  document.querySelectorAll("[data-calendar-select]").forEach((button) => {
    button.classList.toggle("is-active", Number(button.dataset.calendarSelect) === year);
  });
}

async function loadLeetCodeStats() {
  const sources = [
    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/solved`,
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`,
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const data = await response.json();
      if (data && (data.totalSolved || data.solvedProblem || data.total)) {
        setLeetCodeStats(data, true);
        return;
      }
    } catch {
      continue;
    }
  }

  setLeetCodeStats({ totalSolved: 616 }, false);
}

async function fetchFullLeetCodeCalendar() {
  if (fullCalendarCache) return fullCalendarCache;

  const sources = [
    `https://alfa-leetcode-api.onrender.com/${LEETCODE_USER}/calendar`,
    `https://leetcode-stats-api.herokuapp.com/${LEETCODE_USER}`,
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const payload = await response.json();
      const calendar = parseCalendarPayload(payload);
      if (calendar && hasCalendarActivity(calendar)) {
        fullCalendarCache = calendar;
        return calendar;
      }
    } catch {
      continue;
    }
  }

  return null;
}

async function initializeLeetCodeCalendar() {
  const fullCalendar = await fetchFullLeetCodeCalendar();
  const years = fullCalendar ? activityYearsFromCalendar(fullCalendar) : [new Date().getFullYear()];
  setupYearControls(years);
  await loadLeetCodeCalendar(years[0] || new Date().getFullYear());
}

async function loadLeetCodeCalendar(year = new Date().getFullYear()) {
  markActiveYear(year);
  if (calendarCache.has(year)) {
    renderCalendar(calendarCache.get(year), year);
    return;
  }

  const fullCalendar = await fetchFullLeetCodeCalendar();
  if (fullCalendar) {
    const yearCalendar = filterCalendarByYear(fullCalendar, year);
    if (hasCalendarActivity(yearCalendar)) {
      calendarCache.set(year, yearCalendar);
      renderCalendar(yearCalendar, year);
      return;
    }
  }

  const sources = [`https://alfa-leetcode-api.onrender.com/userProfileCalendar?username=${LEETCODE_USER}&year=${year}`];
  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const payload = await response.json();
      const calendar = parseCalendarPayload(payload);
      if (calendar) {
        const yearCalendar = filterCalendarByYear(calendar, year);
        if (hasCalendarActivity(yearCalendar)) {
          calendarCache.set(year, yearCalendar);
          renderCalendar(yearCalendar, year);
          return;
        }
      }
    } catch {
      continue;
    }
  }

  const fallback = fallbackCalendar(year);
  calendarCache.set(year, fallback);
  renderCalendar(fallback, year);
}

function normalizeGfgStats(payload) {
  const info = payload?.info || payload?.data || payload || {};
  const solvedStats = payload?.solvedStats || info?.solvedStats || {};
  const total =
    info.totalProblemsSolved ||
    info.totalSolved ||
    payload.totalProblemsSolved ||
    payload.totalSolved ||
    solvedStats.total ||
    0;

  const getCount = (key) => {
    const value = solvedStats[key];
    if (Array.isArray(value)) return value.length;
    if (typeof value === "number") return value;
    if (value?.count) return value.count;
    return 0;
  };

  return {
    total,
    school: getCount("school"),
    basic: getCount("basic"),
    easy: getCount("easy"),
    medium: getCount("medium"),
    hard: getCount("hard"),
  };
}

function setGfgStats(stats, fallback = false) {
  setText("[data-gfg-total]", stats.total ? `${stats.total}` : fallback ? "GFG" : "--");
  setText("[data-gfg-school]", stats.school || "--");
  setText("[data-gfg-basic]", stats.basic || "--");
  setText("[data-gfg-easy]", stats.easy || "--");
  setText("[data-gfg-medium]", stats.medium || "--");
  setText("[data-gfg-hard]", stats.hard || "--");
}

async function loadGfgStats() {
  const sources = [
    `https://geeks-for-geeks-api.vercel.app/${GFG_USER}`,
    `https://geeks-for-geeks-stats-api.vercel.app/?raw=y&userName=${GFG_USER}`,
    `https://gfg-stats.tashif.codes/${GFG_USER}`,
  ];

  for (const source of sources) {
    try {
      const response = await fetch(source, { cache: "no-store" });
      if (!response.ok) continue;
      const payload = await response.json();
      const stats = normalizeGfgStats(payload);
      if (stats.total || stats.easy || stats.medium || stats.hard) {
        setGfgStats(stats);
        return;
      }
    } catch {
      continue;
    }
  }

  setGfgStats({ total: 0 }, true);
}

function repoDescription(repo) {
  return repo.description || "No description added yet.";
}

function normalizeRepoName(name = "") {
  return name.toLowerCase().replace(/[^a-z0-9]/g, "");
}

function isFeaturedRepo(repo) {
  const normalized = normalizeRepoName(repo.name);
  return FEATURED_REPO_HINTS.some((hint) => normalized.includes(normalizeRepoName(hint)));
}

function isPortfolioRepo(repo) {
  const normalized = normalizeRepoName(repo.name);
  const description = normalizeRepoName(repo.description || "");
  if (normalized === normalizeRepoName(GITHUB_USER)) return false;
  return !HIDDEN_REPO_PATTERNS.some((pattern) => {
    const normalizedPattern = normalizeRepoName(pattern);
    return normalized.includes(normalizedPattern) || description.includes(normalizedPattern);
  });
}

function renderRepoCard(repo, index = 0) {
  const language = repo.language || "Code";
  const updated = new Date(repo.updated_at).toLocaleDateString(undefined, {
    month: "short",
    year: "numeric",
  });
  const number = String(index + 1).padStart(2, "0");

  return `
    <article class="repo-card float-${index % 6}" role="button" tabindex="0" data-repo="${escapeHtml(repo.name)}">
      <span>
        <p class="label">${number} / ${escapeHtml(language)}</p>
        <h3>${escapeHtml(repo.name.replaceAll("-", " "))}</h3>
        <p>${escapeHtml(repoDescription(repo))}</p>
      </span>
      <span class="repo-meta">
        <span>${repo.stargazers_count} stars</span>
        <span>${repo.forks_count} forks</span>
        <span>${updated}</span>
      </span>
    </article>
  `;
}

function renderRepoDetail(repo) {
  const topics = repo.topics?.length ? repo.topics : [repo.language || "project"];
  return `
    <div class="subpage-header">
      <button class="button secondary" type="button" data-back-to-repos>Back To Repos</button>
      <div>
        <p class="section-kicker">GitHub Repository</p>
        <h1>${escapeHtml(repo.name.replaceAll("-", " "))}</h1>
        <p class="hero-lede">${escapeHtml(repoDescription(repo))}</p>
      </div>
    </div>
    <div class="modal-repo-head">
      <div class="modal-repo-actions">
        <a class="button primary" href="${repo.html_url}" target="_blank" rel="noreferrer">Open GitHub</a>
        <a class="button secondary" href="${repo.html_url}.git" target="_blank" rel="noreferrer">Clone URL</a>
        <a class="button secondary" href="https://github.com/${GITHUB_USER}/${repo.name}/archive/refs/heads/${repo.default_branch}.zip" target="_blank" rel="noreferrer">Download ZIP</a>
        ${repo.homepage ? `<a class="button secondary" href="${escapeHtml(repo.homepage)}" target="_blank" rel="noreferrer">Live Demo</a>` : ""}
      </div>
    </div>
    <div class="repo-detail-grid">
      <div><strong>${escapeHtml(repo.language || "Code")}</strong><span>Language</span></div>
      <div><strong>${repo.stargazers_count}</strong><span>Stars</span></div>
      <div><strong>${repo.forks_count}</strong><span>Forks</span></div>
      <div><strong>${repo.open_issues_count}</strong><span>Open Issues</span></div>
    </div>
    <div class="tech-stack">
      ${topics.map((topic) => `<span>${escapeHtml(topic)}</span>`).join("")}
    </div>
    <div class="repo-deep-grid">
      <section class="repo-readme-card">
        <div class="repo-section-head">
          <p class="label">README</p>
          <span data-readme-status>Loading README...</span>
        </div>
        <div class="readme-content" data-readme-content></div>
      </section>
      <aside class="repo-side-card">
        <div class="repo-section-head">
          <p class="label">Tech Stack</p>
        </div>
        <div class="tech-stack repo-languages" data-repo-languages>
          <span>${escapeHtml(repo.language || "Code")}</span>
        </div>
        <div class="repo-section-head files-head">
          <p class="label">Files</p>
          <span data-files-status>Loading files...</span>
        </div>
        <div class="repo-files" data-repo-files></div>
        <div class="clone-box">
          <p class="label">Clone</p>
          <code>git clone ${escapeHtml(repo.html_url)}.git</code>
          <button class="button secondary" type="button" data-copy-clone>Copy</button>
        </div>
      </aside>
    </div>
    <p>Created ${new Date(repo.created_at).toLocaleDateString()} and last updated ${new Date(repo.updated_at).toLocaleDateString()}.</p>
  `;
}

function renderReadmeMarkdown(markdown = "") {
  const safe = escapeHtml(markdown.trim() || "README not available.");
  return safe
    .replace(/^### (.*)$/gm, "<h4>$1</h4>")
    .replace(/^## (.*)$/gm, "<h3>$1</h3>")
    .replace(/^# (.*)$/gm, "<h2>$1</h2>")
    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/^\- (.*)$/gm, "<li>$1</li>")
    .replace(/\n{2,}/g, "</p><p>")
    .replace(/\n/g, "<br>");
}

async function hydrateRepoDetail(repo) {
  const readmeEl = document.querySelector("[data-readme-content]");
  const readmeStatus = document.querySelector("[data-readme-status]");
  const filesEl = document.querySelector("[data-repo-files]");
  const filesStatus = document.querySelector("[data-files-status]");
  const languagesEl = document.querySelector("[data-repo-languages]");
  const headers = { Accept: "application/vnd.github+json" };

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/readme`, { headers });
    if (!response.ok) throw new Error("README missing");
    const readme = await response.json();
    const textResponse = await fetch(readme.download_url);
    const markdown = await textResponse.text();
    readmeEl.innerHTML = renderReadmeMarkdown(markdown);
    readmeStatus.textContent = "Loaded";
  } catch {
    readmeEl.innerHTML = "<p>README is not available for this repository.</p>";
    readmeStatus.textContent = "Not found";
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/languages`, { headers });
    if (!response.ok) throw new Error("Languages unavailable");
    const languages = await response.json();
    const total = Object.values(languages).reduce((sum, value) => sum + value, 0) || 1;
    languagesEl.innerHTML = Object.entries(languages)
      .map(([language, bytes]) => `<span>${escapeHtml(language)} ${Math.round((bytes / total) * 100)}%</span>`)
      .join("") || `<span>${escapeHtml(repo.language || "Code")}</span>`;
  } catch {
    languagesEl.innerHTML = `<span>${escapeHtml(repo.language || "Code")}</span>`;
  }

  try {
    const response = await fetch(`https://api.github.com/repos/${GITHUB_USER}/${repo.name}/contents`, { headers });
    if (!response.ok) throw new Error("Files unavailable");
    const files = await response.json();
    filesEl.innerHTML = files
      .slice(0, 14)
      .map((file) => `
        <a href="${file.html_url}" target="_blank" rel="noreferrer">
          <span>${file.type === "dir" ? "DIR" : "FILE"}</span>
          ${escapeHtml(file.name)}
        </a>
      `)
      .join("");
    filesStatus.textContent = `${files.length} items`;
  } catch {
    filesEl.innerHTML = "<p>Files could not be loaded.</p>";
    filesStatus.textContent = "Unavailable";
  }

  document.querySelector("[data-copy-clone]")?.addEventListener("click", async (event) => {
    const cloneCommand = `git clone ${repo.html_url}.git`;
    try {
      await navigator.clipboard.writeText(cloneCommand);
      event.currentTarget.textContent = "Copied";
    } catch {
      event.currentTarget.textContent = "Copy failed";
    }
  });
}

async function openRepo(repo) {
  const detail = document.querySelector("[data-repo-detail-view]");
  detail.innerHTML = renderRepoDetail(repo);
  detail.querySelector("[data-back-to-repos]")?.addEventListener("click", () => showView("github"));
  showView("repo-detail");
  await hydrateRepoDetail(repo);
}

function attachRepoOpenHandlers(container, repos) {
  container.querySelectorAll("[data-repo]").forEach((card) => {
    const openSelectedRepo = () => {
      const repo = repos.find((item) => item.name === card.dataset.repo);
      if (repo) openRepo(repo);
    };
    card.addEventListener("click", openSelectedRepo);
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openSelectedRepo();
      }
    });
  });
}

async function loadGitHubRepos() {
  const grid = document.querySelector("[data-repo-grid]");
  const allGrid = document.querySelector("[data-all-repo-grid]");
  if (!grid || !allGrid) return;

  try {
    const response = await fetch(`https://api.github.com/users/${GITHUB_USER}/repos?sort=updated&per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
      cache: "no-store",
    });
    if (!response.ok) throw new Error("GitHub request failed");

    const repos = (await response.json())
      .filter((repo) => !repo.fork)
      .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));
    const portfolioRepos = repos.filter(isPortfolioRepo);
    const featuredRepos = [
      ...portfolioRepos.filter(isFeaturedRepo),
      ...portfolioRepos.filter((repo) => !isFeaturedRepo(repo)),
    ].slice(0, 3);
    githubRepos = portfolioRepos;

    setText("[data-github-repo-count]", `${portfolioRepos.length}+`);
    grid.innerHTML = featuredRepos.map(renderRepoCard).join("");
    allGrid.innerHTML = portfolioRepos.map(renderRepoCard).join("");
    attachRepoOpenHandlers(grid, portfolioRepos);
    attachRepoOpenHandlers(allGrid, portfolioRepos);
  } catch {
    const fallback = `
      <article class="repo-card skeleton">
        <p class="label">GitHub</p>
        <h3>Repositories unavailable</h3>
        <p>Live GitHub projects could not be loaded right now. Try again after publishing or opening with network access.</p>
        <span class="repo-meta"><span>Fallback</span></span>
      </article>
    `;
    grid.innerHTML = fallback;
    allGrid.innerHTML = fallback;
  }
}

loadLeetCodeStats();
initializeLeetCodeCalendar();
loadGfgStats();
loadGitHubRepos();
