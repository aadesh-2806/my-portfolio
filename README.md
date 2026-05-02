# Aadesh Agrawal Portfolio

Static portfolio and Dev Vault study site.

## Structure

```text
index.html                 Portfolio entry page
devVault.html              Dev Vault entry page
assets/                    Images, PDFs, diagrams, and generated study assets
src/
  data/                    Editable content and external profile/config data
    portfolio-config.js    Portfolio usernames, targets, and repo filters
    db-design.js           DB Design cases, videos, answer diagrams
    lld-content.js         LLD topics, notes, diagrams, code samples
    lld-video-references.js LLD article-to-video mapping
    spring-boot.js         Spring Boot course content
    hld-cheatsheet.js      HLD cheat sheet pages
    course-topics.js       Placeholder topic lists for future subjects
  js/                      Page behavior and render controllers
    portfolio.js           Portfolio integrations and UI interactions
    dev-vault.js           Dev Vault navigation, rendering, progress, modals
  styles/                  Page-level styles
    portfolio.css
    dev-vault.css
```

## Update Guide

- Update profile IDs, LeetCode target, featured repo matching, and hidden GitHub repos in `src/data/portfolio-config.js`.
- Add or edit DB Design cases in `src/data/db-design.js`.
- Add or edit LLD article content in `src/data/lld-content.js`.
- Add or correct LLD video mappings in `src/data/lld-video-references.js`.
- Add or edit Spring Boot material in `src/data/spring-boot.js`.
- Add or edit HLD cheat sheet topics in `src/data/hld-cheatsheet.js`.

The files under `src/js/` should stay mostly behavior-only. Prefer putting changing study material, links, and profile constants under `src/data/`.
