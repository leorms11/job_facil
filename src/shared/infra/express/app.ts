import express from "express";

import { globalErrorHandler } from "./middlewares/GlobalErrorHandler";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.get("/teste", (req, res) => {
  return res.status(201).json({
    message: "Hello World!",
  });
});

app.use(router);
app.use(globalErrorHandler);

export { app };
