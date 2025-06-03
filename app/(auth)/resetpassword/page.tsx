import Authform from "@/components/auth/AuthForm";

export default function ResetPasswordPage(){
    return<>
        <h1 className=" text-4xl text-center mb-8">Reset Password</h1>
        <Authform mode="Reset"/>
    </>
}