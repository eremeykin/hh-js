import {parseFunctionArgs} from './fparser.js';

export class LazyGraph {

    receiveGraph(graph) {
        this.graph = graph;
        this.vertices = {};
        for (let vertex in graph) {
            this.vertices[vertex] = parseFunctionArgs(graph[vertex]);
        }
        this.cache = {}; // init empty cache
        return this;
    }

    evaluateCached(vertex, args){
        if (this.cache.hasOwnProperty(vertex)){
            return this.cache[vertex]
        } else {
            let newValue = this.graph[vertex](...args); // actually evaluate the function
            // can't do this caching e.g if the function is not deterministic !
            this.cache[vertex] = newValue; // cache result
            return newValue;
        }
    }

    calcVertex(vertex) {
        let vertexStack = [vertex]; // current vertex
        let  indexStack = [0]; // index of next child vertex to visit
        let resultStack = [];

        while(vertexStack.length>0){ // recursion is evil
            let currentVertex = vertexStack[vertexStack.length -1];
            let nextIndex = indexStack[indexStack.length-1];

            if (typeof this.vertices[currentVertex] === 'undefined'){
                    throw new Error("The received graph doesn't define the vertex: " + currentVertex);
            }

            if (nextIndex + 1 > this.vertices[currentVertex].length){ // all child vertices has been visited
                let numberOfArguments = this.vertices[currentVertex].length;
                let currentArgs = resultStack.splice(resultStack.length - numberOfArguments,numberOfArguments);
                let res = this.evaluateCached(currentVertex, currentArgs);
                resultStack.push(res);
                vertexStack.pop();
                indexStack.pop();
            }else{
                let nextVertex = this.vertices[currentVertex][nextIndex];
                let oldIndexOfSameVertex = vertexStack.indexOf(nextVertex);
                if (oldIndexOfSameVertex>-1){
                    let loopSeq =  vertexStack.slice(oldIndexOfSameVertex, vertexStack.length);
                    loopSeq.push(nextVertex);
                    throw new Error("There is a loop in received graph: " + loopSeq.join("->"));
                }
                vertexStack.push(nextVertex);
                indexStack.push(indexStack.pop()+1);
                indexStack.push(0);
            }
        }
        return resultStack[0];
    }
}
