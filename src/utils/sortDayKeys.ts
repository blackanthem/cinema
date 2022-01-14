const day = [
  "sunday",
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
];

export function sortDayKeys(object: { [key: string]: any }) {
  if (!object) return;

  return Object.keys(object)
    .sort((a, b) => {
      const indexA = day.indexOf(a);
      const indexB = day.indexOf(b);

      if (indexA > indexB) return 1;
      if (indexA < indexB) return -1;
      return 0;
    })
    .reduce((acc, key) => ({ ...acc, [key]: object[key] }), {});
}
