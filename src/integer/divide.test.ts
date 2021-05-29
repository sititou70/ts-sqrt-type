import { assert, IsExact } from 'conditional-type-checks';
import { IsException } from '../utils/exception';
import { DivideAndModUint } from './divide';

// divide
// 33 / 3 = 11
assert<
  IsExact<
    DivideAndModUint<[1, 0, 0, 0, 0, 1], [1, 1]>['result'],
    [1, 1, 0, 1, 0]
  >
>(true);
// 32 / 3 = 10
assert<
  IsExact<
    DivideAndModUint<[0, 0, 0, 0, 0, 1], [1, 1]>['result'],
    [0, 1, 0, 1, 0]
  >
>(true);
// 31 / 3 = 10
assert<
  IsExact<DivideAndModUint<[1, 1, 1, 1, 1], [1, 1]>['result'], [0, 1, 0, 1]>
>(true);
// 30 / 3 = 10
assert<
  IsExact<DivideAndModUint<[0, 1, 1, 1, 1], [1, 1]>['result'], [0, 1, 0, 1]>
>(true);
// 29 / 3 = 9
assert<
  IsExact<DivideAndModUint<[1, 0, 1, 1, 1], [1, 1]>['result'], [1, 0, 0, 1]>
>(true);
// 28 / 3 = 9
assert<
  IsExact<DivideAndModUint<[0, 0, 1, 1, 1], [1, 1]>['result'], [1, 0, 0, 1]>
>(true);
// 27 / 3 = 9
assert<
  IsExact<DivideAndModUint<[1, 1, 0, 1, 1], [1, 1]>['result'], [1, 0, 0, 1]>
>(true);
// 26 / 3 = 8
assert<
  IsExact<DivideAndModUint<[0, 1, 0, 1, 1], [1, 1]>['result'], [0, 0, 0, 1]>
>(true);

// 32 / 1 = 32
assert<
  IsExact<
    DivideAndModUint<[0, 0, 0, 0, 0, 1], [1]>['result'],
    [0, 0, 0, 0, 0, 1]
  >
>(true);

// divide by zero
assert<IsException<DivideAndModUint<[0, 0, 0, 0, 0, 1], [0]>>>(true);
assert<IsException<DivideAndModUint<[0, 0, 0, 0, 0, 1], []>>>(true);
assert<IsException<DivideAndModUint<[0], []>>>(true);
assert<IsException<DivideAndModUint<[], []>>>(true);
assert<IsException<DivideAndModUint<[], [0]>>>(true);
assert<IsException<DivideAndModUint<[], [0, 0]>>>(true);

// divide zero
assert<IsExact<DivideAndModUint<[0, 0], [1]>['result'], [0, 0]>>(true);
assert<IsExact<DivideAndModUint<[0, 0], [0, 1]>['result'], [0, 0]>>(true);

// 998877665544332211 / 135790 = 7356047319716
// prettier-ignore
assert<IsExact<DivideAndModUint<
  [1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1],
  [0,1,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0,1]>['result'],
  [0,0,1,0,0,1,0,1,0,1,0,0,0,1,1,0,0,1,1,0,1,0,0,1,0,1,1,0,1,1,0,1,0,0,0,0,1,1,0,1,0,1,1]
>>(true);

// mod
// 33 % 3 = 0
assert<
  IsExact<
    DivideAndModUint<[1, 0, 0, 0, 0, 1], [1, 1]>['mod'],
    [0, 0, 0, 0, 0, 0]
  >
>(true);
// 32 % 3 = 2
assert<
  IsExact<
    DivideAndModUint<[0, 0, 0, 0, 0, 1], [1, 1]>['mod'],
    [0, 1, 0, 0, 0, 0]
  >
>(true);
// 31 % 3 = 1
assert<
  IsExact<DivideAndModUint<[1, 1, 1, 1, 1], [1, 1]>['mod'], [1, 0, 0, 0, 0]>
>(true);
// 30 % 3 = 0
assert<
  IsExact<DivideAndModUint<[0, 1, 1, 1, 1], [1, 1]>['mod'], [0, 0, 0, 0, 0]>
>(true);
// 29 % 3 = 2
assert<
  IsExact<DivideAndModUint<[1, 0, 1, 1, 1], [1, 1]>['mod'], [0, 1, 0, 0, 0]>
>(true);
// 28 % 3 = 1
assert<
  IsExact<DivideAndModUint<[0, 0, 1, 1, 1], [1, 1]>['mod'], [1, 0, 0, 0, 0]>
>(true);
// 27 % 3 = 0
assert<
  IsExact<DivideAndModUint<[1, 1, 0, 1, 1], [1, 1]>['mod'], [0, 0, 0, 0, 0]>
>(true);
// 26 % 3 = 2
assert<
  IsExact<DivideAndModUint<[0, 1, 0, 1, 1], [1, 1]>['mod'], [0, 1, 0, 0, 0]>
>(true);

// 32 % 1 = 0
assert<
  IsExact<DivideAndModUint<[0, 0, 0, 0, 0, 1], [1]>['mod'], [0, 0, 0, 0, 0, 0]>
>(true);

// divide by zero
assert<IsException<DivideAndModUint<[0, 0, 0, 0, 0, 1], [0]>>>(true);
assert<IsException<DivideAndModUint<[0, 0, 0, 0, 0, 1], []>>>(true);
assert<IsException<DivideAndModUint<[0], []>>>(true);
assert<IsException<DivideAndModUint<[], []>>>(true);
assert<IsException<DivideAndModUint<[], [0]>>>(true);
assert<IsException<DivideAndModUint<[], [0, 0]>>>(true);

// divide zero
assert<IsExact<DivideAndModUint<[0, 0], [1]>['mod'], [0]>>(true);
assert<IsExact<DivideAndModUint<[0, 0], [0, 1]>['mod'], [0]>>(true);

// 998877665544332211 % 135790 = 96571
// prettier-ignore
assert<IsExact<DivideAndModUint<
  [1,1,0,0,1,1,0,1,1,1,0,0,0,1,1,0,1,1,1,0,1,0,1,1,0,0,1,1,0,0,1,1,1,0,0,0,1,1,1,1,1,0,0,1,1,1,0,1,0,0,1,1,1,0,1,1,1,0,1,1],
  [0,1,1,1,0,1,1,0,0,1,0,0,1,0,0,0,0,1]>['mod'],
  [1,1,0,1,1,1,0,0,1,0,0,1,1,1,1,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
>>(true);
