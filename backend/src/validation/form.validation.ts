import {z} from "zod";

export const formValidation = z.object({
    title: z.string().min(3, "Name must be at least 3 characters long"),
    email: z.string().email("Invalid email address"),
    message: z.string().min(10, "Message must be at least 10 characters long"),   
})