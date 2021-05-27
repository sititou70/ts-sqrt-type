import { assert, IsExact } from 'conditional-type-checks';
import { And, CompareBit, Not, Or } from './basic_operation';

assert<IsExact<Or<0, 0>, 0>>(true);
assert<IsExact<Or<0, 1>, 1>>(true);
assert<IsExact<Or<1, 0>, 1>>(true);
assert<IsExact<Or<1, 1>, 1>>(true);

assert<IsExact<And<0, 0>, 0>>(true);
assert<IsExact<And<0, 1>, 0>>(true);
assert<IsExact<And<1, 0>, 0>>(true);
assert<IsExact<And<1, 1>, 1>>(true);

assert<IsExact<Not<0>, 1>>(true);
assert<IsExact<Not<1>, 0>>(true);

assert<IsExact<CompareBit<0, 0>, 0>>(true);
assert<IsExact<CompareBit<0, 1>, -1>>(true);
assert<IsExact<CompareBit<1, 0>, 1>>(true);
assert<IsExact<CompareBit<1, 1>, 0>>(true);
