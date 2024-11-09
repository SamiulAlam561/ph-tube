function getTime(time) {
  const hour = parseInt(time / 3600);
  let remainingSeconds = time % 3600;
  const minute = parseInt(remainingSeconds / 60);
  remainingSeconds = remainingSeconds % 60;
  return `${hour} hr ${minute} min ${remainingSeconds} seconds ago`;
}

getTime(16278);
