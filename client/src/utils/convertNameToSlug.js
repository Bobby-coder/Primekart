export function convertNameToSlug(name) {
  // split string into an array then transform each name by capitalizing its first letter then join array into a string
  return name
    .split(" ")
    .map((str) => str[0].toLowerCase() + str.slice(1))
    .join("-");
}
