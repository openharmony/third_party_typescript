/*
 * Copyright (c) 2024 Huawei Device Co., Ltd.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'json5';
import {
    createSourceFile,
    forEachChild,
    isComputedPropertyName,
    isParameter,
    isPropertyAccessExpression,
    isStringLiteral,
    isTypeParameterDeclaration,
    ScriptTarget
 } from 'typescript';

export const visitTscLibNode = (astNode): void => {
    if (!astNode || !astNode.name) return;

    let nameToAdd: string;
    if (isStringLiteral(astNode.name)) {
        nameToAdd = astNode.name.text;
    } else if (isComputedPropertyName(astNode.name)) {
        nameToAdd = isPropertyAccessExpression(astNode.name.expression) ?
            undefined : astNode.name.expression.getText();
    } else {
        nameToAdd = astNode.name.getText();
    }

    if (nameToAdd && !isParameter(astNode) && !isTypeParameterDeclaration(astNode)) {
        resultSet.add(nameToAdd);
    }

    forEachChild(astNode, visitTscLibNode);
};

interface SystemApiWhitelist {
    [key: string]: string[];
}
const runTest = (files: string[], expectedFilePath: string, directoryPath: string): void => {
    let systemApiWhitelist: SystemApiWhitelist = {
        es2015: [], es2016: [], es2017: [], es2018: [], es2019: [], es2020: [], es2021: []
    };

    if (fs.existsSync(expectedFilePath)) {
        systemApiWhitelist = parse(fs.readFileSync(expectedFilePath, "utf-8"));
    } else {
        console.error(`LanguageWhitelist file does not exist in the directory ${expectedFilePath}`);
    }

    for (const key of Object.keys(systemApiWhitelist)) {
        systemApiWhitelist[key].forEach(element => expectSet.add(element));
    }

    files.forEach(fileName => {
        const filePath = path.join(directoryPath, fileName);
        if (fs.existsSync(filePath)) {
            fileCount++;
            const sourceFile = createSourceFile(fileName, fs.readFileSync(filePath).toString(), ScriptTarget.ES2015, true);
            forEachChild(sourceFile, visitTscLibNode);
        } else {
            console.error(`File ${fileName} does not exist in the directory ${directoryPath}`);
        }
    });

    const missingElements: string[] = [];
    resultSet.forEach(element => {
        if (!expectSet.has(element) && !skipElements.includes(element)) {
            missingElements.push(element);
        }
    });

    const result: string = (fileCount === scanFilesList.length) && (missingElements.length === 0) ?
        'success!' : 'fail!';
    console.log("----------------------------- System Api Test summary -----------------------------");
    console.log("Run result:", result);
    console.log("Scan file counts:", fileCount);
    console.log("Number of missing system api:", missingElements.length);
    console.log("Missing system api:", missingElements);
};

const scanFilesList: string[] = [
    "lib.es2015.collection.d.ts",
    "lib.es2015.core.d.ts",
    "lib.es2015.d.ts",
    "lib.es2015.generator.d.ts",
    "lib.es2015.iterable.d.ts",
    "lib.es2015.promise.d.ts",
    "lib.es2015.proxy.d.ts",
    "lib.es2015.reflect.d.ts",
    "lib.es2015.symbol.d.ts",
    "lib.es2015.symbol.wellknown.d.ts",
    "lib.es2016.array.include.d.ts",
    "lib.es2016.d.ts",
    "lib.es2017.d.ts",
    "lib.es2017.intl.d.ts",
    "lib.es2017.object.d.ts",
    "lib.es2017.sharedmemory.d.ts",
    "lib.es2017.string.d.ts",
    "lib.es2017.typedarrays.d.ts",
    "lib.es2018.asyncgenerator.d.ts",
    "lib.es2018.asynciterable.d.ts",
    "lib.es2018.d.ts",
    "lib.es2018.intl.d.ts",
    "lib.es2018.promise.d.ts",
    "lib.es2018.regexp.d.ts",
    "lib.es2019.array.d.ts",
    "lib.es2019.d.ts",
    "lib.es2019.intl.d.ts",
    "lib.es2019.object.d.ts",
    "lib.es2019.string.d.ts",
    "lib.es2019.symbol.d.ts",
    "lib.es2020.bigint.d.ts",
    "lib.es2020.date.d.ts",
    "lib.es2020.d.ts",
    "lib.es2020.intl.d.ts",
    "lib.es2020.number.d.ts",
    "lib.es2020.promise.d.ts",
    "lib.es2020.sharedmemory.d.ts",
    "lib.es2020.string.d.ts",
    "lib.es2020.symbol.wellknown.d.ts",
    "lib.es2021.d.ts",
    "lib.es2021.intl.d.ts",
    "lib.es2021.promise.d.ts",
    "lib.es2021.string.d.ts",
    "lib.es2021.weakref.d.ts",
    "lib.es5.d.ts",
];
const skipElements: string[] = [
    "MapConstructor",
    "ReadonlyMap",
    "WeakMapConstructor",
    "SetConstructor",
    "ReadonlySet",
    "WeakSetConstructor",
    "Generator",
    "GeneratorFunction",
    "GeneratorFunctionConstructor",
    "IteratorYieldResult",
    "IteratorReturnResult",
    "IteratorResult",
    "Iterable",
    "IterableIterator",
    "ProxyHandler",
    "ProxyConstructor",
    "proxy",
    "revoke",
    "literal",
    "DateTimeFormatPartTypes",
    "DateTimeFormatPart",
    "SharedArrayBufferConstructor",
    "recur",
    "BigUint64ArrayConstructor",
    "ImportCallOptions",
    "ImportAssertions",
    "Awaited",
    "ESObject"
];
const expectedFilePath = path.join(__dirname, "../../../../arkcompiler/ets_frontend/arkguard/src/configs/preset/es_reserved_properties_optimized.json");
const directoryPath = path.join(__dirname, "../../lib");
let fileCount: number = 0;
let resultSet: Set<string> = new Set<string>();
let expectSet: Set<string> = new Set<string>();

runTest(scanFilesList, expectedFilePath, directoryPath);