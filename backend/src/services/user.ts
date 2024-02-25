import { query } from "../assets/db/mysql";
import { createSQLParameters, createToken, dehashPassword } from "./helpers/util";

const addLoginData = async (userId: string, email: string): Promise<string> => {
    const token = createToken(userId, email);
    if (!token) throw new Error("Token could not be created!");

    return token;
}
let user: any;
export const login = async (email: string, password: string): Promise<string> => {
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

    const passwordMatch = dehashPassword(password, user[0].password);
    if (passwordMatch) {
        return createToken(user[0].id, user[0].email);
    } else {
        return ''
    }

}