import type { Nullable, MaybeArray } from "./types";

export const toArray = <T>(array?: Nullable<MaybeArray<T>>): Array<T> => {
  array = array || [];
  if (Array.isArray(array)) return array;
  return [array];
};
