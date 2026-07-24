function truncateString(string, number){
  return string.length > number ? `${string.slice(0, number)}...` : string;
};

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8)); // "A-tisket..."
