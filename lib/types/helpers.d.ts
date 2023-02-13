declare function getValidDate (inputDate: Date|string, throwInvalid?: boolean): Date

declare function getNormalizedDate (inputDate: Date|string, throwInvalid?: boolean): Date

declare function getStringOrNull (input: unknown): string|null

declare function isESClass (input: unknown): boolean

declare function getInstanceOfClass<T> (input: unknown, ClassInstancePrototype: T): T
