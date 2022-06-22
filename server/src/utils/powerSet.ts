const powerOfTwo = (x: bigint) => {
  return x && !(x & (x - 1n));
};

export const encodePowerOfTwoSetAsHex = (set: Set<bigint>) => {
  let big = 0n;

  const numbers = Array.from(set).filter(powerOfTwo);
  numbers.forEach((number) => {
    big |= number;
  });

  return big.toString(16);
};

export const decodeHexAsPowerOfTwoSet = (hex: string) => {
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
