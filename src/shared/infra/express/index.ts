import "reflect-metadata";
import dotenv from "dotenv";

import { app } from "./app";

dotenv.config();

app.listen(process.env.SERVER_PORT, () =>
  console.log(`🚀 Server started at port - ${process.env.SERVER_PORT}`)
);
