import { assert, IsExact } from 'conditional-type-checks';
import { MultiUint } from './multi';

// 1 * 1 = 1
assert<IsExact<MultiUint<[1], [1]>, [1, 0]>>(true);
// 12 * 345 = 4140
assert<
  IsExact<
    MultiUint<[0, 0, 1, 1], [1, 0, 0, 1, 1, 0, 1, 0, 1]>,
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1]
  >
>(true);
// 345 * 12 = 4140
assert<
  IsExact<
    MultiUint<[1, 0, 0, 1, 1, 0, 1, 0, 1], [0, 0, 1, 1]>,
    [0, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 1]
  >
>(true);
// 123456789 * 987654321 = 121932631112635269
// prettier-ignore
assert<
  IsExact<
    MultiUint<[1,0,1,0,1,0,0,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1,0,1,1,1], [1,0,0,0,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1,0,1,1,1]>,
          [1,0,1,0,0,0,0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,1,0,1,1]
  >
>(true);
// 987654321 * 123456789 = 121932631112635260
// prettier-ignore
assert<
  IsExact<
    MultiUint<[1,0,0,0,1,1,0,1,0,0,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1,0,1,1,1], [1,0,1,0,1,0,0,0,1,0,1,1,0,0,1,1,1,1,0,1,1,0,1,0,1,1,1]>,
          [1,0,1,0,0,0,0,1,1,1,0,0,1,0,1,0,1,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,0,0,1,0,1,0,0,0,1,0,0,0,1,1,0,0,1,0,0,0,1,1,0,1,1]
  >
>(true);
