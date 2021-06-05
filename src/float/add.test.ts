import { assert, IsExact } from 'conditional-type-checks';
import { AddFloat, AddUfloat } from './add';

// 3.1415 + 1.41421356 = 4.55571356
assert<
  IsExact<
    AddUfloat<
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
      fraction: [0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);

// 3.1415 + 1.41421356 = 4.55571356
assert<
  IsExact<
    AddFloat<
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
      fraction: [0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
// 3.1415 + -1.41421356 = 1.72728644
assert<
  IsExact<
    AddFloat<
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
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
// -3.1415 + 1.41421356 = -1.72728644
assert<
  IsExact<
    AddFloat<
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
      fraction: [0,0,1,0,0,0,1,0,1,0,0,0,0,1,0,1,1,1,0,1,0,0,1,0,0,1,0,1,0,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }
  >
>(true);
// -3.1415 + -1.41421356 = -4.55571356
assert<
  IsExact<
    AddFloat<
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
      fraction: [0,0,1,1,1,0,0,1,1,1,1,0,1,1,1,0,1,1,1,0,0,1,0,0,1,1,0,1,1,0,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: true;
    }
  >
>(true);
