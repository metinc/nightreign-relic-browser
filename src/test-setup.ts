import fs from "fs";
import path from "path";
import { vi } from "vitest";
import createFetchMock from "vitest-fetch-mock";

// Set up fetch mock
const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

// Set up WASM file mock
fetchMocker.mockImplementation(async (input: RequestInfo | URL) => {
  // Handle WASM file fetching
  if (
    (typeof input === "string" && input.includes("combo_search_bg.wasm")) ||
    (input instanceof URL && input.href.includes("combo_search_bg.wasm"))
  ) {
    const wasmPath = path.join(
      __dirname,
      "../wasm/combo_search/pkg/combo_search_bg.wasm"
    );
    const wasmBuffer = fs.readFileSync(wasmPath);

    return new Response(wasmBuffer, {
      status: 200,
      statusText: "OK",
      headers: {
        "Content-Type": "application/wasm",
      },
    });
  }

  // For any other fetch requests, return empty response
  return new Response("", { status: 404 });
});
