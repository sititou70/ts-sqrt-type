import { Bits } from '../model';
import { Cast } from '../utils/cast';
import { Exception } from '../utils/exception';
import { ExtractResult } from '../utils/result_container';
import { DivideAndModUint, DivideAndModUintResult } from './divide';
import { MultiUint } from './multi';
import { CompareUint, MatchBitLength } from './utils';

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
  '0101': Exception<'UintToDigit10: un expected bits'>;
  '1101': Exception<'UintToDigit10: un expected bits'>;
  '0011': Exception<'UintToDigit10: un expected bits'>;
  '1011': Exception<'UintToDigit10: un expected bits'>;
  '0111': Exception<'UintToDigit10: un expected bits'>;
  '1111': Exception<'UintToDigit10: un expected bits'>;
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
