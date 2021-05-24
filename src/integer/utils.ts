import { Bits } from '../model';
import { Not } from '../bit/basic_operation';
import {
  Natural,
  NaturalToNumber,
  NumberToNatural,
  Succ,
} from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';
import { Cast } from '../utils/cast';

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
