import { fireEvent, screen, waitFor } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../tests/utils/test-utils";
// import { SearchBox } from "../SearchBox";
import { test, expect, vi, describe } from "vitest";

import { SearchBox } from "../SearchBox";
import "@testing-library/jest-dom";
import * as reduxHooks from "../../redux/hooks";

describe("Search Box Test files", () => {
  const mockDispatch = vi.fn();
  vi.spyOn(reduxHooks, "useAppDispatch").mockReturnValue(mockDispatch);

  test("should render input and button", () => {
    renderWithProviders(<SearchBox />);

    expect(screen.getByRole("textbox")).toBeInTheDocument();
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  test("should call fetchIp action for valid IP after clicking the button", async () => {
    renderWithProviders(<SearchBox />);

    const input = screen.getByPlaceholderText(
      "Search for any IP address or domain"
    );
    const button = screen.getByRole("button");

    fireEvent.change(input, { target: { value: "192.168.0.1" } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(mockDispatch).toHaveBeenCalled();
    });

    // Reset mock after test
    mockDispatch.mockReset();
  });

  test("should call fetchAddress action for valid URL after clicking the Enter key", async () => {
    renderWithProviders(<SearchBox />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "google.com" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(mockDispatch).toBeCalled();
    });

    //   the test is successful, to verify that this works, take off the validateInput function
    //   from the input keyDown and run test again
    // it should now be "onKeyDown={(e) => e.key === "Enter"}"

    mockDispatch.mockReset();
  });

  test("should not call action for invalid input", async () => {
    renderWithProviders(<SearchBox />);

    const input = screen.getByRole("textbox");

    fireEvent.change(input, { target: { value: "abcd" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(mockDispatch).not.toBeCalled();
    });
  });
});
