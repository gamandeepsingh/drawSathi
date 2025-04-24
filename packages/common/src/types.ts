import { z } from "zod";

export const CreateUserSchema = z.object({
    email : z.string().email(),
    username: z.string().min(1).max(20),
    password : z.string().min(8).max(20),
    name: z.string().min(1).max(20),
})

export const signInSchema = z.object({
    email : z.string().email(),
    password : z.string().min(8).max(20),
})

export const createRoomSchema = z.object({
    name: z.string().min(1).max(20),
})
