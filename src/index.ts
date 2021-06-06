import { AddFloat } from './float/add';
import { FloatToStr } from './float/convert';
import { DivideFloat } from './float/divide';
import { MultiFloat } from './float/multi';
import { ShrinkFloatExponentOneDigit } from './float/utils';
import { UintToStr } from './integer/convert';
import { Float } from './model';
import { NewtonSqrt, NewtonSqrtStep } from './sqrt/sqrt';
import { NaturalToNumber, NumberToNatural } from './utils/natural_number';

type Two = {
  fraction: [0, 1];
  exponent: [];
  is_negative: false;
};

type squared_value = {
  fraction: [0, 1];
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
type result3 = ShrinkFloatExponentOneDigit<result3_tmp2>;

type result4_tmp1 = NewtonSqrtStep<result3, squared_value>;
type result4_tmp2 = ShrinkFloatExponentOneDigit<result4_tmp1>;
type result4_tmp3 = ShrinkFloatExponentOneDigit<result4_tmp2>;
type result4_tmp4 = ShrinkFloatExponentOneDigit<result4_tmp3>;
type result4 = ShrinkFloatExponentOneDigit<result4_tmp4>;

//type result5 = NewtonSqrtStep<result4, squared_value>;
//type result6 = NewtonSqrtStep<result5, squared_value>;
//type result7 = NewtonSqrtStep<result6, squared_value>;
//type result8 = NewtonSqrtStep<result7, squared_value>;
//type result9 = NewtonSqrtStep<result8, squared_value>;

//const result: result4 = {
//  fraction: [],
//  exponent: [],
//  is_negative: false,
//};

const result: FloatToStr<result4> = null;
