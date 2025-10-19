export type Result<T, E = Error> = Ok<T, E> | Err<T, E>;

export const ok = <T, E = Error>(value: T): Result<T, E> => new Ok<T, E>(value);

export const err = <T, E = Error>(error: E): Result<T, E> => new Err<T, E>(error);

export class Ok<T, E = Error> {
  readonly ok: true = true;
  readonly err: false = false;
  constructor(public readonly value: T) {}

  isOk(): this is Ok<T, E> {
    return true;
  }

  isErr(): this is Err<T, E> {
    return false;
  }
}

export class Err<T, E = Error> {
  readonly ok: false = false;
  readonly err: true = true;
  constructor(public readonly error: E) {}

  isOk(): this is Ok<T, E> {
    return false;
  }

  isErr(): this is Err<T, E> {
    return true;
  }
}
