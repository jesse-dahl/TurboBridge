export type SnakeToCamelArgs = Record<string, unknown>;
export type CamelToSnakeArgs = Record<string, unknown>;

export type SnakeToCamelCase<S extends string> =
  S extends `${infer T}_${infer U}` ?
  `${T}${Capitalize<SnakeToCamelCase<U>>}` :
  S

export type CamelToSnakeCase<S extends string> =
  S extends `${infer T}${infer U}` ?
  `${T extends Capitalize<T> ? "_" : ""}${Lowercase<T>}${CamelToSnakeCase<U>}` :
  S

export type SnakeToCamelRes = {[K in keyof SnakeToCamelArgs as SnakeToCamelCase<K>]: SnakeToCamelArgs[K]}

export type CamelToSnakeRes = {[K in keyof CamelToSnakeArgs as CamelToSnakeCase<K>]: CamelToSnakeArgs[K]}

export const snakeToCamel = <T extends SnakeToCamelArgs>(T: SnakeToCamelArgs): SnakeToCamelRes => Object.entries(T).reduce((acc, [key, value]) => {
  const camelizedKey = key.split("_")
  .reduce(
    (res, word, i) =>
      i === 0
        ? word.toLowerCase()
        : `${res}${word.charAt(0).toUpperCase()}${word
            .substr(1)
            .toLowerCase()}`,
    ""
  )
  return {...acc, ...{ [camelizedKey]: value }}
}, {})

export const camelToSnake = <T extends SnakeToCamelArgs>(T: SnakeToCamelArgs): CamelToSnakeRes => Object.entries(T).reduce((acc, [key, value]) => {
  const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
  return { ...acc, ...{ [snakeKey]: value } }
}, {})