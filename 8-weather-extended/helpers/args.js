export const getArgs = (args) => {
  const [, , ...rest] = args;
  const res = {};
  let current = null;
  rest.forEach((val) => {
    if (val.charAt(0) === "-") {
      current = val.substring(1);
      res[current] = true;
    } else if (current) {
      const prev = res[current];
      if (prev === true) {
        res[current] = val;
      } else if (Array.isArray(prev)) {
        prev.push(val);
      } else {
        res[current] = [prev, val];
      }
    }
  });
  return res;
};
