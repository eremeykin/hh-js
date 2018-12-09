import {LazyGraph} from './lazy_graph.js';

export class EagerGraph extends LazyGraph{

    calcGraph() {
        let result = {};
        for (let vertex in this.graph) {
            try{
                result[vertex] = this.calcVertex(vertex);
            }catch (e) {
                result[vertex] = undefined;
            }
        }
        return result;
    }
}
