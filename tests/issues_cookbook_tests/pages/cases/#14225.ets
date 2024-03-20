interface SegmentButtonTextltem1 {
    text: string;
}
declare type ItemRestriction<T> = [
    T,
    T?, // '?" cause arkts-no-untyped-obj-literals
];
interface TabSegmentButtonConstructionOptions1 {
    buttons: ItemRestriction<SegmentButtonTextltem1>;
}
let a: TabSegmentButtonConstructionOptions1 = { //should NOT report 
    buttons: [
        { text: 's1' },
        { text: 's2' }
    ],
}


export let other = 1;