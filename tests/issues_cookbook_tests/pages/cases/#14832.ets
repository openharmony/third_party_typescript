let b=BigInt(4556);

+b: // should error: Operator '+' cannot be applied to type "bigint 
-b; // should no error: arkts-no-polymorphic-unops 
~b; // should no error: arkts-no-polymorphic-unops


export let other = 1;