const express = require('express');
const router = express.Router();

const findStudent = require('./middleware/find-student');

router.use(`/api/:student`, findStudent);
router.use('/api/:student/enterprise', require('./routes/enterprise.route'));
router.use('/api/:student/activity-sector', require('./routes/activity-sector.route'));
router.use('/api/:student/candidate', require('./routes/candidate.route'));
router.use('/api/:student/internship-offer', require('./routes/internship-offer.route'));
router.use('/api/:student/internship-request', require('./routes/internship-request.route'));
router.use('/api/:student/region', require('./routes/region.route'));

module.exports = router;