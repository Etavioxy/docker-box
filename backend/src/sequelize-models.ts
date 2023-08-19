import Sequelize from 'sequelize';
import {config} from './setup.js';

// In a real app, you should keep the database connection URL as an environment variable.
// But for this example, we will just use a local SQLite database.
// const sequelize = new Sequelize(process.env.DB_CONNECTION_URL);
const sequelize = new Sequelize({
	dialect: 'sqlite',
	storage: config.dirs.sql,
	logQueryParameters: true,
	benchmark: true
});

const modelDefiners = [
  await import('./models/user.js'),
  await import('./models/workspace.js')
];

// We define all models according to their files.
modelDefiners.map(modelDefiner => {
	modelDefiner.default(sequelize);
});

sequelize.sync({}).then(()=>{
	console.log('成功');
})

// We execute any extra setup after the models are defined, such as adding associations.
function applyExtraSetup(sequelize) {
//	const { instrument, orchestra } = sequelize.models;
//
//	orchestra.hasMany(instrument);
//	instrument.belongsTo(orchestra);
}

applyExtraSetup(sequelize);

// We export the sequelize connection instance to be used around our app.
export default sequelize;
