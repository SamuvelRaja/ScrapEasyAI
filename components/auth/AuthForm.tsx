"use client"
import Link from "next/link";

import useAuthForm from "@/lib/hooks/useAuthForm";



type FormType = "Login" | "Signup";



export default function Authform({mode}:{mode:FormType}){

    const{
        useformhooks,
        loginedUser,
        error,
        showPassword,
        setShowPassword,
        onSubmit,
        handleLogOut,
        loading
    }=useAuthForm(mode)

    const { register, handleSubmit, formState: { errors } } = useformhooks;
    
    if(loginedUser){
        return (
      <div>
        <p>Logged in as {loginedUser.name}</p>
        <button type="button" onClick={handleLogOut}>
          Logout
        </button>
        {error&&<p className="text-red-500">{error}</p>}
      </div>
    );
    }
    return (<div>
            <form
             onSubmit={handleSubmit(onSubmit)}
             className="flex-col">
                {(mode==="Signup")&&<div className="mb-6">
                    <input
                        {...register("username")}
                        type="text"
                        placeholder="Username"
                        required
                        disabled={loading}
                        className={'username' in errors ? "border-red-500 input-auth":"border-[color:var(--border-primary)] input-auth"}
                    />
                    {'username' in errors &&  (
                        <p className="text-red-500 text-xs my-1">{errors.username?.message }</p>
                    )}
                </div>}
                <div className="mb-6">
                    <input
                    {...register("email")}   
                    placeholder="Email"
                    required
                    disabled={loading}
                    className={errors.email?.message ? "border-red-500 input-auth":"border-[color:var(--border-primary)] input-auth"} />
                    {errors.email?.message &&  (
                    <p className="text-red-500 text-xs my-1">{errors.email?.message }</p>
                    )}
                </div>
                <div className="relative mb-6">
                    <input
                        {...register("password")}
                        type={showPassword ? "text" : "password"}
                        placeholder={"Password"}
                        required
                        disabled={loading}
                        className={errors.password?.message ? "border-red-500 input-auth":"border-[color:var(--border-primary)] input-auth"}
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-[13px] text-xs text-gray-500"
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                    {errors.password?.message &&  (
                    <p className="text-red-500 text-xs my-1">{errors.password?.message }</p>
                    )}
                </div>
                {mode==="Signup"?
                    <div className="relative mt-6 mb-2">
                        <input
                        {...register("confirmPassword")}
                        id="confirmpass"
                        type={showPassword ? "text" : "password"}
                        placeholder="Re-enter Password"
                        required
                        disabled={loading}
                        className={'confirmPassword' in errors ? "border-red-500 input-auth":"border-[color:var(--border-primary)] input-auth"} />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-[13px] text-xs text-gray-500" 
                            onClick={() => setShowPassword((v) => !v)}
                        >
                            {showPassword ? "Hide" : "Show"}
                        </button>
                        {'confirmPassword' in errors &&  (
                        <p className="text-red-500 text-xs my-1">{errors.confirmPassword?.message }</p>
                    )}
                        <p className="text-sm mb-6 text-center text-(--text-primary)">Already have account: <Link href="/login" className="underline">Log in</Link></p>
                    </div>:<p className="text-sm mb-6 text-center text-(--text-primary)">Create new account: <Link href="/signup" className="underline">Sign up</Link> </p>
                }
                
                <div>
                    <button 
                        disabled={loading}
                    type="submit"
                    className="w-full px-4 py-2 rounded-sm border-[0.3px]  border-(--border-primary) bg-(--bg-secondary) hover:bg-[#080606]">{mode}</button>
                </div>
                {error&&<p className="text-red-500" >{error}</p>}
            </form>
    </div>
    );
}