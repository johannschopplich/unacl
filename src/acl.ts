import { reactive } from '@vue/reactivity'
import { toArray } from './utils'
import type { AclConfig, AclSet, AclSetPropertyKey, MaybeArray } from './types'

export class ACL {
  private roles: AclSet
  private permissions: AclSet

  public constructor(config?: AclConfig) {
    this.roles = reactive(new Set(config?.roles ?? []))
    this.permissions = reactive(new Set(config?.permissions ?? []))
  }

  public getRoles() {
    return [...this.roles]
  }

  public getPermissions() {
    return [...this.permissions]
  }

  public setRoles(roles: Array<string>) {
    this.set(this.roles, roles)
    return this
  }

  public setPermissions(permissions: Array<string>) {
    this.set(this.permissions, permissions)
    return this
  }

  public addRoles(roles: Array<string>) {
    this.add(this.roles, roles)
    return this
  }

  public addPermissions(permissions: Array<string>) {
    this.add(this.permissions, permissions)
    return this
  }

  public clearRoles() {
    return this.setRoles([])
  }

  public clearPermissions() {
    return this.setPermissions([])
  }

  public clear() {
    return this.clearRoles().clearPermissions()
  }

  public has(roles: MaybeArray<string>) {
    return this.hasEveryRole(roles)
  }

  public is(roles: MaybeArray<string>) {
    return this.hasEveryRole(roles)
  }

  public hasEveryRole(roles: MaybeArray<string>) {
    return this._every(this.roles, roles)
  }

  public hasSomeRoles(roles: MaybeArray<string>) {
    return this._some(this.roles, roles)
  }

  public missesEveryRole(roles: MaybeArray<string>) {
    return this._none(this.roles, roles)
  }

  public missesSomeRoles(roles: MaybeArray<string>) {
    return !this._every(this.roles, roles)
  }

  public can(permissions: MaybeArray<string>) {
    return this.hasEveryPermission(permissions)
  }

  public hasEveryPermission(permissions: MaybeArray<string>) {
    return this._every(this.permissions, permissions)
  }

  public hasSomePermissions(permissions: MaybeArray<string>) {
    return this._some(this.permissions, permissions)
  }

  public missesEveryPermission(permissions: MaybeArray<string>) {
    return this._none(this.permissions, permissions)
  }

  public missesSomePermissions(permissions: MaybeArray<string>) {
    return !this._every(this.permissions, permissions)
  }

  public _some(set: AclSet | AclSetPropertyKey, terms: MaybeArray<string>) {
    const items = typeof set === 'string' ? this[set] : set
    return toArray(terms).some(term => items.has(term))
  }

  public _every(set: AclSet | AclSetPropertyKey, terms: MaybeArray<string>) {
    const items = typeof set === 'string' ? this[set] : set
    return toArray(terms).every(term => items.has(term))
  }

  public _none(set: AclSet | AclSetPropertyKey, terms: MaybeArray<string>) {
    const items = typeof set === 'string' ? this[set] : set
    return toArray(terms).every(term => !items.has(term))
  }

  private set(set: AclSet, terms: Array<string>) {
    set.clear()
    terms.forEach(term => set.add(term))
  }

  private add(set: AclSet, terms: MaybeArray<string>) {
    toArray(terms).forEach(term => set.add(term))
  }
}
