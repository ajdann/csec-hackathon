import mysql, { Connection, ConnectionOptions, ErrorPacketParams } from 'mysql2/promise';

//TODO prebaciti u env 
const access: ConnectionOptions = {
    connectionLimit: 15,
    user: "csec",
    password:"jakotezakpassword123",
    host: "csec-mysql",
    port: Number(3306),
    database: "csec_hackathon"
};

const connect = async (): Promise<Connection> => {
    return await mysql.createPool(access);
}

//Mediator pattern reference
export const query = async (query: string, params?: string[]) => {
    try {
        console.log(access)
        const conn = await connect();
        var result = (await conn.query(query, params || []))[0];
        return result;
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export const command = async (query: string, params?: string[]) => {
    try {
        const conn = await connect();
        await Promise.all(
            [
                conn.beginTransaction(),
                conn.execute(query, params || []),
                conn.commit()
            ]
        );

    } catch (error) {
        console.log(JSON.stringify(error));
    }
}

export const multiQuery = async (queries: string[], params: string[][]) => {
    try {
        const conn = await connect();
        await Promise.all(
            [
                conn.beginTransaction(),
                queries.forEach((query, indx) => {
                    conn.execute(query, params[indx] || [])
                }),
                conn.commit()
            ]
        )
    } catch (error) {
        console.log(JSON.stringify(error));
    }
}