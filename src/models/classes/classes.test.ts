import { Class, initializedClass } from "./classes";

// Pointless test, both are identical, for some reason...
test("User matches ORM User", () => {
  const classObj = Class;
  const ormClass = initializedClass;

  expect(classObj).toEqual(ormClass);
});
