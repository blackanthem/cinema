export function postShowtimeFormat(showtimes) {
  const showtime = {};

  showtimes.forEach(({ time, selectedDays }) => {
    selectedDays.forEach((day) => {
      if (showtime.hasOwnProperty(day)) showtime[day].push(time);
      else showtime[day] = [time];
    });
  });

  return showtime;
}
