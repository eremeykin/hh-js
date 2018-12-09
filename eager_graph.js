import {LazyGraph} from './lazy_graph.js';

export class EagerGraph extends LazyGraph{

    calcGraph() {
        let result = {};
        for (let vertex in this.graph) {
            result[vertex] = this.calcVertex(vertex);
        }
        return result;
    }
}
