
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model UserProfile
 * 
 */
export type UserProfile = $Result.DefaultSelection<Prisma.$UserProfilePayload>
/**
 * Model UserSocialLink
 * 
 */
export type UserSocialLink = $Result.DefaultSelection<Prisma.$UserSocialLinkPayload>
/**
 * Model PostActions
 * 
 */
export type PostActions = $Result.DefaultSelection<Prisma.$PostActionsPayload>
/**
 * Model Post
 * 
 */
export type Post = $Result.DefaultSelection<Prisma.$PostPayload>
/**
 * Model MediaMetaData
 * 
 */
export type MediaMetaData = $Result.DefaultSelection<Prisma.$MediaMetaDataPayload>
/**
 * Model FcmToken
 * 
 */
export type FcmToken = $Result.DefaultSelection<Prisma.$FcmTokenPayload>
/**
 * Model ServiceRef
 * 
 */
export type ServiceRef = $Result.DefaultSelection<Prisma.$ServiceRefPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Role: {
  OWNER: 'OWNER',
  MODERATOR: 'MODERATOR',
  ADMIN: 'ADMIN',
  COLLABORATOR: 'COLLABORATOR',
  USER: 'USER'
};

export type Role = (typeof Role)[keyof typeof Role]


export const TokenType: {
  PUBLIC: 'PUBLIC',
  PRIVATE: 'PRIVATE'
};

export type TokenType = (typeof TokenType)[keyof typeof TokenType]


export const MediaType: {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO'
};

export type MediaType = (typeof MediaType)[keyof typeof MediaType]


export const PostStatus: {
  draft: 'draft',
  published: 'published',
  rejected: 'rejected'
};

export type PostStatus = (typeof PostStatus)[keyof typeof PostStatus]


export const ServiceType: {
  POST: 'POST',
  PROFILE: 'PROFILE',
  CONTENT: 'CONTENT'
};

export type ServiceType = (typeof ServiceType)[keyof typeof ServiceType]

}

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

export type TokenType = $Enums.TokenType

export const TokenType: typeof $Enums.TokenType

export type MediaType = $Enums.MediaType

export const MediaType: typeof $Enums.MediaType

export type PostStatus = $Enums.PostStatus

export const PostStatus: typeof $Enums.PostStatus

export type ServiceType = $Enums.ServiceType

export const ServiceType: typeof $Enums.ServiceType

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userProfile`: Exposes CRUD operations for the **UserProfile** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserProfiles
    * const userProfiles = await prisma.userProfile.findMany()
    * ```
    */
  get userProfile(): Prisma.UserProfileDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.userSocialLink`: Exposes CRUD operations for the **UserSocialLink** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more UserSocialLinks
    * const userSocialLinks = await prisma.userSocialLink.findMany()
    * ```
    */
  get userSocialLink(): Prisma.UserSocialLinkDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.postActions`: Exposes CRUD operations for the **PostActions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PostActions
    * const postActions = await prisma.postActions.findMany()
    * ```
    */
  get postActions(): Prisma.PostActionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.post`: Exposes CRUD operations for the **Post** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Posts
    * const posts = await prisma.post.findMany()
    * ```
    */
  get post(): Prisma.PostDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mediaMetaData`: Exposes CRUD operations for the **MediaMetaData** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MediaMetaData
    * const mediaMetaData = await prisma.mediaMetaData.findMany()
    * ```
    */
  get mediaMetaData(): Prisma.MediaMetaDataDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.fcmToken`: Exposes CRUD operations for the **FcmToken** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more FcmTokens
    * const fcmTokens = await prisma.fcmToken.findMany()
    * ```
    */
  get fcmToken(): Prisma.FcmTokenDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.serviceRef`: Exposes CRUD operations for the **ServiceRef** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ServiceRefs
    * const serviceRefs = await prisma.serviceRef.findMany()
    * ```
    */
  get serviceRef(): Prisma.ServiceRefDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.3
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    UserProfile: 'UserProfile',
    UserSocialLink: 'UserSocialLink',
    PostActions: 'PostActions',
    Post: 'Post',
    MediaMetaData: 'MediaMetaData',
    FcmToken: 'FcmToken',
    ServiceRef: 'ServiceRef'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "userProfile" | "userSocialLink" | "postActions" | "post" | "mediaMetaData" | "fcmToken" | "serviceRef"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      UserProfile: {
        payload: Prisma.$UserProfilePayload<ExtArgs>
        fields: Prisma.UserProfileFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserProfileFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserProfileFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findFirst: {
            args: Prisma.UserProfileFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserProfileFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          findMany: {
            args: Prisma.UserProfileFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          create: {
            args: Prisma.UserProfileCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          createMany: {
            args: Prisma.UserProfileCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserProfileCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          delete: {
            args: Prisma.UserProfileDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          update: {
            args: Prisma.UserProfileUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          deleteMany: {
            args: Prisma.UserProfileDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserProfileUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserProfileUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>[]
          }
          upsert: {
            args: Prisma.UserProfileUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserProfilePayload>
          }
          aggregate: {
            args: Prisma.UserProfileAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserProfile>
          }
          groupBy: {
            args: Prisma.UserProfileGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserProfileGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserProfileCountArgs<ExtArgs>
            result: $Utils.Optional<UserProfileCountAggregateOutputType> | number
          }
        }
      }
      UserSocialLink: {
        payload: Prisma.$UserSocialLinkPayload<ExtArgs>
        fields: Prisma.UserSocialLinkFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserSocialLinkFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserSocialLinkFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          findFirst: {
            args: Prisma.UserSocialLinkFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserSocialLinkFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          findMany: {
            args: Prisma.UserSocialLinkFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>[]
          }
          create: {
            args: Prisma.UserSocialLinkCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          createMany: {
            args: Prisma.UserSocialLinkCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserSocialLinkCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>[]
          }
          delete: {
            args: Prisma.UserSocialLinkDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          update: {
            args: Prisma.UserSocialLinkUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          deleteMany: {
            args: Prisma.UserSocialLinkDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserSocialLinkUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserSocialLinkUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>[]
          }
          upsert: {
            args: Prisma.UserSocialLinkUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserSocialLinkPayload>
          }
          aggregate: {
            args: Prisma.UserSocialLinkAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUserSocialLink>
          }
          groupBy: {
            args: Prisma.UserSocialLinkGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserSocialLinkGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserSocialLinkCountArgs<ExtArgs>
            result: $Utils.Optional<UserSocialLinkCountAggregateOutputType> | number
          }
        }
      }
      PostActions: {
        payload: Prisma.$PostActionsPayload<ExtArgs>
        fields: Prisma.PostActionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostActionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostActionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          findFirst: {
            args: Prisma.PostActionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostActionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          findMany: {
            args: Prisma.PostActionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>[]
          }
          create: {
            args: Prisma.PostActionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          createMany: {
            args: Prisma.PostActionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostActionsCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>[]
          }
          delete: {
            args: Prisma.PostActionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          update: {
            args: Prisma.PostActionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          deleteMany: {
            args: Prisma.PostActionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostActionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostActionsUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>[]
          }
          upsert: {
            args: Prisma.PostActionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostActionsPayload>
          }
          aggregate: {
            args: Prisma.PostActionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePostActions>
          }
          groupBy: {
            args: Prisma.PostActionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostActionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostActionsCountArgs<ExtArgs>
            result: $Utils.Optional<PostActionsCountAggregateOutputType> | number
          }
        }
      }
      Post: {
        payload: Prisma.$PostPayload<ExtArgs>
        fields: Prisma.PostFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PostFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PostFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findFirst: {
            args: Prisma.PostFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PostFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          findMany: {
            args: Prisma.PostFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          create: {
            args: Prisma.PostCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          createMany: {
            args: Prisma.PostCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PostCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          delete: {
            args: Prisma.PostDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          update: {
            args: Prisma.PostUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          deleteMany: {
            args: Prisma.PostDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PostUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PostUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>[]
          }
          upsert: {
            args: Prisma.PostUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PostPayload>
          }
          aggregate: {
            args: Prisma.PostAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePost>
          }
          groupBy: {
            args: Prisma.PostGroupByArgs<ExtArgs>
            result: $Utils.Optional<PostGroupByOutputType>[]
          }
          count: {
            args: Prisma.PostCountArgs<ExtArgs>
            result: $Utils.Optional<PostCountAggregateOutputType> | number
          }
        }
      }
      MediaMetaData: {
        payload: Prisma.$MediaMetaDataPayload<ExtArgs>
        fields: Prisma.MediaMetaDataFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MediaMetaDataFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MediaMetaDataFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          findFirst: {
            args: Prisma.MediaMetaDataFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MediaMetaDataFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          findMany: {
            args: Prisma.MediaMetaDataFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>[]
          }
          create: {
            args: Prisma.MediaMetaDataCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          createMany: {
            args: Prisma.MediaMetaDataCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MediaMetaDataCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>[]
          }
          delete: {
            args: Prisma.MediaMetaDataDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          update: {
            args: Prisma.MediaMetaDataUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          deleteMany: {
            args: Prisma.MediaMetaDataDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MediaMetaDataUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MediaMetaDataUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>[]
          }
          upsert: {
            args: Prisma.MediaMetaDataUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MediaMetaDataPayload>
          }
          aggregate: {
            args: Prisma.MediaMetaDataAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMediaMetaData>
          }
          groupBy: {
            args: Prisma.MediaMetaDataGroupByArgs<ExtArgs>
            result: $Utils.Optional<MediaMetaDataGroupByOutputType>[]
          }
          count: {
            args: Prisma.MediaMetaDataCountArgs<ExtArgs>
            result: $Utils.Optional<MediaMetaDataCountAggregateOutputType> | number
          }
        }
      }
      FcmToken: {
        payload: Prisma.$FcmTokenPayload<ExtArgs>
        fields: Prisma.FcmTokenFieldRefs
        operations: {
          findUnique: {
            args: Prisma.FcmTokenFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.FcmTokenFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          findFirst: {
            args: Prisma.FcmTokenFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.FcmTokenFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          findMany: {
            args: Prisma.FcmTokenFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>[]
          }
          create: {
            args: Prisma.FcmTokenCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          createMany: {
            args: Prisma.FcmTokenCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.FcmTokenCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>[]
          }
          delete: {
            args: Prisma.FcmTokenDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          update: {
            args: Prisma.FcmTokenUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          deleteMany: {
            args: Prisma.FcmTokenDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.FcmTokenUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.FcmTokenUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>[]
          }
          upsert: {
            args: Prisma.FcmTokenUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$FcmTokenPayload>
          }
          aggregate: {
            args: Prisma.FcmTokenAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFcmToken>
          }
          groupBy: {
            args: Prisma.FcmTokenGroupByArgs<ExtArgs>
            result: $Utils.Optional<FcmTokenGroupByOutputType>[]
          }
          count: {
            args: Prisma.FcmTokenCountArgs<ExtArgs>
            result: $Utils.Optional<FcmTokenCountAggregateOutputType> | number
          }
        }
      }
      ServiceRef: {
        payload: Prisma.$ServiceRefPayload<ExtArgs>
        fields: Prisma.ServiceRefFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceRefFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceRefFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          findFirst: {
            args: Prisma.ServiceRefFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceRefFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          findMany: {
            args: Prisma.ServiceRefFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>[]
          }
          create: {
            args: Prisma.ServiceRefCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          createMany: {
            args: Prisma.ServiceRefCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ServiceRefCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>[]
          }
          delete: {
            args: Prisma.ServiceRefDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          update: {
            args: Prisma.ServiceRefUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          deleteMany: {
            args: Prisma.ServiceRefDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceRefUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ServiceRefUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>[]
          }
          upsert: {
            args: Prisma.ServiceRefUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServiceRefPayload>
          }
          aggregate: {
            args: Prisma.ServiceRefAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateServiceRef>
          }
          groupBy: {
            args: Prisma.ServiceRefGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceRefGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceRefCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceRefCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    userProfile?: UserProfileOmit
    userSocialLink?: UserSocialLinkOmit
    postActions?: PostActionsOmit
    post?: PostOmit
    mediaMetaData?: MediaMetaDataOmit
    fcmToken?: FcmTokenOmit
    serviceRef?: ServiceRefOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    Posts: number
    PostActions: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Posts?: boolean | UserCountOutputTypeCountPostsArgs
    PostActions?: boolean | UserCountOutputTypeCountPostActionsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountPostActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostActionsWhereInput
  }


  /**
   * Count Type UserProfileCountOutputType
   */

  export type UserProfileCountOutputType = {
    socialLinks: number
  }

  export type UserProfileCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialLinks?: boolean | UserProfileCountOutputTypeCountSocialLinksArgs
  }

  // Custom InputTypes
  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfileCountOutputType
     */
    select?: UserProfileCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserProfileCountOutputType without action
   */
  export type UserProfileCountOutputTypeCountSocialLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSocialLinkWhereInput
  }


  /**
   * Count Type PostCountOutputType
   */

  export type PostCountOutputType = {
    PostActions: number
  }

  export type PostCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    PostActions?: boolean | PostCountOutputTypeCountPostActionsArgs
  }

  // Custom InputTypes
  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostCountOutputType
     */
    select?: PostCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * PostCountOutputType without action
   */
  export type PostCountOutputTypeCountPostActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostActionsWhereInput
  }


  /**
   * Count Type ServiceRefCountOutputType
   */

  export type ServiceRefCountOutputType = {
    media: number
  }

  export type ServiceRefCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | ServiceRefCountOutputTypeCountMediaArgs
  }

  // Custom InputTypes
  /**
   * ServiceRefCountOutputType without action
   */
  export type ServiceRefCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRefCountOutputType
     */
    select?: ServiceRefCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceRefCountOutputType without action
   */
  export type ServiceRefCountOutputTypeCountMediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaMetaDataWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    role: $Enums.Role | null
    tagline: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    firstName: string | null
    lastName: string | null
    email: string | null
    role: $Enums.Role | null
    tagline: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    firstName: number
    lastName: number
    email: number
    role: number
    tagline: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    role?: true
    tagline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    role?: true
    tagline?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    firstName?: true
    lastName?: true
    email?: true
    role?: true
    tagline?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    firstName: string
    lastName: string
    email: string
    role: $Enums.Role
    tagline: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    role?: boolean
    tagline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    Posts?: boolean | User$PostsArgs<ExtArgs>
    PostActions?: boolean | User$PostActionsArgs<ExtArgs>
    fcmToken?: boolean | User$fcmTokenArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    role?: boolean
    tagline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    role?: boolean
    tagline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    firstName?: boolean
    lastName?: boolean
    email?: boolean
    role?: boolean
    tagline?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "firstName" | "lastName" | "email" | "role" | "tagline" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    Posts?: boolean | User$PostsArgs<ExtArgs>
    PostActions?: boolean | User$PostActionsArgs<ExtArgs>
    fcmToken?: boolean | User$fcmTokenArgs<ExtArgs>
    profile?: boolean | User$profileArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      Posts: Prisma.$PostPayload<ExtArgs>[]
      PostActions: Prisma.$PostActionsPayload<ExtArgs>[]
      fcmToken: Prisma.$FcmTokenPayload<ExtArgs> | null
      profile: Prisma.$UserProfilePayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      firstName: string
      lastName: string
      email: string
      role: $Enums.Role
      tagline: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    Posts<T extends User$PostsArgs<ExtArgs> = {}>(args?: Subset<T, User$PostsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    PostActions<T extends User$PostActionsArgs<ExtArgs> = {}>(args?: Subset<T, User$PostActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    fcmToken<T extends User$fcmTokenArgs<ExtArgs> = {}>(args?: Subset<T, User$fcmTokenArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    profile<T extends User$profileArgs<ExtArgs> = {}>(args?: Subset<T, User$profileArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastName: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly role: FieldRef<"User", 'Role'>
    readonly tagline: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.Posts
   */
  export type User$PostsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    where?: PostWhereInput
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    cursor?: PostWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * User.PostActions
   */
  export type User$PostActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    where?: PostActionsWhereInput
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    cursor?: PostActionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostActionsScalarFieldEnum | PostActionsScalarFieldEnum[]
  }

  /**
   * User.fcmToken
   */
  export type User$fcmTokenArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    where?: FcmTokenWhereInput
  }

  /**
   * User.profile
   */
  export type User$profileArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    where?: UserProfileWhereInput
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model UserProfile
   */

  export type AggregateUserProfile = {
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  export type UserProfileAvgAggregateOutputType = {
    followers: number | null
  }

  export type UserProfileSumAggregateOutputType = {
    followers: number | null
  }

  export type UserProfileMinAggregateOutputType = {
    id: string | null
    bio: string | null
    image: string | null
    location: string | null
    website: string | null
    followers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    about: string | null
    focus: string | null
  }

  export type UserProfileMaxAggregateOutputType = {
    id: string | null
    bio: string | null
    image: string | null
    location: string | null
    website: string | null
    followers: number | null
    createdAt: Date | null
    updatedAt: Date | null
    about: string | null
    focus: string | null
  }

  export type UserProfileCountAggregateOutputType = {
    id: number
    bio: number
    image: number
    location: number
    website: number
    followers: number
    createdAt: number
    updatedAt: number
    about: number
    focus: number
    tags: number
    _all: number
  }


  export type UserProfileAvgAggregateInputType = {
    followers?: true
  }

  export type UserProfileSumAggregateInputType = {
    followers?: true
  }

  export type UserProfileMinAggregateInputType = {
    id?: true
    bio?: true
    image?: true
    location?: true
    website?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    about?: true
    focus?: true
  }

  export type UserProfileMaxAggregateInputType = {
    id?: true
    bio?: true
    image?: true
    location?: true
    website?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    about?: true
    focus?: true
  }

  export type UserProfileCountAggregateInputType = {
    id?: true
    bio?: true
    image?: true
    location?: true
    website?: true
    followers?: true
    createdAt?: true
    updatedAt?: true
    about?: true
    focus?: true
    tags?: true
    _all?: true
  }

  export type UserProfileAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfile to aggregate.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserProfiles
    **/
    _count?: true | UserProfileCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserProfileAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserProfileSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserProfileMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserProfileMaxAggregateInputType
  }

  export type GetUserProfileAggregateType<T extends UserProfileAggregateArgs> = {
        [P in keyof T & keyof AggregateUserProfile]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserProfile[P]>
      : GetScalarType<T[P], AggregateUserProfile[P]>
  }




  export type UserProfileGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserProfileWhereInput
    orderBy?: UserProfileOrderByWithAggregationInput | UserProfileOrderByWithAggregationInput[]
    by: UserProfileScalarFieldEnum[] | UserProfileScalarFieldEnum
    having?: UserProfileScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserProfileCountAggregateInputType | true
    _avg?: UserProfileAvgAggregateInputType
    _sum?: UserProfileSumAggregateInputType
    _min?: UserProfileMinAggregateInputType
    _max?: UserProfileMaxAggregateInputType
  }

  export type UserProfileGroupByOutputType = {
    id: string
    bio: string | null
    image: string | null
    location: string | null
    website: string | null
    followers: number
    createdAt: Date
    updatedAt: Date
    about: string | null
    focus: string | null
    tags: string[]
    _count: UserProfileCountAggregateOutputType | null
    _avg: UserProfileAvgAggregateOutputType | null
    _sum: UserProfileSumAggregateOutputType | null
    _min: UserProfileMinAggregateOutputType | null
    _max: UserProfileMaxAggregateOutputType | null
  }

  type GetUserProfileGroupByPayload<T extends UserProfileGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserProfileGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserProfileGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
            : GetScalarType<T[P], UserProfileGroupByOutputType[P]>
        }
      >
    >


  export type UserProfileSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bio?: boolean
    image?: boolean
    location?: boolean
    website?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    about?: boolean
    focus?: boolean
    tags?: boolean
    socialLinks?: boolean | UserProfile$socialLinksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bio?: boolean
    image?: boolean
    location?: boolean
    website?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    about?: boolean
    focus?: boolean
    tags?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    bio?: boolean
    image?: boolean
    location?: boolean
    website?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    about?: boolean
    focus?: boolean
    tags?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userProfile"]>

  export type UserProfileSelectScalar = {
    id?: boolean
    bio?: boolean
    image?: boolean
    location?: boolean
    website?: boolean
    followers?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    about?: boolean
    focus?: boolean
    tags?: boolean
  }

  export type UserProfileOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "bio" | "image" | "location" | "website" | "followers" | "createdAt" | "updatedAt" | "about" | "focus" | "tags", ExtArgs["result"]["userProfile"]>
  export type UserProfileInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    socialLinks?: boolean | UserProfile$socialLinksArgs<ExtArgs>
    user?: boolean | UserDefaultArgs<ExtArgs>
    _count?: boolean | UserProfileCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type UserProfileIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $UserProfilePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserProfile"
    objects: {
      socialLinks: Prisma.$UserSocialLinkPayload<ExtArgs>[]
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      bio: string | null
      image: string | null
      location: string | null
      website: string | null
      followers: number
      createdAt: Date
      updatedAt: Date
      about: string | null
      focus: string | null
      tags: string[]
    }, ExtArgs["result"]["userProfile"]>
    composites: {}
  }

  type UserProfileGetPayload<S extends boolean | null | undefined | UserProfileDefaultArgs> = $Result.GetResult<Prisma.$UserProfilePayload, S>

  type UserProfileCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserProfileFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserProfileCountAggregateInputType | true
    }

  export interface UserProfileDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserProfile'], meta: { name: 'UserProfile' } }
    /**
     * Find zero or one UserProfile that matches the filter.
     * @param {UserProfileFindUniqueArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserProfileFindUniqueArgs>(args: SelectSubset<T, UserProfileFindUniqueArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserProfile that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserProfileFindUniqueOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserProfileFindUniqueOrThrowArgs>(args: SelectSubset<T, UserProfileFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserProfileFindFirstArgs>(args?: SelectSubset<T, UserProfileFindFirstArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserProfile that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindFirstOrThrowArgs} args - Arguments to find a UserProfile
     * @example
     * // Get one UserProfile
     * const userProfile = await prisma.userProfile.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserProfileFindFirstOrThrowArgs>(args?: SelectSubset<T, UserProfileFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserProfiles that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserProfiles
     * const userProfiles = await prisma.userProfile.findMany()
     * 
     * // Get first 10 UserProfiles
     * const userProfiles = await prisma.userProfile.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserProfileFindManyArgs>(args?: SelectSubset<T, UserProfileFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserProfile.
     * @param {UserProfileCreateArgs} args - Arguments to create a UserProfile.
     * @example
     * // Create one UserProfile
     * const UserProfile = await prisma.userProfile.create({
     *   data: {
     *     // ... data to create a UserProfile
     *   }
     * })
     * 
     */
    create<T extends UserProfileCreateArgs>(args: SelectSubset<T, UserProfileCreateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserProfiles.
     * @param {UserProfileCreateManyArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserProfileCreateManyArgs>(args?: SelectSubset<T, UserProfileCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserProfiles and returns the data saved in the database.
     * @param {UserProfileCreateManyAndReturnArgs} args - Arguments to create many UserProfiles.
     * @example
     * // Create many UserProfiles
     * const userProfile = await prisma.userProfile.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserProfileCreateManyAndReturnArgs>(args?: SelectSubset<T, UserProfileCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserProfile.
     * @param {UserProfileDeleteArgs} args - Arguments to delete one UserProfile.
     * @example
     * // Delete one UserProfile
     * const UserProfile = await prisma.userProfile.delete({
     *   where: {
     *     // ... filter to delete one UserProfile
     *   }
     * })
     * 
     */
    delete<T extends UserProfileDeleteArgs>(args: SelectSubset<T, UserProfileDeleteArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserProfile.
     * @param {UserProfileUpdateArgs} args - Arguments to update one UserProfile.
     * @example
     * // Update one UserProfile
     * const userProfile = await prisma.userProfile.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserProfileUpdateArgs>(args: SelectSubset<T, UserProfileUpdateArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserProfiles.
     * @param {UserProfileDeleteManyArgs} args - Arguments to filter UserProfiles to delete.
     * @example
     * // Delete a few UserProfiles
     * const { count } = await prisma.userProfile.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserProfileDeleteManyArgs>(args?: SelectSubset<T, UserProfileDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserProfileUpdateManyArgs>(args: SelectSubset<T, UserProfileUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserProfiles and returns the data updated in the database.
     * @param {UserProfileUpdateManyAndReturnArgs} args - Arguments to update many UserProfiles.
     * @example
     * // Update many UserProfiles
     * const userProfile = await prisma.userProfile.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserProfiles and only return the `id`
     * const userProfileWithIdOnly = await prisma.userProfile.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserProfileUpdateManyAndReturnArgs>(args: SelectSubset<T, UserProfileUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserProfile.
     * @param {UserProfileUpsertArgs} args - Arguments to update or create a UserProfile.
     * @example
     * // Update or create a UserProfile
     * const userProfile = await prisma.userProfile.upsert({
     *   create: {
     *     // ... data to create a UserProfile
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserProfile we want to update
     *   }
     * })
     */
    upsert<T extends UserProfileUpsertArgs>(args: SelectSubset<T, UserProfileUpsertArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserProfiles.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileCountArgs} args - Arguments to filter UserProfiles to count.
     * @example
     * // Count the number of UserProfiles
     * const count = await prisma.userProfile.count({
     *   where: {
     *     // ... the filter for the UserProfiles we want to count
     *   }
     * })
    **/
    count<T extends UserProfileCountArgs>(
      args?: Subset<T, UserProfileCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserProfileCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserProfileAggregateArgs>(args: Subset<T, UserProfileAggregateArgs>): Prisma.PrismaPromise<GetUserProfileAggregateType<T>>

    /**
     * Group by UserProfile.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserProfileGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserProfileGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserProfileGroupByArgs['orderBy'] }
        : { orderBy?: UserProfileGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserProfileGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserProfileGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserProfile model
   */
  readonly fields: UserProfileFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserProfile.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserProfileClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    socialLinks<T extends UserProfile$socialLinksArgs<ExtArgs> = {}>(args?: Subset<T, UserProfile$socialLinksArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserProfile model
   */
  interface UserProfileFieldRefs {
    readonly id: FieldRef<"UserProfile", 'String'>
    readonly bio: FieldRef<"UserProfile", 'String'>
    readonly image: FieldRef<"UserProfile", 'String'>
    readonly location: FieldRef<"UserProfile", 'String'>
    readonly website: FieldRef<"UserProfile", 'String'>
    readonly followers: FieldRef<"UserProfile", 'Int'>
    readonly createdAt: FieldRef<"UserProfile", 'DateTime'>
    readonly updatedAt: FieldRef<"UserProfile", 'DateTime'>
    readonly about: FieldRef<"UserProfile", 'String'>
    readonly focus: FieldRef<"UserProfile", 'String'>
    readonly tags: FieldRef<"UserProfile", 'String[]'>
  }
    

  // Custom InputTypes
  /**
   * UserProfile findUnique
   */
  export type UserProfileFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findUniqueOrThrow
   */
  export type UserProfileFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile findFirst
   */
  export type UserProfileFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findFirstOrThrow
   */
  export type UserProfileFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfile to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserProfiles.
     */
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile findMany
   */
  export type UserProfileFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter, which UserProfiles to fetch.
     */
    where?: UserProfileWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserProfiles to fetch.
     */
    orderBy?: UserProfileOrderByWithRelationInput | UserProfileOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserProfiles.
     */
    cursor?: UserProfileWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserProfiles from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserProfiles.
     */
    skip?: number
    distinct?: UserProfileScalarFieldEnum | UserProfileScalarFieldEnum[]
  }

  /**
   * UserProfile create
   */
  export type UserProfileCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to create a UserProfile.
     */
    data: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
  }

  /**
   * UserProfile createMany
   */
  export type UserProfileCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserProfile createManyAndReturn
   */
  export type UserProfileCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to create many UserProfiles.
     */
    data: UserProfileCreateManyInput | UserProfileCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile update
   */
  export type UserProfileUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The data needed to update a UserProfile.
     */
    data: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
    /**
     * Choose, which UserProfile to update.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile updateMany
   */
  export type UserProfileUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
  }

  /**
   * UserProfile updateManyAndReturn
   */
  export type UserProfileUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * The data used to update UserProfiles.
     */
    data: XOR<UserProfileUpdateManyMutationInput, UserProfileUncheckedUpdateManyInput>
    /**
     * Filter which UserProfiles to update
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserProfile upsert
   */
  export type UserProfileUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * The filter to search for the UserProfile to update in case it exists.
     */
    where: UserProfileWhereUniqueInput
    /**
     * In case the UserProfile found by the `where` argument doesn't exist, create a new UserProfile with this data.
     */
    create: XOR<UserProfileCreateInput, UserProfileUncheckedCreateInput>
    /**
     * In case the UserProfile was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserProfileUpdateInput, UserProfileUncheckedUpdateInput>
  }

  /**
   * UserProfile delete
   */
  export type UserProfileDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
    /**
     * Filter which UserProfile to delete.
     */
    where: UserProfileWhereUniqueInput
  }

  /**
   * UserProfile deleteMany
   */
  export type UserProfileDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserProfiles to delete
     */
    where?: UserProfileWhereInput
    /**
     * Limit how many UserProfiles to delete.
     */
    limit?: number
  }

  /**
   * UserProfile.socialLinks
   */
  export type UserProfile$socialLinksArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    where?: UserSocialLinkWhereInput
    orderBy?: UserSocialLinkOrderByWithRelationInput | UserSocialLinkOrderByWithRelationInput[]
    cursor?: UserSocialLinkWhereUniqueInput
    take?: number
    skip?: number
    distinct?: UserSocialLinkScalarFieldEnum | UserSocialLinkScalarFieldEnum[]
  }

  /**
   * UserProfile without action
   */
  export type UserProfileDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserProfile
     */
    select?: UserProfileSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserProfile
     */
    omit?: UserProfileOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserProfileInclude<ExtArgs> | null
  }


  /**
   * Model UserSocialLink
   */

  export type AggregateUserSocialLink = {
    _count: UserSocialLinkCountAggregateOutputType | null
    _min: UserSocialLinkMinAggregateOutputType | null
    _max: UserSocialLinkMaxAggregateOutputType | null
  }

  export type UserSocialLinkMinAggregateOutputType = {
    id: string | null
    platform: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSocialLinkMaxAggregateOutputType = {
    id: string | null
    platform: string | null
    url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserSocialLinkCountAggregateOutputType = {
    id: number
    platform: number
    url: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserSocialLinkMinAggregateInputType = {
    id?: true
    platform?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSocialLinkMaxAggregateInputType = {
    id?: true
    platform?: true
    url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserSocialLinkCountAggregateInputType = {
    id?: true
    platform?: true
    url?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserSocialLinkAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSocialLink to aggregate.
     */
    where?: UserSocialLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialLinks to fetch.
     */
    orderBy?: UserSocialLinkOrderByWithRelationInput | UserSocialLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserSocialLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned UserSocialLinks
    **/
    _count?: true | UserSocialLinkCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserSocialLinkMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserSocialLinkMaxAggregateInputType
  }

  export type GetUserSocialLinkAggregateType<T extends UserSocialLinkAggregateArgs> = {
        [P in keyof T & keyof AggregateUserSocialLink]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUserSocialLink[P]>
      : GetScalarType<T[P], AggregateUserSocialLink[P]>
  }




  export type UserSocialLinkGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserSocialLinkWhereInput
    orderBy?: UserSocialLinkOrderByWithAggregationInput | UserSocialLinkOrderByWithAggregationInput[]
    by: UserSocialLinkScalarFieldEnum[] | UserSocialLinkScalarFieldEnum
    having?: UserSocialLinkScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserSocialLinkCountAggregateInputType | true
    _min?: UserSocialLinkMinAggregateInputType
    _max?: UserSocialLinkMaxAggregateInputType
  }

  export type UserSocialLinkGroupByOutputType = {
    id: string
    platform: string
    url: string
    createdAt: Date
    updatedAt: Date
    _count: UserSocialLinkCountAggregateOutputType | null
    _min: UserSocialLinkMinAggregateOutputType | null
    _max: UserSocialLinkMaxAggregateOutputType | null
  }

  type GetUserSocialLinkGroupByPayload<T extends UserSocialLinkGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserSocialLinkGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserSocialLinkGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserSocialLinkGroupByOutputType[P]>
            : GetScalarType<T[P], UserSocialLinkGroupByOutputType[P]>
        }
      >
    >


  export type UserSocialLinkSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialLink"]>

  export type UserSocialLinkSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialLink"]>

  export type UserSocialLinkSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["userSocialLink"]>

  export type UserSocialLinkSelectScalar = {
    id?: boolean
    platform?: boolean
    url?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserSocialLinkOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "platform" | "url" | "createdAt" | "updatedAt", ExtArgs["result"]["userSocialLink"]>
  export type UserSocialLinkInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type UserSocialLinkIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }
  export type UserSocialLinkIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    profile?: boolean | UserProfileDefaultArgs<ExtArgs>
  }

  export type $UserSocialLinkPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "UserSocialLink"
    objects: {
      profile: Prisma.$UserProfilePayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      platform: string
      url: string
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["userSocialLink"]>
    composites: {}
  }

  type UserSocialLinkGetPayload<S extends boolean | null | undefined | UserSocialLinkDefaultArgs> = $Result.GetResult<Prisma.$UserSocialLinkPayload, S>

  type UserSocialLinkCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserSocialLinkFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserSocialLinkCountAggregateInputType | true
    }

  export interface UserSocialLinkDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['UserSocialLink'], meta: { name: 'UserSocialLink' } }
    /**
     * Find zero or one UserSocialLink that matches the filter.
     * @param {UserSocialLinkFindUniqueArgs} args - Arguments to find a UserSocialLink
     * @example
     * // Get one UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserSocialLinkFindUniqueArgs>(args: SelectSubset<T, UserSocialLinkFindUniqueArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one UserSocialLink that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserSocialLinkFindUniqueOrThrowArgs} args - Arguments to find a UserSocialLink
     * @example
     * // Get one UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserSocialLinkFindUniqueOrThrowArgs>(args: SelectSubset<T, UserSocialLinkFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSocialLink that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkFindFirstArgs} args - Arguments to find a UserSocialLink
     * @example
     * // Get one UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserSocialLinkFindFirstArgs>(args?: SelectSubset<T, UserSocialLinkFindFirstArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first UserSocialLink that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkFindFirstOrThrowArgs} args - Arguments to find a UserSocialLink
     * @example
     * // Get one UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserSocialLinkFindFirstOrThrowArgs>(args?: SelectSubset<T, UserSocialLinkFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more UserSocialLinks that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all UserSocialLinks
     * const userSocialLinks = await prisma.userSocialLink.findMany()
     * 
     * // Get first 10 UserSocialLinks
     * const userSocialLinks = await prisma.userSocialLink.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userSocialLinkWithIdOnly = await prisma.userSocialLink.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserSocialLinkFindManyArgs>(args?: SelectSubset<T, UserSocialLinkFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a UserSocialLink.
     * @param {UserSocialLinkCreateArgs} args - Arguments to create a UserSocialLink.
     * @example
     * // Create one UserSocialLink
     * const UserSocialLink = await prisma.userSocialLink.create({
     *   data: {
     *     // ... data to create a UserSocialLink
     *   }
     * })
     * 
     */
    create<T extends UserSocialLinkCreateArgs>(args: SelectSubset<T, UserSocialLinkCreateArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many UserSocialLinks.
     * @param {UserSocialLinkCreateManyArgs} args - Arguments to create many UserSocialLinks.
     * @example
     * // Create many UserSocialLinks
     * const userSocialLink = await prisma.userSocialLink.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserSocialLinkCreateManyArgs>(args?: SelectSubset<T, UserSocialLinkCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many UserSocialLinks and returns the data saved in the database.
     * @param {UserSocialLinkCreateManyAndReturnArgs} args - Arguments to create many UserSocialLinks.
     * @example
     * // Create many UserSocialLinks
     * const userSocialLink = await prisma.userSocialLink.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many UserSocialLinks and only return the `id`
     * const userSocialLinkWithIdOnly = await prisma.userSocialLink.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserSocialLinkCreateManyAndReturnArgs>(args?: SelectSubset<T, UserSocialLinkCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a UserSocialLink.
     * @param {UserSocialLinkDeleteArgs} args - Arguments to delete one UserSocialLink.
     * @example
     * // Delete one UserSocialLink
     * const UserSocialLink = await prisma.userSocialLink.delete({
     *   where: {
     *     // ... filter to delete one UserSocialLink
     *   }
     * })
     * 
     */
    delete<T extends UserSocialLinkDeleteArgs>(args: SelectSubset<T, UserSocialLinkDeleteArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one UserSocialLink.
     * @param {UserSocialLinkUpdateArgs} args - Arguments to update one UserSocialLink.
     * @example
     * // Update one UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserSocialLinkUpdateArgs>(args: SelectSubset<T, UserSocialLinkUpdateArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more UserSocialLinks.
     * @param {UserSocialLinkDeleteManyArgs} args - Arguments to filter UserSocialLinks to delete.
     * @example
     * // Delete a few UserSocialLinks
     * const { count } = await prisma.userSocialLink.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserSocialLinkDeleteManyArgs>(args?: SelectSubset<T, UserSocialLinkDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many UserSocialLinks
     * const userSocialLink = await prisma.userSocialLink.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserSocialLinkUpdateManyArgs>(args: SelectSubset<T, UserSocialLinkUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more UserSocialLinks and returns the data updated in the database.
     * @param {UserSocialLinkUpdateManyAndReturnArgs} args - Arguments to update many UserSocialLinks.
     * @example
     * // Update many UserSocialLinks
     * const userSocialLink = await prisma.userSocialLink.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more UserSocialLinks and only return the `id`
     * const userSocialLinkWithIdOnly = await prisma.userSocialLink.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserSocialLinkUpdateManyAndReturnArgs>(args: SelectSubset<T, UserSocialLinkUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one UserSocialLink.
     * @param {UserSocialLinkUpsertArgs} args - Arguments to update or create a UserSocialLink.
     * @example
     * // Update or create a UserSocialLink
     * const userSocialLink = await prisma.userSocialLink.upsert({
     *   create: {
     *     // ... data to create a UserSocialLink
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the UserSocialLink we want to update
     *   }
     * })
     */
    upsert<T extends UserSocialLinkUpsertArgs>(args: SelectSubset<T, UserSocialLinkUpsertArgs<ExtArgs>>): Prisma__UserSocialLinkClient<$Result.GetResult<Prisma.$UserSocialLinkPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of UserSocialLinks.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkCountArgs} args - Arguments to filter UserSocialLinks to count.
     * @example
     * // Count the number of UserSocialLinks
     * const count = await prisma.userSocialLink.count({
     *   where: {
     *     // ... the filter for the UserSocialLinks we want to count
     *   }
     * })
    **/
    count<T extends UserSocialLinkCountArgs>(
      args?: Subset<T, UserSocialLinkCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserSocialLinkCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a UserSocialLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserSocialLinkAggregateArgs>(args: Subset<T, UserSocialLinkAggregateArgs>): Prisma.PrismaPromise<GetUserSocialLinkAggregateType<T>>

    /**
     * Group by UserSocialLink.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserSocialLinkGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserSocialLinkGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserSocialLinkGroupByArgs['orderBy'] }
        : { orderBy?: UserSocialLinkGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserSocialLinkGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserSocialLinkGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the UserSocialLink model
   */
  readonly fields: UserSocialLinkFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for UserSocialLink.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserSocialLinkClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    profile<T extends UserProfileDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserProfileDefaultArgs<ExtArgs>>): Prisma__UserProfileClient<$Result.GetResult<Prisma.$UserProfilePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the UserSocialLink model
   */
  interface UserSocialLinkFieldRefs {
    readonly id: FieldRef<"UserSocialLink", 'String'>
    readonly platform: FieldRef<"UserSocialLink", 'String'>
    readonly url: FieldRef<"UserSocialLink", 'String'>
    readonly createdAt: FieldRef<"UserSocialLink", 'DateTime'>
    readonly updatedAt: FieldRef<"UserSocialLink", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * UserSocialLink findUnique
   */
  export type UserSocialLinkFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialLink to fetch.
     */
    where: UserSocialLinkWhereUniqueInput
  }

  /**
   * UserSocialLink findUniqueOrThrow
   */
  export type UserSocialLinkFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialLink to fetch.
     */
    where: UserSocialLinkWhereUniqueInput
  }

  /**
   * UserSocialLink findFirst
   */
  export type UserSocialLinkFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialLink to fetch.
     */
    where?: UserSocialLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialLinks to fetch.
     */
    orderBy?: UserSocialLinkOrderByWithRelationInput | UserSocialLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSocialLinks.
     */
    cursor?: UserSocialLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSocialLinks.
     */
    distinct?: UserSocialLinkScalarFieldEnum | UserSocialLinkScalarFieldEnum[]
  }

  /**
   * UserSocialLink findFirstOrThrow
   */
  export type UserSocialLinkFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialLink to fetch.
     */
    where?: UserSocialLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialLinks to fetch.
     */
    orderBy?: UserSocialLinkOrderByWithRelationInput | UserSocialLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for UserSocialLinks.
     */
    cursor?: UserSocialLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialLinks.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of UserSocialLinks.
     */
    distinct?: UserSocialLinkScalarFieldEnum | UserSocialLinkScalarFieldEnum[]
  }

  /**
   * UserSocialLink findMany
   */
  export type UserSocialLinkFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter, which UserSocialLinks to fetch.
     */
    where?: UserSocialLinkWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of UserSocialLinks to fetch.
     */
    orderBy?: UserSocialLinkOrderByWithRelationInput | UserSocialLinkOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing UserSocialLinks.
     */
    cursor?: UserSocialLinkWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` UserSocialLinks from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` UserSocialLinks.
     */
    skip?: number
    distinct?: UserSocialLinkScalarFieldEnum | UserSocialLinkScalarFieldEnum[]
  }

  /**
   * UserSocialLink create
   */
  export type UserSocialLinkCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * The data needed to create a UserSocialLink.
     */
    data: XOR<UserSocialLinkCreateInput, UserSocialLinkUncheckedCreateInput>
  }

  /**
   * UserSocialLink createMany
   */
  export type UserSocialLinkCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many UserSocialLinks.
     */
    data: UserSocialLinkCreateManyInput | UserSocialLinkCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * UserSocialLink createManyAndReturn
   */
  export type UserSocialLinkCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * The data used to create many UserSocialLinks.
     */
    data: UserSocialLinkCreateManyInput | UserSocialLinkCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSocialLink update
   */
  export type UserSocialLinkUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * The data needed to update a UserSocialLink.
     */
    data: XOR<UserSocialLinkUpdateInput, UserSocialLinkUncheckedUpdateInput>
    /**
     * Choose, which UserSocialLink to update.
     */
    where: UserSocialLinkWhereUniqueInput
  }

  /**
   * UserSocialLink updateMany
   */
  export type UserSocialLinkUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update UserSocialLinks.
     */
    data: XOR<UserSocialLinkUpdateManyMutationInput, UserSocialLinkUncheckedUpdateManyInput>
    /**
     * Filter which UserSocialLinks to update
     */
    where?: UserSocialLinkWhereInput
    /**
     * Limit how many UserSocialLinks to update.
     */
    limit?: number
  }

  /**
   * UserSocialLink updateManyAndReturn
   */
  export type UserSocialLinkUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * The data used to update UserSocialLinks.
     */
    data: XOR<UserSocialLinkUpdateManyMutationInput, UserSocialLinkUncheckedUpdateManyInput>
    /**
     * Filter which UserSocialLinks to update
     */
    where?: UserSocialLinkWhereInput
    /**
     * Limit how many UserSocialLinks to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * UserSocialLink upsert
   */
  export type UserSocialLinkUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * The filter to search for the UserSocialLink to update in case it exists.
     */
    where: UserSocialLinkWhereUniqueInput
    /**
     * In case the UserSocialLink found by the `where` argument doesn't exist, create a new UserSocialLink with this data.
     */
    create: XOR<UserSocialLinkCreateInput, UserSocialLinkUncheckedCreateInput>
    /**
     * In case the UserSocialLink was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserSocialLinkUpdateInput, UserSocialLinkUncheckedUpdateInput>
  }

  /**
   * UserSocialLink delete
   */
  export type UserSocialLinkDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
    /**
     * Filter which UserSocialLink to delete.
     */
    where: UserSocialLinkWhereUniqueInput
  }

  /**
   * UserSocialLink deleteMany
   */
  export type UserSocialLinkDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which UserSocialLinks to delete
     */
    where?: UserSocialLinkWhereInput
    /**
     * Limit how many UserSocialLinks to delete.
     */
    limit?: number
  }

  /**
   * UserSocialLink without action
   */
  export type UserSocialLinkDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserSocialLink
     */
    select?: UserSocialLinkSelect<ExtArgs> | null
    /**
     * Omit specific fields from the UserSocialLink
     */
    omit?: UserSocialLinkOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserSocialLinkInclude<ExtArgs> | null
  }


  /**
   * Model PostActions
   */

  export type AggregatePostActions = {
    _count: PostActionsCountAggregateOutputType | null
    _min: PostActionsMinAggregateOutputType | null
    _max: PostActionsMaxAggregateOutputType | null
  }

  export type PostActionsMinAggregateOutputType = {
    id: string | null
    userId: string | null
    postId: string | null
    likeStatus: boolean | null
    bookmarkStatus: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostActionsMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    postId: string | null
    likeStatus: boolean | null
    bookmarkStatus: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostActionsCountAggregateOutputType = {
    id: number
    userId: number
    postId: number
    likeStatus: number
    bookmarkStatus: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostActionsMinAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    likeStatus?: true
    bookmarkStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostActionsMaxAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    likeStatus?: true
    bookmarkStatus?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostActionsCountAggregateInputType = {
    id?: true
    userId?: true
    postId?: true
    likeStatus?: true
    bookmarkStatus?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostActionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostActions to aggregate.
     */
    where?: PostActionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostActions to fetch.
     */
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostActionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PostActions
    **/
    _count?: true | PostActionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostActionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostActionsMaxAggregateInputType
  }

  export type GetPostActionsAggregateType<T extends PostActionsAggregateArgs> = {
        [P in keyof T & keyof AggregatePostActions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePostActions[P]>
      : GetScalarType<T[P], AggregatePostActions[P]>
  }




  export type PostActionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostActionsWhereInput
    orderBy?: PostActionsOrderByWithAggregationInput | PostActionsOrderByWithAggregationInput[]
    by: PostActionsScalarFieldEnum[] | PostActionsScalarFieldEnum
    having?: PostActionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostActionsCountAggregateInputType | true
    _min?: PostActionsMinAggregateInputType
    _max?: PostActionsMaxAggregateInputType
  }

  export type PostActionsGroupByOutputType = {
    id: string
    userId: string
    postId: string
    likeStatus: boolean
    bookmarkStatus: boolean
    createdAt: Date
    updatedAt: Date
    _count: PostActionsCountAggregateOutputType | null
    _min: PostActionsMinAggregateOutputType | null
    _max: PostActionsMaxAggregateOutputType | null
  }

  type GetPostActionsGroupByPayload<T extends PostActionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostActionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostActionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostActionsGroupByOutputType[P]>
            : GetScalarType<T[P], PostActionsGroupByOutputType[P]>
        }
      >
    >


  export type PostActionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postActions"]>

  export type PostActionsSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postActions"]>

  export type PostActionsSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    postId?: boolean
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["postActions"]>

  export type PostActionsSelectScalar = {
    id?: boolean
    userId?: boolean
    postId?: boolean
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostActionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "postId" | "likeStatus" | "bookmarkStatus" | "createdAt" | "updatedAt", ExtArgs["result"]["postActions"]>
  export type PostActionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostActionsIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }
  export type PostActionsIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    post?: boolean | PostDefaultArgs<ExtArgs>
  }

  export type $PostActionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PostActions"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      post: Prisma.$PostPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      postId: string
      likeStatus: boolean
      bookmarkStatus: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["postActions"]>
    composites: {}
  }

  type PostActionsGetPayload<S extends boolean | null | undefined | PostActionsDefaultArgs> = $Result.GetResult<Prisma.$PostActionsPayload, S>

  type PostActionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostActionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostActionsCountAggregateInputType | true
    }

  export interface PostActionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PostActions'], meta: { name: 'PostActions' } }
    /**
     * Find zero or one PostActions that matches the filter.
     * @param {PostActionsFindUniqueArgs} args - Arguments to find a PostActions
     * @example
     * // Get one PostActions
     * const postActions = await prisma.postActions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostActionsFindUniqueArgs>(args: SelectSubset<T, PostActionsFindUniqueArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PostActions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostActionsFindUniqueOrThrowArgs} args - Arguments to find a PostActions
     * @example
     * // Get one PostActions
     * const postActions = await prisma.postActions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostActionsFindUniqueOrThrowArgs>(args: SelectSubset<T, PostActionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsFindFirstArgs} args - Arguments to find a PostActions
     * @example
     * // Get one PostActions
     * const postActions = await prisma.postActions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostActionsFindFirstArgs>(args?: SelectSubset<T, PostActionsFindFirstArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PostActions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsFindFirstOrThrowArgs} args - Arguments to find a PostActions
     * @example
     * // Get one PostActions
     * const postActions = await prisma.postActions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostActionsFindFirstOrThrowArgs>(args?: SelectSubset<T, PostActionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PostActions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PostActions
     * const postActions = await prisma.postActions.findMany()
     * 
     * // Get first 10 PostActions
     * const postActions = await prisma.postActions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postActionsWithIdOnly = await prisma.postActions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostActionsFindManyArgs>(args?: SelectSubset<T, PostActionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PostActions.
     * @param {PostActionsCreateArgs} args - Arguments to create a PostActions.
     * @example
     * // Create one PostActions
     * const PostActions = await prisma.postActions.create({
     *   data: {
     *     // ... data to create a PostActions
     *   }
     * })
     * 
     */
    create<T extends PostActionsCreateArgs>(args: SelectSubset<T, PostActionsCreateArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PostActions.
     * @param {PostActionsCreateManyArgs} args - Arguments to create many PostActions.
     * @example
     * // Create many PostActions
     * const postActions = await prisma.postActions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostActionsCreateManyArgs>(args?: SelectSubset<T, PostActionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PostActions and returns the data saved in the database.
     * @param {PostActionsCreateManyAndReturnArgs} args - Arguments to create many PostActions.
     * @example
     * // Create many PostActions
     * const postActions = await prisma.postActions.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PostActions and only return the `id`
     * const postActionsWithIdOnly = await prisma.postActions.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostActionsCreateManyAndReturnArgs>(args?: SelectSubset<T, PostActionsCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PostActions.
     * @param {PostActionsDeleteArgs} args - Arguments to delete one PostActions.
     * @example
     * // Delete one PostActions
     * const PostActions = await prisma.postActions.delete({
     *   where: {
     *     // ... filter to delete one PostActions
     *   }
     * })
     * 
     */
    delete<T extends PostActionsDeleteArgs>(args: SelectSubset<T, PostActionsDeleteArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PostActions.
     * @param {PostActionsUpdateArgs} args - Arguments to update one PostActions.
     * @example
     * // Update one PostActions
     * const postActions = await prisma.postActions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostActionsUpdateArgs>(args: SelectSubset<T, PostActionsUpdateArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PostActions.
     * @param {PostActionsDeleteManyArgs} args - Arguments to filter PostActions to delete.
     * @example
     * // Delete a few PostActions
     * const { count } = await prisma.postActions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostActionsDeleteManyArgs>(args?: SelectSubset<T, PostActionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PostActions
     * const postActions = await prisma.postActions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostActionsUpdateManyArgs>(args: SelectSubset<T, PostActionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PostActions and returns the data updated in the database.
     * @param {PostActionsUpdateManyAndReturnArgs} args - Arguments to update many PostActions.
     * @example
     * // Update many PostActions
     * const postActions = await prisma.postActions.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PostActions and only return the `id`
     * const postActionsWithIdOnly = await prisma.postActions.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostActionsUpdateManyAndReturnArgs>(args: SelectSubset<T, PostActionsUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PostActions.
     * @param {PostActionsUpsertArgs} args - Arguments to update or create a PostActions.
     * @example
     * // Update or create a PostActions
     * const postActions = await prisma.postActions.upsert({
     *   create: {
     *     // ... data to create a PostActions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PostActions we want to update
     *   }
     * })
     */
    upsert<T extends PostActionsUpsertArgs>(args: SelectSubset<T, PostActionsUpsertArgs<ExtArgs>>): Prisma__PostActionsClient<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PostActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsCountArgs} args - Arguments to filter PostActions to count.
     * @example
     * // Count the number of PostActions
     * const count = await prisma.postActions.count({
     *   where: {
     *     // ... the filter for the PostActions we want to count
     *   }
     * })
    **/
    count<T extends PostActionsCountArgs>(
      args?: Subset<T, PostActionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostActionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PostActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostActionsAggregateArgs>(args: Subset<T, PostActionsAggregateArgs>): Prisma.PrismaPromise<GetPostActionsAggregateType<T>>

    /**
     * Group by PostActions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostActionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostActionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostActionsGroupByArgs['orderBy'] }
        : { orderBy?: PostActionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostActionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostActionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PostActions model
   */
  readonly fields: PostActionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PostActions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostActionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    post<T extends PostDefaultArgs<ExtArgs> = {}>(args?: Subset<T, PostDefaultArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PostActions model
   */
  interface PostActionsFieldRefs {
    readonly id: FieldRef<"PostActions", 'String'>
    readonly userId: FieldRef<"PostActions", 'String'>
    readonly postId: FieldRef<"PostActions", 'String'>
    readonly likeStatus: FieldRef<"PostActions", 'Boolean'>
    readonly bookmarkStatus: FieldRef<"PostActions", 'Boolean'>
    readonly createdAt: FieldRef<"PostActions", 'DateTime'>
    readonly updatedAt: FieldRef<"PostActions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PostActions findUnique
   */
  export type PostActionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter, which PostActions to fetch.
     */
    where: PostActionsWhereUniqueInput
  }

  /**
   * PostActions findUniqueOrThrow
   */
  export type PostActionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter, which PostActions to fetch.
     */
    where: PostActionsWhereUniqueInput
  }

  /**
   * PostActions findFirst
   */
  export type PostActionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter, which PostActions to fetch.
     */
    where?: PostActionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostActions to fetch.
     */
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostActions.
     */
    cursor?: PostActionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostActions.
     */
    distinct?: PostActionsScalarFieldEnum | PostActionsScalarFieldEnum[]
  }

  /**
   * PostActions findFirstOrThrow
   */
  export type PostActionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter, which PostActions to fetch.
     */
    where?: PostActionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostActions to fetch.
     */
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PostActions.
     */
    cursor?: PostActionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostActions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PostActions.
     */
    distinct?: PostActionsScalarFieldEnum | PostActionsScalarFieldEnum[]
  }

  /**
   * PostActions findMany
   */
  export type PostActionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter, which PostActions to fetch.
     */
    where?: PostActionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PostActions to fetch.
     */
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PostActions.
     */
    cursor?: PostActionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PostActions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PostActions.
     */
    skip?: number
    distinct?: PostActionsScalarFieldEnum | PostActionsScalarFieldEnum[]
  }

  /**
   * PostActions create
   */
  export type PostActionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * The data needed to create a PostActions.
     */
    data: XOR<PostActionsCreateInput, PostActionsUncheckedCreateInput>
  }

  /**
   * PostActions createMany
   */
  export type PostActionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PostActions.
     */
    data: PostActionsCreateManyInput | PostActionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PostActions createManyAndReturn
   */
  export type PostActionsCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * The data used to create many PostActions.
     */
    data: PostActionsCreateManyInput | PostActionsCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostActions update
   */
  export type PostActionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * The data needed to update a PostActions.
     */
    data: XOR<PostActionsUpdateInput, PostActionsUncheckedUpdateInput>
    /**
     * Choose, which PostActions to update.
     */
    where: PostActionsWhereUniqueInput
  }

  /**
   * PostActions updateMany
   */
  export type PostActionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PostActions.
     */
    data: XOR<PostActionsUpdateManyMutationInput, PostActionsUncheckedUpdateManyInput>
    /**
     * Filter which PostActions to update
     */
    where?: PostActionsWhereInput
    /**
     * Limit how many PostActions to update.
     */
    limit?: number
  }

  /**
   * PostActions updateManyAndReturn
   */
  export type PostActionsUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * The data used to update PostActions.
     */
    data: XOR<PostActionsUpdateManyMutationInput, PostActionsUncheckedUpdateManyInput>
    /**
     * Filter which PostActions to update
     */
    where?: PostActionsWhereInput
    /**
     * Limit how many PostActions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * PostActions upsert
   */
  export type PostActionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * The filter to search for the PostActions to update in case it exists.
     */
    where: PostActionsWhereUniqueInput
    /**
     * In case the PostActions found by the `where` argument doesn't exist, create a new PostActions with this data.
     */
    create: XOR<PostActionsCreateInput, PostActionsUncheckedCreateInput>
    /**
     * In case the PostActions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostActionsUpdateInput, PostActionsUncheckedUpdateInput>
  }

  /**
   * PostActions delete
   */
  export type PostActionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    /**
     * Filter which PostActions to delete.
     */
    where: PostActionsWhereUniqueInput
  }

  /**
   * PostActions deleteMany
   */
  export type PostActionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PostActions to delete
     */
    where?: PostActionsWhereInput
    /**
     * Limit how many PostActions to delete.
     */
    limit?: number
  }

  /**
   * PostActions without action
   */
  export type PostActionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
  }


  /**
   * Model Post
   */

  export type AggregatePost = {
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  export type PostAvgAggregateOutputType = {
    readTime: number | null
    likes: number | null
    views: number | null
    bookmarks: number | null
    downloads: number | null
  }

  export type PostSumAggregateOutputType = {
    readTime: number | null
    likes: number | null
    views: number | null
    bookmarks: number | null
    downloads: number | null
  }

  export type PostMinAggregateOutputType = {
    id: string | null
    title: string | null
    excerpt: string | null
    category: string | null
    readTime: number | null
    content: string | null
    authorId: string | null
    thumbnail: string | null
    authorImage: string | null
    coverImage: string | null
    trending: boolean | null
    featured: boolean | null
    likes: number | null
    views: number | null
    bookmarks: number | null
    downloads: number | null
    referenceStatus: boolean | null
    status: $Enums.PostStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostMaxAggregateOutputType = {
    id: string | null
    title: string | null
    excerpt: string | null
    category: string | null
    readTime: number | null
    content: string | null
    authorId: string | null
    thumbnail: string | null
    authorImage: string | null
    coverImage: string | null
    trending: boolean | null
    featured: boolean | null
    likes: number | null
    views: number | null
    bookmarks: number | null
    downloads: number | null
    referenceStatus: boolean | null
    status: $Enums.PostStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PostCountAggregateOutputType = {
    id: number
    title: number
    excerpt: number
    category: number
    readTime: number
    content: number
    authorId: number
    thumbnail: number
    authorImage: number
    coverImage: number
    trending: number
    featured: number
    likes: number
    views: number
    bookmarks: number
    downloads: number
    referenceStatus: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PostAvgAggregateInputType = {
    readTime?: true
    likes?: true
    views?: true
    bookmarks?: true
    downloads?: true
  }

  export type PostSumAggregateInputType = {
    readTime?: true
    likes?: true
    views?: true
    bookmarks?: true
    downloads?: true
  }

  export type PostMinAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    category?: true
    readTime?: true
    content?: true
    authorId?: true
    thumbnail?: true
    authorImage?: true
    coverImage?: true
    trending?: true
    featured?: true
    likes?: true
    views?: true
    bookmarks?: true
    downloads?: true
    referenceStatus?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostMaxAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    category?: true
    readTime?: true
    content?: true
    authorId?: true
    thumbnail?: true
    authorImage?: true
    coverImage?: true
    trending?: true
    featured?: true
    likes?: true
    views?: true
    bookmarks?: true
    downloads?: true
    referenceStatus?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PostCountAggregateInputType = {
    id?: true
    title?: true
    excerpt?: true
    category?: true
    readTime?: true
    content?: true
    authorId?: true
    thumbnail?: true
    authorImage?: true
    coverImage?: true
    trending?: true
    featured?: true
    likes?: true
    views?: true
    bookmarks?: true
    downloads?: true
    referenceStatus?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PostAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Post to aggregate.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Posts
    **/
    _count?: true | PostCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PostAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PostSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PostMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PostMaxAggregateInputType
  }

  export type GetPostAggregateType<T extends PostAggregateArgs> = {
        [P in keyof T & keyof AggregatePost]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePost[P]>
      : GetScalarType<T[P], AggregatePost[P]>
  }




  export type PostGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PostWhereInput
    orderBy?: PostOrderByWithAggregationInput | PostOrderByWithAggregationInput[]
    by: PostScalarFieldEnum[] | PostScalarFieldEnum
    having?: PostScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PostCountAggregateInputType | true
    _avg?: PostAvgAggregateInputType
    _sum?: PostSumAggregateInputType
    _min?: PostMinAggregateInputType
    _max?: PostMaxAggregateInputType
  }

  export type PostGroupByOutputType = {
    id: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    authorId: string
    thumbnail: string | null
    authorImage: string | null
    coverImage: string | null
    trending: boolean
    featured: boolean
    likes: number
    views: number
    bookmarks: number
    downloads: number
    referenceStatus: boolean
    status: $Enums.PostStatus
    createdAt: Date
    updatedAt: Date
    _count: PostCountAggregateOutputType | null
    _avg: PostAvgAggregateOutputType | null
    _sum: PostSumAggregateOutputType | null
    _min: PostMinAggregateOutputType | null
    _max: PostMaxAggregateOutputType | null
  }

  type GetPostGroupByPayload<T extends PostGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PostGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PostGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PostGroupByOutputType[P]>
            : GetScalarType<T[P], PostGroupByOutputType[P]>
        }
      >
    >


  export type PostSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    category?: boolean
    readTime?: boolean
    content?: boolean
    authorId?: boolean
    thumbnail?: boolean
    authorImage?: boolean
    coverImage?: boolean
    trending?: boolean
    featured?: boolean
    likes?: boolean
    views?: boolean
    bookmarks?: boolean
    downloads?: boolean
    referenceStatus?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
    PostActions?: boolean | Post$PostActionsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    category?: boolean
    readTime?: boolean
    content?: boolean
    authorId?: boolean
    thumbnail?: boolean
    authorImage?: boolean
    coverImage?: boolean
    trending?: boolean
    featured?: boolean
    likes?: boolean
    views?: boolean
    bookmarks?: boolean
    downloads?: boolean
    referenceStatus?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    excerpt?: boolean
    category?: boolean
    readTime?: boolean
    content?: boolean
    authorId?: boolean
    thumbnail?: boolean
    authorImage?: boolean
    coverImage?: boolean
    trending?: boolean
    featured?: boolean
    likes?: boolean
    views?: boolean
    bookmarks?: boolean
    downloads?: boolean
    referenceStatus?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    author?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["post"]>

  export type PostSelectScalar = {
    id?: boolean
    title?: boolean
    excerpt?: boolean
    category?: boolean
    readTime?: boolean
    content?: boolean
    authorId?: boolean
    thumbnail?: boolean
    authorImage?: boolean
    coverImage?: boolean
    trending?: boolean
    featured?: boolean
    likes?: boolean
    views?: boolean
    bookmarks?: boolean
    downloads?: boolean
    referenceStatus?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PostOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "excerpt" | "category" | "readTime" | "content" | "authorId" | "thumbnail" | "authorImage" | "coverImage" | "trending" | "featured" | "likes" | "views" | "bookmarks" | "downloads" | "referenceStatus" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["post"]>
  export type PostInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
    PostActions?: boolean | Post$PostActionsArgs<ExtArgs>
    _count?: boolean | PostCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type PostIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type PostIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    author?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $PostPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Post"
    objects: {
      author: Prisma.$UserPayload<ExtArgs>
      PostActions: Prisma.$PostActionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      excerpt: string
      category: string
      readTime: number
      content: string
      authorId: string
      thumbnail: string | null
      authorImage: string | null
      coverImage: string | null
      trending: boolean
      featured: boolean
      likes: number
      views: number
      bookmarks: number
      downloads: number
      referenceStatus: boolean
      status: $Enums.PostStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["post"]>
    composites: {}
  }

  type PostGetPayload<S extends boolean | null | undefined | PostDefaultArgs> = $Result.GetResult<Prisma.$PostPayload, S>

  type PostCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PostFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PostCountAggregateInputType | true
    }

  export interface PostDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Post'], meta: { name: 'Post' } }
    /**
     * Find zero or one Post that matches the filter.
     * @param {PostFindUniqueArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PostFindUniqueArgs>(args: SelectSubset<T, PostFindUniqueArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Post that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PostFindUniqueOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PostFindUniqueOrThrowArgs>(args: SelectSubset<T, PostFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PostFindFirstArgs>(args?: SelectSubset<T, PostFindFirstArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Post that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindFirstOrThrowArgs} args - Arguments to find a Post
     * @example
     * // Get one Post
     * const post = await prisma.post.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PostFindFirstOrThrowArgs>(args?: SelectSubset<T, PostFindFirstOrThrowArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Posts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Posts
     * const posts = await prisma.post.findMany()
     * 
     * // Get first 10 Posts
     * const posts = await prisma.post.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const postWithIdOnly = await prisma.post.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PostFindManyArgs>(args?: SelectSubset<T, PostFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Post.
     * @param {PostCreateArgs} args - Arguments to create a Post.
     * @example
     * // Create one Post
     * const Post = await prisma.post.create({
     *   data: {
     *     // ... data to create a Post
     *   }
     * })
     * 
     */
    create<T extends PostCreateArgs>(args: SelectSubset<T, PostCreateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Posts.
     * @param {PostCreateManyArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PostCreateManyArgs>(args?: SelectSubset<T, PostCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Posts and returns the data saved in the database.
     * @param {PostCreateManyAndReturnArgs} args - Arguments to create many Posts.
     * @example
     * // Create many Posts
     * const post = await prisma.post.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PostCreateManyAndReturnArgs>(args?: SelectSubset<T, PostCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Post.
     * @param {PostDeleteArgs} args - Arguments to delete one Post.
     * @example
     * // Delete one Post
     * const Post = await prisma.post.delete({
     *   where: {
     *     // ... filter to delete one Post
     *   }
     * })
     * 
     */
    delete<T extends PostDeleteArgs>(args: SelectSubset<T, PostDeleteArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Post.
     * @param {PostUpdateArgs} args - Arguments to update one Post.
     * @example
     * // Update one Post
     * const post = await prisma.post.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PostUpdateArgs>(args: SelectSubset<T, PostUpdateArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Posts.
     * @param {PostDeleteManyArgs} args - Arguments to filter Posts to delete.
     * @example
     * // Delete a few Posts
     * const { count } = await prisma.post.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PostDeleteManyArgs>(args?: SelectSubset<T, PostDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PostUpdateManyArgs>(args: SelectSubset<T, PostUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Posts and returns the data updated in the database.
     * @param {PostUpdateManyAndReturnArgs} args - Arguments to update many Posts.
     * @example
     * // Update many Posts
     * const post = await prisma.post.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Posts and only return the `id`
     * const postWithIdOnly = await prisma.post.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PostUpdateManyAndReturnArgs>(args: SelectSubset<T, PostUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Post.
     * @param {PostUpsertArgs} args - Arguments to update or create a Post.
     * @example
     * // Update or create a Post
     * const post = await prisma.post.upsert({
     *   create: {
     *     // ... data to create a Post
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Post we want to update
     *   }
     * })
     */
    upsert<T extends PostUpsertArgs>(args: SelectSubset<T, PostUpsertArgs<ExtArgs>>): Prisma__PostClient<$Result.GetResult<Prisma.$PostPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Posts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostCountArgs} args - Arguments to filter Posts to count.
     * @example
     * // Count the number of Posts
     * const count = await prisma.post.count({
     *   where: {
     *     // ... the filter for the Posts we want to count
     *   }
     * })
    **/
    count<T extends PostCountArgs>(
      args?: Subset<T, PostCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PostCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PostAggregateArgs>(args: Subset<T, PostAggregateArgs>): Prisma.PrismaPromise<GetPostAggregateType<T>>

    /**
     * Group by Post.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PostGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PostGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PostGroupByArgs['orderBy'] }
        : { orderBy?: PostGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PostGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPostGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Post model
   */
  readonly fields: PostFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Post.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PostClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    author<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    PostActions<T extends Post$PostActionsArgs<ExtArgs> = {}>(args?: Subset<T, Post$PostActionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PostActionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Post model
   */
  interface PostFieldRefs {
    readonly id: FieldRef<"Post", 'String'>
    readonly title: FieldRef<"Post", 'String'>
    readonly excerpt: FieldRef<"Post", 'String'>
    readonly category: FieldRef<"Post", 'String'>
    readonly readTime: FieldRef<"Post", 'Int'>
    readonly content: FieldRef<"Post", 'String'>
    readonly authorId: FieldRef<"Post", 'String'>
    readonly thumbnail: FieldRef<"Post", 'String'>
    readonly authorImage: FieldRef<"Post", 'String'>
    readonly coverImage: FieldRef<"Post", 'String'>
    readonly trending: FieldRef<"Post", 'Boolean'>
    readonly featured: FieldRef<"Post", 'Boolean'>
    readonly likes: FieldRef<"Post", 'Int'>
    readonly views: FieldRef<"Post", 'Int'>
    readonly bookmarks: FieldRef<"Post", 'Int'>
    readonly downloads: FieldRef<"Post", 'Int'>
    readonly referenceStatus: FieldRef<"Post", 'Boolean'>
    readonly status: FieldRef<"Post", 'PostStatus'>
    readonly createdAt: FieldRef<"Post", 'DateTime'>
    readonly updatedAt: FieldRef<"Post", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Post findUnique
   */
  export type PostFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findUniqueOrThrow
   */
  export type PostFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post findFirst
   */
  export type PostFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findFirstOrThrow
   */
  export type PostFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Post to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Posts.
     */
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post findMany
   */
  export type PostFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter, which Posts to fetch.
     */
    where?: PostWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Posts to fetch.
     */
    orderBy?: PostOrderByWithRelationInput | PostOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Posts.
     */
    cursor?: PostWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Posts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Posts.
     */
    skip?: number
    distinct?: PostScalarFieldEnum | PostScalarFieldEnum[]
  }

  /**
   * Post create
   */
  export type PostCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to create a Post.
     */
    data: XOR<PostCreateInput, PostUncheckedCreateInput>
  }

  /**
   * Post createMany
   */
  export type PostCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Post createManyAndReturn
   */
  export type PostCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to create many Posts.
     */
    data: PostCreateManyInput | PostCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post update
   */
  export type PostUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The data needed to update a Post.
     */
    data: XOR<PostUpdateInput, PostUncheckedUpdateInput>
    /**
     * Choose, which Post to update.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post updateMany
   */
  export type PostUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
  }

  /**
   * Post updateManyAndReturn
   */
  export type PostUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * The data used to update Posts.
     */
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyInput>
    /**
     * Filter which Posts to update
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Post upsert
   */
  export type PostUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * The filter to search for the Post to update in case it exists.
     */
    where: PostWhereUniqueInput
    /**
     * In case the Post found by the `where` argument doesn't exist, create a new Post with this data.
     */
    create: XOR<PostCreateInput, PostUncheckedCreateInput>
    /**
     * In case the Post was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PostUpdateInput, PostUncheckedUpdateInput>
  }

  /**
   * Post delete
   */
  export type PostDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
    /**
     * Filter which Post to delete.
     */
    where: PostWhereUniqueInput
  }

  /**
   * Post deleteMany
   */
  export type PostDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Posts to delete
     */
    where?: PostWhereInput
    /**
     * Limit how many Posts to delete.
     */
    limit?: number
  }

  /**
   * Post.PostActions
   */
  export type Post$PostActionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PostActions
     */
    select?: PostActionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PostActions
     */
    omit?: PostActionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostActionsInclude<ExtArgs> | null
    where?: PostActionsWhereInput
    orderBy?: PostActionsOrderByWithRelationInput | PostActionsOrderByWithRelationInput[]
    cursor?: PostActionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PostActionsScalarFieldEnum | PostActionsScalarFieldEnum[]
  }

  /**
   * Post without action
   */
  export type PostDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Post
     */
    select?: PostSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Post
     */
    omit?: PostOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PostInclude<ExtArgs> | null
  }


  /**
   * Model MediaMetaData
   */

  export type AggregateMediaMetaData = {
    _count: MediaMetaDataCountAggregateOutputType | null
    _avg: MediaMetaDataAvgAggregateOutputType | null
    _sum: MediaMetaDataSumAggregateOutputType | null
    _min: MediaMetaDataMinAggregateOutputType | null
    _max: MediaMetaDataMaxAggregateOutputType | null
  }

  export type MediaMetaDataAvgAggregateOutputType = {
    id: number | null
  }

  export type MediaMetaDataSumAggregateOutputType = {
    id: number | null
  }

  export type MediaMetaDataMinAggregateOutputType = {
    id: number | null
    publicId: string | null
    mediaType: $Enums.MediaType | null
    serviceRefId: string | null
    userId: string | null
    orphan: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaMetaDataMaxAggregateOutputType = {
    id: number | null
    publicId: string | null
    mediaType: $Enums.MediaType | null
    serviceRefId: string | null
    userId: string | null
    orphan: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type MediaMetaDataCountAggregateOutputType = {
    id: number
    publicId: number
    mediaType: number
    serviceRefId: number
    userId: number
    orphan: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type MediaMetaDataAvgAggregateInputType = {
    id?: true
  }

  export type MediaMetaDataSumAggregateInputType = {
    id?: true
  }

  export type MediaMetaDataMinAggregateInputType = {
    id?: true
    publicId?: true
    mediaType?: true
    serviceRefId?: true
    userId?: true
    orphan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaMetaDataMaxAggregateInputType = {
    id?: true
    publicId?: true
    mediaType?: true
    serviceRefId?: true
    userId?: true
    orphan?: true
    createdAt?: true
    updatedAt?: true
  }

  export type MediaMetaDataCountAggregateInputType = {
    id?: true
    publicId?: true
    mediaType?: true
    serviceRefId?: true
    userId?: true
    orphan?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type MediaMetaDataAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaMetaData to aggregate.
     */
    where?: MediaMetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaMetaData to fetch.
     */
    orderBy?: MediaMetaDataOrderByWithRelationInput | MediaMetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MediaMetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaMetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaMetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MediaMetaData
    **/
    _count?: true | MediaMetaDataCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MediaMetaDataAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MediaMetaDataSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MediaMetaDataMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MediaMetaDataMaxAggregateInputType
  }

  export type GetMediaMetaDataAggregateType<T extends MediaMetaDataAggregateArgs> = {
        [P in keyof T & keyof AggregateMediaMetaData]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMediaMetaData[P]>
      : GetScalarType<T[P], AggregateMediaMetaData[P]>
  }




  export type MediaMetaDataGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MediaMetaDataWhereInput
    orderBy?: MediaMetaDataOrderByWithAggregationInput | MediaMetaDataOrderByWithAggregationInput[]
    by: MediaMetaDataScalarFieldEnum[] | MediaMetaDataScalarFieldEnum
    having?: MediaMetaDataScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MediaMetaDataCountAggregateInputType | true
    _avg?: MediaMetaDataAvgAggregateInputType
    _sum?: MediaMetaDataSumAggregateInputType
    _min?: MediaMetaDataMinAggregateInputType
    _max?: MediaMetaDataMaxAggregateInputType
  }

  export type MediaMetaDataGroupByOutputType = {
    id: number
    publicId: string
    mediaType: $Enums.MediaType
    serviceRefId: string | null
    userId: string | null
    orphan: boolean
    createdAt: Date
    updatedAt: Date
    _count: MediaMetaDataCountAggregateOutputType | null
    _avg: MediaMetaDataAvgAggregateOutputType | null
    _sum: MediaMetaDataSumAggregateOutputType | null
    _min: MediaMetaDataMinAggregateOutputType | null
    _max: MediaMetaDataMaxAggregateOutputType | null
  }

  type GetMediaMetaDataGroupByPayload<T extends MediaMetaDataGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MediaMetaDataGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MediaMetaDataGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MediaMetaDataGroupByOutputType[P]>
            : GetScalarType<T[P], MediaMetaDataGroupByOutputType[P]>
        }
      >
    >


  export type MediaMetaDataSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicId?: boolean
    mediaType?: boolean
    serviceRefId?: boolean
    userId?: boolean
    orphan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }, ExtArgs["result"]["mediaMetaData"]>

  export type MediaMetaDataSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicId?: boolean
    mediaType?: boolean
    serviceRefId?: boolean
    userId?: boolean
    orphan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }, ExtArgs["result"]["mediaMetaData"]>

  export type MediaMetaDataSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    publicId?: boolean
    mediaType?: boolean
    serviceRefId?: boolean
    userId?: boolean
    orphan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }, ExtArgs["result"]["mediaMetaData"]>

  export type MediaMetaDataSelectScalar = {
    id?: boolean
    publicId?: boolean
    mediaType?: boolean
    serviceRefId?: boolean
    userId?: boolean
    orphan?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type MediaMetaDataOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "publicId" | "mediaType" | "serviceRefId" | "userId" | "orphan" | "createdAt" | "updatedAt", ExtArgs["result"]["mediaMetaData"]>
  export type MediaMetaDataInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }
  export type MediaMetaDataIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }
  export type MediaMetaDataIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    serviceRef?: boolean | MediaMetaData$serviceRefArgs<ExtArgs>
  }

  export type $MediaMetaDataPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MediaMetaData"
    objects: {
      serviceRef: Prisma.$ServiceRefPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      publicId: string
      mediaType: $Enums.MediaType
      serviceRefId: string | null
      userId: string | null
      orphan: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["mediaMetaData"]>
    composites: {}
  }

  type MediaMetaDataGetPayload<S extends boolean | null | undefined | MediaMetaDataDefaultArgs> = $Result.GetResult<Prisma.$MediaMetaDataPayload, S>

  type MediaMetaDataCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MediaMetaDataFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MediaMetaDataCountAggregateInputType | true
    }

  export interface MediaMetaDataDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MediaMetaData'], meta: { name: 'MediaMetaData' } }
    /**
     * Find zero or one MediaMetaData that matches the filter.
     * @param {MediaMetaDataFindUniqueArgs} args - Arguments to find a MediaMetaData
     * @example
     * // Get one MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MediaMetaDataFindUniqueArgs>(args: SelectSubset<T, MediaMetaDataFindUniqueArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MediaMetaData that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MediaMetaDataFindUniqueOrThrowArgs} args - Arguments to find a MediaMetaData
     * @example
     * // Get one MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MediaMetaDataFindUniqueOrThrowArgs>(args: SelectSubset<T, MediaMetaDataFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaMetaData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataFindFirstArgs} args - Arguments to find a MediaMetaData
     * @example
     * // Get one MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MediaMetaDataFindFirstArgs>(args?: SelectSubset<T, MediaMetaDataFindFirstArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MediaMetaData that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataFindFirstOrThrowArgs} args - Arguments to find a MediaMetaData
     * @example
     * // Get one MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MediaMetaDataFindFirstOrThrowArgs>(args?: SelectSubset<T, MediaMetaDataFindFirstOrThrowArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MediaMetaData that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findMany()
     * 
     * // Get first 10 MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const mediaMetaDataWithIdOnly = await prisma.mediaMetaData.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MediaMetaDataFindManyArgs>(args?: SelectSubset<T, MediaMetaDataFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MediaMetaData.
     * @param {MediaMetaDataCreateArgs} args - Arguments to create a MediaMetaData.
     * @example
     * // Create one MediaMetaData
     * const MediaMetaData = await prisma.mediaMetaData.create({
     *   data: {
     *     // ... data to create a MediaMetaData
     *   }
     * })
     * 
     */
    create<T extends MediaMetaDataCreateArgs>(args: SelectSubset<T, MediaMetaDataCreateArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MediaMetaData.
     * @param {MediaMetaDataCreateManyArgs} args - Arguments to create many MediaMetaData.
     * @example
     * // Create many MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MediaMetaDataCreateManyArgs>(args?: SelectSubset<T, MediaMetaDataCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MediaMetaData and returns the data saved in the database.
     * @param {MediaMetaDataCreateManyAndReturnArgs} args - Arguments to create many MediaMetaData.
     * @example
     * // Create many MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MediaMetaData and only return the `id`
     * const mediaMetaDataWithIdOnly = await prisma.mediaMetaData.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MediaMetaDataCreateManyAndReturnArgs>(args?: SelectSubset<T, MediaMetaDataCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MediaMetaData.
     * @param {MediaMetaDataDeleteArgs} args - Arguments to delete one MediaMetaData.
     * @example
     * // Delete one MediaMetaData
     * const MediaMetaData = await prisma.mediaMetaData.delete({
     *   where: {
     *     // ... filter to delete one MediaMetaData
     *   }
     * })
     * 
     */
    delete<T extends MediaMetaDataDeleteArgs>(args: SelectSubset<T, MediaMetaDataDeleteArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MediaMetaData.
     * @param {MediaMetaDataUpdateArgs} args - Arguments to update one MediaMetaData.
     * @example
     * // Update one MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MediaMetaDataUpdateArgs>(args: SelectSubset<T, MediaMetaDataUpdateArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MediaMetaData.
     * @param {MediaMetaDataDeleteManyArgs} args - Arguments to filter MediaMetaData to delete.
     * @example
     * // Delete a few MediaMetaData
     * const { count } = await prisma.mediaMetaData.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MediaMetaDataDeleteManyArgs>(args?: SelectSubset<T, MediaMetaDataDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaMetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MediaMetaDataUpdateManyArgs>(args: SelectSubset<T, MediaMetaDataUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MediaMetaData and returns the data updated in the database.
     * @param {MediaMetaDataUpdateManyAndReturnArgs} args - Arguments to update many MediaMetaData.
     * @example
     * // Update many MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MediaMetaData and only return the `id`
     * const mediaMetaDataWithIdOnly = await prisma.mediaMetaData.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MediaMetaDataUpdateManyAndReturnArgs>(args: SelectSubset<T, MediaMetaDataUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MediaMetaData.
     * @param {MediaMetaDataUpsertArgs} args - Arguments to update or create a MediaMetaData.
     * @example
     * // Update or create a MediaMetaData
     * const mediaMetaData = await prisma.mediaMetaData.upsert({
     *   create: {
     *     // ... data to create a MediaMetaData
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MediaMetaData we want to update
     *   }
     * })
     */
    upsert<T extends MediaMetaDataUpsertArgs>(args: SelectSubset<T, MediaMetaDataUpsertArgs<ExtArgs>>): Prisma__MediaMetaDataClient<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MediaMetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataCountArgs} args - Arguments to filter MediaMetaData to count.
     * @example
     * // Count the number of MediaMetaData
     * const count = await prisma.mediaMetaData.count({
     *   where: {
     *     // ... the filter for the MediaMetaData we want to count
     *   }
     * })
    **/
    count<T extends MediaMetaDataCountArgs>(
      args?: Subset<T, MediaMetaDataCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MediaMetaDataCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MediaMetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MediaMetaDataAggregateArgs>(args: Subset<T, MediaMetaDataAggregateArgs>): Prisma.PrismaPromise<GetMediaMetaDataAggregateType<T>>

    /**
     * Group by MediaMetaData.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MediaMetaDataGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MediaMetaDataGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MediaMetaDataGroupByArgs['orderBy'] }
        : { orderBy?: MediaMetaDataGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MediaMetaDataGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMediaMetaDataGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MediaMetaData model
   */
  readonly fields: MediaMetaDataFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MediaMetaData.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MediaMetaDataClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    serviceRef<T extends MediaMetaData$serviceRefArgs<ExtArgs> = {}>(args?: Subset<T, MediaMetaData$serviceRefArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MediaMetaData model
   */
  interface MediaMetaDataFieldRefs {
    readonly id: FieldRef<"MediaMetaData", 'Int'>
    readonly publicId: FieldRef<"MediaMetaData", 'String'>
    readonly mediaType: FieldRef<"MediaMetaData", 'MediaType'>
    readonly serviceRefId: FieldRef<"MediaMetaData", 'String'>
    readonly userId: FieldRef<"MediaMetaData", 'String'>
    readonly orphan: FieldRef<"MediaMetaData", 'Boolean'>
    readonly createdAt: FieldRef<"MediaMetaData", 'DateTime'>
    readonly updatedAt: FieldRef<"MediaMetaData", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MediaMetaData findUnique
   */
  export type MediaMetaDataFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter, which MediaMetaData to fetch.
     */
    where: MediaMetaDataWhereUniqueInput
  }

  /**
   * MediaMetaData findUniqueOrThrow
   */
  export type MediaMetaDataFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter, which MediaMetaData to fetch.
     */
    where: MediaMetaDataWhereUniqueInput
  }

  /**
   * MediaMetaData findFirst
   */
  export type MediaMetaDataFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter, which MediaMetaData to fetch.
     */
    where?: MediaMetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaMetaData to fetch.
     */
    orderBy?: MediaMetaDataOrderByWithRelationInput | MediaMetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaMetaData.
     */
    cursor?: MediaMetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaMetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaMetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaMetaData.
     */
    distinct?: MediaMetaDataScalarFieldEnum | MediaMetaDataScalarFieldEnum[]
  }

  /**
   * MediaMetaData findFirstOrThrow
   */
  export type MediaMetaDataFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter, which MediaMetaData to fetch.
     */
    where?: MediaMetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaMetaData to fetch.
     */
    orderBy?: MediaMetaDataOrderByWithRelationInput | MediaMetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MediaMetaData.
     */
    cursor?: MediaMetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaMetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaMetaData.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MediaMetaData.
     */
    distinct?: MediaMetaDataScalarFieldEnum | MediaMetaDataScalarFieldEnum[]
  }

  /**
   * MediaMetaData findMany
   */
  export type MediaMetaDataFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter, which MediaMetaData to fetch.
     */
    where?: MediaMetaDataWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MediaMetaData to fetch.
     */
    orderBy?: MediaMetaDataOrderByWithRelationInput | MediaMetaDataOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MediaMetaData.
     */
    cursor?: MediaMetaDataWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MediaMetaData from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MediaMetaData.
     */
    skip?: number
    distinct?: MediaMetaDataScalarFieldEnum | MediaMetaDataScalarFieldEnum[]
  }

  /**
   * MediaMetaData create
   */
  export type MediaMetaDataCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * The data needed to create a MediaMetaData.
     */
    data: XOR<MediaMetaDataCreateInput, MediaMetaDataUncheckedCreateInput>
  }

  /**
   * MediaMetaData createMany
   */
  export type MediaMetaDataCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MediaMetaData.
     */
    data: MediaMetaDataCreateManyInput | MediaMetaDataCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MediaMetaData createManyAndReturn
   */
  export type MediaMetaDataCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * The data used to create many MediaMetaData.
     */
    data: MediaMetaDataCreateManyInput | MediaMetaDataCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaMetaData update
   */
  export type MediaMetaDataUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * The data needed to update a MediaMetaData.
     */
    data: XOR<MediaMetaDataUpdateInput, MediaMetaDataUncheckedUpdateInput>
    /**
     * Choose, which MediaMetaData to update.
     */
    where: MediaMetaDataWhereUniqueInput
  }

  /**
   * MediaMetaData updateMany
   */
  export type MediaMetaDataUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MediaMetaData.
     */
    data: XOR<MediaMetaDataUpdateManyMutationInput, MediaMetaDataUncheckedUpdateManyInput>
    /**
     * Filter which MediaMetaData to update
     */
    where?: MediaMetaDataWhereInput
    /**
     * Limit how many MediaMetaData to update.
     */
    limit?: number
  }

  /**
   * MediaMetaData updateManyAndReturn
   */
  export type MediaMetaDataUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * The data used to update MediaMetaData.
     */
    data: XOR<MediaMetaDataUpdateManyMutationInput, MediaMetaDataUncheckedUpdateManyInput>
    /**
     * Filter which MediaMetaData to update
     */
    where?: MediaMetaDataWhereInput
    /**
     * Limit how many MediaMetaData to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * MediaMetaData upsert
   */
  export type MediaMetaDataUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * The filter to search for the MediaMetaData to update in case it exists.
     */
    where: MediaMetaDataWhereUniqueInput
    /**
     * In case the MediaMetaData found by the `where` argument doesn't exist, create a new MediaMetaData with this data.
     */
    create: XOR<MediaMetaDataCreateInput, MediaMetaDataUncheckedCreateInput>
    /**
     * In case the MediaMetaData was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MediaMetaDataUpdateInput, MediaMetaDataUncheckedUpdateInput>
  }

  /**
   * MediaMetaData delete
   */
  export type MediaMetaDataDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    /**
     * Filter which MediaMetaData to delete.
     */
    where: MediaMetaDataWhereUniqueInput
  }

  /**
   * MediaMetaData deleteMany
   */
  export type MediaMetaDataDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MediaMetaData to delete
     */
    where?: MediaMetaDataWhereInput
    /**
     * Limit how many MediaMetaData to delete.
     */
    limit?: number
  }

  /**
   * MediaMetaData.serviceRef
   */
  export type MediaMetaData$serviceRefArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    where?: ServiceRefWhereInput
  }

  /**
   * MediaMetaData without action
   */
  export type MediaMetaDataDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
  }


  /**
   * Model FcmToken
   */

  export type AggregateFcmToken = {
    _count: FcmTokenCountAggregateOutputType | null
    _min: FcmTokenMinAggregateOutputType | null
    _max: FcmTokenMaxAggregateOutputType | null
  }

  export type FcmTokenMinAggregateOutputType = {
    userId: string | null
    token: string | null
    createdAt: Date | null
    type: $Enums.TokenType | null
    updatedAt: Date | null
  }

  export type FcmTokenMaxAggregateOutputType = {
    userId: string | null
    token: string | null
    createdAt: Date | null
    type: $Enums.TokenType | null
    updatedAt: Date | null
  }

  export type FcmTokenCountAggregateOutputType = {
    userId: number
    token: number
    createdAt: number
    type: number
    updatedAt: number
    _all: number
  }


  export type FcmTokenMinAggregateInputType = {
    userId?: true
    token?: true
    createdAt?: true
    type?: true
    updatedAt?: true
  }

  export type FcmTokenMaxAggregateInputType = {
    userId?: true
    token?: true
    createdAt?: true
    type?: true
    updatedAt?: true
  }

  export type FcmTokenCountAggregateInputType = {
    userId?: true
    token?: true
    createdAt?: true
    type?: true
    updatedAt?: true
    _all?: true
  }

  export type FcmTokenAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FcmToken to aggregate.
     */
    where?: FcmTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FcmTokens to fetch.
     */
    orderBy?: FcmTokenOrderByWithRelationInput | FcmTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: FcmTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FcmTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FcmTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned FcmTokens
    **/
    _count?: true | FcmTokenCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FcmTokenMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FcmTokenMaxAggregateInputType
  }

  export type GetFcmTokenAggregateType<T extends FcmTokenAggregateArgs> = {
        [P in keyof T & keyof AggregateFcmToken]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFcmToken[P]>
      : GetScalarType<T[P], AggregateFcmToken[P]>
  }




  export type FcmTokenGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: FcmTokenWhereInput
    orderBy?: FcmTokenOrderByWithAggregationInput | FcmTokenOrderByWithAggregationInput[]
    by: FcmTokenScalarFieldEnum[] | FcmTokenScalarFieldEnum
    having?: FcmTokenScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FcmTokenCountAggregateInputType | true
    _min?: FcmTokenMinAggregateInputType
    _max?: FcmTokenMaxAggregateInputType
  }

  export type FcmTokenGroupByOutputType = {
    userId: string | null
    token: string
    createdAt: Date
    type: $Enums.TokenType
    updatedAt: Date
    _count: FcmTokenCountAggregateOutputType | null
    _min: FcmTokenMinAggregateOutputType | null
    _max: FcmTokenMaxAggregateOutputType | null
  }

  type GetFcmTokenGroupByPayload<T extends FcmTokenGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FcmTokenGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FcmTokenGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FcmTokenGroupByOutputType[P]>
            : GetScalarType<T[P], FcmTokenGroupByOutputType[P]>
        }
      >
    >


  export type FcmTokenSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    token?: boolean
    createdAt?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["fcmToken"]>

  export type FcmTokenSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    token?: boolean
    createdAt?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["fcmToken"]>

  export type FcmTokenSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    userId?: boolean
    token?: boolean
    createdAt?: boolean
    type?: boolean
    updatedAt?: boolean
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }, ExtArgs["result"]["fcmToken"]>

  export type FcmTokenSelectScalar = {
    userId?: boolean
    token?: boolean
    createdAt?: boolean
    type?: boolean
    updatedAt?: boolean
  }

  export type FcmTokenOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"userId" | "token" | "createdAt" | "type" | "updatedAt", ExtArgs["result"]["fcmToken"]>
  export type FcmTokenInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }
  export type FcmTokenIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }
  export type FcmTokenIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | FcmToken$userArgs<ExtArgs>
  }

  export type $FcmTokenPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "FcmToken"
    objects: {
      user: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      userId: string | null
      token: string
      createdAt: Date
      type: $Enums.TokenType
      updatedAt: Date
    }, ExtArgs["result"]["fcmToken"]>
    composites: {}
  }

  type FcmTokenGetPayload<S extends boolean | null | undefined | FcmTokenDefaultArgs> = $Result.GetResult<Prisma.$FcmTokenPayload, S>

  type FcmTokenCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<FcmTokenFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FcmTokenCountAggregateInputType | true
    }

  export interface FcmTokenDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['FcmToken'], meta: { name: 'FcmToken' } }
    /**
     * Find zero or one FcmToken that matches the filter.
     * @param {FcmTokenFindUniqueArgs} args - Arguments to find a FcmToken
     * @example
     * // Get one FcmToken
     * const fcmToken = await prisma.fcmToken.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends FcmTokenFindUniqueArgs>(args: SelectSubset<T, FcmTokenFindUniqueArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one FcmToken that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {FcmTokenFindUniqueOrThrowArgs} args - Arguments to find a FcmToken
     * @example
     * // Get one FcmToken
     * const fcmToken = await prisma.fcmToken.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends FcmTokenFindUniqueOrThrowArgs>(args: SelectSubset<T, FcmTokenFindUniqueOrThrowArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FcmToken that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenFindFirstArgs} args - Arguments to find a FcmToken
     * @example
     * // Get one FcmToken
     * const fcmToken = await prisma.fcmToken.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends FcmTokenFindFirstArgs>(args?: SelectSubset<T, FcmTokenFindFirstArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first FcmToken that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenFindFirstOrThrowArgs} args - Arguments to find a FcmToken
     * @example
     * // Get one FcmToken
     * const fcmToken = await prisma.fcmToken.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends FcmTokenFindFirstOrThrowArgs>(args?: SelectSubset<T, FcmTokenFindFirstOrThrowArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more FcmTokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all FcmTokens
     * const fcmTokens = await prisma.fcmToken.findMany()
     * 
     * // Get first 10 FcmTokens
     * const fcmTokens = await prisma.fcmToken.findMany({ take: 10 })
     * 
     * // Only select the `userId`
     * const fcmTokenWithUserIdOnly = await prisma.fcmToken.findMany({ select: { userId: true } })
     * 
     */
    findMany<T extends FcmTokenFindManyArgs>(args?: SelectSubset<T, FcmTokenFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a FcmToken.
     * @param {FcmTokenCreateArgs} args - Arguments to create a FcmToken.
     * @example
     * // Create one FcmToken
     * const FcmToken = await prisma.fcmToken.create({
     *   data: {
     *     // ... data to create a FcmToken
     *   }
     * })
     * 
     */
    create<T extends FcmTokenCreateArgs>(args: SelectSubset<T, FcmTokenCreateArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many FcmTokens.
     * @param {FcmTokenCreateManyArgs} args - Arguments to create many FcmTokens.
     * @example
     * // Create many FcmTokens
     * const fcmToken = await prisma.fcmToken.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends FcmTokenCreateManyArgs>(args?: SelectSubset<T, FcmTokenCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many FcmTokens and returns the data saved in the database.
     * @param {FcmTokenCreateManyAndReturnArgs} args - Arguments to create many FcmTokens.
     * @example
     * // Create many FcmTokens
     * const fcmToken = await prisma.fcmToken.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many FcmTokens and only return the `userId`
     * const fcmTokenWithUserIdOnly = await prisma.fcmToken.createManyAndReturn({
     *   select: { userId: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends FcmTokenCreateManyAndReturnArgs>(args?: SelectSubset<T, FcmTokenCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a FcmToken.
     * @param {FcmTokenDeleteArgs} args - Arguments to delete one FcmToken.
     * @example
     * // Delete one FcmToken
     * const FcmToken = await prisma.fcmToken.delete({
     *   where: {
     *     // ... filter to delete one FcmToken
     *   }
     * })
     * 
     */
    delete<T extends FcmTokenDeleteArgs>(args: SelectSubset<T, FcmTokenDeleteArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one FcmToken.
     * @param {FcmTokenUpdateArgs} args - Arguments to update one FcmToken.
     * @example
     * // Update one FcmToken
     * const fcmToken = await prisma.fcmToken.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends FcmTokenUpdateArgs>(args: SelectSubset<T, FcmTokenUpdateArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more FcmTokens.
     * @param {FcmTokenDeleteManyArgs} args - Arguments to filter FcmTokens to delete.
     * @example
     * // Delete a few FcmTokens
     * const { count } = await prisma.fcmToken.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends FcmTokenDeleteManyArgs>(args?: SelectSubset<T, FcmTokenDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FcmTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many FcmTokens
     * const fcmToken = await prisma.fcmToken.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends FcmTokenUpdateManyArgs>(args: SelectSubset<T, FcmTokenUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more FcmTokens and returns the data updated in the database.
     * @param {FcmTokenUpdateManyAndReturnArgs} args - Arguments to update many FcmTokens.
     * @example
     * // Update many FcmTokens
     * const fcmToken = await prisma.fcmToken.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more FcmTokens and only return the `userId`
     * const fcmTokenWithUserIdOnly = await prisma.fcmToken.updateManyAndReturn({
     *   select: { userId: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends FcmTokenUpdateManyAndReturnArgs>(args: SelectSubset<T, FcmTokenUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one FcmToken.
     * @param {FcmTokenUpsertArgs} args - Arguments to update or create a FcmToken.
     * @example
     * // Update or create a FcmToken
     * const fcmToken = await prisma.fcmToken.upsert({
     *   create: {
     *     // ... data to create a FcmToken
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the FcmToken we want to update
     *   }
     * })
     */
    upsert<T extends FcmTokenUpsertArgs>(args: SelectSubset<T, FcmTokenUpsertArgs<ExtArgs>>): Prisma__FcmTokenClient<$Result.GetResult<Prisma.$FcmTokenPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of FcmTokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenCountArgs} args - Arguments to filter FcmTokens to count.
     * @example
     * // Count the number of FcmTokens
     * const count = await prisma.fcmToken.count({
     *   where: {
     *     // ... the filter for the FcmTokens we want to count
     *   }
     * })
    **/
    count<T extends FcmTokenCountArgs>(
      args?: Subset<T, FcmTokenCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FcmTokenCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a FcmToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FcmTokenAggregateArgs>(args: Subset<T, FcmTokenAggregateArgs>): Prisma.PrismaPromise<GetFcmTokenAggregateType<T>>

    /**
     * Group by FcmToken.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FcmTokenGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends FcmTokenGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: FcmTokenGroupByArgs['orderBy'] }
        : { orderBy?: FcmTokenGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, FcmTokenGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFcmTokenGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the FcmToken model
   */
  readonly fields: FcmTokenFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for FcmToken.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__FcmTokenClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends FcmToken$userArgs<ExtArgs> = {}>(args?: Subset<T, FcmToken$userArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the FcmToken model
   */
  interface FcmTokenFieldRefs {
    readonly userId: FieldRef<"FcmToken", 'String'>
    readonly token: FieldRef<"FcmToken", 'String'>
    readonly createdAt: FieldRef<"FcmToken", 'DateTime'>
    readonly type: FieldRef<"FcmToken", 'TokenType'>
    readonly updatedAt: FieldRef<"FcmToken", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * FcmToken findUnique
   */
  export type FcmTokenFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter, which FcmToken to fetch.
     */
    where: FcmTokenWhereUniqueInput
  }

  /**
   * FcmToken findUniqueOrThrow
   */
  export type FcmTokenFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter, which FcmToken to fetch.
     */
    where: FcmTokenWhereUniqueInput
  }

  /**
   * FcmToken findFirst
   */
  export type FcmTokenFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter, which FcmToken to fetch.
     */
    where?: FcmTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FcmTokens to fetch.
     */
    orderBy?: FcmTokenOrderByWithRelationInput | FcmTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FcmTokens.
     */
    cursor?: FcmTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FcmTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FcmTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FcmTokens.
     */
    distinct?: FcmTokenScalarFieldEnum | FcmTokenScalarFieldEnum[]
  }

  /**
   * FcmToken findFirstOrThrow
   */
  export type FcmTokenFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter, which FcmToken to fetch.
     */
    where?: FcmTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FcmTokens to fetch.
     */
    orderBy?: FcmTokenOrderByWithRelationInput | FcmTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for FcmTokens.
     */
    cursor?: FcmTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FcmTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FcmTokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of FcmTokens.
     */
    distinct?: FcmTokenScalarFieldEnum | FcmTokenScalarFieldEnum[]
  }

  /**
   * FcmToken findMany
   */
  export type FcmTokenFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter, which FcmTokens to fetch.
     */
    where?: FcmTokenWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of FcmTokens to fetch.
     */
    orderBy?: FcmTokenOrderByWithRelationInput | FcmTokenOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing FcmTokens.
     */
    cursor?: FcmTokenWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` FcmTokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` FcmTokens.
     */
    skip?: number
    distinct?: FcmTokenScalarFieldEnum | FcmTokenScalarFieldEnum[]
  }

  /**
   * FcmToken create
   */
  export type FcmTokenCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * The data needed to create a FcmToken.
     */
    data: XOR<FcmTokenCreateInput, FcmTokenUncheckedCreateInput>
  }

  /**
   * FcmToken createMany
   */
  export type FcmTokenCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many FcmTokens.
     */
    data: FcmTokenCreateManyInput | FcmTokenCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * FcmToken createManyAndReturn
   */
  export type FcmTokenCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * The data used to create many FcmTokens.
     */
    data: FcmTokenCreateManyInput | FcmTokenCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * FcmToken update
   */
  export type FcmTokenUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * The data needed to update a FcmToken.
     */
    data: XOR<FcmTokenUpdateInput, FcmTokenUncheckedUpdateInput>
    /**
     * Choose, which FcmToken to update.
     */
    where: FcmTokenWhereUniqueInput
  }

  /**
   * FcmToken updateMany
   */
  export type FcmTokenUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update FcmTokens.
     */
    data: XOR<FcmTokenUpdateManyMutationInput, FcmTokenUncheckedUpdateManyInput>
    /**
     * Filter which FcmTokens to update
     */
    where?: FcmTokenWhereInput
    /**
     * Limit how many FcmTokens to update.
     */
    limit?: number
  }

  /**
   * FcmToken updateManyAndReturn
   */
  export type FcmTokenUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * The data used to update FcmTokens.
     */
    data: XOR<FcmTokenUpdateManyMutationInput, FcmTokenUncheckedUpdateManyInput>
    /**
     * Filter which FcmTokens to update
     */
    where?: FcmTokenWhereInput
    /**
     * Limit how many FcmTokens to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * FcmToken upsert
   */
  export type FcmTokenUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * The filter to search for the FcmToken to update in case it exists.
     */
    where: FcmTokenWhereUniqueInput
    /**
     * In case the FcmToken found by the `where` argument doesn't exist, create a new FcmToken with this data.
     */
    create: XOR<FcmTokenCreateInput, FcmTokenUncheckedCreateInput>
    /**
     * In case the FcmToken was found with the provided `where` argument, update it with this data.
     */
    update: XOR<FcmTokenUpdateInput, FcmTokenUncheckedUpdateInput>
  }

  /**
   * FcmToken delete
   */
  export type FcmTokenDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
    /**
     * Filter which FcmToken to delete.
     */
    where: FcmTokenWhereUniqueInput
  }

  /**
   * FcmToken deleteMany
   */
  export type FcmTokenDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which FcmTokens to delete
     */
    where?: FcmTokenWhereInput
    /**
     * Limit how many FcmTokens to delete.
     */
    limit?: number
  }

  /**
   * FcmToken.user
   */
  export type FcmToken$userArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * FcmToken without action
   */
  export type FcmTokenDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FcmToken
     */
    select?: FcmTokenSelect<ExtArgs> | null
    /**
     * Omit specific fields from the FcmToken
     */
    omit?: FcmTokenOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: FcmTokenInclude<ExtArgs> | null
  }


  /**
   * Model ServiceRef
   */

  export type AggregateServiceRef = {
    _count: ServiceRefCountAggregateOutputType | null
    _min: ServiceRefMinAggregateOutputType | null
    _max: ServiceRefMaxAggregateOutputType | null
  }

  export type ServiceRefMinAggregateOutputType = {
    id: string | null
    type: $Enums.ServiceType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRefMaxAggregateOutputType = {
    id: string | null
    type: $Enums.ServiceType | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceRefCountAggregateOutputType = {
    id: number
    type: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceRefMinAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRefMaxAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceRefCountAggregateInputType = {
    id?: true
    type?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceRefAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRef to aggregate.
     */
    where?: ServiceRefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRefs to fetch.
     */
    orderBy?: ServiceRefOrderByWithRelationInput | ServiceRefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceRefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ServiceRefs
    **/
    _count?: true | ServiceRefCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceRefMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceRefMaxAggregateInputType
  }

  export type GetServiceRefAggregateType<T extends ServiceRefAggregateArgs> = {
        [P in keyof T & keyof AggregateServiceRef]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateServiceRef[P]>
      : GetScalarType<T[P], AggregateServiceRef[P]>
  }




  export type ServiceRefGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceRefWhereInput
    orderBy?: ServiceRefOrderByWithAggregationInput | ServiceRefOrderByWithAggregationInput[]
    by: ServiceRefScalarFieldEnum[] | ServiceRefScalarFieldEnum
    having?: ServiceRefScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceRefCountAggregateInputType | true
    _min?: ServiceRefMinAggregateInputType
    _max?: ServiceRefMaxAggregateInputType
  }

  export type ServiceRefGroupByOutputType = {
    id: string
    type: $Enums.ServiceType
    createdAt: Date
    updatedAt: Date
    _count: ServiceRefCountAggregateOutputType | null
    _min: ServiceRefMinAggregateOutputType | null
    _max: ServiceRefMaxAggregateOutputType | null
  }

  type GetServiceRefGroupByPayload<T extends ServiceRefGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceRefGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceRefGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceRefGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceRefGroupByOutputType[P]>
        }
      >
    >


  export type ServiceRefSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    media?: boolean | ServiceRef$mediaArgs<ExtArgs>
    _count?: boolean | ServiceRefCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["serviceRef"]>

  export type ServiceRefSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceRef"]>

  export type ServiceRefSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["serviceRef"]>

  export type ServiceRefSelectScalar = {
    id?: boolean
    type?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceRefOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "createdAt" | "updatedAt", ExtArgs["result"]["serviceRef"]>
  export type ServiceRefInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    media?: boolean | ServiceRef$mediaArgs<ExtArgs>
    _count?: boolean | ServiceRefCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ServiceRefIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ServiceRefIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ServiceRefPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ServiceRef"
    objects: {
      media: Prisma.$MediaMetaDataPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: $Enums.ServiceType
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["serviceRef"]>
    composites: {}
  }

  type ServiceRefGetPayload<S extends boolean | null | undefined | ServiceRefDefaultArgs> = $Result.GetResult<Prisma.$ServiceRefPayload, S>

  type ServiceRefCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceRefFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceRefCountAggregateInputType | true
    }

  export interface ServiceRefDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ServiceRef'], meta: { name: 'ServiceRef' } }
    /**
     * Find zero or one ServiceRef that matches the filter.
     * @param {ServiceRefFindUniqueArgs} args - Arguments to find a ServiceRef
     * @example
     * // Get one ServiceRef
     * const serviceRef = await prisma.serviceRef.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceRefFindUniqueArgs>(args: SelectSubset<T, ServiceRefFindUniqueArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ServiceRef that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceRefFindUniqueOrThrowArgs} args - Arguments to find a ServiceRef
     * @example
     * // Get one ServiceRef
     * const serviceRef = await prisma.serviceRef.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceRefFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceRefFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRef that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefFindFirstArgs} args - Arguments to find a ServiceRef
     * @example
     * // Get one ServiceRef
     * const serviceRef = await prisma.serviceRef.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceRefFindFirstArgs>(args?: SelectSubset<T, ServiceRefFindFirstArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ServiceRef that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefFindFirstOrThrowArgs} args - Arguments to find a ServiceRef
     * @example
     * // Get one ServiceRef
     * const serviceRef = await prisma.serviceRef.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceRefFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceRefFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ServiceRefs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ServiceRefs
     * const serviceRefs = await prisma.serviceRef.findMany()
     * 
     * // Get first 10 ServiceRefs
     * const serviceRefs = await prisma.serviceRef.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceRefWithIdOnly = await prisma.serviceRef.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceRefFindManyArgs>(args?: SelectSubset<T, ServiceRefFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ServiceRef.
     * @param {ServiceRefCreateArgs} args - Arguments to create a ServiceRef.
     * @example
     * // Create one ServiceRef
     * const ServiceRef = await prisma.serviceRef.create({
     *   data: {
     *     // ... data to create a ServiceRef
     *   }
     * })
     * 
     */
    create<T extends ServiceRefCreateArgs>(args: SelectSubset<T, ServiceRefCreateArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ServiceRefs.
     * @param {ServiceRefCreateManyArgs} args - Arguments to create many ServiceRefs.
     * @example
     * // Create many ServiceRefs
     * const serviceRef = await prisma.serviceRef.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceRefCreateManyArgs>(args?: SelectSubset<T, ServiceRefCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many ServiceRefs and returns the data saved in the database.
     * @param {ServiceRefCreateManyAndReturnArgs} args - Arguments to create many ServiceRefs.
     * @example
     * // Create many ServiceRefs
     * const serviceRef = await prisma.serviceRef.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many ServiceRefs and only return the `id`
     * const serviceRefWithIdOnly = await prisma.serviceRef.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ServiceRefCreateManyAndReturnArgs>(args?: SelectSubset<T, ServiceRefCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a ServiceRef.
     * @param {ServiceRefDeleteArgs} args - Arguments to delete one ServiceRef.
     * @example
     * // Delete one ServiceRef
     * const ServiceRef = await prisma.serviceRef.delete({
     *   where: {
     *     // ... filter to delete one ServiceRef
     *   }
     * })
     * 
     */
    delete<T extends ServiceRefDeleteArgs>(args: SelectSubset<T, ServiceRefDeleteArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ServiceRef.
     * @param {ServiceRefUpdateArgs} args - Arguments to update one ServiceRef.
     * @example
     * // Update one ServiceRef
     * const serviceRef = await prisma.serviceRef.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceRefUpdateArgs>(args: SelectSubset<T, ServiceRefUpdateArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ServiceRefs.
     * @param {ServiceRefDeleteManyArgs} args - Arguments to filter ServiceRefs to delete.
     * @example
     * // Delete a few ServiceRefs
     * const { count } = await prisma.serviceRef.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceRefDeleteManyArgs>(args?: SelectSubset<T, ServiceRefDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ServiceRefs
     * const serviceRef = await prisma.serviceRef.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceRefUpdateManyArgs>(args: SelectSubset<T, ServiceRefUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ServiceRefs and returns the data updated in the database.
     * @param {ServiceRefUpdateManyAndReturnArgs} args - Arguments to update many ServiceRefs.
     * @example
     * // Update many ServiceRefs
     * const serviceRef = await prisma.serviceRef.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more ServiceRefs and only return the `id`
     * const serviceRefWithIdOnly = await prisma.serviceRef.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ServiceRefUpdateManyAndReturnArgs>(args: SelectSubset<T, ServiceRefUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one ServiceRef.
     * @param {ServiceRefUpsertArgs} args - Arguments to update or create a ServiceRef.
     * @example
     * // Update or create a ServiceRef
     * const serviceRef = await prisma.serviceRef.upsert({
     *   create: {
     *     // ... data to create a ServiceRef
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ServiceRef we want to update
     *   }
     * })
     */
    upsert<T extends ServiceRefUpsertArgs>(args: SelectSubset<T, ServiceRefUpsertArgs<ExtArgs>>): Prisma__ServiceRefClient<$Result.GetResult<Prisma.$ServiceRefPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ServiceRefs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefCountArgs} args - Arguments to filter ServiceRefs to count.
     * @example
     * // Count the number of ServiceRefs
     * const count = await prisma.serviceRef.count({
     *   where: {
     *     // ... the filter for the ServiceRefs we want to count
     *   }
     * })
    **/
    count<T extends ServiceRefCountArgs>(
      args?: Subset<T, ServiceRefCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceRefCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ServiceRef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceRefAggregateArgs>(args: Subset<T, ServiceRefAggregateArgs>): Prisma.PrismaPromise<GetServiceRefAggregateType<T>>

    /**
     * Group by ServiceRef.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceRefGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceRefGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceRefGroupByArgs['orderBy'] }
        : { orderBy?: ServiceRefGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceRefGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceRefGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ServiceRef model
   */
  readonly fields: ServiceRefFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ServiceRef.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceRefClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    media<T extends ServiceRef$mediaArgs<ExtArgs> = {}>(args?: Subset<T, ServiceRef$mediaArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MediaMetaDataPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ServiceRef model
   */
  interface ServiceRefFieldRefs {
    readonly id: FieldRef<"ServiceRef", 'String'>
    readonly type: FieldRef<"ServiceRef", 'ServiceType'>
    readonly createdAt: FieldRef<"ServiceRef", 'DateTime'>
    readonly updatedAt: FieldRef<"ServiceRef", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * ServiceRef findUnique
   */
  export type ServiceRefFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRef to fetch.
     */
    where: ServiceRefWhereUniqueInput
  }

  /**
   * ServiceRef findUniqueOrThrow
   */
  export type ServiceRefFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRef to fetch.
     */
    where: ServiceRefWhereUniqueInput
  }

  /**
   * ServiceRef findFirst
   */
  export type ServiceRefFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRef to fetch.
     */
    where?: ServiceRefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRefs to fetch.
     */
    orderBy?: ServiceRefOrderByWithRelationInput | ServiceRefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRefs.
     */
    cursor?: ServiceRefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRefs.
     */
    distinct?: ServiceRefScalarFieldEnum | ServiceRefScalarFieldEnum[]
  }

  /**
   * ServiceRef findFirstOrThrow
   */
  export type ServiceRefFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRef to fetch.
     */
    where?: ServiceRefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRefs to fetch.
     */
    orderBy?: ServiceRefOrderByWithRelationInput | ServiceRefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ServiceRefs.
     */
    cursor?: ServiceRefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRefs.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ServiceRefs.
     */
    distinct?: ServiceRefScalarFieldEnum | ServiceRefScalarFieldEnum[]
  }

  /**
   * ServiceRef findMany
   */
  export type ServiceRefFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter, which ServiceRefs to fetch.
     */
    where?: ServiceRefWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ServiceRefs to fetch.
     */
    orderBy?: ServiceRefOrderByWithRelationInput | ServiceRefOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ServiceRefs.
     */
    cursor?: ServiceRefWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ServiceRefs from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ServiceRefs.
     */
    skip?: number
    distinct?: ServiceRefScalarFieldEnum | ServiceRefScalarFieldEnum[]
  }

  /**
   * ServiceRef create
   */
  export type ServiceRefCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * The data needed to create a ServiceRef.
     */
    data: XOR<ServiceRefCreateInput, ServiceRefUncheckedCreateInput>
  }

  /**
   * ServiceRef createMany
   */
  export type ServiceRefCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ServiceRefs.
     */
    data: ServiceRefCreateManyInput | ServiceRefCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceRef createManyAndReturn
   */
  export type ServiceRefCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * The data used to create many ServiceRefs.
     */
    data: ServiceRefCreateManyInput | ServiceRefCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ServiceRef update
   */
  export type ServiceRefUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * The data needed to update a ServiceRef.
     */
    data: XOR<ServiceRefUpdateInput, ServiceRefUncheckedUpdateInput>
    /**
     * Choose, which ServiceRef to update.
     */
    where: ServiceRefWhereUniqueInput
  }

  /**
   * ServiceRef updateMany
   */
  export type ServiceRefUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ServiceRefs.
     */
    data: XOR<ServiceRefUpdateManyMutationInput, ServiceRefUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRefs to update
     */
    where?: ServiceRefWhereInput
    /**
     * Limit how many ServiceRefs to update.
     */
    limit?: number
  }

  /**
   * ServiceRef updateManyAndReturn
   */
  export type ServiceRefUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * The data used to update ServiceRefs.
     */
    data: XOR<ServiceRefUpdateManyMutationInput, ServiceRefUncheckedUpdateManyInput>
    /**
     * Filter which ServiceRefs to update
     */
    where?: ServiceRefWhereInput
    /**
     * Limit how many ServiceRefs to update.
     */
    limit?: number
  }

  /**
   * ServiceRef upsert
   */
  export type ServiceRefUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * The filter to search for the ServiceRef to update in case it exists.
     */
    where: ServiceRefWhereUniqueInput
    /**
     * In case the ServiceRef found by the `where` argument doesn't exist, create a new ServiceRef with this data.
     */
    create: XOR<ServiceRefCreateInput, ServiceRefUncheckedCreateInput>
    /**
     * In case the ServiceRef was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceRefUpdateInput, ServiceRefUncheckedUpdateInput>
  }

  /**
   * ServiceRef delete
   */
  export type ServiceRefDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
    /**
     * Filter which ServiceRef to delete.
     */
    where: ServiceRefWhereUniqueInput
  }

  /**
   * ServiceRef deleteMany
   */
  export type ServiceRefDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ServiceRefs to delete
     */
    where?: ServiceRefWhereInput
    /**
     * Limit how many ServiceRefs to delete.
     */
    limit?: number
  }

  /**
   * ServiceRef.media
   */
  export type ServiceRef$mediaArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MediaMetaData
     */
    select?: MediaMetaDataSelect<ExtArgs> | null
    /**
     * Omit specific fields from the MediaMetaData
     */
    omit?: MediaMetaDataOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MediaMetaDataInclude<ExtArgs> | null
    where?: MediaMetaDataWhereInput
    orderBy?: MediaMetaDataOrderByWithRelationInput | MediaMetaDataOrderByWithRelationInput[]
    cursor?: MediaMetaDataWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MediaMetaDataScalarFieldEnum | MediaMetaDataScalarFieldEnum[]
  }

  /**
   * ServiceRef without action
   */
  export type ServiceRefDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceRef
     */
    select?: ServiceRefSelect<ExtArgs> | null
    /**
     * Omit specific fields from the ServiceRef
     */
    omit?: ServiceRefOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceRefInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    email: 'email',
    role: 'role',
    tagline: 'tagline',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const UserProfileScalarFieldEnum: {
    id: 'id',
    bio: 'bio',
    image: 'image',
    location: 'location',
    website: 'website',
    followers: 'followers',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    about: 'about',
    focus: 'focus',
    tags: 'tags'
  };

  export type UserProfileScalarFieldEnum = (typeof UserProfileScalarFieldEnum)[keyof typeof UserProfileScalarFieldEnum]


  export const UserSocialLinkScalarFieldEnum: {
    id: 'id',
    platform: 'platform',
    url: 'url',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserSocialLinkScalarFieldEnum = (typeof UserSocialLinkScalarFieldEnum)[keyof typeof UserSocialLinkScalarFieldEnum]


  export const PostActionsScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    postId: 'postId',
    likeStatus: 'likeStatus',
    bookmarkStatus: 'bookmarkStatus',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostActionsScalarFieldEnum = (typeof PostActionsScalarFieldEnum)[keyof typeof PostActionsScalarFieldEnum]


  export const PostScalarFieldEnum: {
    id: 'id',
    title: 'title',
    excerpt: 'excerpt',
    category: 'category',
    readTime: 'readTime',
    content: 'content',
    authorId: 'authorId',
    thumbnail: 'thumbnail',
    authorImage: 'authorImage',
    coverImage: 'coverImage',
    trending: 'trending',
    featured: 'featured',
    likes: 'likes',
    views: 'views',
    bookmarks: 'bookmarks',
    downloads: 'downloads',
    referenceStatus: 'referenceStatus',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PostScalarFieldEnum = (typeof PostScalarFieldEnum)[keyof typeof PostScalarFieldEnum]


  export const MediaMetaDataScalarFieldEnum: {
    id: 'id',
    publicId: 'publicId',
    mediaType: 'mediaType',
    serviceRefId: 'serviceRefId',
    userId: 'userId',
    orphan: 'orphan',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type MediaMetaDataScalarFieldEnum = (typeof MediaMetaDataScalarFieldEnum)[keyof typeof MediaMetaDataScalarFieldEnum]


  export const FcmTokenScalarFieldEnum: {
    userId: 'userId',
    token: 'token',
    createdAt: 'createdAt',
    type: 'type',
    updatedAt: 'updatedAt'
  };

  export type FcmTokenScalarFieldEnum = (typeof FcmTokenScalarFieldEnum)[keyof typeof FcmTokenScalarFieldEnum]


  export const ServiceRefScalarFieldEnum: {
    id: 'id',
    type: 'type',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceRefScalarFieldEnum = (typeof ServiceRefScalarFieldEnum)[keyof typeof ServiceRefScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'PostStatus'
   */
  export type EnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus'>
    


  /**
   * Reference to a field of type 'PostStatus[]'
   */
  export type ListEnumPostStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'PostStatus[]'>
    


  /**
   * Reference to a field of type 'MediaType'
   */
  export type EnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType'>
    


  /**
   * Reference to a field of type 'MediaType[]'
   */
  export type ListEnumMediaTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'MediaType[]'>
    


  /**
   * Reference to a field of type 'TokenType'
   */
  export type EnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType'>
    


  /**
   * Reference to a field of type 'TokenType[]'
   */
  export type ListEnumTokenTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'TokenType[]'>
    


  /**
   * Reference to a field of type 'ServiceType'
   */
  export type EnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType'>
    


  /**
   * Reference to a field of type 'ServiceType[]'
   */
  export type ListEnumServiceTypeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceType[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tagline?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Posts?: PostListRelationFilter
    PostActions?: PostActionsListRelationFilter
    fcmToken?: XOR<FcmTokenNullableScalarRelationFilter, FcmTokenWhereInput> | null
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    role?: SortOrder
    tagline?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    Posts?: PostOrderByRelationAggregateInput
    PostActions?: PostActionsOrderByRelationAggregateInput
    fcmToken?: FcmTokenOrderByWithRelationInput
    profile?: UserProfileOrderByWithRelationInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringFilter<"User"> | string
    lastName?: StringFilter<"User"> | string
    role?: EnumRoleFilter<"User"> | $Enums.Role
    tagline?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    Posts?: PostListRelationFilter
    PostActions?: PostActionsListRelationFilter
    fcmToken?: XOR<FcmTokenNullableScalarRelationFilter, FcmTokenWhereInput> | null
    profile?: XOR<UserProfileNullableScalarRelationFilter, UserProfileWhereInput> | null
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    role?: SortOrder
    tagline?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringWithAggregatesFilter<"User"> | string
    lastName?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    role?: EnumRoleWithAggregatesFilter<"User"> | $Enums.Role
    tagline?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type UserProfileWhereInput = {
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    id?: StringFilter<"UserProfile"> | string
    bio?: StringNullableFilter<"UserProfile"> | string | null
    image?: StringNullableFilter<"UserProfile"> | string | null
    location?: StringNullableFilter<"UserProfile"> | string | null
    website?: StringNullableFilter<"UserProfile"> | string | null
    followers?: IntFilter<"UserProfile"> | number
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    about?: StringNullableFilter<"UserProfile"> | string | null
    focus?: StringNullableFilter<"UserProfile"> | string | null
    tags?: StringNullableListFilter<"UserProfile">
    socialLinks?: UserSocialLinkListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type UserProfileOrderByWithRelationInput = {
    id?: SortOrder
    bio?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    about?: SortOrderInput | SortOrder
    focus?: SortOrderInput | SortOrder
    tags?: SortOrder
    socialLinks?: UserSocialLinkOrderByRelationAggregateInput
    user?: UserOrderByWithRelationInput
  }

  export type UserProfileWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: UserProfileWhereInput | UserProfileWhereInput[]
    OR?: UserProfileWhereInput[]
    NOT?: UserProfileWhereInput | UserProfileWhereInput[]
    bio?: StringNullableFilter<"UserProfile"> | string | null
    image?: StringNullableFilter<"UserProfile"> | string | null
    location?: StringNullableFilter<"UserProfile"> | string | null
    website?: StringNullableFilter<"UserProfile"> | string | null
    followers?: IntFilter<"UserProfile"> | number
    createdAt?: DateTimeFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeFilter<"UserProfile"> | Date | string
    about?: StringNullableFilter<"UserProfile"> | string | null
    focus?: StringNullableFilter<"UserProfile"> | string | null
    tags?: StringNullableListFilter<"UserProfile">
    socialLinks?: UserSocialLinkListRelationFilter
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type UserProfileOrderByWithAggregationInput = {
    id?: SortOrder
    bio?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    website?: SortOrderInput | SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    about?: SortOrderInput | SortOrder
    focus?: SortOrderInput | SortOrder
    tags?: SortOrder
    _count?: UserProfileCountOrderByAggregateInput
    _avg?: UserProfileAvgOrderByAggregateInput
    _max?: UserProfileMaxOrderByAggregateInput
    _min?: UserProfileMinOrderByAggregateInput
    _sum?: UserProfileSumOrderByAggregateInput
  }

  export type UserProfileScalarWhereWithAggregatesInput = {
    AND?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    OR?: UserProfileScalarWhereWithAggregatesInput[]
    NOT?: UserProfileScalarWhereWithAggregatesInput | UserProfileScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserProfile"> | string
    bio?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    image?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    location?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    website?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    followers?: IntWithAggregatesFilter<"UserProfile"> | number
    createdAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserProfile"> | Date | string
    about?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    focus?: StringNullableWithAggregatesFilter<"UserProfile"> | string | null
    tags?: StringNullableListFilter<"UserProfile">
  }

  export type UserSocialLinkWhereInput = {
    AND?: UserSocialLinkWhereInput | UserSocialLinkWhereInput[]
    OR?: UserSocialLinkWhereInput[]
    NOT?: UserSocialLinkWhereInput | UserSocialLinkWhereInput[]
    id?: StringFilter<"UserSocialLink"> | string
    platform?: StringFilter<"UserSocialLink"> | string
    url?: StringFilter<"UserSocialLink"> | string
    createdAt?: DateTimeFilter<"UserSocialLink"> | Date | string
    updatedAt?: DateTimeFilter<"UserSocialLink"> | Date | string
    profile?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }

  export type UserSocialLinkOrderByWithRelationInput = {
    id?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    profile?: UserProfileOrderByWithRelationInput
  }

  export type UserSocialLinkWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_platform?: UserSocialLinkIdPlatformCompoundUniqueInput
    AND?: UserSocialLinkWhereInput | UserSocialLinkWhereInput[]
    OR?: UserSocialLinkWhereInput[]
    NOT?: UserSocialLinkWhereInput | UserSocialLinkWhereInput[]
    platform?: StringFilter<"UserSocialLink"> | string
    url?: StringFilter<"UserSocialLink"> | string
    createdAt?: DateTimeFilter<"UserSocialLink"> | Date | string
    updatedAt?: DateTimeFilter<"UserSocialLink"> | Date | string
    profile?: XOR<UserProfileScalarRelationFilter, UserProfileWhereInput>
  }, "id" | "id_platform">

  export type UserSocialLinkOrderByWithAggregationInput = {
    id?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserSocialLinkCountOrderByAggregateInput
    _max?: UserSocialLinkMaxOrderByAggregateInput
    _min?: UserSocialLinkMinOrderByAggregateInput
  }

  export type UserSocialLinkScalarWhereWithAggregatesInput = {
    AND?: UserSocialLinkScalarWhereWithAggregatesInput | UserSocialLinkScalarWhereWithAggregatesInput[]
    OR?: UserSocialLinkScalarWhereWithAggregatesInput[]
    NOT?: UserSocialLinkScalarWhereWithAggregatesInput | UserSocialLinkScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"UserSocialLink"> | string
    platform?: StringWithAggregatesFilter<"UserSocialLink"> | string
    url?: StringWithAggregatesFilter<"UserSocialLink"> | string
    createdAt?: DateTimeWithAggregatesFilter<"UserSocialLink"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"UserSocialLink"> | Date | string
  }

  export type PostActionsWhereInput = {
    AND?: PostActionsWhereInput | PostActionsWhereInput[]
    OR?: PostActionsWhereInput[]
    NOT?: PostActionsWhereInput | PostActionsWhereInput[]
    id?: StringFilter<"PostActions"> | string
    userId?: StringFilter<"PostActions"> | string
    postId?: StringFilter<"PostActions"> | string
    likeStatus?: BoolFilter<"PostActions"> | boolean
    bookmarkStatus?: BoolFilter<"PostActions"> | boolean
    createdAt?: DateTimeFilter<"PostActions"> | Date | string
    updatedAt?: DateTimeFilter<"PostActions"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }

  export type PostActionsOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    likeStatus?: SortOrder
    bookmarkStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    post?: PostOrderByWithRelationInput
  }

  export type PostActionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_postId?: PostActionsUserIdPostIdCompoundUniqueInput
    AND?: PostActionsWhereInput | PostActionsWhereInput[]
    OR?: PostActionsWhereInput[]
    NOT?: PostActionsWhereInput | PostActionsWhereInput[]
    userId?: StringFilter<"PostActions"> | string
    postId?: StringFilter<"PostActions"> | string
    likeStatus?: BoolFilter<"PostActions"> | boolean
    bookmarkStatus?: BoolFilter<"PostActions"> | boolean
    createdAt?: DateTimeFilter<"PostActions"> | Date | string
    updatedAt?: DateTimeFilter<"PostActions"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    post?: XOR<PostScalarRelationFilter, PostWhereInput>
  }, "id" | "userId_postId">

  export type PostActionsOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    likeStatus?: SortOrder
    bookmarkStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostActionsCountOrderByAggregateInput
    _max?: PostActionsMaxOrderByAggregateInput
    _min?: PostActionsMinOrderByAggregateInput
  }

  export type PostActionsScalarWhereWithAggregatesInput = {
    AND?: PostActionsScalarWhereWithAggregatesInput | PostActionsScalarWhereWithAggregatesInput[]
    OR?: PostActionsScalarWhereWithAggregatesInput[]
    NOT?: PostActionsScalarWhereWithAggregatesInput | PostActionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PostActions"> | string
    userId?: StringWithAggregatesFilter<"PostActions"> | string
    postId?: StringWithAggregatesFilter<"PostActions"> | string
    likeStatus?: BoolWithAggregatesFilter<"PostActions"> | boolean
    bookmarkStatus?: BoolWithAggregatesFilter<"PostActions"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"PostActions"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PostActions"> | Date | string
  }

  export type PostWhereInput = {
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    excerpt?: StringFilter<"Post"> | string
    category?: StringFilter<"Post"> | string
    readTime?: IntFilter<"Post"> | number
    content?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
    thumbnail?: StringNullableFilter<"Post"> | string | null
    authorImage?: StringNullableFilter<"Post"> | string | null
    coverImage?: StringNullableFilter<"Post"> | string | null
    trending?: BoolFilter<"Post"> | boolean
    featured?: BoolFilter<"Post"> | boolean
    likes?: IntFilter<"Post"> | number
    views?: IntFilter<"Post"> | number
    bookmarks?: IntFilter<"Post"> | number
    downloads?: IntFilter<"Post"> | number
    referenceStatus?: BoolFilter<"Post"> | boolean
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostActions?: PostActionsListRelationFilter
  }

  export type PostOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    authorImage?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    trending?: SortOrder
    featured?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
    referenceStatus?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    author?: UserOrderByWithRelationInput
    PostActions?: PostActionsOrderByRelationAggregateInput
  }

  export type PostWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    id_authorId?: PostIdAuthorIdCompoundUniqueInput
    AND?: PostWhereInput | PostWhereInput[]
    OR?: PostWhereInput[]
    NOT?: PostWhereInput | PostWhereInput[]
    title?: StringFilter<"Post"> | string
    excerpt?: StringFilter<"Post"> | string
    category?: StringFilter<"Post"> | string
    readTime?: IntFilter<"Post"> | number
    content?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
    thumbnail?: StringNullableFilter<"Post"> | string | null
    authorImage?: StringNullableFilter<"Post"> | string | null
    coverImage?: StringNullableFilter<"Post"> | string | null
    trending?: BoolFilter<"Post"> | boolean
    featured?: BoolFilter<"Post"> | boolean
    likes?: IntFilter<"Post"> | number
    views?: IntFilter<"Post"> | number
    bookmarks?: IntFilter<"Post"> | number
    downloads?: IntFilter<"Post"> | number
    referenceStatus?: BoolFilter<"Post"> | boolean
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
    author?: XOR<UserScalarRelationFilter, UserWhereInput>
    PostActions?: PostActionsListRelationFilter
  }, "id" | "id_authorId">

  export type PostOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    thumbnail?: SortOrderInput | SortOrder
    authorImage?: SortOrderInput | SortOrder
    coverImage?: SortOrderInput | SortOrder
    trending?: SortOrder
    featured?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
    referenceStatus?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PostCountOrderByAggregateInput
    _avg?: PostAvgOrderByAggregateInput
    _max?: PostMaxOrderByAggregateInput
    _min?: PostMinOrderByAggregateInput
    _sum?: PostSumOrderByAggregateInput
  }

  export type PostScalarWhereWithAggregatesInput = {
    AND?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    OR?: PostScalarWhereWithAggregatesInput[]
    NOT?: PostScalarWhereWithAggregatesInput | PostScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Post"> | string
    title?: StringWithAggregatesFilter<"Post"> | string
    excerpt?: StringWithAggregatesFilter<"Post"> | string
    category?: StringWithAggregatesFilter<"Post"> | string
    readTime?: IntWithAggregatesFilter<"Post"> | number
    content?: StringWithAggregatesFilter<"Post"> | string
    authorId?: StringWithAggregatesFilter<"Post"> | string
    thumbnail?: StringNullableWithAggregatesFilter<"Post"> | string | null
    authorImage?: StringNullableWithAggregatesFilter<"Post"> | string | null
    coverImage?: StringNullableWithAggregatesFilter<"Post"> | string | null
    trending?: BoolWithAggregatesFilter<"Post"> | boolean
    featured?: BoolWithAggregatesFilter<"Post"> | boolean
    likes?: IntWithAggregatesFilter<"Post"> | number
    views?: IntWithAggregatesFilter<"Post"> | number
    bookmarks?: IntWithAggregatesFilter<"Post"> | number
    downloads?: IntWithAggregatesFilter<"Post"> | number
    referenceStatus?: BoolWithAggregatesFilter<"Post"> | boolean
    status?: EnumPostStatusWithAggregatesFilter<"Post"> | $Enums.PostStatus
    createdAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Post"> | Date | string
  }

  export type MediaMetaDataWhereInput = {
    AND?: MediaMetaDataWhereInput | MediaMetaDataWhereInput[]
    OR?: MediaMetaDataWhereInput[]
    NOT?: MediaMetaDataWhereInput | MediaMetaDataWhereInput[]
    id?: IntFilter<"MediaMetaData"> | number
    publicId?: StringFilter<"MediaMetaData"> | string
    mediaType?: EnumMediaTypeFilter<"MediaMetaData"> | $Enums.MediaType
    serviceRefId?: StringNullableFilter<"MediaMetaData"> | string | null
    userId?: StringNullableFilter<"MediaMetaData"> | string | null
    orphan?: BoolFilter<"MediaMetaData"> | boolean
    createdAt?: DateTimeFilter<"MediaMetaData"> | Date | string
    updatedAt?: DateTimeFilter<"MediaMetaData"> | Date | string
    serviceRef?: XOR<ServiceRefNullableScalarRelationFilter, ServiceRefWhereInput> | null
  }

  export type MediaMetaDataOrderByWithRelationInput = {
    id?: SortOrder
    publicId?: SortOrder
    mediaType?: SortOrder
    serviceRefId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orphan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    serviceRef?: ServiceRefOrderByWithRelationInput
  }

  export type MediaMetaDataWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    publicId?: string
    AND?: MediaMetaDataWhereInput | MediaMetaDataWhereInput[]
    OR?: MediaMetaDataWhereInput[]
    NOT?: MediaMetaDataWhereInput | MediaMetaDataWhereInput[]
    mediaType?: EnumMediaTypeFilter<"MediaMetaData"> | $Enums.MediaType
    serviceRefId?: StringNullableFilter<"MediaMetaData"> | string | null
    userId?: StringNullableFilter<"MediaMetaData"> | string | null
    orphan?: BoolFilter<"MediaMetaData"> | boolean
    createdAt?: DateTimeFilter<"MediaMetaData"> | Date | string
    updatedAt?: DateTimeFilter<"MediaMetaData"> | Date | string
    serviceRef?: XOR<ServiceRefNullableScalarRelationFilter, ServiceRefWhereInput> | null
  }, "id" | "publicId">

  export type MediaMetaDataOrderByWithAggregationInput = {
    id?: SortOrder
    publicId?: SortOrder
    mediaType?: SortOrder
    serviceRefId?: SortOrderInput | SortOrder
    userId?: SortOrderInput | SortOrder
    orphan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: MediaMetaDataCountOrderByAggregateInput
    _avg?: MediaMetaDataAvgOrderByAggregateInput
    _max?: MediaMetaDataMaxOrderByAggregateInput
    _min?: MediaMetaDataMinOrderByAggregateInput
    _sum?: MediaMetaDataSumOrderByAggregateInput
  }

  export type MediaMetaDataScalarWhereWithAggregatesInput = {
    AND?: MediaMetaDataScalarWhereWithAggregatesInput | MediaMetaDataScalarWhereWithAggregatesInput[]
    OR?: MediaMetaDataScalarWhereWithAggregatesInput[]
    NOT?: MediaMetaDataScalarWhereWithAggregatesInput | MediaMetaDataScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MediaMetaData"> | number
    publicId?: StringWithAggregatesFilter<"MediaMetaData"> | string
    mediaType?: EnumMediaTypeWithAggregatesFilter<"MediaMetaData"> | $Enums.MediaType
    serviceRefId?: StringNullableWithAggregatesFilter<"MediaMetaData"> | string | null
    userId?: StringNullableWithAggregatesFilter<"MediaMetaData"> | string | null
    orphan?: BoolWithAggregatesFilter<"MediaMetaData"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"MediaMetaData"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"MediaMetaData"> | Date | string
  }

  export type FcmTokenWhereInput = {
    AND?: FcmTokenWhereInput | FcmTokenWhereInput[]
    OR?: FcmTokenWhereInput[]
    NOT?: FcmTokenWhereInput | FcmTokenWhereInput[]
    userId?: StringNullableFilter<"FcmToken"> | string | null
    token?: StringFilter<"FcmToken"> | string
    createdAt?: DateTimeFilter<"FcmToken"> | Date | string
    type?: EnumTokenTypeFilter<"FcmToken"> | $Enums.TokenType
    updatedAt?: DateTimeFilter<"FcmToken"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type FcmTokenOrderByWithRelationInput = {
    userId?: SortOrderInput | SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type FcmTokenWhereUniqueInput = Prisma.AtLeast<{
    userId?: string
    token?: string
    AND?: FcmTokenWhereInput | FcmTokenWhereInput[]
    OR?: FcmTokenWhereInput[]
    NOT?: FcmTokenWhereInput | FcmTokenWhereInput[]
    createdAt?: DateTimeFilter<"FcmToken"> | Date | string
    type?: EnumTokenTypeFilter<"FcmToken"> | $Enums.TokenType
    updatedAt?: DateTimeFilter<"FcmToken"> | Date | string
    user?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "userId" | "token">

  export type FcmTokenOrderByWithAggregationInput = {
    userId?: SortOrderInput | SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
    _count?: FcmTokenCountOrderByAggregateInput
    _max?: FcmTokenMaxOrderByAggregateInput
    _min?: FcmTokenMinOrderByAggregateInput
  }

  export type FcmTokenScalarWhereWithAggregatesInput = {
    AND?: FcmTokenScalarWhereWithAggregatesInput | FcmTokenScalarWhereWithAggregatesInput[]
    OR?: FcmTokenScalarWhereWithAggregatesInput[]
    NOT?: FcmTokenScalarWhereWithAggregatesInput | FcmTokenScalarWhereWithAggregatesInput[]
    userId?: StringNullableWithAggregatesFilter<"FcmToken"> | string | null
    token?: StringWithAggregatesFilter<"FcmToken"> | string
    createdAt?: DateTimeWithAggregatesFilter<"FcmToken"> | Date | string
    type?: EnumTokenTypeWithAggregatesFilter<"FcmToken"> | $Enums.TokenType
    updatedAt?: DateTimeWithAggregatesFilter<"FcmToken"> | Date | string
  }

  export type ServiceRefWhereInput = {
    AND?: ServiceRefWhereInput | ServiceRefWhereInput[]
    OR?: ServiceRefWhereInput[]
    NOT?: ServiceRefWhereInput | ServiceRefWhereInput[]
    id?: StringFilter<"ServiceRef"> | string
    type?: EnumServiceTypeFilter<"ServiceRef"> | $Enums.ServiceType
    createdAt?: DateTimeFilter<"ServiceRef"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRef"> | Date | string
    media?: MediaMetaDataListRelationFilter
  }

  export type ServiceRefOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    media?: MediaMetaDataOrderByRelationAggregateInput
  }

  export type ServiceRefWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceRefWhereInput | ServiceRefWhereInput[]
    OR?: ServiceRefWhereInput[]
    NOT?: ServiceRefWhereInput | ServiceRefWhereInput[]
    type?: EnumServiceTypeFilter<"ServiceRef"> | $Enums.ServiceType
    createdAt?: DateTimeFilter<"ServiceRef"> | Date | string
    updatedAt?: DateTimeFilter<"ServiceRef"> | Date | string
    media?: MediaMetaDataListRelationFilter
  }, "id">

  export type ServiceRefOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceRefCountOrderByAggregateInput
    _max?: ServiceRefMaxOrderByAggregateInput
    _min?: ServiceRefMinOrderByAggregateInput
  }

  export type ServiceRefScalarWhereWithAggregatesInput = {
    AND?: ServiceRefScalarWhereWithAggregatesInput | ServiceRefScalarWhereWithAggregatesInput[]
    OR?: ServiceRefScalarWhereWithAggregatesInput[]
    NOT?: ServiceRefScalarWhereWithAggregatesInput | ServiceRefScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"ServiceRef"> | string
    type?: EnumServiceTypeWithAggregatesFilter<"ServiceRef"> | $Enums.ServiceType
    createdAt?: DateTimeWithAggregatesFilter<"ServiceRef"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"ServiceRef"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenCreateNestedOneWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenUncheckedCreateNestedOneWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUpdateOneWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUncheckedUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUncheckedUpdateOneWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileCreateInput = {
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
    socialLinks?: UserSocialLinkCreateNestedManyWithoutProfileInput
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateInput = {
    id: string
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
    socialLinks?: UserSocialLinkUncheckedCreateNestedManyWithoutProfileInput
  }

  export type UserProfileUpdateInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
    socialLinks?: UserSocialLinkUpdateManyWithoutProfileNestedInput
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
    socialLinks?: UserSocialLinkUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type UserProfileCreateManyInput = {
    id: string
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
  }

  export type UserProfileUpdateManyMutationInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
  }

  export type UserProfileUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
  }

  export type UserSocialLinkCreateInput = {
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
    profile: UserProfileCreateNestedOneWithoutSocialLinksInput
  }

  export type UserSocialLinkUncheckedCreateInput = {
    id: string
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSocialLinkUpdateInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    profile?: UserProfileUpdateOneRequiredWithoutSocialLinksNestedInput
  }

  export type UserSocialLinkUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialLinkCreateManyInput = {
    id: string
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSocialLinkUpdateManyMutationInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialLinkUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsCreateInput = {
    id?: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPostActionsInput
    post: PostCreateNestedOneWithoutPostActionsInput
  }

  export type PostActionsUncheckedCreateInput = {
    id?: string
    userId: string
    postId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostActionsNestedInput
    post?: PostUpdateOneRequiredWithoutPostActionsNestedInput
  }

  export type PostActionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsCreateManyInput = {
    id?: string
    userId: string
    postId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostCreateInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
    PostActions?: PostActionsCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    authorId: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
    PostActions?: PostActionsUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PostActions?: PostActionsUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostCreateManyInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    authorId: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataCreateInput = {
    publicId: string
    mediaType: $Enums.MediaType
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    serviceRef?: ServiceRefCreateNestedOneWithoutMediaInput
  }

  export type MediaMetaDataUncheckedCreateInput = {
    id?: number
    publicId: string
    mediaType: $Enums.MediaType
    serviceRefId?: string | null
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaMetaDataUpdateInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    serviceRef?: ServiceRefUpdateOneWithoutMediaNestedInput
  }

  export type MediaMetaDataUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    serviceRefId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataCreateManyInput = {
    id?: number
    publicId: string
    mediaType: $Enums.MediaType
    serviceRefId?: string | null
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaMetaDataUpdateManyMutationInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    serviceRefId?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FcmTokenCreateInput = {
    token: string
    createdAt?: Date | string
    type?: $Enums.TokenType
    updatedAt?: Date | string
    user?: UserCreateNestedOneWithoutFcmTokenInput
  }

  export type FcmTokenUncheckedCreateInput = {
    userId?: string | null
    token: string
    createdAt?: Date | string
    type?: $Enums.TokenType
    updatedAt?: Date | string
  }

  export type FcmTokenUpdateInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneWithoutFcmTokenNestedInput
  }

  export type FcmTokenUncheckedUpdateInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FcmTokenCreateManyInput = {
    userId?: string | null
    token: string
    createdAt?: Date | string
    type?: $Enums.TokenType
    updatedAt?: Date | string
  }

  export type FcmTokenUpdateManyMutationInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FcmTokenUncheckedUpdateManyInput = {
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRefCreateInput = {
    id: string
    type: $Enums.ServiceType
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaMetaDataCreateNestedManyWithoutServiceRefInput
  }

  export type ServiceRefUncheckedCreateInput = {
    id: string
    type: $Enums.ServiceType
    createdAt?: Date | string
    updatedAt?: Date | string
    media?: MediaMetaDataUncheckedCreateNestedManyWithoutServiceRefInput
  }

  export type ServiceRefUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaMetaDataUpdateManyWithoutServiceRefNestedInput
  }

  export type ServiceRefUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    media?: MediaMetaDataUncheckedUpdateManyWithoutServiceRefNestedInput
  }

  export type ServiceRefCreateManyInput = {
    id: string
    type: $Enums.ServiceType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRefUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRefUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type PostListRelationFilter = {
    every?: PostWhereInput
    some?: PostWhereInput
    none?: PostWhereInput
  }

  export type PostActionsListRelationFilter = {
    every?: PostActionsWhereInput
    some?: PostActionsWhereInput
    none?: PostActionsWhereInput
  }

  export type FcmTokenNullableScalarRelationFilter = {
    is?: FcmTokenWhereInput | null
    isNot?: FcmTokenWhereInput | null
  }

  export type UserProfileNullableScalarRelationFilter = {
    is?: UserProfileWhereInput | null
    isNot?: UserProfileWhereInput | null
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type PostOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PostActionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    role?: SortOrder
    tagline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    role?: SortOrder
    tagline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    firstName?: SortOrder
    lastName?: SortOrder
    email?: SortOrder
    role?: SortOrder
    tagline?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringNullableListFilter<$PrismaModel = never> = {
    equals?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    has?: string | StringFieldRefInput<$PrismaModel> | null
    hasEvery?: string[] | ListStringFieldRefInput<$PrismaModel>
    hasSome?: string[] | ListStringFieldRefInput<$PrismaModel>
    isEmpty?: boolean
  }

  export type UserSocialLinkListRelationFilter = {
    every?: UserSocialLinkWhereInput
    some?: UserSocialLinkWhereInput
    none?: UserSocialLinkWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type UserSocialLinkOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserProfileCountOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    location?: SortOrder
    website?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    about?: SortOrder
    focus?: SortOrder
    tags?: SortOrder
  }

  export type UserProfileAvgOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type UserProfileMaxOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    location?: SortOrder
    website?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    about?: SortOrder
    focus?: SortOrder
  }

  export type UserProfileMinOrderByAggregateInput = {
    id?: SortOrder
    bio?: SortOrder
    image?: SortOrder
    location?: SortOrder
    website?: SortOrder
    followers?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    about?: SortOrder
    focus?: SortOrder
  }

  export type UserProfileSumOrderByAggregateInput = {
    followers?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type UserProfileScalarRelationFilter = {
    is?: UserProfileWhereInput
    isNot?: UserProfileWhereInput
  }

  export type UserSocialLinkIdPlatformCompoundUniqueInput = {
    id: string
    platform: string
  }

  export type UserSocialLinkCountOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSocialLinkMaxOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSocialLinkMinOrderByAggregateInput = {
    id?: SortOrder
    platform?: SortOrder
    url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type PostScalarRelationFilter = {
    is?: PostWhereInput
    isNot?: PostWhereInput
  }

  export type PostActionsUserIdPostIdCompoundUniqueInput = {
    userId: string
    postId: string
  }

  export type PostActionsCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    likeStatus?: SortOrder
    bookmarkStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostActionsMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    likeStatus?: SortOrder
    bookmarkStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostActionsMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    postId?: SortOrder
    likeStatus?: SortOrder
    bookmarkStatus?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type PostIdAuthorIdCompoundUniqueInput = {
    id: string
    authorId: string
  }

  export type PostCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    thumbnail?: SortOrder
    authorImage?: SortOrder
    coverImage?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
    referenceStatus?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostAvgOrderByAggregateInput = {
    readTime?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
  }

  export type PostMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    thumbnail?: SortOrder
    authorImage?: SortOrder
    coverImage?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
    referenceStatus?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    excerpt?: SortOrder
    category?: SortOrder
    readTime?: SortOrder
    content?: SortOrder
    authorId?: SortOrder
    thumbnail?: SortOrder
    authorImage?: SortOrder
    coverImage?: SortOrder
    trending?: SortOrder
    featured?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
    referenceStatus?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PostSumOrderByAggregateInput = {
    readTime?: SortOrder
    likes?: SortOrder
    views?: SortOrder
    bookmarks?: SortOrder
    downloads?: SortOrder
  }

  export type EnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type EnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type ServiceRefNullableScalarRelationFilter = {
    is?: ServiceRefWhereInput | null
    isNot?: ServiceRefWhereInput | null
  }

  export type MediaMetaDataCountOrderByAggregateInput = {
    id?: SortOrder
    publicId?: SortOrder
    mediaType?: SortOrder
    serviceRefId?: SortOrder
    userId?: SortOrder
    orphan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaMetaDataAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type MediaMetaDataMaxOrderByAggregateInput = {
    id?: SortOrder
    publicId?: SortOrder
    mediaType?: SortOrder
    serviceRefId?: SortOrder
    userId?: SortOrder
    orphan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaMetaDataMinOrderByAggregateInput = {
    id?: SortOrder
    publicId?: SortOrder
    mediaType?: SortOrder
    serviceRefId?: SortOrder
    userId?: SortOrder
    orphan?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type MediaMetaDataSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type EnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type EnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type FcmTokenCountOrderByAggregateInput = {
    userId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type FcmTokenMaxOrderByAggregateInput = {
    userId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type FcmTokenMinOrderByAggregateInput = {
    userId?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    type?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type EnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type MediaMetaDataListRelationFilter = {
    every?: MediaMetaDataWhereInput
    some?: MediaMetaDataWhereInput
    none?: MediaMetaDataWhereInput
  }

  export type MediaMetaDataOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceRefCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRefMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceRefMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type EnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type PostCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PostActionsCreateNestedManyWithoutUserInput = {
    create?: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput> | PostActionsCreateWithoutUserInput[] | PostActionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutUserInput | PostActionsCreateOrConnectWithoutUserInput[]
    createMany?: PostActionsCreateManyUserInputEnvelope
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
  }

  export type FcmTokenCreateNestedOneWithoutUserInput = {
    create?: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: FcmTokenCreateOrConnectWithoutUserInput
    connect?: FcmTokenWhereUniqueInput
  }

  export type UserProfileCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type PostUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
  }

  export type PostActionsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput> | PostActionsCreateWithoutUserInput[] | PostActionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutUserInput | PostActionsCreateOrConnectWithoutUserInput[]
    createMany?: PostActionsCreateManyUserInputEnvelope
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
  }

  export type FcmTokenUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: FcmTokenCreateOrConnectWithoutUserInput
    connect?: FcmTokenWhereUniqueInput
  }

  export type UserProfileUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    connect?: UserProfileWhereUniqueInput
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type PostUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type PostActionsUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput> | PostActionsCreateWithoutUserInput[] | PostActionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutUserInput | PostActionsCreateOrConnectWithoutUserInput[]
    upsert?: PostActionsUpsertWithWhereUniqueWithoutUserInput | PostActionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostActionsCreateManyUserInputEnvelope
    set?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    disconnect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    delete?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    update?: PostActionsUpdateWithWhereUniqueWithoutUserInput | PostActionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostActionsUpdateManyWithWhereWithoutUserInput | PostActionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
  }

  export type FcmTokenUpdateOneWithoutUserNestedInput = {
    create?: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: FcmTokenCreateOrConnectWithoutUserInput
    upsert?: FcmTokenUpsertWithoutUserInput
    disconnect?: FcmTokenWhereInput | boolean
    delete?: FcmTokenWhereInput | boolean
    connect?: FcmTokenWhereUniqueInput
    update?: XOR<XOR<FcmTokenUpdateToOneWithWhereWithoutUserInput, FcmTokenUpdateWithoutUserInput>, FcmTokenUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type PostUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput> | PostCreateWithoutAuthorInput[] | PostUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: PostCreateOrConnectWithoutAuthorInput | PostCreateOrConnectWithoutAuthorInput[]
    upsert?: PostUpsertWithWhereUniqueWithoutAuthorInput | PostUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: PostCreateManyAuthorInputEnvelope
    set?: PostWhereUniqueInput | PostWhereUniqueInput[]
    disconnect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    delete?: PostWhereUniqueInput | PostWhereUniqueInput[]
    connect?: PostWhereUniqueInput | PostWhereUniqueInput[]
    update?: PostUpdateWithWhereUniqueWithoutAuthorInput | PostUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: PostUpdateManyWithWhereWithoutAuthorInput | PostUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: PostScalarWhereInput | PostScalarWhereInput[]
  }

  export type PostActionsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput> | PostActionsCreateWithoutUserInput[] | PostActionsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutUserInput | PostActionsCreateOrConnectWithoutUserInput[]
    upsert?: PostActionsUpsertWithWhereUniqueWithoutUserInput | PostActionsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: PostActionsCreateManyUserInputEnvelope
    set?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    disconnect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    delete?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    update?: PostActionsUpdateWithWhereUniqueWithoutUserInput | PostActionsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: PostActionsUpdateManyWithWhereWithoutUserInput | PostActionsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
  }

  export type FcmTokenUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
    connectOrCreate?: FcmTokenCreateOrConnectWithoutUserInput
    upsert?: FcmTokenUpsertWithoutUserInput
    disconnect?: FcmTokenWhereInput | boolean
    delete?: FcmTokenWhereInput | boolean
    connect?: FcmTokenWhereUniqueInput
    update?: XOR<XOR<FcmTokenUpdateToOneWithWhereWithoutUserInput, FcmTokenUpdateWithoutUserInput>, FcmTokenUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutUserInput
    upsert?: UserProfileUpsertWithoutUserInput
    disconnect?: UserProfileWhereInput | boolean
    delete?: UserProfileWhereInput | boolean
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutUserInput, UserProfileUpdateWithoutUserInput>, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileCreatetagsInput = {
    set: string[]
  }

  export type UserSocialLinkCreateNestedManyWithoutProfileInput = {
    create?: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput> | UserSocialLinkCreateWithoutProfileInput[] | UserSocialLinkUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: UserSocialLinkCreateOrConnectWithoutProfileInput | UserSocialLinkCreateOrConnectWithoutProfileInput[]
    createMany?: UserSocialLinkCreateManyProfileInputEnvelope
    connect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
  }

  export type UserCreateNestedOneWithoutProfileInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    connect?: UserWhereUniqueInput
  }

  export type UserSocialLinkUncheckedCreateNestedManyWithoutProfileInput = {
    create?: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput> | UserSocialLinkCreateWithoutProfileInput[] | UserSocialLinkUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: UserSocialLinkCreateOrConnectWithoutProfileInput | UserSocialLinkCreateOrConnectWithoutProfileInput[]
    createMany?: UserSocialLinkCreateManyProfileInputEnvelope
    connect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserProfileUpdatetagsInput = {
    set?: string[]
    push?: string | string[]
  }

  export type UserSocialLinkUpdateManyWithoutProfileNestedInput = {
    create?: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput> | UserSocialLinkCreateWithoutProfileInput[] | UserSocialLinkUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: UserSocialLinkCreateOrConnectWithoutProfileInput | UserSocialLinkCreateOrConnectWithoutProfileInput[]
    upsert?: UserSocialLinkUpsertWithWhereUniqueWithoutProfileInput | UserSocialLinkUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: UserSocialLinkCreateManyProfileInputEnvelope
    set?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    disconnect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    delete?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    connect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    update?: UserSocialLinkUpdateWithWhereUniqueWithoutProfileInput | UserSocialLinkUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: UserSocialLinkUpdateManyWithWhereWithoutProfileInput | UserSocialLinkUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: UserSocialLinkScalarWhereInput | UserSocialLinkScalarWhereInput[]
  }

  export type UserUpdateOneRequiredWithoutProfileNestedInput = {
    create?: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfileInput
    upsert?: UserUpsertWithoutProfileInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfileInput, UserUpdateWithoutProfileInput>, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserSocialLinkUncheckedUpdateManyWithoutProfileNestedInput = {
    create?: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput> | UserSocialLinkCreateWithoutProfileInput[] | UserSocialLinkUncheckedCreateWithoutProfileInput[]
    connectOrCreate?: UserSocialLinkCreateOrConnectWithoutProfileInput | UserSocialLinkCreateOrConnectWithoutProfileInput[]
    upsert?: UserSocialLinkUpsertWithWhereUniqueWithoutProfileInput | UserSocialLinkUpsertWithWhereUniqueWithoutProfileInput[]
    createMany?: UserSocialLinkCreateManyProfileInputEnvelope
    set?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    disconnect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    delete?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    connect?: UserSocialLinkWhereUniqueInput | UserSocialLinkWhereUniqueInput[]
    update?: UserSocialLinkUpdateWithWhereUniqueWithoutProfileInput | UserSocialLinkUpdateWithWhereUniqueWithoutProfileInput[]
    updateMany?: UserSocialLinkUpdateManyWithWhereWithoutProfileInput | UserSocialLinkUpdateManyWithWhereWithoutProfileInput[]
    deleteMany?: UserSocialLinkScalarWhereInput | UserSocialLinkScalarWhereInput[]
  }

  export type UserProfileCreateNestedOneWithoutSocialLinksInput = {
    create?: XOR<UserProfileCreateWithoutSocialLinksInput, UserProfileUncheckedCreateWithoutSocialLinksInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutSocialLinksInput
    connect?: UserProfileWhereUniqueInput
  }

  export type UserProfileUpdateOneRequiredWithoutSocialLinksNestedInput = {
    create?: XOR<UserProfileCreateWithoutSocialLinksInput, UserProfileUncheckedCreateWithoutSocialLinksInput>
    connectOrCreate?: UserProfileCreateOrConnectWithoutSocialLinksInput
    upsert?: UserProfileUpsertWithoutSocialLinksInput
    connect?: UserProfileWhereUniqueInput
    update?: XOR<XOR<UserProfileUpdateToOneWithWhereWithoutSocialLinksInput, UserProfileUpdateWithoutSocialLinksInput>, UserProfileUncheckedUpdateWithoutSocialLinksInput>
  }

  export type UserCreateNestedOneWithoutPostActionsInput = {
    create?: XOR<UserCreateWithoutPostActionsInput, UserUncheckedCreateWithoutPostActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostActionsInput
    connect?: UserWhereUniqueInput
  }

  export type PostCreateNestedOneWithoutPostActionsInput = {
    create?: XOR<PostCreateWithoutPostActionsInput, PostUncheckedCreateWithoutPostActionsInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostActionsInput
    connect?: PostWhereUniqueInput
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutPostActionsNestedInput = {
    create?: XOR<UserCreateWithoutPostActionsInput, UserUncheckedCreateWithoutPostActionsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostActionsInput
    upsert?: UserUpsertWithoutPostActionsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostActionsInput, UserUpdateWithoutPostActionsInput>, UserUncheckedUpdateWithoutPostActionsInput>
  }

  export type PostUpdateOneRequiredWithoutPostActionsNestedInput = {
    create?: XOR<PostCreateWithoutPostActionsInput, PostUncheckedCreateWithoutPostActionsInput>
    connectOrCreate?: PostCreateOrConnectWithoutPostActionsInput
    upsert?: PostUpsertWithoutPostActionsInput
    connect?: PostWhereUniqueInput
    update?: XOR<XOR<PostUpdateToOneWithWhereWithoutPostActionsInput, PostUpdateWithoutPostActionsInput>, PostUncheckedUpdateWithoutPostActionsInput>
  }

  export type UserCreateNestedOneWithoutPostsInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    connect?: UserWhereUniqueInput
  }

  export type PostActionsCreateNestedManyWithoutPostInput = {
    create?: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput> | PostActionsCreateWithoutPostInput[] | PostActionsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutPostInput | PostActionsCreateOrConnectWithoutPostInput[]
    createMany?: PostActionsCreateManyPostInputEnvelope
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
  }

  export type PostActionsUncheckedCreateNestedManyWithoutPostInput = {
    create?: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput> | PostActionsCreateWithoutPostInput[] | PostActionsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutPostInput | PostActionsCreateOrConnectWithoutPostInput[]
    createMany?: PostActionsCreateManyPostInputEnvelope
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
  }

  export type EnumPostStatusFieldUpdateOperationsInput = {
    set?: $Enums.PostStatus
  }

  export type UserUpdateOneRequiredWithoutPostsNestedInput = {
    create?: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    connectOrCreate?: UserCreateOrConnectWithoutPostsInput
    upsert?: UserUpsertWithoutPostsInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutPostsInput, UserUpdateWithoutPostsInput>, UserUncheckedUpdateWithoutPostsInput>
  }

  export type PostActionsUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput> | PostActionsCreateWithoutPostInput[] | PostActionsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutPostInput | PostActionsCreateOrConnectWithoutPostInput[]
    upsert?: PostActionsUpsertWithWhereUniqueWithoutPostInput | PostActionsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostActionsCreateManyPostInputEnvelope
    set?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    disconnect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    delete?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    update?: PostActionsUpdateWithWhereUniqueWithoutPostInput | PostActionsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostActionsUpdateManyWithWhereWithoutPostInput | PostActionsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
  }

  export type PostActionsUncheckedUpdateManyWithoutPostNestedInput = {
    create?: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput> | PostActionsCreateWithoutPostInput[] | PostActionsUncheckedCreateWithoutPostInput[]
    connectOrCreate?: PostActionsCreateOrConnectWithoutPostInput | PostActionsCreateOrConnectWithoutPostInput[]
    upsert?: PostActionsUpsertWithWhereUniqueWithoutPostInput | PostActionsUpsertWithWhereUniqueWithoutPostInput[]
    createMany?: PostActionsCreateManyPostInputEnvelope
    set?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    disconnect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    delete?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    connect?: PostActionsWhereUniqueInput | PostActionsWhereUniqueInput[]
    update?: PostActionsUpdateWithWhereUniqueWithoutPostInput | PostActionsUpdateWithWhereUniqueWithoutPostInput[]
    updateMany?: PostActionsUpdateManyWithWhereWithoutPostInput | PostActionsUpdateManyWithWhereWithoutPostInput[]
    deleteMany?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
  }

  export type ServiceRefCreateNestedOneWithoutMediaInput = {
    create?: XOR<ServiceRefCreateWithoutMediaInput, ServiceRefUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ServiceRefCreateOrConnectWithoutMediaInput
    connect?: ServiceRefWhereUniqueInput
  }

  export type EnumMediaTypeFieldUpdateOperationsInput = {
    set?: $Enums.MediaType
  }

  export type ServiceRefUpdateOneWithoutMediaNestedInput = {
    create?: XOR<ServiceRefCreateWithoutMediaInput, ServiceRefUncheckedCreateWithoutMediaInput>
    connectOrCreate?: ServiceRefCreateOrConnectWithoutMediaInput
    upsert?: ServiceRefUpsertWithoutMediaInput
    disconnect?: ServiceRefWhereInput | boolean
    delete?: ServiceRefWhereInput | boolean
    connect?: ServiceRefWhereUniqueInput
    update?: XOR<XOR<ServiceRefUpdateToOneWithWhereWithoutMediaInput, ServiceRefUpdateWithoutMediaInput>, ServiceRefUncheckedUpdateWithoutMediaInput>
  }

  export type UserCreateNestedOneWithoutFcmTokenInput = {
    create?: XOR<UserCreateWithoutFcmTokenInput, UserUncheckedCreateWithoutFcmTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutFcmTokenInput
    connect?: UserWhereUniqueInput
  }

  export type EnumTokenTypeFieldUpdateOperationsInput = {
    set?: $Enums.TokenType
  }

  export type UserUpdateOneWithoutFcmTokenNestedInput = {
    create?: XOR<UserCreateWithoutFcmTokenInput, UserUncheckedCreateWithoutFcmTokenInput>
    connectOrCreate?: UserCreateOrConnectWithoutFcmTokenInput
    upsert?: UserUpsertWithoutFcmTokenInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutFcmTokenInput, UserUpdateWithoutFcmTokenInput>, UserUncheckedUpdateWithoutFcmTokenInput>
  }

  export type MediaMetaDataCreateNestedManyWithoutServiceRefInput = {
    create?: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput> | MediaMetaDataCreateWithoutServiceRefInput[] | MediaMetaDataUncheckedCreateWithoutServiceRefInput[]
    connectOrCreate?: MediaMetaDataCreateOrConnectWithoutServiceRefInput | MediaMetaDataCreateOrConnectWithoutServiceRefInput[]
    createMany?: MediaMetaDataCreateManyServiceRefInputEnvelope
    connect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
  }

  export type MediaMetaDataUncheckedCreateNestedManyWithoutServiceRefInput = {
    create?: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput> | MediaMetaDataCreateWithoutServiceRefInput[] | MediaMetaDataUncheckedCreateWithoutServiceRefInput[]
    connectOrCreate?: MediaMetaDataCreateOrConnectWithoutServiceRefInput | MediaMetaDataCreateOrConnectWithoutServiceRefInput[]
    createMany?: MediaMetaDataCreateManyServiceRefInputEnvelope
    connect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
  }

  export type EnumServiceTypeFieldUpdateOperationsInput = {
    set?: $Enums.ServiceType
  }

  export type MediaMetaDataUpdateManyWithoutServiceRefNestedInput = {
    create?: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput> | MediaMetaDataCreateWithoutServiceRefInput[] | MediaMetaDataUncheckedCreateWithoutServiceRefInput[]
    connectOrCreate?: MediaMetaDataCreateOrConnectWithoutServiceRefInput | MediaMetaDataCreateOrConnectWithoutServiceRefInput[]
    upsert?: MediaMetaDataUpsertWithWhereUniqueWithoutServiceRefInput | MediaMetaDataUpsertWithWhereUniqueWithoutServiceRefInput[]
    createMany?: MediaMetaDataCreateManyServiceRefInputEnvelope
    set?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    disconnect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    delete?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    connect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    update?: MediaMetaDataUpdateWithWhereUniqueWithoutServiceRefInput | MediaMetaDataUpdateWithWhereUniqueWithoutServiceRefInput[]
    updateMany?: MediaMetaDataUpdateManyWithWhereWithoutServiceRefInput | MediaMetaDataUpdateManyWithWhereWithoutServiceRefInput[]
    deleteMany?: MediaMetaDataScalarWhereInput | MediaMetaDataScalarWhereInput[]
  }

  export type MediaMetaDataUncheckedUpdateManyWithoutServiceRefNestedInput = {
    create?: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput> | MediaMetaDataCreateWithoutServiceRefInput[] | MediaMetaDataUncheckedCreateWithoutServiceRefInput[]
    connectOrCreate?: MediaMetaDataCreateOrConnectWithoutServiceRefInput | MediaMetaDataCreateOrConnectWithoutServiceRefInput[]
    upsert?: MediaMetaDataUpsertWithWhereUniqueWithoutServiceRefInput | MediaMetaDataUpsertWithWhereUniqueWithoutServiceRefInput[]
    createMany?: MediaMetaDataCreateManyServiceRefInputEnvelope
    set?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    disconnect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    delete?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    connect?: MediaMetaDataWhereUniqueInput | MediaMetaDataWhereUniqueInput[]
    update?: MediaMetaDataUpdateWithWhereUniqueWithoutServiceRefInput | MediaMetaDataUpdateWithWhereUniqueWithoutServiceRefInput[]
    updateMany?: MediaMetaDataUpdateManyWithWhereWithoutServiceRefInput | MediaMetaDataUpdateManyWithWhereWithoutServiceRefInput[]
    deleteMany?: MediaMetaDataScalarWhereInput | MediaMetaDataScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedEnumPostStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusFilter<$PrismaModel> | $Enums.PostStatus
  }

  export type NestedEnumPostStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PostStatus | EnumPostStatusFieldRefInput<$PrismaModel>
    in?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    notIn?: $Enums.PostStatus[] | ListEnumPostStatusFieldRefInput<$PrismaModel>
    not?: NestedEnumPostStatusWithAggregatesFilter<$PrismaModel> | $Enums.PostStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumPostStatusFilter<$PrismaModel>
    _max?: NestedEnumPostStatusFilter<$PrismaModel>
  }

  export type NestedEnumMediaTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeFilter<$PrismaModel> | $Enums.MediaType
  }

  export type NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MediaType | EnumMediaTypeFieldRefInput<$PrismaModel>
    in?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.MediaType[] | ListEnumMediaTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumMediaTypeWithAggregatesFilter<$PrismaModel> | $Enums.MediaType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumMediaTypeFilter<$PrismaModel>
    _max?: NestedEnumMediaTypeFilter<$PrismaModel>
  }

  export type NestedEnumTokenTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeFilter<$PrismaModel> | $Enums.TokenType
  }

  export type NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TokenType | EnumTokenTypeFieldRefInput<$PrismaModel>
    in?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.TokenType[] | ListEnumTokenTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumTokenTypeWithAggregatesFilter<$PrismaModel> | $Enums.TokenType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumTokenTypeFilter<$PrismaModel>
    _max?: NestedEnumTokenTypeFilter<$PrismaModel>
  }

  export type NestedEnumServiceTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeFilter<$PrismaModel> | $Enums.ServiceType
  }

  export type NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceType | EnumServiceTypeFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    notIn?: $Enums.ServiceType[] | ListEnumServiceTypeFieldRefInput<$PrismaModel>
    not?: NestedEnumServiceTypeWithAggregatesFilter<$PrismaModel> | $Enums.ServiceType
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceTypeFilter<$PrismaModel>
    _max?: NestedEnumServiceTypeFilter<$PrismaModel>
  }

  export type PostCreateWithoutAuthorInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    PostActions?: PostActionsCreateNestedManyWithoutPostInput
  }

  export type PostUncheckedCreateWithoutAuthorInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutPostInput
  }

  export type PostCreateOrConnectWithoutAuthorInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostCreateManyAuthorInputEnvelope = {
    data: PostCreateManyAuthorInput | PostCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type PostActionsCreateWithoutUserInput = {
    id?: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    post: PostCreateNestedOneWithoutPostActionsInput
  }

  export type PostActionsUncheckedCreateWithoutUserInput = {
    id?: string
    postId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsCreateOrConnectWithoutUserInput = {
    where: PostActionsWhereUniqueInput
    create: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput>
  }

  export type PostActionsCreateManyUserInputEnvelope = {
    data: PostActionsCreateManyUserInput | PostActionsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type FcmTokenCreateWithoutUserInput = {
    token: string
    createdAt?: Date | string
    type?: $Enums.TokenType
    updatedAt?: Date | string
  }

  export type FcmTokenUncheckedCreateWithoutUserInput = {
    token: string
    createdAt?: Date | string
    type?: $Enums.TokenType
    updatedAt?: Date | string
  }

  export type FcmTokenCreateOrConnectWithoutUserInput = {
    where: FcmTokenWhereUniqueInput
    create: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
  }

  export type UserProfileCreateWithoutUserInput = {
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
    socialLinks?: UserSocialLinkCreateNestedManyWithoutProfileInput
  }

  export type UserProfileUncheckedCreateWithoutUserInput = {
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
    socialLinks?: UserSocialLinkUncheckedCreateNestedManyWithoutProfileInput
  }

  export type UserProfileCreateOrConnectWithoutUserInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
  }

  export type PostUpsertWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    update: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
    create: XOR<PostCreateWithoutAuthorInput, PostUncheckedCreateWithoutAuthorInput>
  }

  export type PostUpdateWithWhereUniqueWithoutAuthorInput = {
    where: PostWhereUniqueInput
    data: XOR<PostUpdateWithoutAuthorInput, PostUncheckedUpdateWithoutAuthorInput>
  }

  export type PostUpdateManyWithWhereWithoutAuthorInput = {
    where: PostScalarWhereInput
    data: XOR<PostUpdateManyMutationInput, PostUncheckedUpdateManyWithoutAuthorInput>
  }

  export type PostScalarWhereInput = {
    AND?: PostScalarWhereInput | PostScalarWhereInput[]
    OR?: PostScalarWhereInput[]
    NOT?: PostScalarWhereInput | PostScalarWhereInput[]
    id?: StringFilter<"Post"> | string
    title?: StringFilter<"Post"> | string
    excerpt?: StringFilter<"Post"> | string
    category?: StringFilter<"Post"> | string
    readTime?: IntFilter<"Post"> | number
    content?: StringFilter<"Post"> | string
    authorId?: StringFilter<"Post"> | string
    thumbnail?: StringNullableFilter<"Post"> | string | null
    authorImage?: StringNullableFilter<"Post"> | string | null
    coverImage?: StringNullableFilter<"Post"> | string | null
    trending?: BoolFilter<"Post"> | boolean
    featured?: BoolFilter<"Post"> | boolean
    likes?: IntFilter<"Post"> | number
    views?: IntFilter<"Post"> | number
    bookmarks?: IntFilter<"Post"> | number
    downloads?: IntFilter<"Post"> | number
    referenceStatus?: BoolFilter<"Post"> | boolean
    status?: EnumPostStatusFilter<"Post"> | $Enums.PostStatus
    createdAt?: DateTimeFilter<"Post"> | Date | string
    updatedAt?: DateTimeFilter<"Post"> | Date | string
  }

  export type PostActionsUpsertWithWhereUniqueWithoutUserInput = {
    where: PostActionsWhereUniqueInput
    update: XOR<PostActionsUpdateWithoutUserInput, PostActionsUncheckedUpdateWithoutUserInput>
    create: XOR<PostActionsCreateWithoutUserInput, PostActionsUncheckedCreateWithoutUserInput>
  }

  export type PostActionsUpdateWithWhereUniqueWithoutUserInput = {
    where: PostActionsWhereUniqueInput
    data: XOR<PostActionsUpdateWithoutUserInput, PostActionsUncheckedUpdateWithoutUserInput>
  }

  export type PostActionsUpdateManyWithWhereWithoutUserInput = {
    where: PostActionsScalarWhereInput
    data: XOR<PostActionsUpdateManyMutationInput, PostActionsUncheckedUpdateManyWithoutUserInput>
  }

  export type PostActionsScalarWhereInput = {
    AND?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
    OR?: PostActionsScalarWhereInput[]
    NOT?: PostActionsScalarWhereInput | PostActionsScalarWhereInput[]
    id?: StringFilter<"PostActions"> | string
    userId?: StringFilter<"PostActions"> | string
    postId?: StringFilter<"PostActions"> | string
    likeStatus?: BoolFilter<"PostActions"> | boolean
    bookmarkStatus?: BoolFilter<"PostActions"> | boolean
    createdAt?: DateTimeFilter<"PostActions"> | Date | string
    updatedAt?: DateTimeFilter<"PostActions"> | Date | string
  }

  export type FcmTokenUpsertWithoutUserInput = {
    update: XOR<FcmTokenUpdateWithoutUserInput, FcmTokenUncheckedUpdateWithoutUserInput>
    create: XOR<FcmTokenCreateWithoutUserInput, FcmTokenUncheckedCreateWithoutUserInput>
    where?: FcmTokenWhereInput
  }

  export type FcmTokenUpdateToOneWithWhereWithoutUserInput = {
    where?: FcmTokenWhereInput
    data: XOR<FcmTokenUpdateWithoutUserInput, FcmTokenUncheckedUpdateWithoutUserInput>
  }

  export type FcmTokenUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type FcmTokenUncheckedUpdateWithoutUserInput = {
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    type?: EnumTokenTypeFieldUpdateOperationsInput | $Enums.TokenType
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserProfileUpsertWithoutUserInput = {
    update: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
    create: XOR<UserProfileCreateWithoutUserInput, UserProfileUncheckedCreateWithoutUserInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutUserInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutUserInput, UserProfileUncheckedUpdateWithoutUserInput>
  }

  export type UserProfileUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
    socialLinks?: UserSocialLinkUpdateManyWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutUserInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
    socialLinks?: UserSocialLinkUncheckedUpdateManyWithoutProfileNestedInput
  }

  export type UserSocialLinkCreateWithoutProfileInput = {
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSocialLinkUncheckedCreateWithoutProfileInput = {
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSocialLinkCreateOrConnectWithoutProfileInput = {
    where: UserSocialLinkWhereUniqueInput
    create: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput>
  }

  export type UserSocialLinkCreateManyProfileInputEnvelope = {
    data: UserSocialLinkCreateManyProfileInput | UserSocialLinkCreateManyProfileInput[]
    skipDuplicates?: boolean
  }

  export type UserCreateWithoutProfileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutProfileInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutProfileInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
  }

  export type UserSocialLinkUpsertWithWhereUniqueWithoutProfileInput = {
    where: UserSocialLinkWhereUniqueInput
    update: XOR<UserSocialLinkUpdateWithoutProfileInput, UserSocialLinkUncheckedUpdateWithoutProfileInput>
    create: XOR<UserSocialLinkCreateWithoutProfileInput, UserSocialLinkUncheckedCreateWithoutProfileInput>
  }

  export type UserSocialLinkUpdateWithWhereUniqueWithoutProfileInput = {
    where: UserSocialLinkWhereUniqueInput
    data: XOR<UserSocialLinkUpdateWithoutProfileInput, UserSocialLinkUncheckedUpdateWithoutProfileInput>
  }

  export type UserSocialLinkUpdateManyWithWhereWithoutProfileInput = {
    where: UserSocialLinkScalarWhereInput
    data: XOR<UserSocialLinkUpdateManyMutationInput, UserSocialLinkUncheckedUpdateManyWithoutProfileInput>
  }

  export type UserSocialLinkScalarWhereInput = {
    AND?: UserSocialLinkScalarWhereInput | UserSocialLinkScalarWhereInput[]
    OR?: UserSocialLinkScalarWhereInput[]
    NOT?: UserSocialLinkScalarWhereInput | UserSocialLinkScalarWhereInput[]
    id?: StringFilter<"UserSocialLink"> | string
    platform?: StringFilter<"UserSocialLink"> | string
    url?: StringFilter<"UserSocialLink"> | string
    createdAt?: DateTimeFilter<"UserSocialLink"> | Date | string
    updatedAt?: DateTimeFilter<"UserSocialLink"> | Date | string
  }

  export type UserUpsertWithoutProfileInput = {
    update: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
    create: XOR<UserCreateWithoutProfileInput, UserUncheckedCreateWithoutProfileInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfileInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfileInput, UserUncheckedUpdateWithoutProfileInput>
  }

  export type UserUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutProfileInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUncheckedUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUncheckedUpdateOneWithoutUserNestedInput
  }

  export type UserProfileCreateWithoutSocialLinksInput = {
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
    user: UserCreateNestedOneWithoutProfileInput
  }

  export type UserProfileUncheckedCreateWithoutSocialLinksInput = {
    id: string
    bio?: string | null
    image?: string | null
    location?: string | null
    website?: string | null
    followers?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    about?: string | null
    focus?: string | null
    tags?: UserProfileCreatetagsInput | string[]
  }

  export type UserProfileCreateOrConnectWithoutSocialLinksInput = {
    where: UserProfileWhereUniqueInput
    create: XOR<UserProfileCreateWithoutSocialLinksInput, UserProfileUncheckedCreateWithoutSocialLinksInput>
  }

  export type UserProfileUpsertWithoutSocialLinksInput = {
    update: XOR<UserProfileUpdateWithoutSocialLinksInput, UserProfileUncheckedUpdateWithoutSocialLinksInput>
    create: XOR<UserProfileCreateWithoutSocialLinksInput, UserProfileUncheckedCreateWithoutSocialLinksInput>
    where?: UserProfileWhereInput
  }

  export type UserProfileUpdateToOneWithWhereWithoutSocialLinksInput = {
    where?: UserProfileWhereInput
    data: XOR<UserProfileUpdateWithoutSocialLinksInput, UserProfileUncheckedUpdateWithoutSocialLinksInput>
  }

  export type UserProfileUpdateWithoutSocialLinksInput = {
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
    user?: UserUpdateOneRequiredWithoutProfileNestedInput
  }

  export type UserProfileUncheckedUpdateWithoutSocialLinksInput = {
    id?: StringFieldUpdateOperationsInput | string
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    website?: NullableStringFieldUpdateOperationsInput | string | null
    followers?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    about?: NullableStringFieldUpdateOperationsInput | string | null
    focus?: NullableStringFieldUpdateOperationsInput | string | null
    tags?: UserProfileUpdatetagsInput | string[]
  }

  export type UserCreateWithoutPostActionsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostCreateNestedManyWithoutAuthorInput
    fcmToken?: FcmTokenCreateNestedOneWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostActionsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    fcmToken?: FcmTokenUncheckedCreateNestedOneWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostActionsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostActionsInput, UserUncheckedCreateWithoutPostActionsInput>
  }

  export type PostCreateWithoutPostActionsInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    author: UserCreateNestedOneWithoutPostsInput
  }

  export type PostUncheckedCreateWithoutPostActionsInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    authorId: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostCreateOrConnectWithoutPostActionsInput = {
    where: PostWhereUniqueInput
    create: XOR<PostCreateWithoutPostActionsInput, PostUncheckedCreateWithoutPostActionsInput>
  }

  export type UserUpsertWithoutPostActionsInput = {
    update: XOR<UserUpdateWithoutPostActionsInput, UserUncheckedUpdateWithoutPostActionsInput>
    create: XOR<UserCreateWithoutPostActionsInput, UserUncheckedCreateWithoutPostActionsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostActionsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostActionsInput, UserUncheckedUpdateWithoutPostActionsInput>
  }

  export type UserUpdateWithoutPostActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUpdateManyWithoutAuthorNestedInput
    fcmToken?: FcmTokenUpdateOneWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    fcmToken?: FcmTokenUncheckedUpdateOneWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostUpsertWithoutPostActionsInput = {
    update: XOR<PostUpdateWithoutPostActionsInput, PostUncheckedUpdateWithoutPostActionsInput>
    create: XOR<PostCreateWithoutPostActionsInput, PostUncheckedCreateWithoutPostActionsInput>
    where?: PostWhereInput
  }

  export type PostUpdateToOneWithWhereWithoutPostActionsInput = {
    where?: PostWhereInput
    data: XOR<PostUpdateWithoutPostActionsInput, PostUncheckedUpdateWithoutPostActionsInput>
  }

  export type PostUpdateWithoutPostActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneRequiredWithoutPostsNestedInput
  }

  export type PostUncheckedUpdateWithoutPostActionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    authorId?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutPostsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    PostActions?: PostActionsCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenCreateNestedOneWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutPostsInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutUserInput
    fcmToken?: FcmTokenUncheckedCreateNestedOneWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutPostsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
  }

  export type PostActionsCreateWithoutPostInput = {
    id?: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutPostActionsInput
  }

  export type PostActionsUncheckedCreateWithoutPostInput = {
    id?: string
    userId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsCreateOrConnectWithoutPostInput = {
    where: PostActionsWhereUniqueInput
    create: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput>
  }

  export type PostActionsCreateManyPostInputEnvelope = {
    data: PostActionsCreateManyPostInput | PostActionsCreateManyPostInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutPostsInput = {
    update: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
    create: XOR<UserCreateWithoutPostsInput, UserUncheckedCreateWithoutPostsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutPostsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutPostsInput, UserUncheckedUpdateWithoutPostsInput>
  }

  export type UserUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PostActions?: PostActionsUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUpdateOneWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutPostsInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PostActions?: PostActionsUncheckedUpdateManyWithoutUserNestedInput
    fcmToken?: FcmTokenUncheckedUpdateOneWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type PostActionsUpsertWithWhereUniqueWithoutPostInput = {
    where: PostActionsWhereUniqueInput
    update: XOR<PostActionsUpdateWithoutPostInput, PostActionsUncheckedUpdateWithoutPostInput>
    create: XOR<PostActionsCreateWithoutPostInput, PostActionsUncheckedCreateWithoutPostInput>
  }

  export type PostActionsUpdateWithWhereUniqueWithoutPostInput = {
    where: PostActionsWhereUniqueInput
    data: XOR<PostActionsUpdateWithoutPostInput, PostActionsUncheckedUpdateWithoutPostInput>
  }

  export type PostActionsUpdateManyWithWhereWithoutPostInput = {
    where: PostActionsScalarWhereInput
    data: XOR<PostActionsUpdateManyMutationInput, PostActionsUncheckedUpdateManyWithoutPostInput>
  }

  export type ServiceRefCreateWithoutMediaInput = {
    id: string
    type: $Enums.ServiceType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRefUncheckedCreateWithoutMediaInput = {
    id: string
    type: $Enums.ServiceType
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceRefCreateOrConnectWithoutMediaInput = {
    where: ServiceRefWhereUniqueInput
    create: XOR<ServiceRefCreateWithoutMediaInput, ServiceRefUncheckedCreateWithoutMediaInput>
  }

  export type ServiceRefUpsertWithoutMediaInput = {
    update: XOR<ServiceRefUpdateWithoutMediaInput, ServiceRefUncheckedUpdateWithoutMediaInput>
    create: XOR<ServiceRefCreateWithoutMediaInput, ServiceRefUncheckedCreateWithoutMediaInput>
    where?: ServiceRefWhereInput
  }

  export type ServiceRefUpdateToOneWithWhereWithoutMediaInput = {
    where?: ServiceRefWhereInput
    data: XOR<ServiceRefUpdateWithoutMediaInput, ServiceRefUncheckedUpdateWithoutMediaInput>
  }

  export type ServiceRefUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceRefUncheckedUpdateWithoutMediaInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: EnumServiceTypeFieldUpdateOperationsInput | $Enums.ServiceType
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateWithoutFcmTokenInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsCreateNestedManyWithoutUserInput
    profile?: UserProfileCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutFcmTokenInput = {
    id?: string
    firstName: string
    lastName: string
    email: string
    role?: $Enums.Role
    tagline?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    Posts?: PostUncheckedCreateNestedManyWithoutAuthorInput
    PostActions?: PostActionsUncheckedCreateNestedManyWithoutUserInput
    profile?: UserProfileUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutFcmTokenInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutFcmTokenInput, UserUncheckedCreateWithoutFcmTokenInput>
  }

  export type UserUpsertWithoutFcmTokenInput = {
    update: XOR<UserUpdateWithoutFcmTokenInput, UserUncheckedUpdateWithoutFcmTokenInput>
    create: XOR<UserCreateWithoutFcmTokenInput, UserUncheckedCreateWithoutFcmTokenInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutFcmTokenInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutFcmTokenInput, UserUncheckedUpdateWithoutFcmTokenInput>
  }

  export type UserUpdateWithoutFcmTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUpdateManyWithoutUserNestedInput
    profile?: UserProfileUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutFcmTokenInput = {
    id?: StringFieldUpdateOperationsInput | string
    firstName?: StringFieldUpdateOperationsInput | string
    lastName?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    role?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    tagline?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    Posts?: PostUncheckedUpdateManyWithoutAuthorNestedInput
    PostActions?: PostActionsUncheckedUpdateManyWithoutUserNestedInput
    profile?: UserProfileUncheckedUpdateOneWithoutUserNestedInput
  }

  export type MediaMetaDataCreateWithoutServiceRefInput = {
    publicId: string
    mediaType: $Enums.MediaType
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaMetaDataUncheckedCreateWithoutServiceRefInput = {
    id?: number
    publicId: string
    mediaType: $Enums.MediaType
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaMetaDataCreateOrConnectWithoutServiceRefInput = {
    where: MediaMetaDataWhereUniqueInput
    create: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput>
  }

  export type MediaMetaDataCreateManyServiceRefInputEnvelope = {
    data: MediaMetaDataCreateManyServiceRefInput | MediaMetaDataCreateManyServiceRefInput[]
    skipDuplicates?: boolean
  }

  export type MediaMetaDataUpsertWithWhereUniqueWithoutServiceRefInput = {
    where: MediaMetaDataWhereUniqueInput
    update: XOR<MediaMetaDataUpdateWithoutServiceRefInput, MediaMetaDataUncheckedUpdateWithoutServiceRefInput>
    create: XOR<MediaMetaDataCreateWithoutServiceRefInput, MediaMetaDataUncheckedCreateWithoutServiceRefInput>
  }

  export type MediaMetaDataUpdateWithWhereUniqueWithoutServiceRefInput = {
    where: MediaMetaDataWhereUniqueInput
    data: XOR<MediaMetaDataUpdateWithoutServiceRefInput, MediaMetaDataUncheckedUpdateWithoutServiceRefInput>
  }

  export type MediaMetaDataUpdateManyWithWhereWithoutServiceRefInput = {
    where: MediaMetaDataScalarWhereInput
    data: XOR<MediaMetaDataUpdateManyMutationInput, MediaMetaDataUncheckedUpdateManyWithoutServiceRefInput>
  }

  export type MediaMetaDataScalarWhereInput = {
    AND?: MediaMetaDataScalarWhereInput | MediaMetaDataScalarWhereInput[]
    OR?: MediaMetaDataScalarWhereInput[]
    NOT?: MediaMetaDataScalarWhereInput | MediaMetaDataScalarWhereInput[]
    id?: IntFilter<"MediaMetaData"> | number
    publicId?: StringFilter<"MediaMetaData"> | string
    mediaType?: EnumMediaTypeFilter<"MediaMetaData"> | $Enums.MediaType
    serviceRefId?: StringNullableFilter<"MediaMetaData"> | string | null
    userId?: StringNullableFilter<"MediaMetaData"> | string | null
    orphan?: BoolFilter<"MediaMetaData"> | boolean
    createdAt?: DateTimeFilter<"MediaMetaData"> | Date | string
    updatedAt?: DateTimeFilter<"MediaMetaData"> | Date | string
  }

  export type PostCreateManyAuthorInput = {
    id?: string
    title: string
    excerpt: string
    category: string
    readTime: number
    content: string
    thumbnail?: string | null
    authorImage?: string | null
    coverImage?: string | null
    trending?: boolean
    featured?: boolean
    likes?: number
    views?: number
    bookmarks?: number
    downloads?: number
    referenceStatus?: boolean
    status?: $Enums.PostStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsCreateManyUserInput = {
    id?: string
    postId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PostActions?: PostActionsUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    PostActions?: PostActionsUncheckedUpdateManyWithoutPostNestedInput
  }

  export type PostUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    excerpt?: StringFieldUpdateOperationsInput | string
    category?: StringFieldUpdateOperationsInput | string
    readTime?: IntFieldUpdateOperationsInput | number
    content?: StringFieldUpdateOperationsInput | string
    thumbnail?: NullableStringFieldUpdateOperationsInput | string | null
    authorImage?: NullableStringFieldUpdateOperationsInput | string | null
    coverImage?: NullableStringFieldUpdateOperationsInput | string | null
    trending?: BoolFieldUpdateOperationsInput | boolean
    featured?: BoolFieldUpdateOperationsInput | boolean
    likes?: IntFieldUpdateOperationsInput | number
    views?: IntFieldUpdateOperationsInput | number
    bookmarks?: IntFieldUpdateOperationsInput | number
    downloads?: IntFieldUpdateOperationsInput | number
    referenceStatus?: BoolFieldUpdateOperationsInput | boolean
    status?: EnumPostStatusFieldUpdateOperationsInput | $Enums.PostStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    post?: PostUpdateOneRequiredWithoutPostActionsNestedInput
  }

  export type PostActionsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    postId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialLinkCreateManyProfileInput = {
    platform: string
    url: string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserSocialLinkUpdateWithoutProfileInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialLinkUncheckedUpdateWithoutProfileInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserSocialLinkUncheckedUpdateManyWithoutProfileInput = {
    platform?: StringFieldUpdateOperationsInput | string
    url?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsCreateManyPostInput = {
    id?: string
    userId: string
    likeStatus?: boolean
    bookmarkStatus?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PostActionsUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutPostActionsNestedInput
  }

  export type PostActionsUncheckedUpdateWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PostActionsUncheckedUpdateManyWithoutPostInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    likeStatus?: BoolFieldUpdateOperationsInput | boolean
    bookmarkStatus?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataCreateManyServiceRefInput = {
    id?: number
    publicId: string
    mediaType: $Enums.MediaType
    userId?: string | null
    orphan?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type MediaMetaDataUpdateWithoutServiceRefInput = {
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataUncheckedUpdateWithoutServiceRefInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MediaMetaDataUncheckedUpdateManyWithoutServiceRefInput = {
    id?: IntFieldUpdateOperationsInput | number
    publicId?: StringFieldUpdateOperationsInput | string
    mediaType?: EnumMediaTypeFieldUpdateOperationsInput | $Enums.MediaType
    userId?: NullableStringFieldUpdateOperationsInput | string | null
    orphan?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}