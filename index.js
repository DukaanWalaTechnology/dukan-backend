import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import axios from "axios";
// import morgan from "morgan";
import logger from "./logger.js";
import morgan from "morgan";
import databaseConnection from "./database-config/databaseConfig.js"
import userRoute from "./routes/user.route.js"
import adminRoute from "./routes/admin.route.js"
import shopKeeperRoute from "./routes/shopkeeper.route.js"
import fileUpload from 'express-fileupload';
import { cloudinaryConnect } from "./lib/cloudinaryConnect.js";

const app=express();
const morganFormat = ":method :url :status :response-time ms";
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/',  // or specify your own path
}));
// app.use(express.json())
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);
app.use(
    morgan(morganFormat, {
      stream: {
        write: (message) => {
          const logObject = {
            method: message.split(" ")[0],
            url: message.split(" ")[1],
            status: message.split(" ")[2],
            responseTime: message.split(" ")[3],
          };
          logger.info(JSON.stringify(logObject));
        },
      },
    })
  );
databaseConnection()
cloudinaryConnect()
app.use("/api/user", userRoute);
app.use("/api/admin", adminRoute);
app.use("/api/shopkeeper", shopKeeperRoute);

app.listen(process.env.PORT||8000,()=>{
    console.log(`Server listening on ${process.env.PORT}`);
    logger.info(`server listening on ${process.env.PORT}`);

})

