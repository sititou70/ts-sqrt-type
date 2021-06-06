import { AddFloat } from '../float/add';
import { DivideFloat } from '../float/divide';
import { MultiFloat } from '../float/multi';
import { Float } from '../model';
import { Cast } from '../utils/cast';
import { Natural, Succ } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';

type Two = {
  fraction: [0, 1];
  exponent: [];
  is_negative: false;
};
export type NewtonSqrtStep<current_value extends Float, squared extends Float> =
  DivideFloat<
    AddFloat<MultiFloat<current_value, current_value>, squared>,
    MultiFloat<current_value, Two>
  > extends infer A
    ? Cast<A, Float>
    : never;

export type NewtonSqrt<
  squared extends Float,
  initial_value extends Float,
  max_calc_num extends Natural
> = ExtractResult<_NewtonSqrt2<initial_value, squared, [], max_calc_num>>;
type _NewtonSqrt2<
  current_value extends Float,
  squared extends Float,
  count extends Natural,
  max_calc_num extends Natural
> = count extends max_calc_num
  ? current_value
  : {
      _: _NewtonSqrt2<
        NewtonSqrtStep<current_value, squared>,
        squared,
        Succ<count>,
        max_calc_num
      >;
    };
