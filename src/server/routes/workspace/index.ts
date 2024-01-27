import express from 'express';
import sequelize from '../../sequelize-models.js';

const {models} = sequelize;

const router = express.Router();

router.get('/workspace', async (_req, res) => {
	const workspaces = await models.workspace.findAll();
	res.status(200).json(workspaces);
});

router.get('/workspace/:id', async (req, res) => {
	const {id} = req.params;
	const workspace = await models.workspace.findByPk(id);
	if (workspace) {
		res.status(200).json(workspace);
	} else {
		res.status(404).send('404 - Not found');
	}
});

router.post('/workspace', async (req, res) => {
  const user_id = req.auth.userId;
  const {name} = req.body
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
	const {id} = req.params;
	await models.workspace.destroy({
		where: {
			id: id
		}
	});
	res.status(200).end();
});

const routers = await Promise.all([
  //import('./file.js'),
  import('./command.js')
]);

routers.map(subrouter => { router.use(subrouter.default); });

export default router;
