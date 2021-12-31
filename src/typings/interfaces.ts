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
