import { query } from "../assets/db/mysql";

export const getReadings = async () => {
    const queryString = 
    `
    SELECT 
        * 
    FROM 
        readings;
    `

    const data = await query(queryString);
    return data;
}