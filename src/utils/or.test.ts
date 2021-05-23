import { assert, IsExact } from 'conditional-type-checks';
import { OR } from './or';

assert<IsExact<OR<0, 0>, 0>>(true);
assert<IsExact<OR<0, 1>, 1>>(true);
assert<IsExact<OR<1, 0>, 1>>(true);
assert<IsExact<OR<1, 1>, 1>>(true);
