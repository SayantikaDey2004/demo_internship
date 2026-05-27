"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.signup = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const generateToken_1 = __importDefault(require("../../utils/jwt/generateToken"));
const signup = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;
        const existingUser = await user_model_1.default.findOne({ email });
        if (existingUser) {
            res.status(400).json({
                message: "User already exists"
            });
            return;
        }
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        const resolvedRole = role === "admin" ? "admin" : "user";
        const user = await user_model_1.default.create({
            name,
            email,
            password: hashedPassword,
            role: resolvedRole
        });
        res.status(201).json({
            message: "Signup successful",
            user
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.signup = signup;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await user_model_1.default.findOne({ email });
        if (!user) {
            res.status(400).json({
                message: "Invalid credentials"
            });
            return;
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                message: "Invalid credentials"
            });
            return;
        }
        const token = (0, generateToken_1.default)(user._id.toString(), user.role);
        res.json({
            token,
            role: user.role
        });
    }
    catch (error) {
        res.status(500).json(error);
    }
};
exports.login = login;
//# sourceMappingURL=auth.controller.js.map