module.exports = function check(str, bracketsConfig) {
  // build a config object from bracketsConfig
  const configObj = bracketsConfig.reduce((acc, current) => {
    const [left, right] = current;
    acc[left] = right;
    return acc;
  }, {});

  // Stack for opening brackets
  const stack = [];

  for (let i = 0; i < str.length; i += 1) {
    const current = str[i];
    const sameBrackets = configObj[current] === current ? true : false
    // if this is an opening bracket -> add it 
    // is this is a SAME bracket -> check if stack already has opening brackets 
    // if it HAS -> then this is a closing bracket
    if (configObj.hasOwnProperty(current) && !(sameBrackets && stack.indexOf(current) > -1)) {
      stack.push(current);
    } else {
      // this is a closing bracket
      const last = stack.pop();
      if (current !== configObj[last]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}
