const router = require('express').Router();
const initRoute = require('../middleware/init-route');
const modelName = 'enterprise';
const schema = require('../schema/enterprise.schema');
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

router.get('/:id', (req, res) => {
	getModel(req).find(req.params.id)
		.then(result => {
			res.json(result);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.post('/', (req, res) => {
	getModel(req).create(req.body[modelName])
		.then(results => {
			res.json(results);
		})
		.catch(err => {
			res.status(500).json(err);
		});
});

router.put('/:id', (req, res) => {
	getModel(req).update(req.params.id, req.body[modelName])
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

module.exports = router;