// --------------------------------- Imports ----------------------------------
import { sequelize } from "../../config/mysql";
import {
  Attendance,
  attendanceAssociationInit,
  attendanceInit,
} from "../attendances";
import { lectureInit } from "../lectures";
import { userInit } from "../users";

// ---------------------------- Partitions -----------------------------

// TODO - REFACTOR TO USE BVA
const validPartitions = [
  ["1000-01-01 00:00"],
  ["2021-12-24 23:59"],
  ["9999-12-31 23:59"],
];

// TODO - REFACTOR TO USE BVA
const invalidPartitions = [
  ["999-01-01 00:00"],
  ["0999-01-01 00:00"],
  ["10000-01-01 00:00"],
  ["2022-06-03 25:15"],
  ["2022-13-15 12:24"],
  ["2022-11-31 13:15"], // there is no november 31
  ["1678-1-01 13:24"], // must have two digits for month
  ["1678-01-1 13:24"], // must have two digits for day
  ["2022-07-11 1:12"],
  ["2022-07-11 1:12"],
  ["1997-12-30 10:60"],
  [""],
  ["look at me, i'm a date!"],
  ["2022/06/03 20:44"],
];

// TODO - REFACTOR TO USE BVA
const invalidPartitionsNumbers = [
  [1654283556673],
  [1111111111111],
  [123123123123123123123123123123],
  [0],
];

// TODO - REFACTOR TO USE BVA
const invalidPartitionsObjects = [
  [{ date: "2020-01-15 12:00" }],
  [{}],
  [null]
];

// ----------------------------- Setup Functions ------------------------------

beforeAll(() => {
  attendanceInit(sequelize);
  userInit(sequelize);
  lectureInit(sequelize);
  attendanceAssociationInit();
});

// ---------------------------------- Tests -----------------------------------

it("should pass", () => {
  expect(Attendance).not.toBeNull();
});

describe("Valid date partitions", () => {
  it.each(validPartitions)("when the date is '%s'", async (date) => {
    // Arrange
    const testBody = { lectureId: 1, userId: 1, attendedAt: date };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).resolves.not.toThrow();
  });
});

describe("Invalid date partitions - strings", () => {
  it.each(invalidPartitions)("when the date is '%s'", async (date) => {
    // Arrange
    const testBody = { lectureId: 1, userId: 1, attendedAt: date };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).rejects.toThrow();
  });
});

describe("Invalid date partitions - numbers", () => {
  it.each(invalidPartitionsNumbers)("when the date is '%s'", async (date) => {
    // Arrange
    const testBody = { lectureId: 1, userId: 1, attendedAt: date };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).rejects.toThrow();
  });
});

describe("Invalid date partitions - object", () => {
  it("When date is null", async () => {
    const testBody = {
      lectureId: 1,
      userId: 1,
      attendedAt: invalidPartitionsObjects[0],
    };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).rejects.toThrow();
  });

  it("When date is an empty object", async () => {
    const testBody = {
      lectureId: 1,
      userId: 1,
      attendedAt: invalidPartitionsObjects[1],
    };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).rejects.toThrow();
  });

  it("when date is an object", async () => {
    const testBody = {
      lectureId: 1,
      userId: 1,
      attendedAt: invalidPartitionsObjects[2],
    };
    // Act
    const attendanceObject = Attendance.build(testBody);
    // Assert
    await expect(attendanceObject.validate()).rejects.toThrow();
  });
});
