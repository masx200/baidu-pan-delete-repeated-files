#!/usr/bin/env node
import { start } from "./index.js";
import process from "process";
process.on("unhandledRejection", (err) => {
    throw err;
});
start();
