"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.users = void 0;
var pg_core_1 = require("drizzle-orm/pg-core");
var uuid_1 = require("uuid");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.uuid)('id').primaryKey().unique().default((0, uuid_1.v4)()),
    fullName: (0, pg_core_1.text)('full_name'),
    phone: (0, pg_core_1.varchar)('phone', { length: 256 }),
});
