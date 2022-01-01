function end(element) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const distanceLeft = Math.ceil(element.scrollWidth - element.scrollLeft);

      if (distanceLeft === element.clientWidth) return resolve("at-end");
      resolve("");
    }, 500);
  });
}

function start(element) {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (element.scrollLeft === 0) return resolve("at-start");
      resolve("");
    }, 500);
  });
}

export default { end, start };
