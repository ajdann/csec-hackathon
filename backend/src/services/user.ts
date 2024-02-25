import { query } from "../assets/db/mysql";
import { createSQLParameters, createToken, dehashPassword } from "./helpers/util";

const addLoginData = async (userId: string, email: string): Promise<string> => {
    const token = createToken(userId, email);
    if (!token) throw new Error("Token could not be created!");

    return token;
}
let user: any;
export const login = async (email: string, password: string): Promise<string> => {
    console.log(email)
    console.log(password)
    const queryEmail =
        `SELECT 
    id,
    email,
    password
    FROM
    users
    WHERE
    email = ?;
    `;

    user = await query(
        queryEmail,
        createSQLParameters(email)
    );
    console.log(user)
    if (user.length === 0) {
        console.log("User not found");
        // return "User not found"; // or throw new Error("User not found");
    }

    const passwordMatch = dehashPassword(password, user[0].password);
    if (passwordMatch) {
        return createToken(user[0].id, user[0].email);
    } else {
        return ''
    }

}