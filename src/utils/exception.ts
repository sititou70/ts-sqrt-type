import { Has } from 'conditional-type-checks';

export type Exception<message extends string = string> = {
  type: 'exception';
  message: message;
};
export type IsException<T extends any> = Has<T, { type: 'exception' }>;
