import { Attendance } from "../models/attendances";
import { Class } from "../models/classes";
import { Lecture } from "../models/lectures";
import { Role } from "../models/roles";
import { Subject } from "../models/subjects";
import { User } from "../models/users";

/**
 * Order that they need to be in.
 * - Role
 * - User : using FK of role
 * - Class
 * - Subject : using FK of Teacher user and FK of Class
 * - Lecture : using FK of Subject
 * - Attendance : using FK of User and FK of Lecture 
 */

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

export const populateClasses = async () => {
  const class1 = Class.build({
    name: 'class1'
  });
  const class2 = Class.build({
    name: 'class2'
  });
  await class1.save();
  await class2.save();
}

export const populateSubjects = async () => {
  const teacher1 = await User.findOne({where: {roleId: 2}});
  const class1 = await Class.findOne({where: {name: 'class1'}});

  const subject1 = Subject.build({
    name: 'subject1',
    teacherUserId: teacher1?.userId,
    classId: class1?.classId,
  });

  const subject2 = Subject.build({
    name: 'subject2',
    teacherUserId: teacher1?.userId,
    classId: class1?.classId
  });

  await subject1.save();
  await subject2.save();
}

export const populateLectures = async () => {
  const subject1 = await Subject.findOne({where: {name: 'subject1'}});
  
  const lecture1 = Lecture.build({
    name: 'lecture1',
    startedAt: '2022-05-07T13:38:34.000Z',
    endedAt: '2022-05-07T13:38:34.000Z',
    subjectId: subject1?.subjectId,
  });

  await lecture1.save();
}

export const populateAttendances = async () => {
  const user1 = await User.findOne({where: {roleId: 1}});
  const lecture1 = await Lecture.findOne({where: {name: 'lecture1'}});

  const attendance1 = Attendance.build({
    attendedAt: '2022-05-07T13:38:34.000Z',
    userId: user1?.userId,
    lectureId: lecture1?.lectureId,
  });

  await attendance1.save();
}
