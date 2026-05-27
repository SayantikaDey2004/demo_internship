import { Request, Response } from "express";
import FormModel from "../../models/form.model";
export const submitForm = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { title, email, message } = req.body;
    if (!title || !email || !message) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }
    const form = await FormModel.create({ title, email, message });
    res.status(201).json({ message: "Form Submitted Successfully", data: form });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};