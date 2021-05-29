import { Or } from '../bit/basic_operation';
import { Bits } from '../model';
import {
  AddNatural,
  Natural,
  NaturalToNumber,
  NumberToNatural,
  Succ,
} from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';
import { LeftShift, LeftShift1 } from './utils';
import { Add } from './add';
import { Cast } from '../utils/cast';

// result["length"] === b1["length"] + b2["length"]
export type MultiUint<b1 extends Bits, b2 extends Bits> = Or<
  b1 extends [] ? 1 : 0,
  b2 extends [] ? 1 : 0
> extends 1
  ? []
  : ExtractResult<
      _MultiUint<
        LeftShift<
          [],
          AddNatural<
            NumberToNatural<b1['length']>,
            NumberToNatural<b2['length']>
          >
        >,
        NumberToNatural<0>,
        b1,
        { b2: b2 }
      >
    > extends infer A
  ? Cast<A, Bits>
  : never;
type _MultiUint<
  result extends Bits,
  index extends Natural,
  shifted_b1 extends Bits,
  consts extends { b2: Bits }
> = NaturalToNumber<index> extends consts['b2']['length']
  ? result
  : consts['b2'][NaturalToNumber<index>] extends 1
  ? {
      _: _MultiUint<
        Add<result, shifted_b1>,
        Succ<index>,
        LeftShift1<shifted_b1>,
        consts
      >;
    }
  : {
      _: _MultiUint<result, Succ<index>, LeftShift1<shifted_b1>, consts>;
    };
