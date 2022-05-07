import Express from "express";
import { Attendance } from "../models/attendances";
import { ClassCodeService } from "../services/class-code-service";
import { responseHandler } from "../utils/response-handler";
import { StatusCode } from "../utils/status-code";

const router = Express.Router();

router.get("/:lectureId", (req, res) => {
  const { lectureId } = req.params;

  const code = ClassCodeService.generateCode(lectureId);

  res.send({ code });
});

router.get("/attend/:code", async (req, res) => {
  const { code } = req.params;
  const userId = req.body.userId;

  const status = ClassCodeService.validateCode(code);

  ClassCodeService.markAttendance(status, userId, res);
});

router.delete("/:lectureId", (req, res) => {
  const { lectureId } = req.params;

  const success = ClassCodeService.deleteCode(lectureId);

  if (success) {
    res.status(200).send({ status: 200, message: "Deleted." });
  } else {
    res.status(500).send({ status: 500, message: "Internal Server Error" });
  }
});

export { router as ClassCodeRouter };
