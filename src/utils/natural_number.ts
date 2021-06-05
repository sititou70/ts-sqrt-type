import { Cast } from './cast';
import { Exception } from './exception';
import { ExtractResult } from './result_container';

export type Natural = 1[];

export type Succ<n extends Natural> = [...n, 1];

export type Pred<n extends Natural> = n extends [1, ...infer rest]
  ? Cast<rest, Natural>
  : Exception<'result is negative number!'>;

export type AddNatural<n1 extends Natural, n2 extends Natural> = [...n1, ...n2];

export type SubNatural<n1 extends Natural, n2 extends Natural> = ExtractResult<
  _SubNatural<n1, n2>
>;
export type _SubNatural<n1 extends Natural | Exception, n2 extends Natural> =
  n2 extends NumberToNatural<0>
    ? n1
    : n1 extends Natural
    ? { _: _SubNatural<Pred<n1>, Cast<Pred<n2>, Natural>> }
    : n1;

export type NumberToNatural<n extends number> = Cast<
  ExtractResult<_NumberToNatural<[], n>>,
  Natural
>;
type _NumberToNatural<natural extends Natural, num extends number> =
  natural['length'] extends num
    ? natural
    : { _: _NumberToNatural<Succ<natural>, num> };

export type NaturalToNumber<n extends Natural> = n['length'];

// n1 > n2 -> 1
// n1 = n2 -> 0
// n1 < n2 -> -1
export type CompareNatural<n1 extends Natural, n2 extends Natural> =
  ExtractResult<_CompareNatural<n1, n2>> extends infer A
    ? Cast<A, -1 | 0 | 1>
    : never;
type _CompareNatural<n1 extends Natural, n2 extends Natural> = n1 extends []
  ? n2 extends []
    ? 0
    : -1
  : n2 extends []
  ? 1
  : { _: _CompareNatural<Cast<Pred<n1>, Natural>, Cast<Pred<n2>, Natural>> };
