import express from 'express';
import dotenv from 'dotenv';
import { PrismaClient } from "./generated/prisma/index.js";

dotenv.config();

const app = express();
const prisma = new PrismaClient();

const port = process.env.PORT;

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    if(!name || !email || !password || !role) {
        return res.status(400).send("All fields are required");
    }

    const hashedPassword = await bcrypt.hash(password, 5);

    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            role
        }
    });

    // Handle signup logic here
    if(newUser) {
      res.status(201).send("User signed up");
    }

    else {
      res.status(500).send("Error signing up user");
    }
})

app.listen(port, () => {
  console.log(`app listening on port ${port}`)
})