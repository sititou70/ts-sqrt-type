import { Bits } from '../model';
import { CompareBit, Not } from '../bit/basic_operation';
import {
  Natural,
  NaturalToNumber,
  NumberToNatural,
  Pred,
  Succ,
} from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';
import { Cast } from '../utils/cast';
import { Exception } from '../utils/exception';

export type Complement<bits extends Bits> = bits['length'] extends 0
  ? []
  : Cast<
      ExtractResult<
        _Complement<
          [bits[0]],
          NumberToNatural<1>,
          bits[0] extends 1 ? true : false,
          { orig_bits: bits }
        >
      >,
      Bits
    >;
type _Complement<
  result extends Bits,
  index extends Natural,
  flip_mode extends boolean,
  consts extends { orig_bits: Bits }
> = NaturalToNumber<index> extends consts['orig_bits']['length']
  ? result
  : {
      _: _Complement<
        [
          ...result,
          flip_mode extends true
            ? Not<consts['orig_bits'][NaturalToNumber<index>]>
            : consts['orig_bits'][NaturalToNumber<index>]
        ],
        Succ<index>,
        flip_mode extends true
          ? true
          : consts['orig_bits'][NaturalToNumber<index>] extends 1
          ? true
          : false,
        consts
      >;
    };

// if:
//   b1 > b2 -> 1
//   b1 < b2 -> -1
//   b1 = b2 -> 0
export type CompareUint<b1 extends Bits, b2 extends Bits> =
  b1['length'] extends b2['length']
    ? b1['length'] extends 0
      ? Exception<'CompareUint: length of b1 and b2 are 0'>
      : ExtractResult<
          _CompareUint2<Pred<NumberToNatural<b1['length']>>, { b1: b1; b2: b2 }>
        >
    : Exception<'CompareUint: length of b1 and b2 must be equal'>;
type _CompareUint2<
  index extends Natural | Exception,
  consts extends { b1: Bits; b2: Bits }
> = index extends Natural
  ? {
      _: _CompareUint3<
        index,
        CompareBit<
          consts['b1'][NaturalToNumber<index>],
          consts['b2'][NaturalToNumber<index>]
        >,
        consts
      >;
    }
  : 0;
type _CompareUint3<
  index extends Natural,
  compare_bit_desult extends number,
  consts extends { b1: Bits; b2: Bits }
> = compare_bit_desult extends 0
  ? { _: _CompareUint2<Pred<index>, consts> }
  : compare_bit_desult;
