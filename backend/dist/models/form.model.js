"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const formSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    email: { type: String, required: true },
    message: { type: String, required: true },
}, { timestamps: true });
const FormModel = mongoose_1.default.model("Form", formSchema);
exports.default = FormModel;
//# sourceMappingURL=form.model.js.map