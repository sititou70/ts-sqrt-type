import { assert, IsExact } from 'conditional-type-checks';
import { IsException } from '../utils/exception';
import { NumberToNatural } from '../utils/natural_number';
import {
  CompareUint,
  Complement,
  LeftShift,
  MatchBitLength,
  RightShift,
  ZeroPadding,
} from './utils';

// 0bit
assert<IsExact<Complement<[]>, []>>(true);
// 1bit: 1 -> 1 = 2 - 1
assert<IsExact<Complement<[1]>, [1]>>(true);
// 1bit: 0 -> 2 = 2 - 0
assert<IsExact<Complement<[0]>, [0]>>(true);
// 2bit: 1 -> 3 = 4 - 1
assert<IsExact<Complement<[1, 0]>, [1, 1]>>(true);
// 4bit: 4 -> 12 = 16 - 4
assert<IsExact<Complement<[0, 0, 1, 0]>, [0, 0, 1, 1]>>(true);
// 8bit: 36 -> 220 = 256 - 36
assert<IsExact<Complement<[0, 0, 1, 0, 0, 1, 0, 0]>, [0, 0, 1, 1, 1, 0, 1, 1]>>(
  true
);

assert<IsExact<CompareUint<[], []>, 0>>(true);
// 1 > 0 -> 1
assert<IsExact<CompareUint<[1], []>, 1>>(true);
assert<IsExact<CompareUint<[1], [0, 0]>, 1>>(true);
// 10 > 9 -> 1
assert<IsExact<CompareUint<[0, 1, 0, 1], [1, 0, 0, 1]>, 1>>(true);
// 10 < 11 -> -1
assert<IsExact<CompareUint<[0, 1, 0, 1], [1, 1, 0, 1]>, -1>>(true);
// 10 = 10 -> 0
assert<IsExact<CompareUint<[0, 1, 0, 1], [0, 1, 0, 1]>, 0>>(true);
// 3 < 48 -> -1
assert<IsExact<CompareUint<[1, 1], [0, 0, 0, 0, 1, 1]>, -1>>(true);

assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<0>>, [0, 1, 0, 1]>>(
  true
);
assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<1>>, [1, 0, 1]>>(true);
assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<2>>, [0, 1]>>(true);
assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<3>>, [1]>>(true);
assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<4>>, []>>(true);
assert<IsExact<RightShift<[0, 1, 0, 1], NumberToNatural<5>>, []>>(true);
assert<IsExact<RightShift<[], NumberToNatural<1>>, []>>(true);
assert<IsExact<RightShift<[], NumberToNatural<0>>, []>>(true);

assert<IsExact<LeftShift<[0, 1, 0, 1], NumberToNatural<0>>, [0, 1, 0, 1]>>(
  true
);
assert<IsExact<LeftShift<[0, 1, 0, 1], NumberToNatural<1>>, [0, 0, 1, 0, 1]>>(
  true
);
assert<
  IsExact<LeftShift<[0, 1, 0, 1], NumberToNatural<2>>, [0, 0, 0, 1, 0, 1]>
>(true);
assert<
  IsExact<LeftShift<[0, 1, 0, 1], NumberToNatural<3>>, [0, 0, 0, 0, 1, 0, 1]>
>(true);
assert<IsExact<LeftShift<[], NumberToNatural<1>>, [0]>>(true);
assert<IsExact<LeftShift<[], NumberToNatural<2>>, [0, 0]>>(true);

assert<IsExact<ZeroPadding<[], 2>, [0, 0]>>(true);
assert<IsExact<ZeroPadding<[1, 0, 0], 0>, [1, 0, 0]>>(true);
assert<IsExact<ZeroPadding<[1, 0, 0], 2>, [1, 0, 0]>>(true);
assert<IsExact<ZeroPadding<[1, 0, 0], 3>, [1, 0, 0]>>(true);
assert<IsExact<ZeroPadding<[1, 0, 0], 4>, [1, 0, 0, 0]>>(true);

assert<
  IsExact<MatchBitLength<[1, 0, 0], [0, 0]>, { b1: [1, 0, 0]; b2: [0, 0, 0] }>
>(true);
assert<
  IsExact<
    MatchBitLength<[1, 1], [0, 0, 0, 0, 1, 1]>,
    { b1: [1, 1, 0, 0, 0, 0]; b2: [0, 0, 0, 0, 1, 1] }
  >
>(true);
assert<
  IsExact<
    MatchBitLength<[1, 0, 1], [1, 0, 0, 1, 0, 1]>,
    { b1: [1, 0, 1, 0, 0, 0]; b2: [1, 0, 0, 1, 0, 1] }
  >
>(true);
assert<
  IsExact<
    MatchBitLength<[1, 0, 1], [1, 0, 1]>,
    { b1: [1, 0, 1]; b2: [1, 0, 1] }
  >
>(true);
