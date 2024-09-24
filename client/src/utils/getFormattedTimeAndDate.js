export function getFormattedTimeAndDate(date) {
  // createdAt date & time in beautiful format
  const dateObject = new Date(date);

  // Format the date part
  const formattedDate = dateObject.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  // Format the time part
  const formattedTime = dateObject.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return [formattedDate, formattedTime];
}
