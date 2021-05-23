import { Bit, Bits } from '../model';
import { Exception } from '../utils/exception';
import {
  Natural,
  NaturalToNumber,
  NumberToNatural,
  Succ,
} from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';

export type AdderResult<c extends Bit = Bit, s extends Bit = Bit> = {
  carry_out: c;
  sum: s;
};

// FullAddrMap[`${b1}${b2}${carry_in}`] -> AdderResult
export type FullAddrMap = {
  '000': AdderResult<0, 0>;
  '001': AdderResult<0, 1>;
  '010': AdderResult<0, 1>;
  '011': AdderResult<1, 0>;
  '100': AdderResult<0, 1>;
  '101': AdderResult<1, 0>;
  '110': AdderResult<1, 0>;
  '111': AdderResult<1, 1>;
};
export type FullAdder<b1 extends Bit, b2 extends Bit, carry_in extends Bit> =
  FullAddrMap[`${b1}${b2}${carry_in}`];

export type AddUint<b1 extends Bits, b2 extends Bits> =
  b1['length'] extends b2['length']
    ? ExtractResult<
        _AdderRecursive1<[], 0, NumberToNatural<0>, { b1: b1; b2: b2 }>
      >
    : Exception<'Add: length of b1 and b2 must be equal'>;
export type _AdderRecursive1<
  result extends Bits,
  carry_in extends Bit,
  index extends Natural,
  consts extends { b1: Bits; b2: Bits }
> = NaturalToNumber<index> extends consts['b1']['length']
  ? carry_in extends 1
    ? Exception<'Add: overflow occurred'>
    : result
  : {
      _: _AdderRecursive2<
        FullAdder<
          consts['b1'][NaturalToNumber<index>],
          consts['b2'][NaturalToNumber<index>],
          carry_in
        >,
        result,
        index,
        consts
      >;
    };
export type _AdderRecursive2<
  adder_result extends AdderResult,
  result extends Bits,
  index extends Natural,
  consts extends { b1: Bits; b2: Bits }
> = {
  _: _AdderRecursive1<
    [...result, adder_result['sum']],
    adder_result['carry_out'],
    Succ<index>,
    consts
  >;
};
