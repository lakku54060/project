const port = Number(process.env.PORT || 5000);
const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/shopix";
const jwtSecret = process.env.JWT_SECRET || "dev_jwt_secret_change_me";

const corsOrigins = (process.env.CORS_ORIGINS || "http://127.0.0.1:5173,http://localhost:5173")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

module.exports = {
  port,
  mongoUri,
  jwtSecret,
  corsOrigins,
};
