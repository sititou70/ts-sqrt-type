import { assert, IsExact } from 'conditional-type-checks';
import { ExtractResult } from './result_container';

assert<IsExact<ExtractResult<{ _: 0 }>, 0>>(true);
assert<IsExact<ExtractResult<{ _: { _: 0 } }>, 0>>(true);
assert<IsExact<ExtractResult<{ _: { _: { _: 0 } } }>, 0>>(true);
assert<IsExact<ExtractResult<{ _: { _: { _: { _: 0 } } } }>, 0>>(true);
assert<IsExact<ExtractResult<{ _: { _: { _: { _: { _: 0 } } } } }>, 0>>(true);
