import { Ok, Err } from 'src/shared/types/Common';
import { Error } from './Error';

export interface Result<T> {
  isOk: boolean;
  error?: Error;
  value?: T;
}

export function Ok<T>(value: T): Result<T> {
  return { isOk: true, value };
}

export function Err<T>(error: Error): Result<T> {
  return { isOk: false, error };
}

export function map<T, U>(result: Result<T>, fn: (value: T) => U): Result<U> {
  if (result.isOk) {
    return Ok(fn(result.value!));
  }
  return Err(result.error!);
}

export function flatMap<T, U>(result: Result<T>, fn: (value: T) => Result<U>): Result<U> {
  if (result.isOk) {
    return fn(result.value!);
  }
  return Err(result.error!);
}

export function orElse<T>(result: Result<T>, defaultValue: T): T {
  if (result.isOk) {
    return result.value!;
  }
  return defaultValue;
}

export function getOrElse<T>(result: Result<T>, defaultValue: T): T {
  if (result.isOk) {
    return result.value!;
  }
  throw result.error!;
}

export function fold<T, U>(result: Result<T>, onOk: (value: T) => U, onErr: (error: Error) => U): U {
  if (result.isOk) {
    return onOk(result.value!);
  }
  return onErr(result.error!);
}