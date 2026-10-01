import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import ContactUs from "./contactUS";

jest.mock("../constants/constants", () => ({ GOOGLEAPI: undefined }));

test("shows a configuration failure without posting when the contact endpoint is missing", () => {
  const fetchMock = jest.spyOn(global, "fetch");
  render(<ContactUs />);

  fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
    target: { name: "phone", value: "9876543210" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Name"), {
    target: { name: "name", value: "Test User" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Email"), {
    target: { name: "email", value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Your Message"), {
    target: { name: "message", value: "Test message" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Send Message" }));

  expect(screen.getByText("Something went wrong. Please try again.")).toBeInTheDocument();
  expect(fetchMock).not.toHaveBeenCalled();
});

export {};