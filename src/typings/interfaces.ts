import { Showtime } from "../models/movie.model";

export interface PostMovie {
  id: number;
  status: string;
  startShowingDate: Date;
  stopShowingDate: Date;
  ticketPrice: number;
  showTimes: Showtime;
  isFeature: boolean;
}

export interface PostUser {
  firstName: string;
  lastName: string;
  password: string;
}

export interface CreateUser extends PostUser {
  code: number;
}
