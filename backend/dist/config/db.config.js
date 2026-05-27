"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const env = process.env.NODE_ENV?.trim().toLowerCase() || "dev";
const DB_CONNECTION_URI = {
    local: { uri: process.env.DB_LOCAL || "" },
    dev: { uri: process.env.DB_DEV || "" },
    prod: { uri: process.env.DB_PROD || "" }
};
const selectedConfig = DB_CONNECTION_URI[env] || DB_CONNECTION_URI.dev || DB_CONNECTION_URI.local;
const DB_URI = selectedConfig?.uri || "";
if (!DB_URI) {
    throw new Error(`Database URI is missing for environment: ${env}`);
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(DB_URI);
        console.log(`Database connected for ${env} environment`);
    }
    catch (error) {
        if (error instanceof Error) {
            console.error(error.message);
        }
        process.exit(1);
    }
};
exports.default = connectDB;
//# sourceMappingURL=db.config.js.map