import { Bits } from '../model';
import { MultiFullAdder, MultiFullAdderResult } from './add';
import { Complement, MatchBitLength, MatchBitLengthResult } from './utils';

export type SubInt<b1 extends Bits, b2 extends Bits> = _SubInt2<
  MatchBitLength<b1, b2>
>;
type _SubInt2<match_result extends MatchBitLengthResult> = _SubInt3<
  MultiFullAdder<match_result['b1'], Complement<match_result['b2']>>
>;
type _SubInt3<adder_result extends MultiFullAdderResult> =
  adder_result extends MultiFullAdderResult
    ? adder_result['sum']
    : adder_result;
