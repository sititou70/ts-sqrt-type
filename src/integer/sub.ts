import { Bits } from '../model';
import { Exception } from '../utils/exception';
import { Add, BitsAdder, BitsAdderResult } from './add';
import { Complement } from './utils';

export type Sub<b1 extends Bits, b2 extends Bits> = _Sub<
  BitsAdder<b1, Complement<b2>>
>;
type _Sub<adder_result extends BitsAdderResult | Exception> =
  adder_result extends BitsAdderResult ? adder_result['sum'] : adder_result;
