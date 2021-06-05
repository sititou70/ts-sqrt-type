import { assert, IsExact } from 'conditional-type-checks';
import { FloatToStr } from './convert';

assert<
  IsExact<
    FloatToStr<{
      fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
      exponent: [1, 1, 1, 1];
      is_negative: true;
    }>,
    '-3.1415'
  >
>(true);
assert<
  IsExact<
    FloatToStr<{
      fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }>,
    '-0.00031415'
  >
>(true);
assert<
  IsExact<
    FloatToStr<{
      // prettier-ignore
      fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }>,
    '1.41421356'
  >
>(true);
assert<
  IsExact<
    FloatToStr<{
      // prettier-ignore
      fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
      exponent: [1];
      is_negative: false;
    }>,
    '14142135.6'
  >
>(true);
