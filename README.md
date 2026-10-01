# Swaroop Reddy Vudumula Portfolio

Personal portfolio for Swaroop Reddy Vudumula, a software engineer and technology leader working across Industrial IoT, Agri Milk monitoring, Pharma Tech, pharmaceutical machinery, and web product development.

**Live site:** [swaroopvudumula.com](https://swaroopvudumula.com/)

[![Visit portfolio](https://img.shields.io/badge/Portfolio-Visit%20Website-0A66C2?style=for-the-badge)](https://swaroopvudumula.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/vudumulaswaroop)

## Features

- Responsive single-page portfolio layout
- About, experience, projects, and contact sections
- English and Hindi interface translations with an in-page locale selector
- Supabase-backed experience, project, and star data
- Scroll-aware navigation with contact-section handling at the bottom of the page
- Contact form with India, USA, and international phone validation
- GitHub, LinkedIn, and email profile links
- India-time day/night appearance: daytime runs from 06:00 to 18:00 in `Asia/Kolkata`; night mode runs from 18:00 to 06:00
- Night-only black background, fixed stars, and a full-moon pointer effect; desktop night mode hides the native cursor
- Daytime mouse spotlight and animated shooting stars
- SEO metadata, Open Graph tags, Twitter cards, JSON-LD structured data, `robots.txt`, and sitemap
- Automated tests with coverage reporting

The locale selector includes the configured locale list. Complete translation catalogs currently exist for `en-US` and `hi-IN`; other locale selections currently fall back to English until their catalogs are added under `src/locales/`.

## Tech Stack

- React 19
- TypeScript 4.9
- React DOM
- React Helmet Async
- Supabase JavaScript client
- i18next with React bindings for localized UI and metadata
- Create React App with `react-scripts`
- HTML and CSS
- Jest and Testing Library

## Getting Started

### Prerequisites

- Node.js 18 or newer
- npm

### Install

```bash
git clone https://github.com/vudumulaswaroop/swaroop-portfolio.git
cd swaroop-portfolio
npm install
```

### Start development

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Environment configuration

Create a `.env.local` file in the project root before starting the app:

```dotenv
REACT_APP_SUPABASE_URL=https://your-project.supabase.co
REACT_APP_SUPABASE_PUBLISHABLE_KEY=your-supabase-publishable-key
REACT_APP_GOOGLE_SPREADSHEET_ID=https://script.google.com/macros/s/your-deployment-id/exec
```

`REACT_APP_GOOGLE_SPREADSHEET_ID` is the environment variable name used by this codebase; its value is the deployed Google Apps Script Web App URL that accepts contact form `POST` requests. Deploy the script to accept requests from the portfolio and configure its spreadsheet destination.

The React application uses the Supabase publishable key in the browser. Never put a Supabase secret/service-role key in a `REACT_APP_*` variable or client bundle. Configure Row Level Security (RLS) so anonymous clients can only read the portfolio records intended to be public. CRA reads `REACT_APP_*` values at build time, so provide production values in the deployment environment before building.

### Supabase data model

The client reads these tables, ordered by `sort_order`:

| Table | Fields read by the app | Notes |
| --- | --- | --- |
| `experiences` | `id`, `period`, `role`, `company`, `description`, `link`, `sort_order` | Related `experience_skills` rows must expose `skills(id, name)`. The app maps related skill names into each experience. |
| `projects` | `id`, `title`, `description`, `link`, `sort_order` | `link` may be `NULL`; project skills are currently initialized as an empty list in the client. |
| `stars` | `id`, `top_position`, `left_position`, `delay`, `duration`, `sort_order` | Position values are CSS coordinates such as percentages; delay and duration are CSS time values such as `1s` and `3s`. |

The browser uses the Supabase JavaScript client to perform read-only queries. Ensure the relationship between `experience_skills.skills` and `skills` is available in the Supabase schema and grant the anonymous role only the `SELECT` access required by the public portfolio.

### Day and night behavior

The app evaluates the current hour using the IANA time zone `Asia/Kolkata`, independent of the visitor's local time zone. It updates once per second and switches at exactly 06:00 and 18:00 India Standard Time. Night mode is visual-only: it adds the `night-mode` state, shows the fixed star field and moon, and hides the native cursor on desktop-sized viewports. Day mode keeps the existing background and cursor spotlight. No database setting is required for this behavior.

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm test` | Runs the Jest test watcher. |
| `npm test -- --watchAll=false` | Runs the test suite once. |
| `npm test -- --coverage --watchAll=false --runInBand` | Runs the test suite once, serially, and generates coverage reports. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run eject` | Ejects the Create React App configuration. This is irreversible. |

## Project Structure

```text
public/
  index.html       Static SEO metadata and structured data
  robots.txt       Crawler directives
  sitemap.xml      Search engine sitemap
src/
  App.tsx          Application shell, IST day/night state, and global SEO metadata
  App.css          Design tokens, responsive layout, and visual-effect styles
  api/             Legacy API integration code
  components/      Reusable cards, sections, tags, and SEO component
  constants/       Contact endpoint configuration and static portfolio content
  locales/         One JSON translation catalog per currently translated locale
  i18n.ts           i18next initialization and locale fallback configuration
  lib/             Supabase client initialization
  pages/           Portfolio sections, navigation, contact form, and star effect
  services/        Supabase portfolio queries and contact-sheet integration
  *.test.*         Jest and Testing Library tests
package.json       Scripts and dependencies
tsconfig.json      TypeScript configuration
```

## SEO and Search Indexing

The production site publishes:

- Canonical URL: `https://swaroopvudumula.com/`
- Sitemap: `https://swaroopvudumula.com/sitemap.xml`
- Crawler rules: `https://swaroopvudumula.com/robots.txt`
- Person and WebSite JSON-LD structured data

After deploying changes, use [Google Search Console](https://search.google.com/search-console) to verify the domain, submit the sitemap, and request indexing for the homepage. Search indexing and ranking are controlled by Google and are not immediate or guaranteed.

## Contact

- Website: [swaroopvudumula.com](https://swaroopvudumula.com/)
- GitHub: [github.com/vudumulaswaroop](https://github.com/vudumulaswaroop)
- LinkedIn: [Swaroop Reddy Vudumula](https://www.linkedin.com/in/swaroop-reddy-vudumula/)

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

Copyright (c) 2026 Swaroop Reddy Vudumula.

<p align="center">Built by <strong>Swaroop Reddy Vudumula</strong></p>
