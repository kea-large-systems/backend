// Mark as an external module, we need at least one export.
// can be removed if we export something else
export {}; 

/*
TODO:
- Ask the guys if they have an idea for how to set global variables like this.
- Refactor / Delete file.
Didn't work to have this here during run-time, moved to user.authentication.ts
declare global {
  namespace Express {
    interface User {
      username: string;
      id?: number;
    }
  }
}
*/