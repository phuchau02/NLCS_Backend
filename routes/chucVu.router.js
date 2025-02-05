import express from "express";
import {
  create,
  findAll,
  findOne,
  update,
  remove,
  removeAll,
} from "../controllers/chucVu.controllers.js";

const chucVuRouter = express.Router();

chucVuRouter.post("/", create);

chucVuRouter.get("/", findAll);

chucVuRouter.get("/:id", findOne);

chucVuRouter.put("/:id", update);

chucVuRouter.delete("/:id", remove);

chucVuRouter.delete("/", removeAll);

export default chucVuRouter;
