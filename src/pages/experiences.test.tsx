import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import * as portfolioService from "../services/portfolioService";
import { Experiences } from "./experiences";

afterEach(() => {
  jest.restoreAllMocks();
});

test("shows loading state and renders experience cards", async () => {
  jest.spyOn(portfolioService, "getExperiences").mockResolvedValue([
    {
      id: "experience-1",
      period: "2023 - Present",
      role: "Software Engineer",
      company: "Example Corp",
      description: "Builds software products.",
      skills: ["React", "TypeScript"],
      link: "https://example.com/experience",
    },
    {
      period: "2021 - 2023",
      role: "Associate Engineer",
      company: "Earlier Corp",
      description: "Built internal tools.",
      skills: [],
    },
  ]);

  render(<Experiences />);

  expect(screen.getByText("Loading experiences...")).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: /Software Engineer · Example Corp/ }))
    .toHaveAttribute("href", "https://example.com/experience");
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Associate Engineer · Earlier Corp")).toBeInTheDocument();
  expect(screen.queryByText("Loading experiences...")).not.toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Take a look at my resume" }))
    .toHaveAttribute("href", "/SwaroopReddyVudumulaResume.pdf");
});

test("shows the empty state when the service returns no data", async () => {
  jest.spyOn(portfolioService, "getExperiences").mockResolvedValue(null as any);

  render(<Experiences />);

  expect(await screen.findByText("No experience data available.")).toBeInTheDocument();
});

test("shows an error state when loading experiences fails", async () => {
  const error = new Error("service unavailable");
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(portfolioService, "getExperiences").mockRejectedValue(error);

  render(<Experiences />);

  expect(await screen.findByText("Unable to load experiences.")).toBeInTheDocument();
  expect(consoleError).toHaveBeenCalledWith("Failed to load experiences:", error);
});

test("does not update state when a pending request resolves after unmount", async () => {
  let resolveRequest!: (data: any[]) => void;
  const request = new Promise<any[]>((resolve) => {
    resolveRequest = resolve;
  });
  jest.spyOn(portfolioService, "getExperiences").mockReturnValue(request);
  const { unmount } = render(<Experiences />);

  unmount();

  await act(async () => {
    resolveRequest([]);
    await request;
  });
});

test("does not update error state when a pending request fails after unmount", async () => {
  let rejectRequest!: (error: Error) => void;
  const request = new Promise<any[]>((_resolve, reject) => {
    rejectRequest = reject;
  });
  const error = new Error("request failed after unmount");
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(portfolioService, "getExperiences").mockReturnValue(request);
  const { unmount } = render(<Experiences />);

  unmount();

  await act(async () => {
    rejectRequest(error);
    await request.catch(() => undefined);
  });
  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith("Failed to load experiences:", error);
  });
});