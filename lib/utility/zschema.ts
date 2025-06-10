import {z} from "zod";


export const loginSchema=z.object({
    email:z.string().email("invalid email"),
    password:z.string().min(8,"password must be min 8 characters")
    .regex(/[a-z]/,"password must contian at least one lower case a to z")
    .regex(/[A-Z]/,"password must contian at least one uppercase case A to Z")
    .regex(/\d/,"password must contian at least one number")
    .regex(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/,"password must contian at least one one special character")
})

export const signupSchema =loginSchema.extend({
    username:z.string().min(1, "Name is required"),
    confirmPassword:z.string(),
}).refine((data) => data.password === data.confirmPassword,{
    message:"passwords do not match",
    path:["confirmPassword"],
});

export type LoginForm =z.infer<typeof loginSchema>
export type signupForm =z.infer<typeof signupSchema>