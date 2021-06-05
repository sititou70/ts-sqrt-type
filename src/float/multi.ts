import { MultiUint } from '../integer/multi';
import { Float } from '../model';
import { Cast } from '../utils/cast';
import { AddNatural } from '../utils/natural_number';

export type MultiFloat<f1 extends Float, f2 extends Float> = {
  fraction: MultiUint<f1['fraction'], f2['fraction']>;
  exponent: AddNatural<f1['exponent'], f2['exponent']>;
  is_negative: {
    'false,false': false;
    'false,true': true;
    'true,false': true;
    'true,true': false;
  }[`${f1['is_negative']},${f2['is_negative']}`];
} extends infer A
  ? Cast<A, Float>
  : never;
