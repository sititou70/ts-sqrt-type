import { assert, IsExact } from 'conditional-type-checks';
import { IsException } from '../utils/exception';
import { DivideUint, ModUint } from './divide';

// divide
// 33 / 3 = 11
assert<IsExact<DivideUint<[1, 0, 0, 0, 0, 1], [1, 1]>, [1, 1, 0, 1, 0]>>(true);
// 32 / 3 = 10
assert<IsExact<DivideUint<[0, 0, 0, 0, 0, 1], [1, 1]>, [0, 1, 0, 1, 0]>>(true);
// 31 / 3 = 10
assert<IsExact<DivideUint<[1, 1, 1, 1, 1], [1, 1]>, [0, 1, 0, 1]>>(true);
// 30 / 3 = 10
assert<IsExact<DivideUint<[0, 1, 1, 1, 1], [1, 1]>, [0, 1, 0, 1]>>(true);
// 29 / 3 = 9
assert<IsExact<DivideUint<[1, 0, 1, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 28 / 3 = 9
assert<IsExact<DivideUint<[0, 0, 1, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 27 / 3 = 9
assert<IsExact<DivideUint<[1, 1, 0, 1, 1], [1, 1]>, [1, 0, 0, 1]>>(true);
// 26 / 3 = 8
assert<IsExact<DivideUint<[0, 1, 0, 1, 1], [1, 1]>, [0, 0, 0, 1]>>(true);

// 32 / 1 = 32
assert<IsExact<DivideUint<[0, 0, 0, 0, 0, 1], [1]>, [0, 0, 0, 0, 0, 1]>>(true);

// divide by zero
assert<IsException<DivideUint<[0, 0, 0, 0, 0, 1], [0]>>>(true);
assert<IsException<DivideUint<[0, 0, 0, 0, 0, 1], []>>>(true);
assert<IsException<DivideUint<[0], []>>>(true);
assert<IsException<DivideUint<[], []>>>(true);
assert<IsException<DivideUint<[], [0]>>>(true);
assert<IsException<DivideUint<[], [0, 0]>>>(true);

// divide zero
assert<IsExact<DivideUint<[0, 0], [1]>, [0, 0]>>(true);
assert<IsExact<DivideUint<[0, 0], [0, 1]>, [0, 0]>>(true);

// 998877665544332211 / 135790 = 7356047319716
// prettier-ignore
assert<IsExact<DivideUint<
  [1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1],
  [0,1,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0,1]>,
  [0,0,1,0,0,1,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,1,0,1,0,1,1]
>>(true);

// mod
// 33 % 3 = 0
type hoge = ModUint<[1, 0, 0, 0, 0, 1], [1, 1]>;
assert<IsExact<ModUint<[1, 0, 0, 0, 0, 1], [1, 1]>, [0, 0, 0, 0, 0, 0]>>(true);
// 32 % 3 = 2
assert<IsExact<ModUint<[0, 0, 0, 0, 0, 1], [1, 1]>, [0, 1, 0, 0, 0, 0]>>(true);
// 31 % 3 = 1
assert<IsExact<ModUint<[1, 1, 1, 1, 1], [1, 1]>, [1, 0, 0, 0, 0]>>(true);
// 30 % 3 = 0
assert<IsExact<ModUint<[0, 1, 1, 1, 1], [1, 1]>, [0, 0, 0, 0, 0]>>(true);
// 29 % 3 = 2
assert<IsExact<ModUint<[1, 0, 1, 1, 1], [1, 1]>, [0, 1, 0, 0, 0]>>(true);
// 28 % 3 = 1
assert<IsExact<ModUint<[0, 0, 1, 1, 1], [1, 1]>, [1, 0, 0, 0, 0]>>(true);
// 27 % 3 = 0
assert<IsExact<ModUint<[1, 1, 0, 1, 1], [1, 1]>, [0, 0, 0, 0, 0]>>(true);
// 26 % 3 = 2
assert<IsExact<ModUint<[0, 1, 0, 1, 1], [1, 1]>, [0, 1, 0, 0, 0]>>(true);

// 32 % 1 = 0
assert<IsExact<ModUint<[0, 0, 0, 0, 0, 1], [1]>, [0, 0, 0, 0, 0, 0]>>(true);

// divide by zero
assert<IsException<ModUint<[0, 0, 0, 0, 0, 1], [0]>>>(true);
assert<IsException<ModUint<[0, 0, 0, 0, 0, 1], []>>>(true);
assert<IsException<ModUint<[0], []>>>(true);
assert<IsException<ModUint<[], []>>>(true);
assert<IsException<ModUint<[], [0]>>>(true);
assert<IsException<ModUint<[], [0, 0]>>>(true);

// divide zero
assert<IsExact<ModUint<[0, 0], [1]>, [0]>>(true);
assert<IsExact<ModUint<[0, 0], [0, 1]>, [0]>>(true);

// 998877665544332211 % 135790 = 96571
// prettier-ignore
assert<IsExact<ModUint<
  [1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1],
  [0,1,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0,1]>,
  [1,1,0,1,1,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
>>(true);
