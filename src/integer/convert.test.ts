import { assert, IsExact } from 'conditional-type-checks';
import { UintToStr, StrToUint } from './convert';

assert<IsExact<UintToStr<[0]>, '0'>>(true);
assert<IsExact<UintToStr<[1, 1, 0, 1, 1, 1, 1]>, '123'>>(true);
// prettier-ignore
assert<IsExact<UintToStr<[1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1]>, '9999999999'>>(true);
// prettier-ignore
assert<IsExact<UintToStr<[0,0,0,0,0,0,0,0,0,0,1,0,0,1,1,1,1,1,0,1,0,0,0,0,0,0,1,0,1,0,1,0,0,1]>, '10000000000'>>(true);
// prettier-ignore
assert<IsExact<UintToStr<[1,1,0,0,0,1,0,0,1,0,1,1,0,1,1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,1,0,1]>, '3141592653589795'>>(true);

assert<IsExact<StrToUint<'123'>, [1, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0]>>(
  true
);
// prettier-ignore
assert<IsExact<StrToUint<'3141592653589795'>, [1,1,0,0,0,1,0,0,1,0,1,1,0,1,1,0,1,0,1,0,0,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,0,0,1,0,1,0,0,1,0,1,0,0,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0]>>(true);
