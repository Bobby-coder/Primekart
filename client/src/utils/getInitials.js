export function getInitials(name) {
  const words = name.split(" ");
  let initials =
    words[0][0].toUpperCase() + (words?.[1]?.[0].toUpperCase() || "");

  return initials;
}

// If second word or only firstname is present then take empty string for last name or second word.
