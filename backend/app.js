import express, { urlencoded } from "express";

const app = express();

app.use(urlencoded({extended: true}));
app.use(express.json());

export { app };