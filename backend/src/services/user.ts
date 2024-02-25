import { createToken } from "./helpers/util";

const addLoginData = async (userId: string, email: string): Promise<string> => {
    const token = createToken(userId, email);
    if (!token) throw new Error("Token could not be created!");

    return token;
}