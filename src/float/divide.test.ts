import { assert, IsExact } from 'conditional-type-checks';
import { DivideFloat } from './divide';

// 3.1415 / 1.41421356 = 2.2213
//        correct value: 2.2213759568250781020654334554676452119438028864607973353048601796...
assert<
  IsExact<
    DivideFloat<
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
      fraction: [1, 0, 1, 0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 0, 0, 0, 0];
      exponent: [1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);

// 1.41421356 / 3.1415 = 0.45017143
//        correct value: 0.4501714340283304154066528728314499442941270093904185898456151519...
assert<
  IsExact<
    DivideFloat<
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
      fraction: [1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 0];
      exponent: [1, 1, 1, 1, 1, 1, 1, 1];
      is_negative: false;
    }
  >
>(true);
