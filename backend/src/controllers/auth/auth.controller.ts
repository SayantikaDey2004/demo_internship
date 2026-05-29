import { Request, Response } from "express";
import UserModel from "../../models/user.model";
import generateToken from "../../utils/jwt/generateToken";
import { rolesType } from "../../@types/types/roles.type";
import {
  loginValidation,
  signupValidation
} from "../../validation/auth.validation";
import {
  comparePassword,
  hashPassword
} from "../../utils/jwt/hashPassword";

export const signup = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = signupValidation.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten().fieldErrors
      });
      return;
    }

    const { name, email, password, role } = parsed.data;

    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        message: "User already exists"
      });

      return;
    }

    const hashedPassword = await hashPassword(password);

    const resolvedRole: rolesType = role === "admin" ? "admin" : "user";
    const user = await UserModel.create({
      name,
      email,
      password: hashedPassword,
      role: resolvedRole
    });

    res.status(201).json({
      message: "Signup successful",
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const parsed = loginValidation.safeParse(req.body);
    if (!parsed.success) {
      res.status(400).json({
        message: "Validation error",
        errors: parsed.error.flatten().fieldErrors
      });
      return;
    }

    const { email, password } = parsed.data;

    const user = await UserModel.findOne({ email });

    if (!user) {
      res.status(400).json({
        message: "Invalid credentials"
      });

      return;
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
      res.status(400).json({
        message: "Invalid credentials"
      });

      return;
    }

    const token = generateToken(
      user._id.toString(),
      user.role
    );

    res.json({
      token,
      role: user.role,
      name: user.name,
      email: user.email
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

export const logout = async (
  _req: Request,
  res: Response
): Promise<void> => {
  res.json({ message: "Logged out" });
};
