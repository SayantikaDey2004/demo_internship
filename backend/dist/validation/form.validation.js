"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formValidation = void 0;
const zod_1 = require("zod");
exports.formValidation = zod_1.z.object({
    title: zod_1.z.string().min(3, "Name must be at least 3 characters long"),
    email: zod_1.z.string().email("Invalid email address"),
    message: zod_1.z.string().min(10, "Message must be at least 10 characters long"),
});
//# sourceMappingURL=form.validation.js.map