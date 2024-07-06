

@Sendable // OK
function sf():void { 
} 
@Sendable // OK
function stf<T>(p:T):T {
  return p;
} 
@Sendable 
@Other  // ERROR
function sf2():void {
}