import fs from "node:fs";
import { describe, it, after } from "node:test";
import assert from "node:assert";

import nock from "nock";

import { fetchPage } from "../../../src/scripts/traffic-signs/get-inputs.js";

describe("Traffic Signs - Get Inputs", async () => {
  describe("getInputsGenerator", async () => {
    it("should fetch tasks from Scale API", async () => {
      nock(process.env.SCALE_BASE_URL!)
        .get("/v1/tasks")
        .query(true)
        .reply(
          200,
          fs.readFileSync("tests/mocks/replies/get-inputs.json", "utf-8")
        );

      const { data } = await fetchPage();
      const docsQuantity = JSON.parse(data).docs.length;
      const expectedQuantity = 5;

      assert.ok(
        docsQuantity === expectedQuantity,
        `Expected ${expectedQuantity} tasks, got ${docsQuantity}`
      );
    });
  });

  after(() => {
    nock.cleanAll();
  });
});
