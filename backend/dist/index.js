"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("./config/env.config");
const express_1 = __importDefault(require("express"));
const form_routes_1 = __importDefault(require("./routes/form.routes"));
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const db_config_1 = __importDefault(require("./config/db.config"));
const app = (0, express_1.default)();
const PORT = Number(process.env.PORT) || 5000;
app.use(express_1.default.json());
app.use((req, _res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});
app.use("/api/forms", form_routes_1.default);
app.use("/api/auth", auth_routes_1.default);
app.post("/api/auth/signup", (_req, res) => {
    res.status(200).json({ ok: true, source: "direct" });
});
console.log(`Auth routes loaded: ${auth_routes_1.default.stack.length}`);
console.log(`Form routes loaded: ${form_routes_1.default.stack.length}`);
app.get("/", (_req, res) => {
    res.send("Backend is running");
});
(0, db_config_1.default)().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
});
//# sourceMappingURL=index.js.map