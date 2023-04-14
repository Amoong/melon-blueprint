export const timeFormatter = (seconds) => {
  const time = Math.round(Number(seconds));
  const minutes = Math.floor(time / 60);
  let slicedSeconds = String(time % 60);

  if (slicedSeconds.length < 2) {
    slicedSeconds = `0${slicedSeconds}`;
  }

  return `${minutes}:${slicedSeconds}`;
};
