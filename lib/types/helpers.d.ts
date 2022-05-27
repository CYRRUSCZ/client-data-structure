declare function getValidDate (inputDate: Date|string, throwInvalid?: boolean): Date

declare function getStringOrNull (input: any): string|null

declare function isESClass (input: any): boolean

declare function getInstanceOfClass<T> (input: any, ClassInstancePrototype: T): T
