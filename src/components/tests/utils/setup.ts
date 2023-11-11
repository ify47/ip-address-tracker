import { beforeAll, afterEach, afterAll } from "vitest";
import { server } from "./handlers";

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());
