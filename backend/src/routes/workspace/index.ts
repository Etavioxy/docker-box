import express from 'express';
import sequelize from '../../sequelize-models.js';

const {models} = sequelize;

const router = express.Router();

function getIdParam(req) {
	const id = req.params.id;
	if (/^\d+$/.test(id)) {
		return Number.parseInt(id, 10);
	}
	throw new TypeError(`Invalid ':id' param: "${id}"`);
}

router.get('/workspace', async (req, res) => {
	const workspaces = await models.workspace.findAll();
	res.status(200).json(workspaces);
});

router.get('/workspace/:id', async (req, res) => {
	const id = getIdParam(req);
	const workspace = await models.workspace.findByPk(id);
	if (workspace) {
		res.status(200).json(workspace);
	} else {
		res.status(404).send('404 - Not found');
	}
});

router.post('/workspace', async (req, res) => {
  const {name, user_id} = req.body
  const createAt = new Date().toISOString();
  //Date.parse
	await models.workspace.create({
    name,
    user_id,
    createAt
  });
	res.status(201).end();
});

router.delete('/workspace/:id', async (req, res) => {
	const id = getIdParam(req);
	await models.workspace.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
});

const routers = [
  await import('./file.js'),
//  await import('./command.js')
];

routers.map(subrouter => { router.use('/workspace/:workspaceid', subrouter.default); });

export default router;
