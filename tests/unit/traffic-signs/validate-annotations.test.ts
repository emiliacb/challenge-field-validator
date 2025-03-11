import fs from "node:fs";
import { describe, it, after } from "node:test";
import assert from "node:assert/strict";
import nock from "nock";

import { fetchPage } from "../../../src/scripts/traffic-signs/get-inputs.js";
import { validateAnnotations } from "../../../src/scripts/traffic-signs/validate-annotations.js";

describe("Traffic Signs - Validate Annotations", async () => {
  describe("validateAnnotations", async () => {
    it("should validate a valid annotation", async () => {
      nock(process.env.SCALE_BASE_URL!)
        .get("/v1/tasks")
        .query(true)
        .reply(
          200,
          fs.readFileSync(
            "tests/mocks/replies/validate-anotations.json",
            "utf-8"
          )
        );

      const { data } = await fetchPage();
      const task = JSON.parse(data).docs[0];
      const result = await validateAnnotations(task);

      const annotations = Object.values(result.payload).map((annotation) => ({
        errors: annotation.results.errors,
        warnings: annotation.results.warnings,
      }));

      const expectedAnnotations = [
        {
          errors: [
            "Invalid label: policy_sign. Must be one of: sheep_face",
            "Invalid occlusion value: 10%. Must be one of: 12%",
            "Invalid truncation value: 10%. Must be one of: 15%",
            "Invalid background color: blue. Must be one of: purple",
            "Annotation is larger than the image",
            "Annotation is outside the image boundaries",
          ],
          warnings: [],
        },
        {
          errors: ["Annotation is less than 2px in size"],
          warnings: [],
        },
        {
          errors: [],
          warnings: ["Annotation is less than 10px in size"],
        },
      ];

      assert.ok(
        annotations.length === expectedAnnotations.length,
        "Expected number of annotations to match expected results"
      );

      expectedAnnotations.forEach((expected, index) => {
        assert.deepEqual(
          annotations[index],
          expected,
          `Annotation ${index + 1} results to be equal to the expected results`
        );
      });
    });
  });

  after(() => {
    nock.cleanAll();
  });
});
