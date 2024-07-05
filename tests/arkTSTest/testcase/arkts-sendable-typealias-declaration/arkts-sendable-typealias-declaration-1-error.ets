@Sendable 
type Sft = () => void; // OK
@Sendable 
type Sft2<T> = () => void; // OK
@Sendable 
type Sft3 = <T>(p:T) => T; // OK
@Sendable 
type Sft5 = number; // ERROR
@Sendable 
type Sft6 = Sft; // ERROR
type Sft7 = () => void;

@Sendable 
type Sft8 = Sft4; // ERROR

type Nft = () => void;