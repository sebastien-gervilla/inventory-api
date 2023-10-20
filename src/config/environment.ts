const nodeEnv = process.env.NODE_ENV?.trim();
const port = process.env.PORT;
const databaseUri = process.env.DB_URI;

export {
    nodeEnv,
    port,
    databaseUri,
}