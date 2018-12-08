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

    calcVertex(vertex) {
        let vertexStack = [vertex]; // current vertex
        let  indexStack = [0]; // index of next vertex
        let resultStack = [];
        let nextIntex =0;

        let c =0;
        while(vertexStack.length>0){
            // c++;
            // if (c>100){
            //     return -1;
            // }
            // console.log(vertexStack);
            let currentVertex = vertexStack[vertexStack.length -1];
            let nextIntex = indexStack[indexStack.length-1];

            if (typeof this.vertices[currentVertex] == 'undefined'){
                    throw new Error("The received graph doesn't define vertex: " + currentVertex);
            }

            if (nextIntex + 1 > this.vertices[currentVertex].length){
                let currentArgs = [];
                for(let i=0; i<this.vertices[currentVertex].length; i++){
                    currentArgs.push(resultStack.pop());
                }
                let res = this.graph[currentVertex](...currentArgs);
                resultStack.push(res);
                vertexStack.pop();
                indexStack.pop();
            }else{
                let nextVertex = this.vertices[currentVertex][nextIntex];
                if (vertexStack.indexOf(nextVertex)>-1){
                    throw new Error("There is a loop in received graph");
                }
                vertexStack.push(nextVertex);
                indexStack.push(indexStack.pop()+1);
                indexStack.push(0);
            }
        }
        return resultStack[0];
    }
}

let lazyGraph = new LazyGraph();
let graphDefinition = {
    x1: (x2, x3, x4) => 1,
    x2: (x5, x6) => 2,
    x5: (x10) => 3,
    x10: () => 4,
    x6: (x11, x12) => 5,
    x11: () => 6,
    x12: () => 7,
    x3: (x7, x8, x9) =>8,
    x7: () => 9,
    x8: () => 10,
    x9: () => 11,
    x4: () => 12
};
let calcResult = lazyGraph.receiveGraph(graphDefinition).calcVertex('x1');

