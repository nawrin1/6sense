import crypto from "crypto";
import { get } from "http";

const hashProductName = (name: string): string =>
  crypto.createHash("md5").update(name).digest("hex").slice(0, 6);

const getLongestIncreasingSubstrings = (name: string) => {
  const clean = (name as string).toLowerCase().replace(/\s+/g, "");
  let current = clean[0];
  let substrings: string[] = [];

  for (let i = 0; i < clean.length - 1; i++) {
    const currentAscii = (clean[i] as string).charCodeAt(0) as number;
    const nextAscii = (clean[i + 1] as string).charCodeAt(0) as number;

    if (nextAscii > currentAscii) {
      current += clean[i + 1] as string;
    } else {
      if ((current?.length as number) > 1) {
        substrings.push(current as string);
      }
      current = clean[i + 1];
    }
  }


  if (current?.length as number> 1) substrings.push(current as string);

  console.log("All increasing substrings:", substrings);


  const maxLen = Math.max(...substrings.map((s) => s.length));
  const longest = substrings.filter((s) => s.length === maxLen);

  console.log("Longest strictly increasing substrings:", longest);
  let string=""
  for (const substr of longest) {
    string+=substr
  }
  const startIndex = clean.indexOf(string[0] as string) as number;
  const endIndex = clean.indexOf(string[(string.length as number -1)] as string) as number;
    return { substrings: longest, startIndex, endIndex  , combined:string};



};

export const generateProductCode = (name: string): string => {
  const hash = hashProductName(name);
  getLongestIncreasingSubstrings(name);
  const { substrings, startIndex, endIndex } = getLongestIncreasingSubstrings(name);
  const combined = substrings.join("");
  return `${hash}-${startIndex}${combined}${endIndex}`;
};

