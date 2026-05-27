import mongoose from "mongoose";

const env = process.env.NODE_ENV?.trim().toLowerCase() || "dev";
const DB_CONNECTION_URI: Record<string, { uri: string }> = {
  local: { uri: process.env.DB_LOCAL || "" },
  dev: { uri: process.env.DB_DEV || "" },
  prod: { uri: process.env.DB_PROD || "" }
};

const selectedConfig = DB_CONNECTION_URI[env] || DB_CONNECTION_URI.dev || DB_CONNECTION_URI.local;
const DB_URI = selectedConfig?.uri || "";


if (!DB_URI) {
  throw new Error(`Database URI is missing for environment: ${env}`);
}

const connectDB = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Database connected for ${env} environment`);
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    process.exit(1);
  }
};

export default connectDB;
