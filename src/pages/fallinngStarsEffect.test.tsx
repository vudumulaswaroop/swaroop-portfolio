import React from "react";
import { act, render, waitFor } from "@testing-library/react";
import * as portfolioService from "../services/portfolioService";
import { FallinngStarsEffect } from "./fallinngStarsEffect";

afterEach(() => {
  jest.restoreAllMocks();
});

test("renders fetched stars with their configured positions", async () => {
  jest.spyOn(portfolioService, "getStars").mockResolvedValue([
    {
      id: "database-star-1",
      top: "10%",
      left: "20%",
      delay: "1s",
      duration: "3s",
    },
    {
      top: "40%",
      left: "60%",
      delay: "2s",
      duration: "4s",
    },
  ]);
  const { container } = render(<FallinngStarsEffect />);

  await waitFor(() => {
    expect(container.querySelectorAll(".star")).toHaveLength(2);
  });

  expect(container.querySelectorAll(".star")[0]).toHaveStyle({
    "--star-top": "10%",
    "--star-left": "20%",
  });
  expect(container.querySelectorAll(".star")[1]).toHaveStyle({
    "--star-top": "40%",
    "--star-left": "60%",
  });
});

test("renders no stars when the service returns no data", async () => {
  jest.spyOn(portfolioService, "getStars").mockResolvedValue(null as any);
  const { container } = render(<FallinngStarsEffect />);

  await waitFor(() => {
    expect(container.querySelectorAll(".star")).toHaveLength(0);
  });
});

test("logs a service error without breaking the star field", async () => {
  const error = new Error("stars unavailable");
  const consoleError = jest.spyOn(console, "error").mockImplementation(() => {});
  jest.spyOn(portfolioService, "getStars").mockRejectedValue(error);
  const { container } = render(<FallinngStarsEffect />);

  await waitFor(() => {
    expect(consoleError).toHaveBeenCalledWith("Failed to load stars:", error);
  });
  expect(container.querySelector(".star-field")).toBeInTheDocument();
  expect(container.querySelectorAll(".star")).toHaveLength(0);
});

test("ignores stars when the request resolves after unmount", async () => {
  let resolveRequest!: (stars: any[]) => void;
  const request = new Promise<any[]>((resolve) => {
    resolveRequest = resolve;
  });
  jest.spyOn(portfolioService, "getStars").mockReturnValue(request);
  const { unmount } = render(<FallinngStarsEffect />);

  unmount();

  await act(async () => {
    resolveRequest([
      { id: "late-star", top: "10%", left: "20%", delay: "1s", duration: "3s" },
    ]);
    await request;
  });
});