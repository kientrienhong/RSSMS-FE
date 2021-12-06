export const isDateBefore = (date, date2) => {
  return date.getTime() <= date2.getTime();
};

export const isDateAfter = (date, date2) => {
  return date.getTime() >= date2.getTime();
};

export const getTimeStart = (time) => {
  let timeStart = parseInt(time.slice(0, time.length - 3));
  let postFixTimeStart = time.slice(time.length - 3, time.length - 1);
  if (postFixTimeStart === "pm") {
    if (!time.includes("12")) {
      timeStart += 12;
    }
  }
  return timeStart;
};

export const getTimeEnd = (time) => {
  let timeEnd = parseInt(time.slice(0, time.length - 2));
  let postFixTimeEnd = time.slice(time.length - 2, time.length);
  if (postFixTimeEnd === "pm") {
    if (!time.includes("12")) {
      timeEnd += 12;
    }
  }
  return timeEnd;
};
