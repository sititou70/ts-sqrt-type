import { Natural } from './utils/natural_number';

export type Bit = 0 | 1;

// Bits type is little endian.
// example:
// const four: Bits = [0, 0, 1];
//                  LSB <---> MSB
export type Bits = Bit[];

// float number = (is_negative ? -1 : 1) * fraction * 10^(-1 * exponent)
export type Float = {
  fraction: Bits;
  exponent: Natural;
  is_negative: boolean;
};
