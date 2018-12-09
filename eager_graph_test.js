import {EagerGraph} from './eager_graph.js';

console.assert	= function(check, msg){
    if( check )	return;
    throw new Error(msg || "Assertion failed!");
};

let graphDefinition, eagerGraph, calcResult, test_n;

test_n = 'test #1';
eagerGraph = new EagerGraph();
graphDefinition = {
    x: () => 4
};
calcResult  = eagerGraph.receiveGraph(graphDefinition).calcGraph();
console.assert(calcResult.x === 4, test_n);


console.log('eager_graph_test: Ok');
