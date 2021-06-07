# ts-sqrt-type

![top](https://user-images.githubusercontent.com/18525488/121002553-6f9e5980-c7c7-11eb-8c66-a89f1f4929bc.png)

Calculate square roots **using only the type system.**

## setup

`npm i`

## run

`npm run [sqrt2 | sqrt3 | sqrt5 | sqrt6 | sqrt7 | sqrt8 | sqrt10]`

and you will get the below error.

```
src/index/sqrt2.ts:33:7 - error TS2322: Type 'null' is not assignable to type '"1.414213562373"'.

33 const result: FloatToStr<result4> = null;
         ~~~~~~


Found 1 error.
```

Calculated value is displayed after "Type 'null' is not assignable to type..." message.

## test

`npm test`

## licence

MIT
