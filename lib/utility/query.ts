import { account, ID } from "@/app/appwrite";
import { AppwriteException } from "appwrite"



 
export  async function logout() {
    await account.deleteSession("current");
  };

export  async function loginUser({mail,pass}:{mail:string; pass:string}){
        try{
            const session= await account.createEmailPasswordSession(mail, pass);
            return session;
        }catch(error: unknown){
          if (error instanceof AppwriteException) {
          throw new Error(error.message || "login failed")
          }
          throw new Error("login failed")
        }
    }

export async function signupUser({ email, password, username}:{ email:string, password:string, username:string}){
        
        try{
            await account.create(ID.unique(), email, password, username)
            
        }catch (error: unknown) {
          if (error instanceof AppwriteException) {
            throw new Error(error.message || "login failed")
          }
          throw new Error("login failed")
        }
    }