import JSBI from 'jsbi';
import { Permission, permissionMap, reversedPermissionMap } from "./permissions";
import { MemoizeExpiring } from 'typescript-memoize';

export class PermissionCodec {
  // it takes about x mins for changed permissions to take effect
  @MemoizeExpiring(10 * 60 * 1000, (permissions: Array<string>) => {
    return PermissionCodec.hashCode(permissions.reduce((accu, curr) => accu + curr, ''));
  })
  static encode(permissions: Array<string>) {
    const mappedPermissions = permissions
      .map((str) => permissionMap().get(str as Permission) ?? '0')
  
    return this.encodeSetInHex(new Set(mappedPermissions));
  }
  
  // it takes about x mins for changed permissions to take effect
  @MemoizeExpiring(10 * 60 * 1000, (hex: string) => {
    return hex;
  })
  static decode(hex: string): Permission[] {
    const set = this.decodeHexInSet(hex);
  
    return Array.from(set).map((n) => reversedPermissionMap().get(n.toString()) ?? '').filter((e) => e) as Permission[];
  }
  
  // encodes power of two set as hex string
  static encodeSetInHex(set: Set<string>) {
    let big = JSBI.BigInt(0);
  
    const numbers = Array.from(set).map(JSBI.BigInt).filter(this.powerOfTwo);
  
    numbers.forEach((number) => {
      big = JSBI.bitwiseOr(big, number);
    });
  
    return big.toString(16);
  };
  
  // decodes hex string as a power of two set
  static decodeHexInSet(hex: string) {
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

  static powerOfTwo(x: JSBI) {
    return x && JSBI.equal(JSBI.bitwiseAnd(x, JSBI.subtract(x, JSBI.BigInt(1))), JSBI.BigInt(0));
  };

  static hashCode(str: string) {
    let hash = 0;
    for (let i = 0, len = str.length; i < len; i++) {
        let chr = str.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0;
    }
    return hash;
  };
}
