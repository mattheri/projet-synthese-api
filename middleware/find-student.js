const findStudent = (req, res, next) => {
	const students = require('../students');

	if (!req.params.student || students.every(student => student !== req.params.student)) {
		return res.status(500).json(JSON.stringify({ error: `student: ${req.params.student} not found` }));
	}

	if (req.student) delete req.student;

	req.student = req.params.student;
	next();
}

module.exports = findStudent;