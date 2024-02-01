"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var postgres_js_1 = require("drizzle-orm/postgres-js");
// import { migrate } from "drizzle-orm/postgres-js/migrator";
var postgres_1 = require("postgres");
var users = require("./schema/users");
var schema = __assign({}, users);
if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is missing");
}
var connectionString = process.env.DATABASE_URL;
var client = (0, postgres_1.default)(connectionString);
var db = (0, postgres_js_1.drizzle)(client, { schema: schema });
exports.default = db;
