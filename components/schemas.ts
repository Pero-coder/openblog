import { z } from "zod";

const MAX_FILE_SIZE = 4.5 * 1024 * 1024; // 4.5 MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

export const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, {
        message: "File size should be less than 4.5 MB",
    })
    .refine((file) => ACCEPTED_IMAGE_TYPES.includes(file.type), {
        message: "Invalid file type. Only JPEG, PNG, and WEBP are allowed",
    });

export const titleSchema = z.string().min(1).max(100);
export const contentSchema = z.string().min(1).max(10000);

export const usernameSchema = z
    .string()
    .min(1)
    .max(20)
    .refine((value) => encodeURIComponent(value) === value, {
        message: "Username must be URL safe",
    });

export const nameSchema = z.string().min(1).max(100);
export const bioSchema = z.string().max(1000);
