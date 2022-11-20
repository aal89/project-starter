/* eslint-disable */
import sha1 from 'sha1';
import * as Base32 from './base32';

interface OTPOptions {
  name: string;
  keySize: number;
  codeLength: number;
  secret: string;
  epoch: number;
  timeSlice: number;
}

export default class OTP {
  constructor(options: string | Partial<OTPOptions> = {}) {
    if (typeof options === 'string') throw new Error('Unexpected options string')
    options = { ...options };
    options.name = `${options.name || 'OTP-Authentication'}`.split(/[^\w|_|-|@]/).join('');
    options.keySize = options.keySize === 128 ? 128 : 64;
    options.codeLength = !options.codeLength ? 6 : options.codeLength;
    options.secret = options.secret || generateKey(options.keySize);
    options.epoch = !options.epoch ? 0 : options.epoch;
    options.timeSlice = !options.timeSlice ? 30 : options.timeSlice;
    this.options = options as OTPOptions;
  }

  private readonly options: OTPOptions;

  get name() {
    return this.options.name;
  }

  get secret() {
    return this.options.secret;
  }

  get totpURL() {
    return `otpauth://totp/${encodeURIComponent(this.name)}?secret=${encodeURIComponent(
      this.secret,
    )}`;
  }

  get hotpURL() {
    return `otpauth://hotp/${encodeURIComponent(this.name)}?secret=${encodeURIComponent(
      this.secret,
    )}`;
  }

  hotp(counter: number): string {
    const digest = new Hmac(this.options.keySize, Base32.decode(this.options.secret))
      .update(UInt64Buffer(counter))
      .digest();
    const offset = digest[19] & 0xf;
    const code = String(
      ((digest[offset] & 0x7f) << 24)
        | ((digest[offset + 1] & 0xff) << 16)
        | ((digest[offset + 2] & 0xff) << 8)
        | (digest[offset + 3] & 0xff),
    );
    return `${new Array(this.options.codeLength).fill('0')}${code}`.slice(-1 * this.options.codeLength);
  }

  totp(now: number = Date.now()): string {
    const counter = Math.floor((now - this.options.epoch * 1000) / (this.options.timeSlice * 1000));
    return this.hotp(counter);
  }

  toString() {
    return '[object OTP]';
  }

  toJSON() {
    return { class: OTP.classID, ...this.options };
  }

  static reviveJSON(_: string, val: any) {
    if (typeof val !== 'object' || val === null || val.class !== OTP.classID) return val;
    const {
      name, keySize, codeLength, secret, epoch, timeSlice,
    } = val;
    return new OTP({
      name, keySize, codeLength, secret, epoch, timeSlice,
    });
  }

  static readonly classID = 'OTP{@pipobscure}';
}

export function generateKey(length: number) {
  const key = new Uint8Array(new Array(length).fill(0).map(() => Math.floor(Math.random() * 256)));
  return Base32.encode(key);
}
function UInt64Buffer(num: number) {
  const res = Buffer.alloc(8);
  res.writeBigUInt64BE(BigInt(num));
  return res;
}

const zeroBuffer = new Uint8Array(new Array(128).fill(0));

class Hmac {
  constructor(blocksize: number, key: Uint8Array) {
    if (blocksize !== 128 && blocksize !== 64) {
      throw new Error(`blocksize must be either 64 for or 128 , but was:${blocksize}`);
    }
    this.key = rekey(key, blocksize);
    this.opad = new Uint8Array(new Array(blocksize).fill(0));
    this.ipad = new Uint8Array(new Array(blocksize).fill(0));

    for (let i = 0; i < blocksize; i++) {
      this.ipad[i] = this.key[i] ^ 0x36;
      this.opad[i] = this.key[i] ^ 0x5c;
    }

    this.hash = new Hash();
    this.hash.update(this.ipad);
  }

  private key: Uint8Array;

  private ipad: Uint8Array;

  private opad: Uint8Array;

  private hash: Hash;

  update(data: Uint8Array) {
    this.hash.update(data);
    return this;
  }

  digest() {
    const hash = this.hash.digest();
    return new Hash().update(this.opad).update(hash).digest();
  }
}

function rekey(key: Uint8Array, blocksize: number): Uint8Array {
  if (key.length > blocksize) {
    return Hash.hash(key);
  }
  if (key.length < blocksize) {
    const res = new Uint8Array(blocksize);
    res.set(key);
    res.set(zeroBuffer, key.length);
    return res;
  }
  return key;
}

class Hash {
  constructor() {}

  private data: number[] = [];

  update(data: Uint8Array) {
    this.data.push(...data.values());
    return this;
  }

  digest() {
    return sha1(Buffer.from(this.data), { asBytes: true });
  }

  static hash(data: Uint8Array) {
    return new Hash().update(data).digest();
  }
}
