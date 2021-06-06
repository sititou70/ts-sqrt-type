import { DivideAndModUint, DivideAndModUintResult } from '../integer/divide';
import { MultiUint } from '../integer/multi';
import { Bits, Float } from '../model';
import { Cast } from '../utils/cast';
import { CompareNatural, Natural, Pred, Succ } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';

type Ten = [0, 1, 0, 1];
type ExpandFloatExponentOneDigit<f extends Float> = {
  fraction: MultiUint<f['fraction'], Ten> extends infer A
    ? Cast<A, Bits>
    : never;
  exponent: Succ<f['exponent']>;
  is_negative: f['is_negative'];
};

export type ShrinkFloatExponentOneDigit<f extends Float> = {
  fraction: (DivideAndModUint<f['fraction'], Ten> extends infer A
    ? Cast<A, DivideAndModUintResult>
    : never)['result'];
  exponent: Pred<f['exponent']> extends infer A ? Cast<A, Natural> : never;
  is_negative: f['is_negative'];
};

export type MatchFloatsResult<
  f1 extends Float = Float,
  f2 extends Float = Float
> = {
  f1: f1;
  f2: f2;
};
export type MatchAndExpandFloatsExponent<f1 extends Float, f2 extends Float> = {
  0: MatchFloatsResult<f1, f2>;
  1: ExtractResult<ExpandF2<f1, f2>>;
  [-1]: ExtractResult<ExpandF1<f1, f2>>;
}[CompareNatural<f1['exponent'], f2['exponent']>] extends infer A
  ? Cast<A, MatchFloatsResult>
  : never;
type ExpandF1<f1 extends Float, f2 extends Float> =
  f2['exponent'] extends f1['exponent']
    ? MatchFloatsResult<f1, f2>
    : {
        _: ExpandF1<ExpandFloatExponentOneDigit<f1>, f2>;
      };
type ExpandF2<f1 extends Float, f2 extends Float> =
  f1['exponent'] extends f2['exponent']
    ? MatchFloatsResult<f1, f2>
    : { _: ExpandF2<f1, ExpandFloatExponentOneDigit<f2>> };
