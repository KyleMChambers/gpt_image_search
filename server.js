import * as dotenv from "dotenv";
dotenv.config();

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI,
});

import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.post("/dream", async (req, res) => {
  try {
    const prompt = req.body.prompt;
    const aiResponse = await openai.images.generate({
      prompt,
      n: 1,
      size: "1024x1024",
    });
    const image = aiResponse.data[0].url;
    res.send({ image });
  } catch (error) {
    console.log("Error :", error);
    res.status(500).send(error?.error.message || "something went wrong");
  }
});

app.listen(8080, () => console.log("make art on http://localhost:8080/dream"));
