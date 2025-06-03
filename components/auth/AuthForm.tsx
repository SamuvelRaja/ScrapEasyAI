"use client"
import Link from "next/link";
import { useState } from "react";
import { account, ID } from "@/app/appwrite";
import type { Models } from "appwrite";
import { logout } from "@/lib/utility";

type User = Models.User<Models.Preferences> | null;
interface AuthFormProps{
        mode:"Login"|"Signup"|"Reset"
    }

export default function Authform({mode}:AuthFormProps){
    const[loginedUser, setLoginedUser]=useState<User>(null)
    const[name, setName]=useState<string>('');
    const[email, setEmail]=useState<string>('');
    const[password, setPassword]=useState<string>('');
    const[confirmPassword, setConfirmPassword]=useState<string>('')
    const[error, setError]=useState<string|null>(null)
    // Show/hide password states
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const login= async(mail:string, pass:string)=>{
        try{
            await account.createEmailPasswordSession(mail, pass);
            setLoginedUser(await account.get());
            setError(null)
        }catch{
            setError("login failed")
        }
    }

    const signup= async()=>{
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        try{
            await account.create(ID.unique(), email, password, name)
            login(email,password);
            setError(null)
        }catch{
            setError("Signup Failed")
        }
    }

    const logOut=()=>{
        try{
            logout()
            setLoginedUser(null)
            setError(null)
        }
        catch{
            setError("logout Failed")
        }
    }

    if(loginedUser){
        return (
      <div>
        <p>Logged in as {loginedUser.name}</p>
        <button type="button" onClick={logOut}>
          Logout
        </button>
        {error&&<p className="text-red-500">{error}</p>}
      </div>
    );
    }
    return (<div>
            <form action="" className="flex-col">
                {mode==="Signup"&&<div>
                    <input type="text"
                    placeholder="name" 
                    required
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                    className="w-full mb-6 px-4 py-2 rounded-sm border-[0.3px]  border-(--border-primary) bg-(--btn-primary) hover:bg-(--bg-secondary)" />
                </div>}
                <div>
                    <input type="email"
                    placeholder="Email"
                    required
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className="w-full mb-6 px-4 py-2 rounded-sm border-[0.3px]  border-(--border-primary) bg-(--btn-primary) hover:bg-(--bg-secondary)" />
                </div>
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder={mode==="Reset"?"New Password":"Password"}
                        required
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                        className="w-full mb-6 px-4 py-2 rounded-sm border-[0.3px] border-(--border-primary) bg-(--btn-primary) hover:bg-(--bg-secondary)"
                    />
                    <button
                        type="button"
                        tabIndex={-1}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-500"
                        onClick={() => setShowPassword((v) => !v)}
                    >
                        {showPassword ? "Hide" : "Show"}
                    </button>
                </div>
                {mode==="Signup"?
                    <div className="relative">
                        <input id="confirmpass"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Re-enter Password"
                        required
                        value={confirmPassword}
                        onChange={(e)=>setConfirmPassword(e.target.value)}
                        className="w-full mb-2 px-4 py-2 rounded-sm border-[0.3px] border-(--border-primary) bg-(--btn-primary) hover:bg-(--bg-secondary)" />
                        <button
                            type="button"
                            tabIndex={-1}
                            className="absolute right-3 top-2 text-xs text-gray-500"
                            onClick={() => setShowConfirmPassword((v) => !v)}
                        >
                            {showConfirmPassword ? "Hide" : "Show"}
                        </button>
                        <p className="text-sm mb-6 text-center text-(--text-primary)">Already have account: <Link href="/login" className="underline">Log in</Link></p>
                    </div>:<p className="text-sm mb-6 text-center text-(--text-primary)">Create new account: <Link href="/signup" className="underline">Sign up</Link> </p>
                }
                
                <div>
                    <button 
                    onClick={(e) => {
                        e.preventDefault();
                        if (mode === "Login") {
                            login(email, password);
                        } else {
                            signup();
                        }
                    }}
                    className="w-full px-4 py-2 rounded-sm border-[0.3px]  border-(--border-primary) bg-(--bg-secondary) hover:bg-[#080606]">{mode}</button>
                </div>
                {error&&<p className="text-red-500">{error}</p>}
            </form>
    </div>
    );
}