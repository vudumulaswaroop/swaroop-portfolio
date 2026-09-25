// api/portfolio.js

export default async function handler(req, res) {
  // Read private environment variables (not exposed to client)
  const SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEET_ID;
  const API_KEY = process.env.GOOGLE_API_KEY;

  if (!SPREADSHEET_ID || !API_KEY) {
    return res.status(500).json({ 
      error: "Missing backend environment variables: GOOGLE_SPREADSHEET_ID or GOOGLE_API_KEY" 
    });
  }

  const ranges = "ranges=Experiences!A2:F&ranges=Projects!A2:D&ranges=Stars!A2:D";
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values:batchGet?${ranges}&key=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({ error: data.error?.message || "Google Sheets API Error" });
    }

    const valueRanges = data.valueRanges || [];

    const experiences = (valueRanges[0]?.values || []).map((row) => ({
      period: row[0] || "",
      role: row[1] || "",
      company: row[2] || "",
      description: row[3] || "",
      skills: row[4] ? row[4].split(",").map((s) => s.trim()) : [],
      link: row[5] || "",
    }));

    const projects = (valueRanges[1]?.values || []).map((row) => ({
      title: row[0] || "",
      description: row[1] || "",
      skills: row[2] ? row[2].split(",").map((s) => s.trim()) : [],
      link: row[3] || "",
    }));

    const stars = (valueRanges[2]?.values || []).map((row) => ({
      top: row[0] || "0%",
      left: row[1] || "0%",
      delay: row[2] || "0s",
      duration: row[3] || "10s",
    }));

    res.setHeader("Cache-Control", "s-maxage=300, stale-while-revalidate");
    return res.status(200).json({ experiences, projects, stars });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}