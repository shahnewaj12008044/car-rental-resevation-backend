import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/Routes";
import notFound from "./app/middlewares/notFound";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";
const app: Application = express();



//parsers
app.use(express.json());
app.use(cors({origin:["http://localhost:5173"],credentials:true}));


//router
app.use('/api', router)

//no data found

app.get("/", (req: Request, res: Response) => {
  // const a= 10;
  // console.log(a)

  res.send("Hello World!");
});

//Global error handler:
app.use(globalErrorHandler);

//not found
app.use(notFound);



export default app;
