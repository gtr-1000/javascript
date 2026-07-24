function truncateString(string, number){
  if(string.length > number){
    const truncated = string.slice(0,number);
    return `${truncated}...`
  } else {
    return string;
  }
};

console.log(truncateString("A-tisket a-tasket A green and yellow basket", 8)); //"A-tisket..."
