const daysOfTheWeek = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function disabledDaysOfWeek(showtimes) {
  const keys = Object.keys(showtimes);

  return daysOfTheWeek.reduce((acc, cur, index) => {
    if (keys.indexOf(cur) !== -1) return acc;
    acc.push(index);
    return acc;
  }, []);
}

export function getDisabledDays(movie) {
  const start = new Date(movie.startShowingDate);
  const today = new Date();

  return [
    {
      before: start.getTime() > today.getTime() ? start : today,
      after: new Date(movie.stopShowingDate),
    },
    { daysOfWeek: disabledDaysOfWeek(movie.showTimes) },
  ];
}

export function dateString(date) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return date?.toLocaleDateString(undefined, options);
}

export function getWeekday(date) {
  if (!date) return "";
  return daysOfTheWeek[date.getDay()];
}
