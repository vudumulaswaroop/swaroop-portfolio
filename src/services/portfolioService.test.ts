jest.mock("../lib/supabaseClient", () => ({
  supabase: { from: jest.fn() },
}));

import { supabase } from "../lib/supabaseClient";
import {
  getExperiences,
  getPortfolioData,
  getProjects,
  getStars,
} from "./portfolioService";

type QueryResponse = {
  data: any;
  error: any;
};

const mockFrom = supabase.from as jest.Mock;

const configureResponses = (responses: Record<string, QueryResponse>) => {
  mockFrom.mockImplementation((table: string) => ({
    select: jest.fn().mockReturnValue({
      order: jest.fn().mockResolvedValue(responses[table]),
    }),
  }));
};

beforeEach(() => {
  mockFrom.mockReset();
});

describe("getExperiences", () => {
  it("maps nested skills onto each experience", async () => {
    configureResponses({
      experiences: {
        data: [
          {
            id: "experience-1",
            role: "Engineer",
            experience_skills: [
              { skills: { name: "React" } },
              { skills: { name: "TypeScript" } },
            ],
          },
        ],
        error: null,
      },
    });

    await expect(getExperiences()).resolves.toEqual([
      {
        id: "experience-1",
        role: "Engineer",
        experience_skills: [
          { skills: { name: "React" } },
          { skills: { name: "TypeScript" } },
        ],
        skills: ["React", "TypeScript"],
      },
    ]);
    expect(mockFrom).toHaveBeenCalledWith("experiences");
  });

  it("throws query errors", async () => {
    const error = new Error("experience query failed");
    configureResponses({ experiences: { data: null, error } });

    await expect(getExperiences()).rejects.toBe(error);
  });
});

describe("getPortfolioData", () => {
  it("loads experiences and projects together", async () => {
    configureResponses({
      experiences: { data: [], error: null },
      projects: { data: [], error: null },
    });

    await expect(getPortfolioData()).resolves.toEqual({
      experiences: [],
      projects: [],
    });
    expect(mockFrom).toHaveBeenCalledWith("experiences");
    expect(mockFrom).toHaveBeenCalledWith("projects");
  });
});

describe("getStars", () => {
  it("maps database positions into star coordinates", async () => {
    configureResponses({
      stars: {
        data: [
          {
            id: "star-1",
            top_position: "10%",
            left_position: "20%",
            delay: "1s",
            duration: "3s",
          },
        ],
        error: null,
      },
    });

    await expect(getStars()).resolves.toEqual([
      {
        id: "star-1",
        top: "10%",
        left: "20%",
        delay: "1s",
        duration: "3s",
      },
    ]);
  });

  it("returns an empty list when the query has no data", async () => {
    configureResponses({ stars: { data: null, error: null } });

    await expect(getStars()).resolves.toEqual([]);
  });

  it("logs and throws query errors", async () => {
    const error = new Error("stars query failed");
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    configureResponses({ stars: { data: null, error } });

    await expect(getStars()).rejects.toBe(error);
    expect(consoleError).toHaveBeenCalledWith("Supabase stars error:", error);
    consoleError.mockRestore();
  });
});

describe("getProjects", () => {
  it("maps projects and normalizes nullable links", async () => {
    configureResponses({
      projects: {
        data: [
          { id: "project-1", title: "Linked", link: "https://example.com", sort_order: 1 },
          { id: "project-2", title: "Unlinked", link: null, sort_order: 2 },
        ],
        error: null,
      },
    });

    await expect(getProjects()).resolves.toEqual([
      {
        id: "project-1",
        title: "Linked",
        link: "https://example.com",
        sort_order: 1,
        skills: [],
      },
      {
        id: "project-2",
        title: "Unlinked",
        link: undefined,
        sort_order: 2,
        skills: [],
      },
    ]);
  });

  it("returns an empty list when the query has no data", async () => {
    configureResponses({ projects: { data: null, error: null } });

    await expect(getProjects()).resolves.toEqual([]);
  });

  it("logs and throws query errors", async () => {
    const error = new Error("projects query failed");
    const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
    configureResponses({ projects: { data: null, error } });

    await expect(getProjects()).rejects.toBe(error);
    expect(consoleError).toHaveBeenCalledWith("Supabase projects error:", error);
    consoleError.mockRestore();
  });
});