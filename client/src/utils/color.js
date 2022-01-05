export function getAverageColor(src) {
  return new Promise((resolve) => {
    const ctx = document.createElement("canvas").getContext("2d");
    ctx.imageSmoothingEnabled = true;

    const img = new Image();
    img.src = src;
    img.crossOrigin = "";

    img.onload = () => {
      ctx.drawImage(img, 0, 0, 1, 1);
      resolve(ctx.getImageData(0, 0, 1, 1).data.slice(0, 3));
    };
  });
}

export function useWhiteText(array) {
  let sum = array[0] * 0.299 + array[1] * 0.587 + array[2] * 0.114;
  return sum > 186;
}
