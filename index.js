import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}));

app.use(express.json({limit: "1mb"}));
app.use(express.urlencoded({extended: true, limit: "1mb"}));
app.use(express.static("public"));
app.use(cookieParser());

app.get('/', (req, res) => {
    return res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
});