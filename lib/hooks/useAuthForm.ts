import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { loginUser, signupUser, logout } from "@/lib/utility/query";
import { signupSchema,loginSchema, type LoginForm, type signupForm } from "../utility/zschema";
import { account } from "@/app/appwrite";
import type { Models } from "appwrite";

type User = Models.User<Models.Preferences> | null;
type formtype="Login"|"Signup"

export default function useAuthForm(mode:formtype){
    const[loginedUser, setLoginedUser]=useState<User>(null)
    const[error, setError]=useState<string|null>(null)
    const[showPassword, setShowPassword] = useState(false);

    const useformhooks=useForm<LoginForm |signupForm>({
        resolver:zodResolver(mode==="Login"?loginSchema:signupSchema),
        mode:"onBlur",
        reValidateMode:"onChange",
        defaultValues:mode==="Login"?{email:"",password:""}: { username: "", email: "", password: "", confirmPassword: "" }
    })

    const loginMutation=useMutation({
        mutationFn:loginUser,
        onSuccess:async ()=>{
            setLoginedUser(await account.get())
            setError(null)
        },
        onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : "login failed";
            setError(message);
        }
    })

    const signupMutation=useMutation({
        mutationFn:signupUser,
        onSuccess: async (apiResponse, submittedVariables) => {
            // Auto-login after signup using the submitted credentials
            loginMutation.mutate({ 
                mail: submittedVariables.email, 
                pass: submittedVariables.password 
            })},
        onError: (err: unknown) => {
            const message = err instanceof Error ? err.message : "signup failed";
            setError(message);
        }
    })
    const onSubmit = (data: LoginForm | signupForm) => {
        if (mode === "Login") {
            loginMutation.mutate({
                mail: data.email,
                pass: data.password
            });
        } else {
            if ("username" in data) {
                signupMutation.mutate({
                    email: data.email,
                    password: data.password,
                    username: data.username
                });
            }
        }
    };

    const handleLogOut= async ()=>{
        try{
            await logout();
            setLoginedUser(null)
            setError(null)
            useformhooks.reset()
        }
        catch{
            setError("Logout Failed")
        }
    }

    return {
        useformhooks,
        loginedUser,
        error,
        showPassword,
        setShowPassword,
        onSubmit,
        handleLogOut,
        loading: loginMutation.isPending || signupMutation.isPending,
    };
}