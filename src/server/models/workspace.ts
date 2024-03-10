import { Table, Column, Model, DataType, ForeignKey, BelongsTo, CreatedAt, DeletedAt } from 'sequelize-typescript';
import User from './user'; // Assume you have a User model defined

@Table({ tableName: 'workspace' })
export default class Workspace extends Model {
	@Column({
		type: DataType.STRING
	})
	name!: string;

	@ForeignKey(() => User)
	@Column({
		allowNull: false,
		type: DataType.INTEGER
	})
	user_id!: number;

	@BelongsTo(() => User)
	user!: User;

	@Column({
		allowNull: false,
		type: DataType.STRING,
		defaultValue: 'active'
	})
	status!: string;

  @CreatedAt
  @Column({type: DataType.STRING})
  createdAt: string | null = null;

  @DeletedAt
  @Column({type: DataType.STRING})
  removedAt: string | null = null;
}
