export interface Args {
  h?: boolean;
  s?: string | string[];
  r?: string | string[];
  t?: string;
  l?: string;
}

export const getArgs = (args: string[]): Args => {
  const [, , ...rest] = args;
  const res: Record<string, string | boolean | string[]> = {};
  let current: string | null = null;
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
      } else if (prev) {
        res[current] = [prev, val];
      }
    }
  });
  return res as Args;
};
