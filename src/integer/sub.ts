import { Bits } from '../model';
import { Exception } from '../utils/exception';
import { BitsAdder, BitsAdderResult } from './add';
import { Complement, MatchBitLength, MatchBitLengthResult } from './utils';

export type Sub<b1 extends Bits, b2 extends Bits> = _Sub2<
  MatchBitLength<b1, b2>
>;
type _Sub2<match_result extends MatchBitLengthResult> = _Sub3<
  BitsAdder<match_result['b1'], Complement<match_result['b2']>>
>;
type _Sub3<adder_result extends BitsAdderResult | Exception> =
  adder_result extends BitsAdderResult ? adder_result['sum'] : adder_result;
