"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitForm = void 0;
const form_model_1 = __importDefault(require("../../models/form.model"));
const submitForm = async (req, res) => {
    try {
        const { title, email, message } = req.body;
        if (!title || !email || !message) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const form = await form_model_1.default.create({ title, email, message });
        res.status(201).json({ message: "Form Submitted Successfully", data: form });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
};
exports.submitForm = submitForm;
//# sourceMappingURL=form.controller.js.map