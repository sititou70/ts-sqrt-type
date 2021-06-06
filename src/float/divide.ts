import { DivideAndModUint } from '../integer/divide';
import { MultiUint } from '../integer/multi';
import { Bits, Float } from '../model';
import { Cast } from '../utils/cast';
import { Natural, Succ } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';

type Ten = [0, 1, 0, 1];
export type DivideFloat<f1 extends Float, f2 extends Float> = ExtractResult<
  _DivideFloat<f1['fraction'], [], { f1: f1; f2: f2 }>
> extends infer A
  ? Cast<A, Float>
  : never;
type _DivideFloat<
  adjusted_f1_frac extends Bits,
  times extends Natural,
  consts extends { f1: Float; f2: Float }
> = times extends consts['f2']['exponent']
  ? {
      fraction: DivideAndModUint<
        adjusted_f1_frac,
        consts['f2']['fraction']
      >['result'];
      exponent: consts['f1']['exponent'];
      is_negative: {
        'false,false': false;
        'false,true': true;
        'true,false': true;
        'true,true': false;
      }[`${consts['f1']['is_negative']},${consts['f2']['is_negative']}`];
    }
  : {
      _: _DivideFloat<
        MultiUint<adjusted_f1_frac, Ten> extends infer A
          ? Cast<A, Bits>
          : never,
        Succ<times>,
        consts
      >;
    };
