export type Nullable<T> = T | null | undefined;
export type MaybeArray<T> = T | Array<T>;

export interface AclConfig<T = string, U = string> {
  roles?: Array<T>;
  permissions?: Array<U>;
}

export type AclSet = Set<string>;
export type AclSetPropertyKey = "permissions" | "roles";
