import { responseHandler } from "../../src/utils/response-handler";
import { stringDateTime } from "../../src/utils/input-validators";
import { StatusCode } from "../../src/utils/status-code";
import express, { Response } from "express";
import { CustomResponse } from "../../src/utils/custom-response";
import { GenericAttendanceService } from "../../src/utils/generic-service-initializer";
import { Attendance } from "../../src/models/attendances";
import { ModelService } from "../../src/services/model-service";

// -------------------------------- Test Cases --------------------------------

// ['x', 'y']
// When findByPk returns 'y' to the ModelService expect 'x' status
const responseListFindAll = [
  [StatusCode.Success, [] as any[]], 
  [StatusCode.Success, [ {user: true}] as any[] ],
];

// Expect this status if an error is thrown
const responseListErr = [
  [StatusCode.ServerError]
]

// ['x', 'y']
// When findByPk returns 'y' to the ModelService expect 'x' status
const responseListFindByPk = [
  [StatusCode.Success, {user: true} as any], 
  [StatusCode.NotFound, null as any], 
]

// const statusAndNoResponse = [
// ];

// const statusWithBodyNoResponse = [
// ];
// ---------------------------------- Set-up ----------------------------------

const mockModel = (data?: any) => {
  const service: any = {};
  service.findAll = jest.fn().mockReturnValue(data);
  service.findByPk = jest.fn().mockReturnValue(data);
  return service;
};

const mockModelErr = () => {
  const service: any = {};
  service.findAll = jest.fn().mockImplementation(() => {throw Error("something wrong")});
  service.findByPk = jest.fn().mockImplementation(() => {throw Error("something wrong")});
  return service;
};

const mockModelSpecial = () => {
  const model: any = {}
  model.findByPk = jest.fn().mockReturnValue(mockObject());
  return model;
}

const mockModelSpecialErr = () => {
  const model: any = {}
  model.findByPk = jest.fn().mockReturnValue(mockObject({user: true}));
  return model;
}
// const mockModelUpdate = () => {
//   const service: any = {}
//   service.findByPk = 
// }

const mockObject = (data?: any) => {
  const obj: any = {};
  obj.save = jest.fn().mockReturnValue(data);
  obj.update = jest.fn().mockReturnValue(data);
  return obj;
}

const mockObjectErr = () => {
  const model: any = {};
  model.save = jest.fn().mockImplementation(() => {throw Error("something wrong")});
  model.update = jest.fn().mockImplementation(() => {throw Error("something wrong")});
  return model;
}
// ---------------------------------- Tests -----------------------------------


// --------------------------------- findAll ----------------------------------
describe("checks findAll with mocked values", () => {
  test.each(responseListFindAll)("the status code should be '%s' when the response is '%s'", async (status, response) => {
      // Arrange
      const mockService = new ModelService<Attendance>(mockModel(response));

      // Act
      const result = await mockService.findAll();

      // Assert
      expect(result.statusCode).toStrictEqual(status);
    }
  );
});

describe("checks findAll with mocked error", () => {
  test.each(responseListErr)("the status code should be '%s' when the response is Err'", async (status) => {
      // Arrange
      const mockService = new ModelService<Attendance>(mockModelErr());
      
      // Act
      const result = await mockService.findAll();

      // Assert
      expect(result.statusCode).toStrictEqual(status);
    }
  );
});


// --------------------------------- findByPk ---------------------------------

describe("checks findByPk with mocked values", () => {
  test.each(responseListFindByPk)("the status code should be '%s' when the response is '%s'", async (status, response) => {
      // Arrange
      const mockService = new ModelService<Attendance>(mockModel(response));

      // Act
      const result = await mockService.findByPk("1");

      // Assert
      expect(result.statusCode).toStrictEqual(status);
    }
  );
});

describe("checks findByPk with mocked error", () => {
  test.each(responseListErr)("the status code should be '%s' when the response is 'Err'", async (status) => {
      // Arrange
      const mockService = new ModelService<Attendance>(mockModelErr());
      
      // Act
      const result = await mockService.findByPk("error");

      // Assert
      expect(result.statusCode).toStrictEqual(status);
    }
  );
});

// ----------------------------------- save -----------------------------------

test("the status code should be '201' when the save response is '{user: true}'", async () => {
    // Arrange
    const mockService = new ModelService<Attendance>(mockModelSpecial());

    // Act
    const result = await mockService.save(mockObject());

    // Assert
    expect(result.statusCode).toStrictEqual(StatusCode.Created);
  }
);

test("the status code should be '500' when the response is 'Err'", async () => {
    // Arrange
    const mockService = new ModelService<Attendance>(mockModel());

    // Act
    const result = await mockService.save(mockObjectErr());

    // Assert
    expect(result.statusCode).toStrictEqual(StatusCode.ServerError);
  }
);

// ---------------------------------- update ----------------------------------

// test("the status code should be '200' when the save response is '{user: true}'", async () => {
//     // Arrange
//     const mockService = new ModelService<Attendance>(mockModelSpecial());

//     // Act
//     const result = await mockService.update("1", {user: true});

//     // Assert
//     expect(result.statusCode).toStrictEqual(StatusCode.Success);
//   }
// );

// test("the status code should be '400' when the object response is 'Err'", async () => {
//     // Arrange
//     const mockService = new ModelService<Attendance>(mockModelSpecialErr());

//     // Act
//     const result = await mockService.update("1", {user: true});

//     // Assert
//     expect(result.statusCode).toStrictEqual(StatusCode.ServerError);
//   }
// );

// test("the status code should be '404' when the save response is 'null'", async () => {
//     // Arrange
//     const mockService = new ModelService<Attendance>(mockModelSpecial());

//     // Act
//     const result = await mockService.save(mockObject());

//     // Assert
//     expect(result.statusCode).toStrictEqual(StatusCode.Created);
//   }
// );

// test("the status code should be '500' when the model response is 'Err'", async () => {
//     // Arrange
//     const mockService = new ModelService<Attendance>(mockModel());

//     // Act
//     const result = await mockService.save(mockObjectErr());

//     // Assert
//     expect(result.statusCode).toStrictEqual(StatusCode.ServerError);
//   }
// );