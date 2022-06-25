const powerOfTwo = (x: bigint) => {
  return x && !(x & (x - 1n));
};

// encodes power of two set as hex string
export const encodePermissionSet = (set: Set<bigint>) => {
  let big = 0n;

  const numbers = Array.from(set).filter(powerOfTwo);

  numbers.forEach((number) => {
    big |= number;
  });

  return big.toString(16);
};

// decodes hex string as a power of two set
export const decodePermissionSet = (hex: string) => {
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
