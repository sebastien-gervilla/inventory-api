export const getEnv = () => ({
    nodeEnv: process.env.NODE_ENV!.trim(),
    port: process.env.PORT,
    databaseUri: process.env.DB_URI,
})