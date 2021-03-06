import { Bits } from '../model';
import { Cast } from '../utils/cast';
import { Exception } from '../utils/exception';
import { Natural, NumberToNatural, SubNatural } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';
import { SubInt } from './sub';
import { CompareUint, LeftShift, RightShift1 } from './utils';

export type DivideAndModUintResult<
  result extends Bits = Bits,
  mod extends Bits = Bits
> = {
  result: result;
  mod: mod;
};
export type DivideAndModUint<b1 extends Bits, b2 extends Bits> = b2 extends 0[]
  ? Exception<'Divide: divide by zero'>
  : b1 extends 0[]
  ? DivideAndModUintResult<b1, [0]>
  : {
      1: ExtractResult<
        _DivideAndModUint<
          [],
          b1,
          Cast<
            LeftShift<
              b2,
              SubNatural<
                NumberToNatural<b1['length']>,
                NumberToNatural<b2['length']>
              > extends infer A
                ? Cast<A, Natural>
                : never
            >,
            Bits
          >,
          { b1: b1; b2: b2 }
        >
      >;
      0: DivideAndModUintResult<[1], [0]>;
      [-1]: DivideAndModUintResult<[0], b1>;
    }[CompareUint<b1, b2>];
type _DivideAndModUint<
  result extends Bits,
  rest_of_b1 extends Bits,
  shifted_b2 extends Bits,
  consts extends { b1: Bits; b2: Bits }
> = CompareUint<consts['b2'], shifted_b2> extends 1
  ? DivideAndModUintResult<result, rest_of_b1>
  : {
      _: CompareUint<rest_of_b1, shifted_b2> extends -1
        ? _DivideAndModUint<
            [0, ...result],
            rest_of_b1,
            RightShift1<shifted_b2>,
            consts
          >
        : _DivideAndModUint<
            [1, ...result],
            SubInt<rest_of_b1, shifted_b2>,
            RightShift1<shifted_b2>,
            consts
          >;
    };
