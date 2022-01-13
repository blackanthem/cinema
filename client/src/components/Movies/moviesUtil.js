export function sortMovies(data, by) {
  if (!data) return;

  let copy = [...data];

  if (!by)
    return copy.sort((a, b) => {
      const A = a.title.toLowerCase();
      const B = b.title.toLowerCase();

      if (A > B) return 1;
      if (A < B) return -1;
      return 0;
    });
}

export function filterMovies(data, filter) {
  if (!filter) return data;

  return data.filter((movie) => movie.status === filter);
}
