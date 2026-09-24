# Swaroop Reddy Vudumula Portfolio

Personal portfolio for Swaroop Reddy Vudumula, a software engineer and technology leader working across Industrial IoT, Agri Milk monitoring, Pharma Tech, pharmaceutical machinery, and web product development.

**Live site:** [swaroopvudumula.com](https://swaroopvudumula.com/)

[![Visit portfolio](https://img.shields.io/badge/Portfolio-Visit%20Website-0A66C2?style=for-the-badge)](https://swaroopvudumula.com/)
[![GitHub](https://img.shields.io/badge/GitHub-Profile-181717?style=for-the-badge&logo=github)](https://github.com/vudumulaswaroop)

## Features

- Responsive single-page portfolio layout
- About, experience, projects, and contact sections
- Scroll-aware navigation with contact-section handling at the bottom of the page
- Contact form with India, USA, and international phone validation
- GitHub, LinkedIn, and email profile links
- Mouse spotlight and falling-star visual effects
- SEO metadata, Open Graph tags, Twitter cards, JSON-LD structured data, `robots.txt`, and sitemap
- Automated tests with coverage reporting

## Tech Stack

- React 19
- TypeScript 5
- React DOM
- React Helmet Async
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

## Available Scripts

| Command | Description |
| --- | --- |
| `npm start` | Starts the development server. |
| `npm test` | Runs the Jest test watcher. |
| `npm test -- --watchAll=false` | Runs the test suite once. |
| `npm test -- --coverage --watchAll=false` | Runs tests and generates coverage reports. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run eject` | Ejects the Create React App configuration. This is irreversible. |

## Project Structure

```text
public/
  index.html       Static SEO metadata and structured data
  robots.txt       Crawler directives
  sitemap.xml      Search engine sitemap
src/
  App.tsx          Application shell and global SEO metadata
  App.css          Application styles
  components/      Reusable components such as SEO
  constants/       Experience, project, and visual-effect data
  pages/           Portfolio sections and navigation
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
