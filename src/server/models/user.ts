import { Table, Column, Model, DataType, CreatedAt, UpdatedAt } from 'sequelize-typescript';
import bcrypt from 'bcrypt';

@Table({ tableName: 'user' })
export default class User extends Model {
  @Column({
    allowNull: false,
    type: DataType.STRING,
    unique: true,
    validate: {
      isEmail: true
    }
  })
  email!: string;

  @Column({
    allowNull: false,
    type: DataType.STRING,
    set(value: string) {
      const hash = bcrypt.hashSync(value, 10);
      this.setDataValue('password', hash);
    }
  })
  password!: string;

  @CreatedAt
  @Column({type: DataType.STRING})
  createdAt: string | null = null;

  @UpdatedAt
  @Column({type: DataType.STRING})
  updatedAt: string | null = null;
}
