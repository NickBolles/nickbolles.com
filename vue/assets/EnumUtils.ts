import { isString } from "./TypeGuards";

/**
 * Credit goes to [David Serret](http://stackoverflow.com/users/188246/david-sherret)
 */

export class EnumUtils {
  public static getNamesAndValues<T extends number>(e: any): { name: string, value: T }[] {
    return EnumUtils.getNames(e).map((n: string) => ({ name: n, value: e[n] as T }));
  }

  public static getNames(e: any): string[] {
    return EnumUtils.getObjValues(e).filter((v: any) => typeof v === "string") as string[];
  }

  public static getValues<T extends number>(e: any): T[] {
    return EnumUtils.getObjValues(e).filter((v: any) => typeof v === "number") as T[];
  }

  private static getObjValues(e: any): (number | string)[] {
    return Object.keys(e).map((k: any) => e[k]);
  }

}

export function enumToString(e: any, v: string | number): string {
  return typeof e[v] === "string" ? sentenceCase(e[v]) : sentenceCase(v);
}

export function enumToID(e: any, v: string | number): string {
  return typeof e[v] === "number" ? e[v] : v;
}

export function toIDString(e: any, v: any): string {
  return `${enumToString(e, v)} [${enumToID(e, v)}]`;
}

const SentenceCaseRegex: RegExp = /(^\w{1}|\.\s*\w{1})/gi;

// todo: add seperate labels for enums? (this would go into the pipe functions though, not here)
function sentenceCase(str: any = ""): string {
  if (!isString(str)) {
    return str;
  }

  return str
    // replace the underscores with spaces
    .replace(/_/g, " ")
    .toLowerCase()
    // replace first Char of sentence with uppercase version
    .replace(SentenceCaseRegex, function (toReplace: string): string {
      return toReplace.toUpperCase();
    });
}
