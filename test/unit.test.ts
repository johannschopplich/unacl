import { describe, it, expect } from "vitest";
import { ACL } from "../src";
import type { AclConfig } from "../src";

describe("ACL", () => {
  it("can be instantiated", () => {
    const acl = new ACL();

    expect(acl).toBeInstanceOf(ACL);
  });

  it("can be instantiated with a config", () => {
    const config: AclConfig = {
      roles: ["admin"],
      permissions: ["update"],
    };
    const acl = new ACL(config);

    expect(acl.getRoles()).toStrictEqual(config.roles);
    expect(acl.getPermissions()).toStrictEqual(config.permissions);
  });

  it("can return empty roles", () => {
    const acl = new ACL();

    expect(acl.getRoles()).toStrictEqual([]);
  });

  it("can return empty permissions", () => {
    const acl = new ACL();

    expect(acl.getPermissions()).toStrictEqual([]);
  });

  it("can replace the existing roles", () => {
    const config: AclConfig = {
      roles: ["admin"],
    };
    const acl = new ACL(config);

    expect(acl.getRoles()).toStrictEqual(config.roles);

    acl.setRoles(["manager"]);
    expect(acl.getRoles()).toStrictEqual(["manager"]);
  });

  it("can replace the existing permissions", () => {
    const config: AclConfig = {
      permissions: ["update"],
    };
    const acl = new ACL(config);

    expect(acl.getPermissions()).toStrictEqual(config.permissions);

    acl.setPermissions(["read"]);
    expect(acl.getPermissions()).toStrictEqual(["read"]);
  });

  it("can add a single role", () => {
    const config: AclConfig = {
      roles: ["admin"],
    };
    const acl = new ACL(config).addRoles(["manager"]);
    expect(acl.getRoles()).toStrictEqual(["admin", "manager"]);
  });

  it("can add multiple roles", () => {
    const config: AclConfig = {
      roles: ["admin"],
    };
    const acl = new ACL(config).addRoles(["manager", "supervisor"]);
    expect(acl.getRoles()).toStrictEqual(["admin", "manager", "supervisor"]);
  });

  it("can add a single permission", () => {
    const config: AclConfig = {
      permissions: ["update"],
    };
    const acl = new ACL(config);

    acl.addPermissions(["read"]);

    expect(acl.getPermissions()).toStrictEqual(["update", "read"]);
  });

  it("can add multiple permissions", () => {
    const config: AclConfig = {
      permissions: ["update"],
    };
    const acl = new ACL(config);

    acl.addPermissions(["read", "delete"]);

    expect(acl.getPermissions()).toStrictEqual(["update", "read", "delete"]);
  });

  it("can clear the roles", () => {
    const config: AclConfig = {
      roles: ["admin"],
    };
    const acl = new ACL(config).clearRoles();

    expect(acl.getRoles()).toStrictEqual([]);
  });

  it("can clear the permissions", () => {
    const config: AclConfig = {
      permissions: ["read"],
    };
    const acl = new ACL(config).clearPermissions();

    expect(acl.getPermissions()).toStrictEqual([]);
  });

  it("can clear both the roles and permissions", () => {
    const config: AclConfig = {
      roles: ["admin"],
      permissions: ["read"],
    };
    const acl = new ACL(config).clear();

    expect(acl.getRoles()).toStrictEqual([]);
    expect(acl.getPermissions()).toStrictEqual([]);
  });

  it("can calculate if all roles are present", () => {
    const config: AclConfig = {
      roles: ["admin", "editor"],
    };
    const acl = new ACL(config);

    expect(acl.hasEveryRole("admin")).toBeTruthy();
    expect(acl.hasEveryRole(["admin", "editor"])).toBeTruthy();

    expect(acl.hasEveryRole("intern")).toBeFalsy();
    expect(acl.hasEveryRole(["admin", "intern"])).toBeFalsy();
  });

  it("can calculate if any roles are present", () => {
    const config: AclConfig = {
      roles: ["admin", "editor"],
    };
    const acl = new ACL(config);

    expect(acl.hasSomeRoles("editor")).toBeTruthy();
    expect(acl.hasSomeRoles(["admin", "editor"])).toBeTruthy();

    expect(acl.hasSomeRoles("intern")).toBeFalsy();
    expect(acl.hasSomeRoles(["worker", "intern"])).toBeFalsy();
  });

  it("can calculate if all roles are missing", () => {
    const config: AclConfig = {
      roles: ["admin", "editor"],
    };
    const acl = new ACL(config);

    expect(acl.missesEveryRole("intern")).toBeTruthy();
    expect(acl.missesEveryRole(["worker", "intern"])).toBeTruthy();

    expect(acl.missesEveryRole("admin")).toBeFalsy();
    expect(acl.missesEveryRole(["admin", "intern"])).toBeFalsy();
  });

  it("can calculate if any roles are missing", () => {
    const config: AclConfig = {
      roles: ["admin", "editor"],
    };
    const acl = new ACL(config);

    expect(acl.missesSomeRoles("intern")).toBeTruthy();
    expect(acl.missesSomeRoles(["admin", "intern"])).toBeTruthy();

    expect(acl.missesSomeRoles("admin")).toBeFalsy();
    expect(acl.missesSomeRoles(["admin", "editor"])).toBeFalsy();
  });

  it("can calculate if all permissions are present", () => {
    const config: AclConfig = {
      permissions: ["update", "read", "delete"],
    };
    const acl = new ACL(config);

    expect(acl.hasEveryPermission("update")).toBeTruthy();
    expect(acl.hasEveryPermission(["update", "read"])).toBeTruthy();

    expect(acl.hasEveryPermission("duplicate")).toBeFalsy();
    expect(acl.hasEveryPermission(["update", "duplicate"])).toBeFalsy();
  });

  it("can calculate if any permissions are present", () => {
    const config: AclConfig = {
      permissions: ["update", "read", "delete"],
    };
    const acl = new ACL(config);

    expect(acl.hasSomePermissions("read")).toBeTruthy();
    expect(acl.hasSomePermissions(["update", "read"])).toBeTruthy();

    expect(acl.hasSomePermissions("duplicate")).toBeFalsy();
    expect(acl.hasSomePermissions(["archive", "duplicate"])).toBeFalsy();
  });

  it("can calculate if all permissions are missing", () => {
    const config: AclConfig = {
      permissions: ["update", "read", "delete"],
    };
    const acl = new ACL(config);

    expect(acl.missesEveryPermission("duplicate")).toBeTruthy();
    expect(acl.missesEveryPermission(["archive", "duplicate"])).toBeTruthy();

    expect(acl.missesEveryPermission("update")).toBeFalsy();
    expect(acl.missesEveryPermission(["update", "duplicate"])).toBeFalsy();
  });

  it("can calculate if any permissions are missing", () => {
    const config: AclConfig = {
      permissions: ["update", "read", "delete"],
    };
    const acl = new ACL(config);

    expect(acl.missesSomePermissions("duplicate")).toBeTruthy();
    expect(acl.missesSomePermissions(["update", "duplicate"])).toBeTruthy();

    expect(acl.missesSomePermissions("update")).toBeFalsy();
    expect(acl.missesSomePermissions(["update", "read"])).toBeFalsy();
  });
});
