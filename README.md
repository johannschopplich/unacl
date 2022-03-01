# unacl

> Minimal, type-safe and reactive ACL implementation.

This library doesn't replace a full-featured ACL system, like [CASL](https://github.com/stalniy/casl/). It rather serves a lightweight base for simple access control requirements, like SPAs.

`unacl` utilizes [@vue/reactivity](https://www.npmjs.com/package/@vue/reactivity) under the hood. Thus, you can pair it with Vue in an instant.

```ts
import { ACL } from "unacl";

const acl = new ACL({
  permissions: ["read"],
  roles: ["admin", "editor"],
});

const isEditor = acl.is("editor"); // `true`

if (acl.can("archive")) {
  console.log("You are not allowed to archive this entity");
}

if (acl.has("admin")) {
  acl.addPermissions(["create", "update", "delete"]);
} else {
  acl.addPermissions(["update"]);
}
```

## Installation

Run the following command to add `unacl` to your project.

```bash
pnpm install unacl # or npm or yarn
```

## Configuration

```ts
interface AclConfig<T = string, U = string> {
  roles?: Array<T>;
  permissions?: Array<U>;
}
```

## Usage

There are also a number of methods you can leverage on the `ACL` instance:

| Method                    | Description                                                        |
| ------------------------- | ------------------------------------------------------------------ |
| `can()`                   | Shorthand accessor for `hasEveryPermission()`.                     |
| `hasEveryPermission()`    | Assert the store has every given permission(s).                    |
| `hasSomePermissions()`    | Assert the store has some of the given permission(s).              |
| `missesEveryPermission()` | Assert the store is missing every given permission(s).             |
| `missesSomePermissions()` | Assert the store is missing at least 1 of the given permission(s). |
| `has()` & `is()`          | Shorthand accessor for `hasEveryRole()`.                           |
| `hasEveryRole()`          | Assert the store has every given role(s).                          |
| `hasSomeRoles()`          | Assert the store has some of the given role(s).                    |
| `missesEveryRole()`       | Assert the store is missing every given role(s).                   |
| `missesSomeRoles()`       | Assert the store is missing at least 1 of the given role(s).       |
| `getRoles()`              | Gets the array of currently stored roles.                          |
| `getPermissions()`        | Gets the array of currently stored permissions.                    |
| `setRoles()`              | Overwrites the role store with the given new roles.                |
| `setPermissions()`        | Overwrites the permission store with the given new permissions.    |
| `addRoles()`              | Adds the given role(s) to the role store.                          |
| `addPermissions()`        | Adds the given permission(s) to the permission store.              |
| `clearRoles()`            | Clears the currently stored roles.                                 |
| `clearPermissions()`      | Clears the currently stored permissions.                           |
| `clear()`                 | Clears both the role and permission store.                         |

## Credits

- [@fullstackfool](https://github.com/fullstackfool) for [vacl](https://github.com/fullstackfool/vacl) which served as inspiration and base for this project.

## License

[MIT](./LICENSE) License © 2022 [Johann Schopplich](https://github.com/johannschopplich)
[MIT](./LICENSE) License © 2019 [Karl Davies](https://github.com/fullstackfool)
