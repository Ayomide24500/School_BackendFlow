import { Application, Request, Response } from "express";
import school from "./router/schoolRouter";
import staff from "./router/staffRouter";
import session from "./router/staffRouter";
export const mainApp = async (app: Application) => {
  try {
    app.use("/api/v1", school);
    app.use("/api/v1", staff);
    app.use("/api/v1", session);
    app.get("/", (req: Request, res: Response) => {
      try {
        res.status(200).json({
          message: "Welcome to my production api",
        });
      } catch (error) {
        res.status(404).json({
          message: "Error fetching default message",
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};
