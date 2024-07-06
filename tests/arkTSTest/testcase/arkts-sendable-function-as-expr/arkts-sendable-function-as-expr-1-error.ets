@Sendable 
function sf(): void {} 
function nf(): void {}

@Sendable 
type Sft = () => void; 
type Nft = () => void;


const a1: Nft = sf;
const a2: Nft = nf;
const a3: Sft = sf as Sft; // OK
const a4: Sft = nf as Sft; // ERROR
const a5: Sft = a1 as Sft; // ERROR
const a6: Sft = a2 as Sft; // ERROR