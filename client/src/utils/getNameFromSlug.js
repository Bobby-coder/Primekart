export function slugIntoName(slug) {
  return slug?.split("-").map((str) => str[0].toUpperCase() + str.slice(1)).join(" ");
}
