import { Bits } from '../model';
import { Cast } from '../utils/cast';
import { Exception } from '../utils/exception';
import { Natural, NumberToNatural, SubNatural } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';
import { Sub } from './sub';
import { CompareUint, LeftShift, MatchBitLength, RightShift1 } from './utils';

export type Divide<b1 extends Bits, b2 extends Bits> = b2 extends 0[]
  ? Exception<'Divide: divide by zero'>
  : b1 extends 0[]
  ? b1
  : {
      1: ExtractResult<
        _Divide<
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
      0: MatchBitLength<b1, [1]>['b2'];
      [-1]: MatchBitLength<b1, [0]>['b2'];
    }[CompareUint<b1, b2>];
type _Divide<
  result extends Bits,
  rest_of_b1 extends Bits,
  shifted_b2 extends Bits,
  consts extends { b1: Bits; b2: Bits }
> = shifted_b2 extends []
  ? result
  : CompareUint<consts['b2'], shifted_b2> extends 1
  ? result
  : {
      _: CompareUint<rest_of_b1, shifted_b2> extends -1
        ? _Divide<[0, ...result], rest_of_b1, RightShift1<shifted_b2>, consts>
        : _Divide<
            [1, ...result],
            Sub<rest_of_b1, shifted_b2>,
            RightShift1<shifted_b2>,
            consts
          >;
    };
