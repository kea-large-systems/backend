import express from "express";
import { Attendance } from "../models/attendances";
import { ModelService } from "../services/model-service";
import { responseHandler } from "../utils/response-handler";

const router = express.Router();
const AttendanceService = new ModelService(Attendance);

router.get("/", async (_req, res) => {
  const response = await AttendanceService.findAll();
  responseHandler("UAttendance", response, res);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await AttendanceService.findByPk(id);
  responseHandler("Attendance", response, res);
});

router.post("/", async (req, res) => {
  const requestObject = filterBody(req.body);
  const newAttendance = Attendance.build(requestObject);

  const response = await AttendanceService.save(newAttendance);
  responseHandler("Attendance", response, res);
});

router.patch("/:id", async (req, res) => {
  const { id } = req.params;
  const requestObject = filterBody(req.body);

  const response = await AttendanceService.update(id, requestObject);
  responseHandler("Attendance", response, res);
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  const response = await AttendanceService.delete(id);
  responseHandler("Attendance", response, res);
});

/**
 *
 * @param body Request body
 * @returns Object containing all needed Attendance attributes
 */
const filterBody = (body: {
  userId: any;
  lectureId: any;
  attendanceAt: any;
}) => {
  const { userId, lectureId, attendanceAt } = body;
  return { userId, lectureId, attendanceAt };
};

export { router as AttendanceRouter };
