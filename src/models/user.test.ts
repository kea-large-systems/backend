import { initialized_user, User } from "./user"

// Pointless test, both are identical, for some reason...
test("User matches ORM User", () => {
    
    const user = User;
    const ormUser = initialized_user;
    
    expect(user).toEqual(ormUser);
})
