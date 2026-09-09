import { describe, expect, it } from "vitest";

import { domainModules } from "./index";

describe("domainModules", () => {
  it("lists the modular monolith boundaries", () => {
    expect(domainModules).toContain("imports");
    expect(domainModules).toContain("reports");
    expect(new Set(domainModules).size).toBe(domainModules.length);
  });
});
