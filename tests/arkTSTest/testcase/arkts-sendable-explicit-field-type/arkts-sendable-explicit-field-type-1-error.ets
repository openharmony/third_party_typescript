/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { lang } from "./@arkts.lang";

enum Color {Red, Green, Blue}

@Sendable
class SendableClass {
    public a: number = 1;
}

class NoSendableClass {
    public b: number = 1;
}

@Sendable
class A {
    booleanProp: boolean = true;
    numberProp: number = 42;
    stringProp: string = "Hello";
    arrayProp: number[] = [1, 2, 3];
    tupleProp: [string, number] = ["typescript", 4];
    enumProp: Color = Color.Green;
    anyProp: any = { key: "value" };
    voidProp: void = undefined;
    nullProp: null = null;
    undefinedProp: undefined = undefined;
    objectProp: object = { name: "John", age: 30 };
    sendableClass: SendableClass = new SendableClass();
    noSendableClass: NoSendableClass = new NoSendableClass();

    optBooleanProp1?: boolean = true;
    optNumberProp1?: number = 42;
    optStringProp1?: string = "Hello";
    optArrayProp1?: number[] = [1, 2, 3];
    optTupleProp1?: [string, number] = ["typescript", 4];
    optEnumProp1?: Color = Color.Green;
    optAnyProp1?: any = { key: "value" };
    optVoidProp1?: void = undefined;
    optNullProp1?: null = null;
    optUndefinedProp1?: undefined = undefined;
    optObjectProp1?: object = { name: "John", age: 30 };
    optSendableClass1?: SendableClass = new SendableClass();
    optNoSendableClass1?: NoSendableClass = new NoSendableClass();

    public optBooleanProp2: boolean = true;
    public optNumberProp2: number = 42;
    public optStringProp2: string = "Hello";
    public optArrayProp2: number[] = [1, 2, 3];
    public optTupleProp2: [string, number] = ["typescript", 4];
    public optEnumProp2: Color = Color.Green;
    public optAnyProp2: any = { key: "value" };
    public optVoidProp2: void = undefined;
    public optNullProp2: null = null;
    public optUndefinedProp2: undefined = undefined;
    public optObjectProp2: object = { name: "John", age: 30 };
    public optSendableClass2: SendableClass = new SendableClass();
    public optNoSendableClass2: NoSendableClass = new NoSendableClass();

    readonly optBooleanProp3: boolean = true;
    readonly optNumberProp3: number = 42;
    readonly optStringProp3: string = "Hello";
    readonly optArrayProp3: number[] = [1, 2, 3];
    readonly optTupleProp3: [string, number] = ["typescript", 4];
    readonly optEnumProp3: Color = Color.Green;
    readonly optAnyProp3: any = { key: "value" };
    readonly optVoidProp3: void = undefined;
    readonly optNullProp3: null = null;
    readonly optUndefinedProp3: undefined = undefined;
    readonly optObjectProp3: object = { name: "John", age: 30 };
    readonly optSendableClass3: SendableClass = new SendableClass();
    readonly optNoSendableClass3: NoSendableClass = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp4 = true;
    numberProp4 = 42;
    stringProp4 = "Hello";
    arrayProp4 = [1, 2, 3];
    tupleProp4 = ["typescript", 4];
    enumProp4 = Color.Green;
    anyProp4 = { key: "value" };
    voidProp4 = undefined;
    nullProp4 = null;
    undefinedProp4 = undefined;
    objectProp4 = { name: "John", age: 30 };
    sendableClass4 = new SendableClass();
    noSendableClass4 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp5? = true;
    numberProp5? = 42;
    stringProp5? = "Hello";
    arrayProp5? = [1, 2, 3];
    tupleProp5? = ["typescript", 4];
    enumProp5? = Color.Green;
    anyProp5? = { key: "value" };
    voidProp5? = undefined;
    nullProp5? = null;
    undefinedProp5? = undefined;
    objectProp5? = { name: "John", age: 30 };
    sendableClass5? = new SendableClass();
    noSendableClass5? = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    public optBooleanProp6 = true;
    public optNumberProp6 = 42;
    public optStringProp6 = "Hello";
    public optArrayProp6 = [1, 2, 3];
    public optTupleProp6 = ["typescript", 4];
    public optEnumProp6 = Color.Green;
    public optAnyProp6 = { key: "value" };
    public optVoidProp6 = undefined;
    public optNullProp6 = null;
    public optUndefinedProp6 = undefined;
    public optObjectProp6 = { name: "John", age: 30 };
    public optSendableClass6 = new SendableClass();
    public optNoSendableClass6 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    readonly optBooleanProp7 = true;
    readonly optNumberProp7 = 42;
    readonly optStringProp7 = "Hello";
    readonly optArrayProp7 = [1, 2, 3];
    readonly optTupleProp7 = ["typescript", 4];
    readonly optEnumProp7 = Color.Green;
    readonly optAnyProp7 = { key: "value" };
    readonly optVoidProp7 = undefined;
    readonly optNullProp7 = null;
    readonly optUndefinedProp7 = undefined;
    readonly optObjectProp7 = { name: "John", age: 30 };
    readonly optSendableClass7 = new SendableClass();
    readonly optNoSendableClass7 = new NoSendableClass();
}

@Sendable
class A1 extends A {
    constructor() {
        super();
    }
    booleanProp: boolean = true;
    numberProp: number = 42;
    stringProp: string = "Hello";
    arrayProp: number[] = [1, 2, 3];
    tupleProp: [string, number] = ["typescript", 4];
    enumProp: Color = Color.Green;
    anyProp: any = { key: "value" };
    voidProp: void = undefined;
    nullProp: null = null;
    undefinedProp: undefined = undefined;
    objectProp: object = { name: "John", age: 30 };
    sendableClass: SendableClass = new SendableClass();
    noSendableClass: NoSendableClass = new NoSendableClass();

    optBooleanProp1?: boolean = true;
    optNumberProp1?: number = 42;
    optStringProp1?: string = "Hello";
    optArrayProp1?: number[] = [1, 2, 3];
    optTupleProp1?: [string, number] = ["typescript", 4];
    optEnumProp1?: Color = Color.Green;
    optAnyProp1?: any = { key: "value" };
    optVoidProp1?: void = undefined;
    optNullProp1?: null = null;
    optUndefinedProp1?: undefined = undefined;
    optObjectProp1?: object = { name: "John", age: 30 };
    optSendableClass1?: SendableClass = new SendableClass();
    optNoSendableClass1?: NoSendableClass = new NoSendableClass();

    public optBooleanProp2: boolean = true;
    public optNumberProp2: number = 42;
    public optStringProp2: string = "Hello";
    public optArrayProp2: number[] = [1, 2, 3];
    public optTupleProp2: [string, number] = ["typescript", 4];
    public optEnumProp2: Color = Color.Green;
    public optAnyProp2: any = { key: "value" };
    public optVoidProp2: void = undefined;
    public optNullProp2: null = null;
    public optUndefinedProp2: undefined = undefined;
    public optObjectProp2: object = { name: "John", age: 30 };
    public optSendableClass2: SendableClass = new SendableClass();
    public optNoSendableClass2: NoSendableClass = new NoSendableClass();

    readonly optBooleanProp3: boolean = true;
    readonly optNumberProp3: number = 42;
    readonly optStringProp3: string = "Hello";
    readonly optArrayProp3: number[] = [1, 2, 3];
    readonly optTupleProp3: [string, number] = ["typescript", 4];
    readonly optEnumProp3: Color = Color.Green;
    readonly optAnyProp3: any = { key: "value" };
    readonly optVoidProp3: void = undefined;
    readonly optNullProp3: null = null;
    readonly optUndefinedProp3: undefined = undefined;
    readonly optObjectProp3: object = { name: "John", age: 30 };
    readonly optSendableClass3: SendableClass = new SendableClass();
    readonly optNoSendableClass3: NoSendableClass = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp4 = true;
    numberProp4 = 42;
    stringProp4 = "Hello";
    arrayProp4 = [1, 2, 3];
    tupleProp4 = ["typescript", 4];
    enumProp4 = Color.Green;
    anyProp4 = { key: "value" };
    voidProp4 = undefined;
    nullProp4 = null;
    undefinedProp4 = undefined;
    objectProp4 = { name: "John", age: 30 };
    sendableClass4 = new SendableClass();
    noSendableClass4 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp5? = true;
    numberProp5? = 42;
    stringProp5? = "Hello";
    arrayProp5? = [1, 2, 3];
    tupleProp5? = ["typescript", 4];
    enumProp5? = Color.Green;
    anyProp5? = { key: "value" };
    voidProp5? = undefined;
    nullProp5? = null;
    undefinedProp5? = undefined;
    objectProp5? = { name: "John", age: 30 };
    sendableClass5? = new SendableClass();
    noSendableClass5? = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    public optBooleanProp6 = true;
    public optNumberProp6 = 42;
    public optStringProp6 = "Hello";
    public optArrayProp6 = [1, 2, 3];
    public optTupleProp6 = ["typescript", 4];
    public optEnumProp6 = Color.Green;
    public optAnyProp6 = { key: "value" };
    public optVoidProp6 = undefined;
    public optNullProp6 = null;
    public optUndefinedProp6 = undefined;
    public optObjectProp6 = { name: "John", age: 30 };
    public optSendableClass6 = new SendableClass();
    public optNoSendableClass6 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    readonly optBooleanProp7 = true;
    readonly optNumberProp7 = 42;
    readonly optStringProp7 = "Hello";
    readonly optArrayProp7 = [1, 2, 3];
    readonly optTupleProp7 = ["typescript", 4];
    readonly optEnumProp7 = Color.Green;
    readonly optAnyProp7 = { key: "value" };
    readonly optVoidProp7 = undefined;
    readonly optNullProp7 = null;
    readonly optUndefinedProp7 = undefined;
    readonly optObjectProp7 = { name: "John", age: 30 };
    readonly optSendableClass7 = new SendableClass();
    readonly optNoSendableClass7 = new NoSendableClass();
}

@Sendable
class A2 implements lang.ISendable {
    booleanProp: boolean = true;
    numberProp: number = 42;
    stringProp: string = "Hello";
    arrayProp: number[] = [1, 2, 3];
    tupleProp: [string, number] = ["typescript", 4];
    enumProp: Color = Color.Green;
    anyProp: any = { key: "value" };
    voidProp: void = undefined;
    nullProp: null = null;
    undefinedProp: undefined = undefined;
    objectProp: object = { name: "John", age: 30 };
    sendableClass: SendableClass = new SendableClass();
    noSendableClass: NoSendableClass = new NoSendableClass();

    optBooleanProp1?: boolean = true;
    optNumberProp1?: number = 42;
    optStringProp1?: string = "Hello";
    optArrayProp1?: number[] = [1, 2, 3];
    optTupleProp1?: [string, number] = ["typescript", 4];
    optEnumProp1?: Color = Color.Green;
    optAnyProp1?: any = { key: "value" };
    optVoidProp1?: void = undefined;
    optNullProp1?: null = null;
    optUndefinedProp1?: undefined = undefined;
    optObjectProp1?: object = { name: "John", age: 30 };
    optSendableClass1?: SendableClass = new SendableClass();
    optNoSendableClass1?: NoSendableClass = new NoSendableClass();

    public optBooleanProp2: boolean = true;
    public optNumberProp2: number = 42;
    public optStringProp2: string = "Hello";
    public optArrayProp2: number[] = [1, 2, 3];
    public optTupleProp2: [string, number] = ["typescript", 4];
    public optEnumProp2: Color = Color.Green;
    public optAnyProp2: any = { key: "value" };
    public optVoidProp2: void = undefined;
    public optNullProp2: null = null;
    public optUndefinedProp2: undefined = undefined;
    public optObjectProp2: object = { name: "John", age: 30 };
    public optSendableClass2: SendableClass = new SendableClass();
    public optNoSendableClass2: NoSendableClass = new NoSendableClass();

    readonly optBooleanProp3: boolean = true;
    readonly optNumberProp3: number = 42;
    readonly optStringProp3: string = "Hello";
    readonly optArrayProp3: number[] = [1, 2, 3];
    readonly optTupleProp3: [string, number] = ["typescript", 4];
    readonly optEnumProp3: Color = Color.Green;
    readonly optAnyProp3: any = { key: "value" };
    readonly optVoidProp3: void = undefined;
    readonly optNullProp3: null = null;
    readonly optUndefinedProp3: undefined = undefined;
    readonly optObjectProp3: object = { name: "John", age: 30 };
    readonly optSendableClass3: SendableClass = new SendableClass();
    readonly optNoSendableClass3: NoSendableClass = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp4 = true;
    numberProp4 = 42;
    stringProp4 = "Hello";
    arrayProp4 = [1, 2, 3];
    tupleProp4 = ["typescript", 4];
    enumProp4 = Color.Green;
    anyProp4 = { key: "value" };
    voidProp4 = undefined;
    nullProp4 = null;
    undefinedProp4 = undefined;
    objectProp4 = { name: "John", age: 30 };
    sendableClass4 = new SendableClass();
    noSendableClass4 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    booleanProp5? = true;
    numberProp5? = 42;
    stringProp5? = "Hello";
    arrayProp5? = [1, 2, 3];
    tupleProp5? = ["typescript", 4];
    enumProp5? = Color.Green;
    anyProp5? = { key: "value" };
    voidProp5? = undefined;
    nullProp5? = null;
    undefinedProp5? = undefined;
    objectProp5? = { name: "John", age: 30 };
    sendableClass5? = new SendableClass();
    noSendableClass5? = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    public optBooleanProp6 = true;
    public optNumberProp6 = 42;
    public optStringProp6 = "Hello";
    public optArrayProp6 = [1, 2, 3];
    public optTupleProp6 = ["typescript", 4];
    public optEnumProp6 = Color.Green;
    public optAnyProp6 = { key: "value" };
    public optVoidProp6 = undefined;
    public optNullProp6 = null;
    public optUndefinedProp6 = undefined;
    public optObjectProp6 = { name: "John", age: 30 };
    public optSendableClass6 = new SendableClass();
    public optNoSendableClass6 = new NoSendableClass();

    // Error, Field in sendable class must have type annotation (arkts-sendable-explicit-field-type)
    readonly optBooleanProp7 = true;
    readonly optNumberProp7 = 42;
    readonly optStringProp7 = "Hello";
    readonly optArrayProp7 = [1, 2, 3];
    readonly optTupleProp7 = ["typescript", 4];
    readonly optEnumProp7 = Color.Green;
    readonly optAnyProp7 = { key: "value" };
    readonly optVoidProp7 = undefined;
    readonly optNullProp7 = null;
    readonly optUndefinedProp7 = undefined;
    readonly optObjectProp7 = { name: "John", age: 30 };
    readonly optSendableClass7 = new SendableClass();
    readonly optNoSendableClass7 = new NoSendableClass();
}

class A3 {
    booleanProp: boolean = true;
    numberProp: number = 42;
    stringProp: string = "Hello";
    arrayProp: number[] = [1, 2, 3];
    tupleProp: [string, number] = ["typescript", 4];
    enumProp: Color = Color.Green;
    anyProp: any = { key: "value" };
    voidProp: void = undefined;
    nullProp: null = null;
    undefinedProp: undefined = undefined;
    objectProp: object = { name: "John", age: 30 };
    sendableClass: SendableClass = new SendableClass();
    noSendableClass: NoSendableClass = new NoSendableClass();

    optBooleanProp1?: boolean = true;
    optNumberProp1?: number = 42;
    optStringProp1?: string = "Hello";
    optArrayProp1?: number[] = [1, 2, 3];
    optTupleProp1?: [string, number] = ["typescript", 4];
    optEnumProp1?: Color = Color.Green;
    optAnyProp1?: any = { key: "value" };
    optVoidProp1?: void = undefined;
    optNullProp1?: null = null;
    optUndefinedProp1?: undefined = undefined;
    optObjectProp1?: object = { name: "John", age: 30 };
    optSendableClass1?: SendableClass = new SendableClass();
    optNoSendableClass1?: NoSendableClass = new NoSendableClass();

    public optBooleanProp2: boolean = true;
    public optNumberProp2: number = 42;
    public optStringProp2: string = "Hello";
    public optArrayProp2: number[] = [1, 2, 3];
    public optTupleProp2: [string, number] = ["typescript", 4];
    public optEnumProp2: Color = Color.Green;
    public optAnyProp2: any = { key: "value" };
    public optVoidProp2: void = undefined;
    public optNullProp2: null = null;
    public optUndefinedProp2: undefined = undefined;
    public optObjectProp2: object = { name: "John", age: 30 };
    public optSendableClass2: SendableClass = new SendableClass();
    public optNoSendableClass2: NoSendableClass = new NoSendableClass();

    readonly optBooleanProp3: boolean = true;
    readonly optNumberProp3: number = 42;
    readonly optStringProp3: string = "Hello";
    readonly optArrayProp3: number[] = [1, 2, 3];
    readonly optTupleProp3: [string, number] = ["typescript", 4];
    readonly optEnumProp3: Color = Color.Green;
    readonly optAnyProp3: any = { key: "value" };
    readonly optVoidProp3: void = undefined;
    readonly optNullProp3: null = null;
    readonly optUndefinedProp3: undefined = undefined;
    readonly optObjectProp3: object = { name: "John", age: 30 };
    readonly optSendableClass3: SendableClass = new SendableClass();
    readonly optNoSendableClass3: NoSendableClass = new NoSendableClass();

    booleanProp4 = true;
    numberProp4 = 42;
    stringProp4 = "Hello";
    arrayProp4 = [1, 2, 3];
    tupleProp4 = ["typescript", 4];
    enumProp4 = Color.Green;
    anyProp4 = { key: "value" };
    voidProp4 = undefined;
    nullProp4 = null;
    undefinedProp4 = undefined;
    objectProp4 = { name: "John", age: 30 };
    sendableClass4 = new SendableClass();
    noSendableClass4 = new NoSendableClass();

    booleanProp5? = true;
    numberProp5? = 42;
    stringProp5? = "Hello";
    arrayProp5? = [1, 2, 3];
    tupleProp5? = ["typescript", 4];
    enumProp5? = Color.Green;
    anyProp5? = { key: "value" };
    voidProp5? = undefined;
    nullProp5? = null;
    undefinedProp5? = undefined;
    objectProp5? = { name: "John", age: 30 };
    sendableClass5? = new SendableClass();
    noSendableClass5? = new NoSendableClass();

    public optBooleanProp6 = true;
    public optNumberProp6 = 42;
    public optStringProp6 = "Hello";
    public optArrayProp6 = [1, 2, 3];
    public optTupleProp6 = ["typescript", 4];
    public optEnumProp6 = Color.Green;
    public optAnyProp6 = { key: "value" };
    public optVoidProp6 = undefined;
    public optNullProp6 = null;
    public optUndefinedProp6 = undefined;
    public optObjectProp6 = { name: "John", age: 30 };
    public optSendableClass6 = new SendableClass();
    public optNoSendableClass6 = new NoSendableClass();

    readonly optBooleanProp7 = true;
    readonly optNumberProp7 = 42;
    readonly optStringProp7 = "Hello";
    readonly optArrayProp7 = [1, 2, 3];
    readonly optTupleProp7 = ["typescript", 4];
    readonly optEnumProp7 = Color.Green;
    readonly optAnyProp7 = { key: "value" };
    readonly optVoidProp7 = undefined;
    readonly optNullProp7 = null;
    readonly optUndefinedProp7 = undefined;
    readonly optObjectProp7 = { name: "John", age: 30 };
    readonly optSendableClass7 = new SendableClass();
    readonly optNoSendableClass7 = new NoSendableClass();
}

interface I extends lang.ISendable {
    booleanProp: boolean;
    numberProp: number;
    stringProp: string;
    arrayProp: number[];
    tupleProp: [string, number];
    enumProp: Color;
    anyProp: any;
    voidProp: void;
    nullProp: null;
    undefinedProp: undefined;
    objectProp: object;
    sendableClass: SendableClass;
    noSendableClass: NoSendableClass;

    optBooleanProp1?: boolean;
    optNumberProp1?: number;
    optStringProp1?: string;
    optArrayProp1?: number[];
    optTupleProp1?: [string, number];
    optEnumProp1?: Color;
    optAnyProp1?: any;
    optVoidProp1?: void;
    optNullProp1?: null;
    optUndefinedProp1?: undefined;
    optObjectProp1?: object;
    optSendableClass1?: SendableClass;
    optNoSendableClass1?: NoSendableClass;

    readonly optBooleanProp3: boolean;
    readonly optNumberProp3: number;
    readonly optStringProp3: string;
    readonly optArrayProp3: number[];
    readonly optTupleProp3: [string, number];
    readonly optEnumProp3: Color;
    readonly optAnyProp3: any;
    readonly optVoidProp3: void;
    readonly optNullProp3: null;
    readonly optUndefinedProp3: undefined;
    readonly optObjectProp3: object;
    readonly optSendableClass3: SendableClass;
    readonly optNoSendableClass3: NoSendableClass;
}