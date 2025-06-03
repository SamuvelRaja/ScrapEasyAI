 import { account} from "@/app/appwrite";

 export const logout = async () => {
    await account.deleteSession("current");
  };