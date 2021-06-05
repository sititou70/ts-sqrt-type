import { And } from '../bit/basic_operation';
import {
  GetLastDigit10,
  GetLastDigit10Result,
  UintToStr,
} from '../integer/convert';
import { Float } from '../model';
import { Cast } from '../utils/cast';
import { Natural, Succ } from '../utils/natural_number';
import { ExtractResult } from '../utils/result_container';

export type FloatToStr<f extends Float> = ExtractResult<
  _FloatToStr2<
    '',
    GetLastDigit10<
      UintToStr<f['fraction']> extends infer A ? Cast<A, string> : never
    > extends infer A
      ? Cast<A, GetLastDigit10Result>
      : never,
    [],
    false,
    false,
    { f: f }
  >
> extends infer A
  ? Cast<A, string>
  : never;
type _FloatToStr2<
  result extends string,
  last_digit_result extends GetLastDigit10Result,
  recursive_cnt extends Natural,
  dot_printed extends boolean,
  last_digit_printed extends boolean,
  consts extends { f: Float }
> = And<
  dot_printed extends true ? 1 : 0,
  last_digit_printed extends true ? 1 : 0
> extends 1
  ? `${consts['f']['is_negative'] extends true ? '-' : ''}${result}`
  : {
      _: _FloatToStr2<
        `${last_digit_printed extends false
          ? last_digit_result['last']
          : '0'}${recursive_cnt extends consts['f']['exponent']
          ? '.'
          : ''}${result}`,
        last_digit_result['rest'] extends ''
          ? last_digit_result
          : Cast<
              GetLastDigit10<last_digit_result['rest']>,
              GetLastDigit10Result
            >,
        Succ<recursive_cnt>,
        dot_printed extends true
          ? true
          : recursive_cnt extends consts['f']['exponent']
          ? true
          : false,
        last_digit_printed extends true
          ? true
          : last_digit_result['rest'] extends ''
          ? true
          : false,
        consts
      >;
    };
