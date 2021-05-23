import { Bit } from '../model';

export type OR<b1 extends Bit, b2 extends Bit> = b1 extends 0
  ? b2 extends 0
    ? 0
    : 1
  : 1;
