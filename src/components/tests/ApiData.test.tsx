import { screen } from "@testing-library/react";
// We're using our own custom render function and not RTL's render.
import { renderWithProviders } from "../tests/utils/test-utils";
import { test, expect, describe } from "vitest";
import "@testing-library/jest-dom";
import { ApiData } from "../ApiData";
import { setupStore } from "../../redux/store";
import { fetchIp } from "../../redux/api/geoApi";
import { HttpResponse, delay, http } from "msw";
import { posts, server } from "./utils/handlers";

describe("Api Data Test files", () => {
  test("should render initial data", () => {
    renderWithProviders(<ApiData />);

    expect(screen.getByText("192.212.174.101")).toBeInTheDocument();
  });

  test("should render Api data after dispatch", async () => {
    const store = setupStore();
    store.dispatch(fetchIp("8.8.8.8"));

    renderWithProviders(<ApiData />, { store });

    expect(screen.getByText("Loading")).toBeInTheDocument();

    expect(await screen.findByText("8.8.8.8")).toBeInTheDocument();
    expect(screen.queryByText("Loading")).not.toBeInTheDocument();
  });

  test("should render error message", async () => {
    server.use(
      http.get(
        "https://geo.ipify.org/api/v2/country,city",
        async ({ request }) => {
          const url = new URL(request.url);
          const productId = url.searchParams.get("ipAddress");

          if (!productId) {
            return new HttpResponse(null, { status: 404 });
          }

          await delay(150);
          return HttpResponse.json(posts, { status: 500 });
        }
      )
    );
    const store = setupStore();
    store.dispatch(fetchIp("8.8.8.1"));
    renderWithProviders(<ApiData />, { store });

    expect(await screen.findByText("Not Found")).toBeInTheDocument();
  });
});
