import {parseFunctionArgs} from './fparser.js';

class LazyGraph {

    receiveGraph(graph) {
        for (let vertex in graph) {
            console.log("parse: " + vertex)
            console.log(parseFunctionArgs(graph[vertex]))
        }
    }

    calcVertex(vertexName) {
        console.log(arguments);
    }
}


let gObj = {x: (y, z, t) => y + 1, y: () => 1};
let lg = new LazyGraph();
lg.receiveGraph(gObj);