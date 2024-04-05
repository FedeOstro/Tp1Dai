import 'dotenv/config'

const config = {
    user : process.env.DB_USER,
    password : process.env.BD_PASSWORD,
    server : process.env.DB_SERVER,
    database : process-env.DB_DATABASE,
    OPTION : {
        trustServerCertificate : true,
        trustedConnection : true,
    }
}

export default config;