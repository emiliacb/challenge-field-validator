import { describe, it } from "node:test";
import assert from "node:assert";

describe("Environment Variables", () => {
  it("SCALE_LIVE_API_KEY should be defined and in correct format", () => {
    const apiKey = process.env.SCALE_LIVE_API_KEY!;
    assert.ok(apiKey, "SCALE_LIVE_API_KEY should be defined");
    assert.ok(
      apiKey?.match(/^live_[a-f0-9]{32}$/),
      "SCALE_LIVE_API_KEY should be in correct format"
    );
  });

  it("SCALE_BASE_URL should be defined and be a valid URL", () => {
    const baseUrl = process.env.SCALE_BASE_URL!;
    assert.ok(
      baseUrl,
      "SCALE_BASE_URL should be defined and in correct format"
    );
    assert.ok(
      baseUrl?.match(/^https?:\/\/[^\s/$.?#].[^\s]*$/),
      "SCALE_BASE_URL should be a valid URL"
    );
  });
});
