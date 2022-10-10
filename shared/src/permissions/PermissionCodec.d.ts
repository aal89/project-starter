import JSBI from 'jsbi';
import { Permission } from "./permissions";
export declare class PermissionCodec {
    static encode(permissions: Array<string>): string;
    static decode(hex: string): Permission[];
    static encodeSetInHex(set: Set<string>): string;
    static decodeHexInSet(hex: string): Set<JSBI>;
    static powerOfTwo(x: JSBI): boolean;
    static hashCode(str: string): number;
}
