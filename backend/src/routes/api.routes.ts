import express from "express";

import { crudApi } from "../api";

const app = express.Router()

app.use("/crud", crudApi)

export { app }