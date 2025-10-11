//@etsAnnotationsEnable: true

// @filename: A.d.ets
export @interface Available {
    minApiVersion: string = "1";
}

// @filename: B.ets
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export class C {
    @Available({minApiVersion: 'OpenHarmony 20'})
    prop1: string = "1";

    @Available({minApiVersion: 'OpenHarmony 20'})
    func1(): void {};

    @Available({minApiVersion: 'OpenHarmony 20'})
    static sFunc1(): void {};

    @Available({minApiVersion: 'OpenHarmony 20'})
    get prop(): string {
        return this.prop1;
    }

    @Available({minApiVersion: 'OpenHarmony 20'})
    set prop(value: string) {
        this.prop1 = value;
    }
}