import type { MaybeArray, Nullable } from './types'

export function toArray<T>(array?: Nullable<MaybeArray<T>>): Array<T> {
  array = array || []
  if (Array.isArray(array))
    return array
  return [array]
}
