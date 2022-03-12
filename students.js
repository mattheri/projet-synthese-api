const { STUDENTS } = require("./params");

const convertStudentsToArrayOfStudents = () => STUDENTS.split(" ").filter(Boolean);

module.exports = convertStudentsToArrayOfStudents();