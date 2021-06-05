import { AddInt } from '../integer/add';
import { Float } from '../model';
import { Cast } from '../utils/cast';
import { SubUfloat } from './sub';
import { MatchAndExpandFloatsExponent, MatchFloatsResult } from './utils';

export type AddUfloat<f1 extends Float, f2 extends Float> = _AddUfloat2<
  MatchAndExpandFloatsExponent<f1, f2>
> extends infer A
  ? Cast<A, Float>
  : never;
type _AddUfloat2<match_result extends MatchFloatsResult> = {
  fraction: AddInt<
    match_result['f1']['fraction'],
    match_result['f2']['fraction']
  >;
  exponent: match_result['f1']['exponent'];
  is_negative: match_result['f1']['is_negative'];
};

export type AddFloat<f1 extends Float, f2 extends Float> = {
  'false,false': AddUfloat<f1, f2>;
  'false,true': SubUfloat<f1, f2>;
  'true,false': SubUfloat<f2, f1>;
  'true,true': AddUfloat<f1, f2>;
}[`${f1['is_negative']},${f2['is_negative']}`] extends infer A
  ? Cast<A, Float>
  : never;
