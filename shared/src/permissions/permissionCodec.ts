import JSBI from 'jsbi';
import { Permission, permissionMap, reversedPermissionMap } from "./permissions";

const powerOfTwo = (x: JSBI) => {
  return x && JSBI.equal(JSBI.bitwiseAnd(x, JSBI.subtract(x, JSBI.BigInt(1))), JSBI.BigInt(0));
};

export const encodePermissions = (permissions: Array<string>) => {
  const mappedPermissions = permissions
    .map((str) => permissionMap().get(str as Permission) ?? '0')

  return encodeSetInHex(new Set(mappedPermissions));
}

export const decodePermissions = (hex: string) => {
  const set = decodeHexInSet(hex);

  return Array.from(set).map((n) => reversedPermissionMap().get(n.toString()) ?? '').filter((e) => e);
}

// encodes power of two set as hex string
const encodeSetInHex = (set: Set<string>) => {
  let big = JSBI.BigInt(0);

  const numbers = Array.from(set).map(JSBI.BigInt).filter(powerOfTwo);

  numbers.forEach((number) => {
    big = JSBI.bitwiseOr(big, number);
  });

  return big.toString(16);
};

// decodes hex string as a power of two set
const decodeHexInSet = (hex: string) => {
  const set = new Set<JSBI>();

  if (hex === '') {
    return set;
  }

  const big = JSBI.BigInt(`0x${hex}`);
  const bigBitLength = big.toString(2).length;

  for (
    let power = JSBI.BigInt('1');
    JSBI.LT(power, 2 ** bigBitLength);
    power = JSBI.multiply(JSBI.BigInt('2'), power)) {
      if (JSBI.equal(JSBI.bitwiseAnd(big, power), power)) {
        set.add(power);
      }
    }

  return set;
};
