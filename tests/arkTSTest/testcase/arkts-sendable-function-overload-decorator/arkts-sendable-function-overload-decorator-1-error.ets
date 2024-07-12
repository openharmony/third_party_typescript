// check overloading
@Sendable 
function sf3():void; // OK
@Sendable 
function sf3():void;
@Sendable 
function sf3():void {}

@Sendable 
function sf4():void;
function sf4():void; // ERROR
@Sendable 
function sf4():void {}

@Sendable 
function sf5():void;

@Sendable 
@Other // ERROR
function sf5():void;

@Sendable 
function sf5():void {}

function nf():void {}