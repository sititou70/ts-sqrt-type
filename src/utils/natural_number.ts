import { Cast } from './cast';
import { Exception } from './exception';
import { ExtractResult } from './result_container';

export type Natural = 1[];

export type Succ<n extends Natural> = [...n, 1];

export type Pred<n extends Natural> = n extends [1, ...infer rest]
  ? Cast<rest, Natural>
  : Exception<'result is negative number!'>;

export type NumberToNatural<n extends number> = Cast<
  ExtractResult<_NumberToNatural<[], n>>,
  Natural
>;
type _NumberToNatural<natural extends Natural, num extends number> =
  natural['length'] extends num
    ? natural
    : { _: _NumberToNatural<Succ<natural>, num> };

export type NaturalToNumber<n extends Natural> = n['length'];
