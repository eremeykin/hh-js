import {EagerGraph} from './eager_graph.js';


function assert (check, msg){
    if( check )	return;
    throw new Error(msg || "Assertion failed!");
};

function isEmptyObject(obj){
    // from https://stackoverflow.com/questions/679915/how-do-i-test-for-an-empty-javascript-object
    return Object.keys(obj).length === 0 && obj.constructor === Object;
}

let graphDefinition, eagerGraph, calcResult, test_n;

test_n = 'eager test #1';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: () => 4
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 4, test_n);


test_n = 'eager test #2';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: () => 4,
    y: () => 5
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 4, test_n);
assert(calcResult.y === 5, test_n);

test_n = 'eager test #3';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 4,
    y: () => 5
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 9, test_n);
assert(calcResult.y === 5, test_n);


test_n = 'eager test #4';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: () => 5,
    z: () => 10
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 19, test_n);
assert(calcResult.y === 5, test_n);
assert(calcResult.z === 10, test_n);


test_n = 'eager test #5';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: (z) => 5+z,
    z: () => 10
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 29, test_n);
assert(calcResult.y === 15, test_n);
assert(calcResult.z === 10, test_n);


test_n = 'eager test #6';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: (t) => 5+t,
    z: (t) => 10+t,
    t: () => 7
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === 33, test_n);
assert(calcResult.y === 12, test_n);
assert(calcResult.z === 17, test_n);
assert(calcResult.t === 7, test_n);


test_n = 'eager test #7';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: (u) => u + 1,
    u: (v) => v + 1,
    v: (w) => w + 1
};

calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === undefined, test_n);
assert(calcResult.y === undefined, test_n);
assert(calcResult.z === undefined, test_n);
assert(calcResult.t === undefined, test_n);
assert(calcResult.u === undefined, test_n);
assert(calcResult.v === undefined, test_n);

test_n = 'eager test #8';
eagerGraph = new EagerGraph();
graphDefinition = {
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(isEmptyObject(calcResult),test_n);

test_n = 'eager test #9';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: () => 5,
    u: (k) => k + 7,
    k: (u) => u + 3
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.t === 5,test_n);
assert(calcResult.z === 6,test_n);
assert(calcResult.y === 7,test_n);
assert(calcResult.k === undefined,test_n);
assert(calcResult.u === undefined,test_n);
assert(calcResult.x === 8,test_n);


test_n = 'eager test #10';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: () => 5,
    u: (k) => k + 7,
    k: (t,u) => t + u + 3
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.t === 5,test_n);
assert(calcResult.z === 6,test_n);
assert(calcResult.y === 7,test_n);
assert(calcResult.k === undefined,test_n);
assert(calcResult.u === undefined,test_n);
assert(calcResult.x === 8,test_n);


test_n = 'eager test #11';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z,t) => z + 1 + t,
    z: (a,b) => b*a,
    t: (u,v,w) => u + 1 + v + 1 +w,
    u: (k,l) => k + 1 + l,
    v: (m,n) => m + 2 + n,
    w: (p,q) => p + 3 + q,
    a: () => 100,
    b: () => 2,
    k: () => 3,
    l: () => 4,
    m: () => 5,
    n: () => 6,
    p: () => 7,
    q: () => 8,
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.a === 100, test_n);
assert(calcResult.b === 2, test_n);
assert(calcResult.k === 3, test_n);
assert(calcResult.l === 4, test_n);
assert(calcResult.m === 5, test_n);
assert(calcResult.n === 6, test_n);
assert(calcResult.p === 7, test_n);
assert(calcResult.q === 8, test_n);
assert(calcResult.t === 41, test_n);
assert(calcResult.u === 8, test_n);
assert(calcResult.v === 13, test_n);
assert(calcResult.w === 18, test_n);
assert(calcResult.x === 243, test_n);
assert(calcResult.y === 242, test_n);
assert(calcResult.z === 200, test_n);


test_n = 'eager test #11';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (x) => x + 1

};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.x === undefined, test_n);
assert(calcResult.y === undefined, test_n);
assert(calcResult.z === undefined, test_n);


test_n = 'eager test #12';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y,z) =>z + y + 1,
    y: (v) => v + 1,
    z: (v) => v + 1,
    v: () => -10,

};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.v === -10, test_n);
assert(calcResult.z === -9, test_n);
assert(calcResult.y === -9, test_n);
assert(calcResult.x === -17, test_n);

let c=0;
let oneChanceFunction = function (){
    if(c>0){
        throw Error('You missed your chance, don\'t ask me more!');
    }
    c=c+1;
    return -10;
};



test_n = 'eager test #13';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y,z) =>z + y + 1,
    y: (t) => t + 1,
    t: (u) => u+1,
    u: (p) => p+1,
    p: (v) => v+1,
    z: (v) => v + 1,
    v: oneChanceFunction,

};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.v === -10, test_n);
assert(calcResult.z === -9, test_n);
assert(calcResult.p === -9, test_n);
assert(calcResult.u === -8, test_n);
assert(calcResult.t === -7, test_n);
assert(calcResult.y === -6, test_n);
assert(calcResult.x === -14, test_n);


test_n = 'eager test #14';
eagerGraph = new EagerGraph();
graphDefinition = {
    n: (xs) =>  xs.length ,
    m: (xs, n) => xs.reduce((total, num)=>(total+num)) / n ,
    m2: (xs, n) => xs.reduce((total, num)=>(total+num*num)) / n ,
    v: (m, m2)=> m*m - m2,
    xs: ()=> [1,2,3,4,5,6]
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.n === 6, test_n);
assert(calcResult.m === 3.5, test_n);
assert((calcResult.m2 - 15.1666666666)**2 < 0.001, test_n);
assert((calcResult.v - -2.916666666)**2 < 0.001, test_n+'4');
assert(calcResult.xs.length === 6, test_n);


test_n = 'eager test #15';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: (y) => 2*y+4,
    y: (t) => 3*t-10,
    t: (r) => -4*r**2,
    r: () => 5,

    a: (b) => b-17,
    b: (c) => 1.5*c,
    c: (d) => 7+ d,
    d: ()=> -2,

    w: (a,b,c,d,x,y,r,t,v) => a+b+c+d+x+y+r+t,
    v: (a,b,w) => a*b*w
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.a === -9.5, test_n);
assert(calcResult.b === 7.5, test_n);
assert(calcResult.c === 5, test_n);
assert(calcResult.d === -2, test_n);
assert(calcResult.r === 5, test_n);
assert(calcResult.t === -100, test_n);
assert(calcResult.v === undefined, test_n);
assert(calcResult.w === undefined, test_n);
assert(calcResult.x === -616, test_n);
assert(calcResult.y === -310, test_n);



test_n = 'lazy test #16';
eagerGraph = new EagerGraph();
graphDefinition = {
    n: (a) => a,
    b: (n) => n,
    z: (x) => x,
    x: (z) => z,
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.a === undefined, test_n);
assert(calcResult.b === undefined, test_n);
assert(calcResult.x === undefined, test_n);
assert(calcResult.z === undefined, test_n);
assert(calcResult.n === undefined, test_n);

test_n = 'lazy test #17';
eagerGraph = new EagerGraph();
graphDefinition = {
    n: (xs) => xs.length,
    m: (xs, n) => xs.reduce((store, item) => item + store, 0) / n,
    m2: (xs, n) => xs.reduce((store, item) => item * store, 1) / n,
    v: (m, m2) => m*m - m2,
    xs: () => [1, 2, 3]
};
calcResult = eagerGraph.receiveGraph(graphDefinition).calcGraph();
assert(calcResult.n === 3, test_n);
assert(calcResult.m === 2, test_n);
assert(calcResult.m2 === 2, test_n);
assert(calcResult.v === 2, test_n);



let lazyGraph; // copy-paste self foolproof guard. Whatever.
console.log('eager_graph_test: Ok');
