import React from "react";
import { act, render, screen, waitFor } from "@testing-library/react";
import * as portfolioService from "../services/portfolioService";
import { Projects } from "./projects";

afterEach(() => {
  jest.restoreAllMocks();
});

test("shows loading state and renders project cards", async () => {
  jest.spyOn(portfolioService, "getProjects").mockResolvedValue([
    {
      id: "project-1",
      title: "Portfolio dashboard",
      description: "A project with a destination link.",
      skills: ["React", "TypeScript"],
      link: "https://example.com/project",
    },
    {
      title: "Internal tool",
      description: "A project without a destination link.",
      skills: ["Node.js"],
    },
  ]);

  render(<Projects />);

  expect(screen.getByText("Loading projects...")).toBeInTheDocument();
  expect(await screen.findByRole("link", { name: /Portfolio dashboard/ }))
    .toHaveAttribute("href", "https://example.com/project");
  expect(screen.getByText("React")).toBeInTheDocument();
  expect(screen.getByText("Internal tool")).toBeInTheDocument();
  expect(screen.getByText("Node.js")).toBeInTheDocument();
  expect(screen.queryByText("Loading projects...")).not.toBeInTheDocument();
});

test("shows the empty state when the service returns no data", async () => {
  jest.spyOn(portfolioService, "getProjects").mockResolvedValue(null as any);

  render(<Projects />);

  expect(await screen.findByText("No projects available.")).toBeInTheDocument();
});

test("shows an error state when loading projects fails", async () => {
  const error = new Error("service unavailable");
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(portfolioService, "getProjects").mockRejectedValue(error);

  render(<Projects />);

  expect(await screen.findByText("Unable to load projects.")).toBeInTheDocument();
  expect(consoleError).toHaveBeenCalledWith("PROJECT LOAD ERROR:", error);
});

test("does not update state when a pending request resolves after unmount", async () => {
  let resolveRequest!: (data: any[]) => void;
  const request = new Promise<any[]>((resolve) => {
    resolveRequest = resolve;
  });
  jest.spyOn(portfolioService, "getProjects").mockReturnValue(request);
  const { unmount } = render(<Projects />);

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
  jest.spyOn(portfolioService, "getProjects").mockReturnValue(request);
  const { unmount } = render(<Projects />);

  unmount();

  await act(async () => {
    rejectRequest(error);
    await request.catch(() => undefined);
  });
  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith("PROJECT LOAD ERROR:", error);
  });
});