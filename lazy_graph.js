import {parseFunctionArgs} from './fparser.js';

export class LazyGraph {

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
        if (typeof toCalculate == 'undefined'){
            throw new Error("The received graph doesn't define vertex: " + vertexName);
        }
        let calculationResults = [];
        for (let i = 0; i < toCalculate.length; i++) {
            let vertexResult = this.calcVertex(toCalculate[i].toString());
            calculationResults.push(vertexResult);
        }
        return this.graph[vertexName](...calculationResults);
    }
}
