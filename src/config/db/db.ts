import { Sequelize } from "sequelize";

let sequelize: Sequelize;

if (process.env.DATABASE_URL)
  sequelize = new Sequelize(process.env.DATABASE_URL);
else
  sequelize = new Sequelize({
    dialect: "postgres",
    host: process.env.DB_HOST,
    port: +process.env.DB_PORT!,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

export async function connectDb() {
  try {
    await sequelize.authenticate();
    console.log("Established connection to DB");
  } catch (error) {
    console.error("DB connection error: " + error);
    throw error;
  }
}

export { sequelize };
