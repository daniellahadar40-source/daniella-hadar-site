"use client";

import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";
import { structure } from "./sanity/structure";
import { dataset, projectId } from "./src/sanity/env";

export default defineConfig({
  name: "daniella-hadar-studio",
  title: "דניאלה הדר - ניהול תוכן",
  basePath: "/studio",
  projectId,
  dataset,
  schema: { types: schemaTypes },
  plugins: [structureTool({ structure })],
});
