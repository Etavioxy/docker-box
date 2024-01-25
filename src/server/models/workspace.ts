import { DataTypes } from 'sequelize';

export default (sequelize) => {
	sequelize.define('workspace', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: DataTypes.INTEGER
		},
		name: {
			type: DataTypes.STRING,
		},
		user_id: {
			allowNull: false,
			type: DataTypes.INTEGER,
			references: {
				model: 'users',
				key: 'id'
			}
		},
		status: {
			allowNull: false,
			type: DataTypes.STRING,
			defaultValue: 'active'
		},
		createdAt: {
			allowNull: false,
			type: DataTypes.DATE
		},
		removedAt: {
			allowNull: true,
			type: DataTypes.DATE
		}
	});
};
