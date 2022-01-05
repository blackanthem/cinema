const delay = 0;

// function end(element) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const distanceLeft = Math.ceil(element.scrollWidth - element.scrollLeft);

//       if (distanceLeft === element.clientWidth) return resolve(true);
//       resolve(false);
//     }, delay);
//   });
// }

// function start(element) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       if (element.scrollLeft === 0) return resolve(true);
//       resolve(false);
//     }, delay);
//   });
// }

function end(element) {
  const distanceLeft = Math.ceil(element.scrollWidth - element.scrollLeft);

  if (distanceLeft === element.clientWidth) return true;
  return false;
}

function start(element) {
  if (element.scrollLeft === 0) return true;
  return false;
}

export { end, start };
