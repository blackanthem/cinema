import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db/db";

interface MovieAttributes {
  id: number;
  title: string;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "id"> {}

interface MovieInstance
  extends Model<MovieAttributes, MovieCreationAttributes>,
    MovieAttributes {}

const movieModel = sequelize.define<MovieInstance>("Movie", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  title: { type: DataTypes.STRING },
});

movieModel.sync();

export default movieModel;
