import {LazyGraph} from './lazy_graph.js';

console.assert	= function(check, msg){
    if( check )	return;
    throw new Error(msg || "Assertion failed!");
};


let graphDefinition, lazyGraph, calcResult, test_n;

test_n = 'test #1';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: () => 4
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 4, test_n);

test_n = 'test #2';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: () => 4,
    y: () => 5
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('y');
console.assert(calcResult === 5, test_n);

test_n = 'test #3';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y) => y + 4,
    y: () => 5
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 9, test_n);

test_n = 'test #4';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: () => 5,
    z: () => 10
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 19, test_n);

test_n = 'test #5';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: (z) => 5+z,
    z: () => 10
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 29, test_n);

test_n = 'test #6';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y,z) => y + 4 + z,
    y: (t) => 5+t,
    z: (t) => 10+t,
    t: () => 7
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 33, test_n);

test_n = 'test #7';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: (u) => u + 1,
    u: (v) => v + 1,
    v: (w) => w + 1
};
try{
    calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
    console.assert(false, test_n);
} catch (e) {
    console.assert(e.toString() === "Error: The received graph doesn't define vertex: w", test_n);
}

test_n='test #8';
lazyGraph = new LazyGraph();
graphDefinition = {
};
try{
    calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
    console.assert(false, test_n);
} catch (e) {
    console.assert(e.toString() === "Error: The received graph doesn't define vertex: x", test_n);
}

test_n = 'test #9';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: () => 5,
    u: (k) => k + 7,
    k: (u) => u + 3
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 8, test_n);

test_n = 'test #10';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (t) => t + 1,
    t: () => 5,
    u: (k) => k + 7,
    k: (t,u) => t + u + 3
};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 8, test_n);

test_n = 'test #11';
lazyGraph = new LazyGraph();
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
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 243, test_n);

test_n = 'test #11';
lazyGraph = new LazyGraph();
graphDefinition = {
    x: (y) => y + 1,
    y: (z) => z + 1,
    z: (x) => x + 1

};
calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.assert(calcResult === 0, test_n);



console.log('lazy_graph_test: Ok');
