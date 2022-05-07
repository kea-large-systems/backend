import { Role } from "../models/roles";
import { User } from "../models/users";

export const populateRole = async () => {
  const studentRole = Role.build({
    name: "student"
  });
  console.log('after building');
  await studentRole.save();
  console.log('after saving');
  
  const teacherRole = Role.build({
    name: "teacher"
  });
  await teacherRole.save();  
}

export const populateUser = async () => {
  const studentRole = await Role.findOne({where: {name: 'student'}});
  const studentRoleId = studentRole?.roleId;
  const teacherRole = await Role.findOne({where: {name: 'teacher'}});
  const teacherRoleId = teacherRole?.roleId;

  const student1 = User.build({
    name: 'student1',
    email: 'student1@stud.kea.dk',
    roleId: studentRoleId
  });
  const student2 = User.build({
    name: 'student2',
    email: 'student2@stud.kea.dk',
    roleId: studentRoleId
  });
  const student3 = User.build({
    name: 'student3',
    email: 'student3@stud.kea.dk',
    roleId: studentRoleId
  });
  await student1.save();
  await student2.save();
  await student3.save();
  const teacher1 = User.build({
    name: 'teacher1',
    email: 'teacher1@kea.dk',
    roleId: teacherRoleId
  });
  const teacher2 = User.build({
    name: 'teacher2',
    email: 'teacher2@kea.dk',
    roleId: teacherRoleId
  });
  const teacher3 = User.build({
    name: 'teacher3',
    email: 'teacher3@kea.dk',
    roleId: teacherRoleId
  });
  await teacher1.save();
  await teacher2.save();
  await teacher3.save();
}