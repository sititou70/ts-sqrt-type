import { SubInt } from '../integer/sub';
import { CompareUint } from '../integer/utils';
import { Float } from '../model';
import { Cast } from '../utils/cast';
import { AddUfloat } from './add';
import { MatchAndExpandFloatsExponent, MatchFloatsResult } from './utils';

export type SubUfloat<f1 extends Float, f2 extends Float> = _SubUfloat<
  MatchAndExpandFloatsExponent<f1, f2>
> extends infer A
  ? Cast<A, Float>
  : never;
type _SubUfloat<match_result extends MatchFloatsResult> = CompareUint<
  match_result['f1']['fraction'],
  match_result['f2']['fraction']
> extends -1
  ? {
      fraction: SubInt<
        match_result['f2']['fraction'],
        match_result['f1']['fraction']
      >;
      exponent: match_result['f1']['exponent'];
      is_negative: true;
    }
  : {
      fraction: SubInt<
        match_result['f1']['fraction'],
        match_result['f2']['fraction']
      >;
      exponent: match_result['f1']['exponent'];
      is_negative: false;
    };

export type SubFloat<f1 extends Float, f2 extends Float> = {
  'false,false': SubUfloat<f1, f2>;
  'false,true': AddUfloat<f1, f2>;
  'true,false': AddUfloat<f1, f2>;
  'true,true': SubUfloat<f2, f1>;
}[`${f1['is_negative']},${f2['is_negative']}`] extends infer A
  ? Cast<A, Float>
  : never;
