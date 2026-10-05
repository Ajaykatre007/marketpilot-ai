import express from "express";
import cors from "cors";
import "dotenv/config";

const app=express();
app.use(cors()); app.use(express.json());
app.use(express.static("public"));

app.post("/api/ai", async (req,res)=>{
  // Put your chosen AI provider call here.
  // IMPORTANT: keep API keys in environment variables, never in browser code.
  const {business, task} = req.body;
  if(!business) return res.status(400).json({error:"business is required"});
  return res.json({
    mode:"placeholder",
    message:"AI provider not connected yet.",
    task,
    business
  });
});
app.listen(process.env.PORT||3000,()=>console.log("MarketPilot server running"));
