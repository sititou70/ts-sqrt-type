import { assert, IsExact, Has } from 'conditional-type-checks';
import { IsException } from './exception';
import {
  Succ,
  NumberToNatural,
  NaturalToNumber,
  Pred,
  AddNatural,
  SubNatural,
} from './natural_number';

// test data
type Natural5 = [1, 1, 1, 1, 1];
type Natural10 = [...Natural5, ...Natural5];
type Natural50 = [
  ...Natural10,
  ...Natural10,
  ...Natural10,
  ...Natural10,
  ...Natural10
];
type Natural100 = [...Natural50, ...Natural50];
type Natural500 = [
  ...Natural100,
  ...Natural100,
  ...Natural100,
  ...Natural100,
  ...Natural100
];

// test
assert<IsExact<Succ<[]>, [1]>>(true);
assert<IsExact<Succ<[1]>, [1, 1]>>(true);

assert<IsException<Pred<[]>>>(true);
assert<IsExact<Pred<[1]>, []>>(true);
assert<IsExact<Pred<[1, 1]>, [1]>>(true);

assert<
  IsExact<
    AddNatural<NumberToNatural<0>, NumberToNatural<0>>,
    NumberToNatural<0>
  >
>(true);
assert<
  IsExact<
    AddNatural<NumberToNatural<0>, NumberToNatural<1>>,
    NumberToNatural<1>
  >
>(true);
assert<
  IsExact<
    AddNatural<NumberToNatural<1>, NumberToNatural<0>>,
    NumberToNatural<1>
  >
>(true);
assert<
  IsExact<
    AddNatural<NumberToNatural<3>, NumberToNatural<2>>,
    NumberToNatural<5>
  >
>(true);
assert<
  IsExact<
    AddNatural<NumberToNatural<100>, NumberToNatural<50>>,
    NumberToNatural<150>
  >
>(true);

assert<
  IsExact<
    SubNatural<NumberToNatural<0>, NumberToNatural<0>>,
    NumberToNatural<0>
  >
>(true);
assert<
  IsExact<
    SubNatural<NumberToNatural<3>, NumberToNatural<2>>,
    NumberToNatural<1>
  >
>(true);
assert<
  IsExact<
    SubNatural<NumberToNatural<100>, NumberToNatural<50>>,
    NumberToNatural<50>
  >
>(true);
assert<IsException<SubNatural<NumberToNatural<50>, NumberToNatural<51>>>>(true);

assert<IsExact<NumberToNatural<0>, []>>(true);
assert<IsExact<NumberToNatural<1>, [1]>>(true);
assert<IsExact<NumberToNatural<2>, [1, 1]>>(true);
assert<IsExact<NumberToNatural<5>, Natural5>>(true);
assert<IsExact<NumberToNatural<10>, Natural10>>(true);
assert<IsExact<NumberToNatural<50>, Natural50>>(true);
assert<IsExact<NumberToNatural<100>, Natural100>>(true);
assert<IsExact<NumberToNatural<500>, Natural500>>(true);

assert<IsExact<NaturalToNumber<[]>, 0>>(true);
assert<IsExact<NaturalToNumber<[1]>, 1>>(true);
assert<IsExact<NaturalToNumber<[1, 1]>, 2>>(true);
assert<IsExact<NaturalToNumber<Natural5>, 5>>(true);
assert<IsExact<NaturalToNumber<Natural10>, 10>>(true);
assert<IsExact<NaturalToNumber<Natural50>, 50>>(true);
assert<IsExact<NaturalToNumber<Natural100>, 100>>(true);
assert<IsExact<NaturalToNumber<Natural500>, 500>>(true);
