import { FloatToStr } from '../float/convert';
import {
  RemoveExtraZerosFloat,
  ShrinkFloatExponentOneDigit,
} from '../float/utils';
import { NewtonSqrtStep } from '../sqrt/sqrt';
import { NumberToNatural } from '../utils/natural_number';

type squared_value = {
  fraction: [1, 0, 1];
  exponent: NumberToNatural<0>;
  is_negative: false;
};
type initial_value = {
  fraction: [0, 0, 1, 0, 1];
  exponent: NumberToNatural<1>;
  is_negative: false;
};

type result1 = NewtonSqrtStep<initial_value, squared_value>;
type result2 = NewtonSqrtStep<result1, squared_value>;

type result3_tmp1 = NewtonSqrtStep<result2, squared_value>;
type result3_tmp2 = ShrinkFloatExponentOneDigit<result3_tmp1>;
type result3_tmp3 = ShrinkFloatExponentOneDigit<result3_tmp2>;
type result3 = RemoveExtraZerosFloat<result3_tmp3>;

type result4_tmp1 = NewtonSqrtStep<result3, squared_value>;
type result4_tmp2 = ShrinkFloatExponentOneDigit<result4_tmp1>;
type result4 = RemoveExtraZerosFloat<result4_tmp2>;

const result: FloatToStr<result4> = null;
