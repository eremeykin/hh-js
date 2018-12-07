### Java Script task 1.
### Lazy and Eager Graph

HeadHunter school homework. 

* [Info paper](http://plumatic.github.io/prismatics-graph-at-strange-loop)

* There should be 2 modules that contains 2 classes \ objects \ functions (whatever)

Kind of:
```javascript
// Graph description
interface IGraph = {
  [key: string]: Function
}
class LazyGraph  {
  receiveGraph(graph: IGraph) {  
  }
  calcVertex(vertexName) {//do some cals}
}
```


Usage: 
```javascript
(new LazyGraph()).receiveGraph({x: (y) =>  y+1, y: () => 1}).calcVartex('x') // 2
```

* Implement Lazy and Eager graph,
described by the following properties:
```javascript
(def stats-graph
{:n (fnk [xs] (count xs))
 :m (fnk [xs n] (/ (sum identity xs) n))
 :m2 (fnk [xs n] (/ (sum #(* % %) xs) n))
 :v (fnk [m m2] (- m2 (* m m)))})
```
