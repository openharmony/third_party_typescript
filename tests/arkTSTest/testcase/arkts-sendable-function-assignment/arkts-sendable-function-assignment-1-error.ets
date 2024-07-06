@Sendable 
function sf(): void {} 
function nf(): void {}

@Sendable 
type Sft = () => void; 
type Nft = () => void;

const af = () => {};


const a1: Sft = sf; // OK
const a2: Sft = nf; // ERROR
const a3: Sft = af; // ERROR
const a4: Nft = nf; // OK
const a5: Sft = a1; // OK
const a6: Sft = a4; // ERROR