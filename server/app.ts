// import * as dotenv from 'dotenv';
import * as express from "express";
import * as morgan from "morgan";
import * as mongoose from "mongoose";
import * as path from "path";
import * as cors from "cors";

import setRoutes from "./routes";

const app = express();
// dotenv.config();
app.set("port", process.env.PORT || 3000);
app.use(cors());
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "../public")));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// let mongodbURI;
// if (process.env.NODE_ENV === 'test') {
//   mongodbURI = process.env.MONGODB_TEST_URI;
// } else {
//   mongodbURI = process.env.MONGODB_URI;
//   app.use(morgan('dev'));
// }

mongoose.Promise = global.Promise;
mongoose.set("useCreateIndex", true);
mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useUnifiedTopology", true);
mongoose
  .connect("mongodb://localhost:27017/pepitas")
  .then(db => {
    console.log(`Connected to MongoDB ${typeof db}`);

    setRoutes(app);

    app.get("/*", (req: any, res) => {
      res.sendFile(path.join(__dirname, "../public/index.html"));
    });

    if (!module.parent) {
      app.listen(app.get("port"), () =>
        console.log(`Angular Full Stack listening on port ${app.get("port")}`)
      );
    }
  })
  .catch(err => console.error(err));

export { app };
