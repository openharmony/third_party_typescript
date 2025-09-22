//@etsAnnotationsEnable: true

// @filename: A.d.ets
export @interface Available {
    minApiVersion: string = "1";
}

// @filename: B.ets
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export interface testI {
    @Available({minApiVersion: 'OpenHarmony 20'})
    prop1: string;

    @Available({minApiVersion: 'OpenHarmony 20'})
    f(): void;

    @Available({minApiVersion: 'OpenHarmony 20'})
    get prop(): string;

    @Available({minApiVersion: 'OpenHarmony 20'})
    set prop(value: string);
}