import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/Routes";
const app: Application = express();



//parsers
app.use(express.json());
app.use(cors());

//router
app.use('/api/v1', router)

app.get("/", (req: Request, res: Response) => {
  // const a= 10;
  // console.log(a)

  res.send("Hello World!");
});

export default app;
