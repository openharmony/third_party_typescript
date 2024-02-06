namespace ts {

export enum TimePhase {
    START= "start",
    GET_PROGRAM= "getProgram(not ArkTSLinter)",
    UPDATE_ERROR_FILE= "updateErrorFile",
    INIT= "init",
    STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS= "strictProgramGetSemanticDiagnostics",
    NON_STRICT_PROGRAM_GET_SEMANTIC_DIAGNOSTICS= "nonStrictProgramGetSemanticDiagnostics",
    NON_STRICT_PROGRAM_GET_SYNTACTIC_DIAGNOSTICS= "nonStrictProgramGetSyntacticDiagnostics",
    GET_TSC_DIAGNOSTICS= "getTscDiagnostics",
    EMIT_BUILD_INFO= "emitBuildInfo",
    LINT= "lint"
}

export class ArkTSLinterTimePrinter {
    private static instance?: ArkTSLinterTimePrinter
    private arkTSTimePrintSwitch: boolean;
    private timeMap = new Map<string, number>();
    private constructor(ArkTSTimePrintSwitch: boolean = false) {
        this.arkTSTimePrintSwitch = ArkTSTimePrintSwitch;
    }

    public static getInstance(): ArkTSLinterTimePrinter {
        if (!ArkTSLinterTimePrinter.instance) {
            ArkTSLinterTimePrinter.instance = new ArkTSLinterTimePrinter()
        }
        return ArkTSLinterTimePrinter.instance
    }

    public static destroyInstance() {
        ArkTSLinterTimePrinter.instance = undefined;
    }

    public setArkTSTimePrintSwitch(arkTSTimePrintSwitch: boolean) {
        this.arkTSTimePrintSwitch = arkTSTimePrintSwitch
    }

    public appendTime(key: string) {
        if (this.arkTSTimePrintSwitch) {
            this.timeMap.set(key, Date.now());
        }
    }

    private formatMapAsTable(map: Map<number>): string {
        if (!map.has(TimePhase.START)) {
            return "ArkTSLinterTimePrinter: START phase is not exist!";
        }
        let maxKeyLength = 0, lastVal = 0, sum = 0;
        let printMap = new Map(map);
        printMap.forEach((value, key) => {
            maxKeyLength = Math.max(maxKeyLength, key.toString().length);
            if (key != TimePhase.START) {
                let relativeVal = value - lastVal;
                if (key != TimePhase.GET_PROGRAM) {
                    sum += relativeVal;
                }
                printMap.set(key, relativeVal / 1000.0);
            }
            lastVal = value;
        });
        printMap.set('total', sum / 1000.0);

        let table = '';
        printMap.forEach((value, key) => {
            if (key != TimePhase.START) {
                const paddedKey = key.toString().padEnd(maxKeyLength, ' ');
                table += `${paddedKey} | ${value.toString()}\n`;
            }
        });
        const header = `${'Phase'.padEnd(maxKeyLength, ' ')} | Time(seconds)\n`;
        const FIXLENGTH = ('Phase' + 'Time').length;
        const separator = '-'.repeat(maxKeyLength + FIXLENGTH) + '\n';
        return `${header}${separator}${table}`;
    }

    public printTimes() {
        if (this.arkTSTimePrintSwitch) {
            const formattedMap = this.formatMapAsTable(this.timeMap);
            console.log(formattedMap);
        }
    }
}

}