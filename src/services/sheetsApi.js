// src/services/sheetsApi.js

let cachedPortfolioData = null;
let fetchPromise = null;

export const fetchPortfolioData = async () => {
  // 1. Return from memory cache if already fetched
  if (cachedPortfolioData) {
    return cachedPortfolioData;
  }

  // 2. Return existing promise if request is already in-flight
  if (fetchPromise) {
    return fetchPromise;
  }

  // 3. Fetch from serverless API route
  fetchPromise = fetch("/api/portfolio")
    .then((res) => res.json())
    .then((data) => {
      cachedPortfolioData = data;
      fetchPromise = null;
      return cachedPortfolioData;
    })
    .catch((error) => {
      console.error("Error fetching portfolio data:", error);
      fetchPromise = null;
      return { experiences: [], projects: [], stars: [] };
    });

  return fetchPromise;
};