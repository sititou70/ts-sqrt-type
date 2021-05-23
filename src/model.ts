export type Bit = 0 | 1;

// Bits type is little endian.
// ex:
// const four: Bits = [0, 0, 1]
//                  LSB <---> MSB
export type Bits = Bit[];
