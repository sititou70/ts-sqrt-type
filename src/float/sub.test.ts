import { assert, IsExact } from 'conditional-type-checks';
import { UintToStr } from '../integer/convert';
import { SubFloat, SubUfloat } from './sub';

// 3.1415 - 1.41421356 = 1.72728644
assert<
  IsExact<
    SubUfloat<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: false;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: false;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);

// 1.41421356 - 3.1415 = -1.72728644
assert<
  IsExact<
    SubUfloat<
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: false;
      },
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: false;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }
  >
>(true);

// 3.1415 - 1.41421356 = 1.72728644
assert<
  IsExact<
    SubFloat<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: false;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: false;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
// 3.1415 - -1.41421356 = 4.55571356
assert<
  IsExact<
    SubFloat<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: false;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
// -3.1415 - 1.41421356 = -4.55571356
assert<
  IsExact<
    SubFloat<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: false;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }
  >
>(true);
// -3.1415 - -1.41421356 = -1.72728644
assert<
  IsExact<
    SubFloat<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1, 0];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      }
    >,
    {
      // prettier-ignore
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }
  >
>(true);
