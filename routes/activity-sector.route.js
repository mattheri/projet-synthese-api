const router = require('express').Router();
const initRoute = require('../middleware/init-route');
const modelName = 'activitySector';
const schema = require('../schema/activity-sector.schema');
const getModel = require('../get-model')(modelName);

router.use('*', initRoute(schema, modelName));

router.get('/', (req, res) => {
	getModel(req).findAll()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	getModel(req).create({ ...req.body[modelName], user: req.student })
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/:id', (req, res) => {
	getModel(req).delete(req.params.id)
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.delete('/wipe', (req, res) => {
	getModel(req).wipe()
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
})

router.post('/many', (req, res) => {
	getModel(req).createMany([...req.body[modelName].map(data => ({ ...data, user: req.student }))])
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
})

module.exports = router;