import { Bits } from '../model';
import { Cast } from '../utils/cast';
import { Exception } from '../utils/exception';
import { ExtractResult } from '../utils/result_container';
import { AddInt } from './add';
import { DivideAndModUint, DivideAndModUintResult } from './divide';
import { MultiUint } from './multi';
import { MatchBitLength } from './utils';

// [1, 1, 0, 0] -> "1100" -> "3"
type UintToDigit10Map = {
  '0000': '0';
  '1000': '1';
  '0100': '2';
  '1100': '3';
  '0010': '4';
  '1010': '5';
  '0110': '6';
  '1110': '7';
  '0001': '8';
  '1001': '9';
  '0101': Exception<'UintToDigit10: unexpected bits'>;
  '1101': Exception<'UintToDigit10: unexpected bits'>;
  '0011': Exception<'UintToDigit10: unexpected bits'>;
  '1011': Exception<'UintToDigit10: unexpected bits'>;
  '0111': Exception<'UintToDigit10: unexpected bits'>;
  '1111': Exception<'UintToDigit10: unexpected bits'>;
};
export type UintToDigit10<bits extends Bits> = _UintToDigit10<
  MatchBitLength<bits, [0, 0, 0, 0]>['b1']
>;
export type _UintToDigit10<bits extends Bits> =
  UintToDigit10Map[`${bits[0]}${bits[1]}${bits[2]}${bits[3]}`];

type Ten = [0, 1, 0, 1];
export type UintToStr<bits extends Bits> = bits extends 0[]
  ? '0'
  : ExtractResult<_UintToStr<'', bits>>;
export type _UintToStr<result extends string, rest_of_bits extends Bits> =
  rest_of_bits extends 0[]
    ? result
    : {
        _: _UintToStr2<
          result,
          DivideAndModUint<rest_of_bits, Ten> extends infer A
            ? Cast<A, DivideAndModUintResult | Exception>
            : never
        >;
      };
type _UintToStr2<
  result extends string,
  divide_result extends DivideAndModUintResult | Exception
> = divide_result extends DivideAndModUintResult
  ? {
      _: _UintToStr3<
        result,
        UintToDigit10<divide_result['mod']>,
        divide_result
      >;
    }
  : '_UintToStr2: never';
type _UintToStr3<
  result extends string,
  to_digit10_result extends string | Exception,
  divide_result extends DivideAndModUintResult
> = to_digit10_result extends string
  ? {
      _: _UintToStr<`${to_digit10_result}${result}`, divide_result['result']>;
    }
  : '_UintToStr3: never';

type Digit10Str = '0' | '1' | '2' | '3' | '4' | '5' | '6' | '7' | '8' | '9';
type Digit10StrToUint = {
  '0': [0, 0, 0, 0];
  '1': [1, 0, 0, 0];
  '2': [0, 1, 0, 0];
  '3': [1, 1, 0, 0];
  '4': [0, 0, 1, 0];
  '5': [1, 0, 1, 0];
  '6': [0, 1, 1, 0];
  '7': [1, 1, 1, 0];
  '8': [0, 0, 0, 1];
  '9': [1, 0, 0, 1];
};

type GetLastDigit10Result<
  rest extends string = string,
  last extends Digit10Str = Digit10Str
> = { rest: rest; last: last };
// prettier-ignore
export type GetLastDigit10<str extends string> =
  str extends `${infer rest}0` ? GetLastDigit10Result<rest, '0'> :
  str extends `${infer rest}1` ? GetLastDigit10Result<rest, '1'> :
  str extends `${infer rest}2` ? GetLastDigit10Result<rest, '2'> :
  str extends `${infer rest}3` ? GetLastDigit10Result<rest, '3'> :
  str extends `${infer rest}4` ? GetLastDigit10Result<rest, '4'> :
  str extends `${infer rest}5` ? GetLastDigit10Result<rest, '5'> :
  str extends `${infer rest}6` ? GetLastDigit10Result<rest, '6'> :
  str extends `${infer rest}7` ? GetLastDigit10Result<rest, '7'> :
  str extends `${infer rest}8` ? GetLastDigit10Result<rest, '8'> :
  str extends `${infer rest}9` ? GetLastDigit10Result<rest, '9'> :
  Exception<`GetLastDigit10: unexpected syntax: '${str}'`>;

export type StrToUint<str extends string> = ExtractResult<
  _StrToUint<[0], [1], str>
>;
type _StrToUint<
  result extends Bits,
  current_weight extends Bits,
  rest_of_str extends string
> = rest_of_str extends ''
  ? result
  : { _: _StrToUint2<result, current_weight, GetLastDigit10<rest_of_str>> };
type _StrToUint2<
  result extends Bits,
  current_weight extends Bits,
  get_last_str_result extends GetLastDigit10Result | Exception
> = get_last_str_result extends GetLastDigit10Result
  ? {
      _: _StrToUint<
        AddInt<
          result,
          MultiUint<
            Digit10StrToUint[get_last_str_result['last']],
            current_weight
          >
        >,
        MultiUint<current_weight, Ten> extends infer A ? Cast<A, Bits> : never,
        get_last_str_result['rest']
      >;
    }
  : get_last_str_result;
