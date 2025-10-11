//@etsAnnotationsEnable: true

// @filename: A.d.ets
export @interface Available {
    minApiVersion: string = "1";
}

// @filename: B.ets
import { Available } from "./A";

@Available({minApiVersion: 'OpenHarmony 20'})
export function testFunc(): void {
    return;
}