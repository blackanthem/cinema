import { getKey } from "../../utils/getKey";

export function postShowtimeFormat(showtimes) {
  const showtime = {};

  showtimes.forEach(({ time, selectedDays }) => {
    selectedDays.forEach((day) => {
      if (showtime.hasOwnProperty(day)) showtime[day].push(time.toUpperCase());
      else showtime[day] = [time.toUpperCase()];
    });
  });

  return showtime;
}

function showtimeFormat(showtimes) {
  const timeAndDays = {};
  const formattedShowtimes = [];

  for (const [day, times] of Object.entries(showtimes)) {
    times.forEach((time) => {
      if (timeAndDays.hasOwnProperty(time)) timeAndDays[time].push(day);
      else timeAndDays[time] = [day];
    });
  }

  for (const [time, selectedDays] of Object.entries(timeAndDays))
    formattedShowtimes.push({ id: getKey(), time, selectedDays });

  return formattedShowtimes;
}

export function detailsFormat(movie) {
  const details = {
    status: movie.status,
    ticketPrice: movie.ticketPrice,
    startShowingDate: movie.startShowingDate,
    stopShowingDate: movie.stopShowingDate,
    isFeature: movie.isFeature,
    showtimes: showtimeFormat(movie.showTimes),
  };

  console.log(movie);

  return details;
}

export function updateDataFormat(details) {
  const { movieId, ...queryParams } = details;
  let queryString = "";

  for (let [key, value] of Object.entries(queryParams)) {
    if (typeof value.getMonth === "function")
      value = value.toLocaleDateString();
    if (typeof value == "object") value = JSON.stringify(value);
    queryString += `${key}=${value}&`;
  }

  return { movieId, queryString };
}
