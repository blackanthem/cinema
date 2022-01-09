import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db/db";

interface UserAttributes {
  id: number;
  firstName: string;
  lastName: string;
  password: string;
  code: number;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}

interface UserInstance
  extends Model<UserAttributes, UserCreationAttributes>,
    UserAttributes {}

const userModel = sequelize.define<UserInstance>("User", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  code: { type: DataTypes.INTEGER, allowNull: false },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  password: { type: DataTypes.STRING, allowNull: false },
});

userModel.sync();

export default userModel;
