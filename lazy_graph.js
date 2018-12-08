import {parseFunctionArgs} from './fparser.js';

class LazyGraph {

    receiveGraph(graph) {
        this.graph = graph;
        this.vertices = {};
        for (let vertex in graph) {
            this.vertices[vertex] = parseFunctionArgs(graph[vertex]);
        }
        return this;
    }

    calcVertex(vertexName) {
        let toCalculate = this.vertices[vertexName];
        let calculationResults = [];
        for (let i = 0; i < toCalculate.length; i++) {
            let vertexResult = this.calcVertex(toCalculate[i].toString());
            calculationResults.push(vertexResult);
        }
        return this.graph[vertexName](...calculationResults);
    }
}
let graphDefinition = {x: (y, z, t) => 1 + y + z + 3 * t, y: () => 1, z: () => 3, t: (y, z) => 5+y+z};
let lazyGraph = new LazyGraph();
let x = lazyGraph.receiveGraph(graphDefinition).calcVertex('x');
console.log("x = "+x);
