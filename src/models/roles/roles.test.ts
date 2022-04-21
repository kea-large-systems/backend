import { initializedRole, Role } from "./roles";

// Pointless test, both are identical, for some reason...
test("User matches ORM User", () => {
  const roleObj = Role;
  const ormRole = initializedRole;

  expect(roleObj).toEqual(ormRole);
});
