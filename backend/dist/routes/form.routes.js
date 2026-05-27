"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const form_controller_1 = require("../controllers/auth/form.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const rolebase_middleware_1 = require("../middleware/rolebase.middleware");
console.log("Form routes module loaded");
const router = express_1.default.Router();
router.post("/submit", auth_middleware_1.authMiddleware, (0, rolebase_middleware_1.roleMiddleware)("admin"), form_controller_1.submitForm);
exports.default = router;
//# sourceMappingURL=form.routes.js.map