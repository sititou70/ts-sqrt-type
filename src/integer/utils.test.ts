import { assert, IsExact } from 'conditional-type-checks';
import { IsException } from '../utils/exception';
import { CompareUint, Complement } from './utils';

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

assert<IsException<CompareUint<[], []>>>(true);
assert<IsException<CompareUint<[1], []>>>(true);
assert<IsException<CompareUint<[1], [0, 0]>>>(true);
// 10 > 9 -> 1
assert<IsExact<CompareUint<[0, 1, 0, 1], [1, 0, 0, 1]>, 1>>(true);
// 10 < 11 -> -1
assert<IsExact<CompareUint<[0, 1, 0, 1], [1, 1, 0, 1]>, -1>>(true);
// 10 = 10 -> 0
assert<IsExact<CompareUint<[0, 1, 0, 1], [0, 1, 0, 1]>, 0>>(true);
