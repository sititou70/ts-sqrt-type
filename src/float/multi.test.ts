import { assert, IsExact } from 'conditional-type-checks';
import { MultiFloat } from './multi';

// -120 * 0.5 = -60
assert<
  IsExact<
    MultiFloat<
      {
        fraction: [0, 0, 0, 1, 1, 1, 1, 0];
        exponent: [];
        is_negative: true;
      },
      {
        fraction: [1, 0, 1, 0];
        exponent: [1];
        is_negative: false;
      }
    >,
    {
      fraction: [0, 0, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0];
      exponent: [1];
      is_negative: true;
    }
  >
>(true);

// -3.1415 * -1.41421356 = 4.44275189874
assert<
  IsExact<
    MultiFloat<
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
      fraction: [0,0,1,0,1,1,1,0,0,0,1,0,1,0,0,0,0,1,1,0,0,1,0,1,0,0,0,1,0,1,1,0,0,1,0,1,0,0,0,0,0,0,1,0,0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
