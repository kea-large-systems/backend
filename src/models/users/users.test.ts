import { initializedUser, User } from "./users";

// Pointless test, both are identical, for some reason...
test("User matches ORM User", () => {
  const user = User;
  const ormUser = initializedUser;

  expect(user).toEqual(ormUser);
});
