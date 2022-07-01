import { permissionMap, reversedPermissionMap } from "./permissions";

const powerOfTwo = (x: bigint) => {
  return x && !(x & (x - 1n));
};

export const encodePermissions = (permissions: Array<string>) => {
  const mappedPermissions = permissions
    .map((str) => permissionMap().get(str) ?? 0n)

  return encodeSetInHex(new Set(mappedPermissions));
}

export const decodePermissions = (hex: string) => {
  const set = decodeHexInSet(hex);

  return Array.from(set).map((n) => reversedPermissionMap().get(n) ?? '').filter((e) => e);
}

// encodes power of two set as hex string
const encodeSetInHex = (set: Set<bigint>) => {
  let big = 0n;

  const numbers = Array.from(set).filter(powerOfTwo);

  numbers.forEach((number) => {
    big |= number;
  });

  return big.toString(16);
};

// decodes hex string as a power of two set
const decodeHexInSet = (hex: string) => {
  const set = new Set<bigint>();
  const big = BigInt(`0x${hex}`);
  const bigBitLength = big.toString(2).length;

  for (let power = 1n; power < 2 ** bigBitLength; power *= 2n) {
    if ((big & power) === power) {
      set.add(power);
    }
  }

  return set;
};
