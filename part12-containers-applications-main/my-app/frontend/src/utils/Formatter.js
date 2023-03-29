export const convertDateToReadable = (datestring) => {
  const time = new Date(datestring);
  const day = time.getDate();
  const month = time.getMonth()+1;
  const year = time.getFullYear();
  const hours = time.getHours();
  const minutes = (0+time.getMinutes().toString()).slice(-2);
  return (
    `${day}.${month}.${year} - ${hours}:${minutes}`
  );
};

export const metersToReadable = (distance) => {
  const dist = Number(distance);
  if (dist > 999) {
    return Math.ceil(dist / 100)/10 + " km";
  } else {
    return distance + " m"
  }
};

export const minutesToReadable = (seconds) => {
  const totalMinutes = Number(Math.ceil(seconds/60));
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours === 0) {
    return minutes + " min"
  } else {
    return hours + "h " + minutes + "m"
  }
};