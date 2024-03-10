import express from 'express';
import Workspace from '../../models/workspace.js';

const router = express.Router();

router.get('/workspace', async (_req, res) => {
	const workspaces = await Workspace.findAll();
  console.log(workspaces)
	res.status(200).json(workspaces);
});

router.get('/workspace/:id', async (req, res) => {
	const {id} = req.params;
	const workspace = await Workspace.findByPk(id);
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
  await Workspace.create({
    name,
    user_id,
    createAt
  });
	res.status(201).end();
});

router.delete('/workspace/:id', async (req, res) => {
	const {id} = req.params;
	await Workspace.destroy({
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
