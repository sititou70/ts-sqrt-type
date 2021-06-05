import { assert, IsExact } from 'conditional-type-checks';
import { MatchAndExpandFloatsExponent, MatchFloatsResult } from './utils';

assert<
  IsExact<
    MatchAndExpandFloatsExponent<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      }
    >,
    MatchFloatsResult<
      {
        // prettier-ignore
        fraction: [0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,1,0,1,0,1,0,0,1,0,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      },
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      }
    >
  >
>(true);

assert<
  IsExact<
    MatchAndExpandFloatsExponent<
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      },
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      }
    >,
    MatchFloatsResult<
      {
        // prettier-ignore
        fraction: [0,0,1,1,0,1,0,0,1,1,0,1,0,1,1,1,1,0,1,1,0,1,1,0,0,0,0,1];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      },
      {
        // prettier-ignore
        fraction: [0,0,0,0,1,1,1,0,0,0,1,1,0,0,0,1,1,0,0,1,1,1,0,1,0,1,0,0,1,0,0];
        exponent: [1, 1, 1, 1, 1, 1, 1, 1];
        is_negative: true;
      }
    >
  >
>(true);

assert<
  IsExact<
    MatchAndExpandFloatsExponent<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      },
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      }
    >,
    MatchFloatsResult<
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      },
      {
        fraction: [1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 1, 1, 1];
        exponent: [1, 1, 1, 1];
        is_negative: true;
      }
    >
  >
>(true);
