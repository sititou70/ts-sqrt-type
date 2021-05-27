import { assert, IsExact } from 'conditional-type-checks';
import { IsException } from '../utils/exception';
import { Divide } from './divide';

// 33 / 3 = 11
assert<IsExact<Divide<[1, 0, 0, 0, 0, 1], [1, 1]>, [1, 1, 0, 1, 0]>>(true);
// 32 / 3 = 10
assert<IsExact<Divide<[0, 0, 0, 0, 0, 1], [1, 1]>, [0, 1, 0, 1, 0]>>(true);
// 31 / 3 = 10
assert<IsExact<Divide<[1, 1, 1, 1, 1], [1, 1]>, [0, 1, 0, 1]>>(true);
// 30 / 3 = 10
assert<IsExact<Divide<[0, 1, 1, 1, 1], [1, 1]>, [0, 1, 0, 1]>>(true);
// 29 / 3 = 9
assert<IsExact<Divide<[1, 0, 1, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 28 / 3 = 9
assert<IsExact<Divide<[0, 0, 1, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 27 / 3 = 9
assert<IsExact<Divide<[1, 1, 0, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 26 / 3 = 8
assert<IsExact<Divide<[0, 1, 0, 1, 1], [1, 1]>, [0, 0, 0, 1]>>(true);

// 32 / 1 = 32
assert<IsExact<Divide<[0, 0, 0, 0, 0, 1], [1]>, [0, 0, 0, 0, 0, 1]>>(true);

// divide by zero
assert<IsException<Divide<[0, 0, 0, 0, 0, 1], [0]>>>(true);
assert<IsException<Divide<[0, 0, 0, 0, 0, 1], []>>>(true);
assert<IsException<Divide<[0], []>>>(true);
assert<IsException<Divide<[], []>>>(true);
assert<IsException<Divide<[], [0]>>>(true);
assert<IsException<Divide<[], [0, 0]>>>(true);

// divide zero
assert<IsExact<Divide<[0, 0], [1]>, [0, 0]>>(true);
assert<IsExact<Divide<[0, 0], [0, 1]>, [0, 0]>>(true);

// 998877665544332211 / 135790 = 7356047319716
// prettier-ignore
assert<IsExact<Divide<
  [1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1],
  [0,1,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0,1]>,
  [0,0,1,0,0,1,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,1,0,1,0,1,1]
>>(true);
