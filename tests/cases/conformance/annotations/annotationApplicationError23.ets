//@etsAnnotationsEnable: true

// @filename: A.d.ets
export @interface Available {
    minApiVersion: string = "1";
}

// @filename: B.ets
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export let a1: number = 1;

@Available({minApiVersion: 'OpenHarmony 20'})
export const a2: number = 1;