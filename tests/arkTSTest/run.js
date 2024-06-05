/*
 * Copyright (c) 2023 Huawei Device Co., Ltd.
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


const ts = require('typescript');
const path = require('path');
const fs = require('fs')


const ignoreCaseFilePath= path.join(__dirname, "ignorecase.json")
const compResults = {"detail":{}, 'failNum':0, "passedNum":0}
let consoleDetail = false;
let ignoreList = [];
let failTestCaseList = [];
let genResultFile = false;
let arktsVersion = '1.1';
// Traverse the directory to find all test cases
function getAllETSFiles(filePath) {
  let allFilePaths = [];
  if (fs.existsSync(filePath)) {
      const files = fs.readdirSync(filePath);
      for (let i = 0; i < files.length; i++) {
          let file = files[i]; // File name (excluding file path)
          let currentFilePath = filePath + '/' + file;
          let stats = fs.lstatSync(currentFilePath);
          if(ignoreList.includes(currentFilePath)){
            continue
          }
          if (stats.isDirectory()) {
              allFilePaths = allFilePaths.concat(getAllETSFiles(currentFilePath));
          } else {
              var index= currentFilePath.lastIndexOf(".");
              var ext = currentFilePath.substring(index+1);
              if (ext === 'ets' || ext === 'ts') {
                allFilePaths.push(currentFilePath);
                runComp(currentFilePath, file)
              }
          }
      }
  } else {
      console.warn(`The specified directory ${filePath} Non-existent!`);
  }
  return allFilePaths;
}

function runComp(currentFilePath, file){
    const result = runLinter(currentFilePath)
    let jsonFile = currentFilePath.replace('.ets', '.json');
    jsonFile = jsonFile.replace('.ts', '.json');
    const checkfile = fs.existsSync(jsonFile);
    if(checkfile){
      loadPares(jsonFile, result, currentFilePath, file)
    }else{
      if(!currentFilePath.includes("-dependencie.ets")){
        console.log(`Test cases ${currentFilePath} expected results are not added`)
      }
    }
}

function forceUpdateExpected(expect, reality, jsonFile) {
  let updateArray = [];
  for (let i = 0; i < reality.length; i++) {
    const realErrorItem = reality[i];
    const { line, character } = realErrorItem.file.getLineAndCharacterOfPosition(realErrorItem.start);
    const realLine = { 'line': line + 1, 'character': character + 1 };
    const realMessageText = typeof (realErrorItem.messageText) === 'string' ? realErrorItem.messageText : realErrorItem.messageText.messageText;
    let data = {
      messageText: realMessageText,
      expectLineAndCharacter: realLine
    };
    updateArray.push(data);
  }
  if (arktsVersion === '1.0') {
    expect.arktsVersion_1_0 = updateArray;
  } else {
    expect.arktsVersion_1_1 = updateArray;
  }
  let s = JSON.stringify(expect, null, 2);
  fs.writeFileSync(jsonFile, s);
}

// Compare the results with expectations and count the success and failure situations
function loadPares(jsonFile, result, currentFilePath, file){
  const dirName = path.dirname(currentFilePath)
  let rules = ""
  if (dirName.includes("\\")){
    rules = currentFilePath.split("\\")[currentFilePath.split("\\").length - 2]
  }else{
    rules = currentFilePath.split("/")[currentFilePath.split("/").length - 2]
  }
  const testCaseFileName = file
  dataStr = fs.readFileSync(jsonFile, "utf-8")
  const expect = JSON.parse(dataStr)
  // if need update expected files, insert forceUpdateExpected(expect, result, jsonFile) here.
  let expectByVersion = arktsVersion === '1.0' ? expect.arktsVersion_1_0 : expect.arktsVersion_1_1;
  if (expectByVersion === undefined) {
    expectByVersion = [];
  }

  const compResult = compareResult(expectByVersion, result);
  compResult["testCaseName"] = testCaseFileName
  if (Object.prototype.hasOwnProperty.call(compResults.detail, rules)) {
    compResults["detail"][rules]["detail"].push(compResult)
    compResults["detail"][rules]["testCaseNum"] += 1
  }else{
    compResults["detail"][rules] = {"detail":[compResult], "testCaseNum": 1, "failNum": 0, "passedNum": 0}
  }
  if(compResult.status){
    compResults["passedNum"] += 1
    compResults["detail"][rules]["passedNum"] += 1
  }else{
    failTestCaseList.push(currentFilePath)
    if(consoleDetail){
      console.log(`Test cases ${currentFilePath} Failed!`)
      for(let compDetail of compResult.detail){
        if(!compDetail.compResult){
          console.log(`==>  Expect the error in Line ${compDetail.expectLineAndCharacter.line} The ${compDetail.expectLineAndCharacter.character} character. Expect exception rules:${compDetail.expectMessageText}  Actual error line ${compDetail.realLineAndCharacter.line}  The ${compDetail.realLineAndCharacter.character} character. Actual exception rules:${compDetail.realMessageText} Comparison Result:Fail!`)
        }
      }
    }
    compResults["failNum"] += 1
    compResults['detail'][rules]["failNum"] += 1
  }
}


// initial configuration
options = ts.readConfigFile('tsconfig.json', ts.sys.readFile).config.compilerOptions;
const allPath = ['*'];
Object.assign(options, {
  'emitNodeModulesFiles': true,
  'importsNotUsedAsValues': ts.ImportsNotUsedAsValues.Preserve,
  'module': ts.ModuleKind.ES2020,
  'moduleResolution': ts.ModuleResolutionKind.NodeJs,
  'noEmit': true,
  'target': ts.ScriptTarget.ES2021,
  'baseUrl': "/",
  'paths': {
    '*': allPath
  },
  'lib': [
    'lib.es2021.d.ts'
  ],
  'types': [],
  'etsLoaderPath': 'null_sdkPath',
});

// Calling the runlinter interface
function runLinter(rootName) {
  nonStrictCheckParam = {
    allowJS: true,
    checkJs: false
  };
  Object.assign(options, nonStrictCheckParam);
  builderProgram = ts.createIncrementalProgramForArkTs({
      rootNames: [path.join(process.cwd(), rootName)],
      options: options,
    });

  let result = arktsVersion === '1.0' ? ts.ArkTSLinter_1_0.runArkTSLinter(builderProgram) : ts.ArkTSLinter_1_1.runArkTSLinter(builderProgram);
  return result;
}

// Compare the difference between the expected value and the actual return value of the runlinter to determine if the test has passed
function compareResult(expect, reality){
  let isPass = true
  const itemPassList = new Array()
   if(reality.length == 0){
      if(expect.length == 0){
        // pass
        isPass = true
      }else{
        isPass = false
        for(let expectInfo of expect){
          const compInfo = {
            'compResult':false,
            'realLineAndCharacter':{"line": null,"character": null},
            'realMessageText':null,
            'expectLineAndCharacter':{"line": expectInfo.expectLineAndCharacter.line,"character": expectInfo.expectLineAndCharacter.character},
            'expectMessageText':expectInfo.messageText,
          }
          itemPassList.push(compInfo)
        }
      }
   }else{
      if(expect.length == 0){
        isPass = false
        for(let realityInfo of reality){
            const { line, character } = realityInfo.file.getLineAndCharacterOfPosition(realityInfo.start)
            const compInfo = {
              'compResult':false,
              'realLineAndCharacter':{"line": line + 1,"character": character + 1},
              'realMessageText':realityInfo.messageText,
              'expectLineAndCharacter':{"line": null,"character": null},
              'expectMessageText':null,
            }
            itemPassList.push(compInfo)
        }
      }else{
        if( reality.length > expect.length){
          isPass = false
          for(let i=0; i<reality.length; i++){
            const realErrorItem = reality[i]
            const { line, character } = realErrorItem.file.getLineAndCharacterOfPosition(realErrorItem.start)
            const realLine = {"line": line + 1,"character": character + 1}
            const realMessageText = typeof (realErrorItem.messageText) === 'string' ? realErrorItem.messageText : realErrorItem.messageText.messageText;
            let expectMessageText = null
            let compResult = false
            let expectLineAndCharacter = {"line": null,"character": null}
            if( expect.length < i+1){
              compResult = false
            }else{
              expectErrorItem = expect[i]
              expectLineAndCharacter = {"line": expectErrorItem.expectLineAndCharacter.line,"character": expectErrorItem.expectLineAndCharacter.character}
              expectMessageText = expectErrorItem.messageText
              if ((expectErrorItem.expectLineAndCharacter.line === realLine.line && expectErrorItem.expectLineAndCharacter.character === realLine.character) &&
                realMessageText === expectMessageText) {
                compResult = true
              }
            }
            const compInfo = {
              'compResult':compResult,
              'realLineAndCharacter':realLine,
              'realMessageText':realMessageText,
              'expectLineAndCharacter':expectLineAndCharacter,
              'expectMessageText':expectMessageText,
            }
            itemPassList.push(compInfo)
          }
        }else if(reality.length < expect.length){
          isPass = false
          for(let i=0; i<expect.length; i++){
            const expectErrorItem = expect[i]
            const expectMessageText = expectErrorItem.messageText
            let expectLineAndCharacter = {"line": expectErrorItem.expectLineAndCharacter.line,"character": expectErrorItem.expectLineAndCharacter.character}
            let realLine = {"line": null,"character": null}
            let realMessageText = null
            let compResult = false
            if( reality.length < i+1){
              compResult = false
            }else{
              const realErrorItem = reality[i]
              const { line, character } = realErrorItem.file.getLineAndCharacterOfPosition(realErrorItem.start)
              realLine = {"line": line + 1,"character": character + 1}
              realMessageText = typeof (realErrorItem.messageText) === 'string' ? realErrorItem.messageText : realErrorItem.messageText.messageText;
              if ((expectErrorItem.expectLineAndCharacter.line === realLine.line && expectErrorItem.expectLineAndCharacter.character === realLine.character) &&
                realMessageText === expectMessageText) {
                compResult = true
              }
            }
            const compInfo = {
              'compResult':compResult,
              'realLineAndCharacter':realLine,
              'realMessageText':realMessageText,
              'expectLineAndCharacter':expectLineAndCharacter,
              'expectMessageText':expectMessageText,
            }
            itemPassList.push(compInfo)
          }
        }else{
            for(let i =0;i<reality.length;i++){
              const realErrorItem = reality[i]
              const expectErrorItem = expect[i]
              const expectMessageText = expectErrorItem.messageText
              let expectLineAndCharacter = {"line": expectErrorItem.expectLineAndCharacter.line,"character": expectErrorItem.expectLineAndCharacter.character}
              const { line, character } = realErrorItem.file.getLineAndCharacterOfPosition(realErrorItem.start)
              const realLine = {"line": line + 1,"character": character + 1}
              const realMessageText = typeof (realErrorItem.messageText) === 'string' ? realErrorItem.messageText : realErrorItem.messageText.messageText;
              let compInfo = null; compResult = false
              if ((expectErrorItem.expectLineAndCharacter.line === realLine.line && expectErrorItem.expectLineAndCharacter.character === realLine.character) &&
                realMessageText === expectMessageText) {
                compResult = true
              }else{
                isPass = false
              }
              compInfo = {
                'compResult':compResult,
                'realLineAndCharacter':realLine,
                'realMessageText':realMessageText,
                'expectLineAndCharacter':expectLineAndCharacter,
                'expectMessageText':expectMessageText,
              }
              itemPassList.push(compInfo)
            }
      }
    }
  }
  return {"status":isPass, "detail":itemPassList}
}

// output result file
function writeResult(result){
  const dir = path.join(__dirname, "test_results")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }
  fs.writeFileSync(path.join(dir, "test_result.json"), JSON.stringify(result, null, 4))
}


function run(){
   let interval = 0, startTime = process.uptime()*1000, endTime = startTime;
   const pathParam = getParam()
   let filePath = 'testcase'
   if(pathParam){
    filePath = pathParam
   }
   let ignoreCaseConfigList = []
   if(fs.existsSync(ignoreCaseFilePath)){
    ignoreCaseConfigList = JSON.parse(fs.readFileSync(ignoreCaseFilePath)).ignoreCase
   }

   ignoreList = ignoreList.concat(ignoreCaseConfigList)
   let filePathStats = fs.lstatSync(filePath)
   if(!filePathStats.isDirectory()){
      runComp(filePath, path.basename(filePath))
   }else{
      getAllETSFiles(filePath)
   }
   endTime = process.uptime()*1000
   interval = (endTime - startTime);
   const compReportDetail = {"compDetail": compResults, "compTime": interval, "failNum": compResults.failNum, "passedNum": compResults.passedNum}
   const testCaseSum = compReportDetail.failNum + compReportDetail.passedNum
   compReportDetail["testCaseSum"] = testCaseSum
   console.log(`Total number of test cases:${testCaseSum} Number of use cases passed:${compResults.passedNum} The number of use cases that failed:${compResults.failNum} Total running time:${JSON.stringify(interval).split(".")[0]}ms`)
   if(genResultFile){
     writeResult(compReportDetail)
   }
   if (failTestCaseList.length > 0){
      console.log("Failed test cases:")
      for(let testCase of failTestCaseList){
        console.log(testCase)
      }
    }
   if(ignoreList.length>0){
    console.log("Ignored test cases:")
    for(let ignoreCase of ignoreList){
      console.log(ignoreCase)
    }
   }
   if(compReportDetail.failNum){
    process.exit(1)
   }
}

// get parameters
function getParam(){
  let pathArg = null
  for(let key of process.argv){
    if(key.includes("-P:")){
      pathArg = key.replace("-P:", "")
    }
    if(key === "--detail" || key === "-D"){
      consoleDetail = true
    }
    if(key === "-e"){
      genResultFile = true
    }
    if(key.includes("--ignore-list:")){
      let ignoreStr = key.replace("--ignore-list:", "")
      ignoreList = ignoreStr.split(",")
    }
    if (key === '-v1.0') {
      arktsVersion = '1.0';
    }
    if (key === '-v1.1') {
      arktsVersion = '1.1';
    }
  }
  return pathArg
}

// execute
run()
