import { Bit } from '../model';

export type Or<b1 extends Bit, b2 extends Bit> = b1 extends 0
  ? b2 extends 0
    ? 0
    : 1
  : 1;

export type Not<bit extends Bit> = bit extends 0 ? 1 : 0;
