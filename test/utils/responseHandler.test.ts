import { responseHandler } from "../../src/utils/response-handler";
import { stringDateTime } from "../../src/utils/input-validators";
import { StatusCode } from "../../src/utils/status-code";
import express, { Response } from "express";
import { CustomResponse } from "../../src/utils/custom-response";

// -------------------------------- Test Cases --------------------------------
const message = "Values";

const statusAndResponses = [
  { statusCode: StatusCode.Success, model: "Success Test!" },
  { statusCode: StatusCode.Created, model: "Created Test!" },
  { statusCode: StatusCode.NotFound, model: { error: 404, message: `${message} not found.` }},
  { statusCode: StatusCode.ServerError, model: { error: 500, message: "Internal server error" }},
];

const statusAndNoResponse = [
  { statusCode: StatusCode.Success, model: null },
  { statusCode: StatusCode.Created, model: null },
];

const noContentCondition = [{ statusCode: StatusCode.NoContent }];

// ---------------------------------- Set-up ----------------------------------

const mockResponse = () => {
  const res: any = {};
  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);
  return res;
};

// ---------------------------------- Tests -----------------------------------

describe("checks responses with messages", () => {
  test.each(statusAndResponses)( "when the StatusCode is '%s'", async ({ statusCode, model }) => {
      // Arrange
      const res = mockResponse();
      const customResult = { statusCode, model };
      const text = message;

      // Act
      responseHandler(text, customResult, res);

      // Assert
      expect(res.send).toHaveBeenCalledWith(model);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    }
  );
});

describe("checks responses without messages", () => {
  test.each(statusAndNoResponse)("when the StatusCode is '%s'", async ({ statusCode }) => {
      // Arrange
      const res = mockResponse();
      const customResult = { statusCode, model: null };
      const text = message;

      // Act
      responseHandler(text, customResult, res);

      // Assert
      expect(res.send).toHaveBeenCalledWith(null);
      expect(res.status).toHaveBeenCalledWith(statusCode);
    }
  );
});

describe("checks no content without messages", () => {
  test.each(noContentCondition)("when the StatusCode is '%s'", async ({ statusCode }) => {
      // Arrange
      const res = mockResponse();
      const customResult = { statusCode, model: null };
      const text = message;

      // Act
      responseHandler(text, customResult, res);

      // Assert
      expect(res.send).toHaveBeenCalledWith();
      expect(res.status).toHaveBeenCalledWith(statusCode);
    }
  );
});
