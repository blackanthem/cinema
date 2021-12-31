import { Model, DataTypes, Optional } from "sequelize";
import { sequelize } from "../config/db/db";

interface Cast {
  name: string;
  profilePath: string;
  character: string;
}

export interface Showtime {
  monday?: string[];
  tuesday?: string[];
  wednesday?: string[];
  thursday?: string[];
  friday?: string[];
  saturday?: string[];
  sunday?: string[];
}

interface MovieAttributes {
  id: number;
  title: string;
  genre: string;
  overview: string;
  cast: Cast[];
  tagline: string;
  backdropPath: { max: string; med: string; min: string };
  posterPath: { max: string; min: string };
  releaseDate: Date;
  runtime: string;
  status: string;
  startShowingDate: Date;
  stopShowingDate: Date;
  ticketPrice: number;
  showTimes: Showtime;
  isFeature: boolean;
}

interface MovieCreationAttributes extends Optional<MovieAttributes, "id"> {}

interface MovieInstance
  extends Model<MovieAttributes, MovieCreationAttributes>,
    MovieAttributes {}

const movieModel = sequelize.define<MovieInstance>("Movie", {
  id: { type: DataTypes.INTEGER, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  genre: { type: DataTypes.STRING },
  overview: { type: DataTypes.TEXT },
  cast: { type: DataTypes.JSON, allowNull: false },
  tagline: { type: DataTypes.STRING },
  backdropPath: { type: DataTypes.JSON, allowNull: false },
  posterPath: { type: DataTypes.JSON, allowNull: false },
  releaseDate: { type: DataTypes.DATEONLY, allowNull: false },
  runtime: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, allowNull: false },
  startShowingDate: { type: DataTypes.DATEONLY, allowNull: false },
  stopShowingDate: { type: DataTypes.DATEONLY, allowNull: false },
  ticketPrice: { type: DataTypes.STRING, allowNull: false },
  showTimes: { type: DataTypes.JSON, allowNull: false },
  isFeature: { type: DataTypes.BOOLEAN, defaultValue: false },
});

movieModel.sync();

export default movieModel;

// TODO: Handle Sequelize errors