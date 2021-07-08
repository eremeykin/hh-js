import {parseFunctionArgs} from './fparser.js';

function aFun(x, y, z) {}
function bFun(x,       y, z) {}
function cFun(x,/**/y, z) {}
function dFun(x, /**/ y, z) {}
function eFun(x,/**/y, z) {}
function fFun(x, /**/ y, z) {}
function gFun(/**/x,y, z) {}
function hFun( /**/x,y, z) {}
function iFun(/**/ x,y, z) {}
function jFun( /**/ x,y, z) {}
function kFun(x, y, z/**/) {}
function lFun(x, y, z /**/) {}
function mFun(x, y, z/**/ ) {}
function nFun(/**/x/**/,/**/y/**/,/**/z/**/) {}
function oFun(/**/x,y,z/**/) {}
function pFun(x,y,
              z) {}
function qFun(x,y,
              //
              z) {}
function rFun(x,y,
              // TEST
              z) {}
function sFun(x,
              y,
              z) {}
function tFun(
    x,


              y,



              z

) {}

function uFun(x, y, z/*,*/) {}
function vFun(x, /*
sdf
sdf


*/y                              ,


                      //rtewr

                      z) {

};
function wFun(x, /*
sdf
sdf


*/


                      //rtewr
                        y,
                      //rtewr

                      z) {

}
function aaFun(){}
function abFun(){(1,2,3);}
function acFun(/*x,y,z*/){(1,2,3);}
function adFun(//x,y,z
 ){(1,2,3);}
function aeFun(/*
x,y,z
*/
){(1,2,3);}
function afFun(
){(1,2,3);}
function agFun( ){}
function ahFun(/*()*/){}
function aiFun(/*()*/ /*()*/ /*()*/ /*()*/){}
let baFun = () =>{};
let bbFun = (x,y,z) =>{};
let bcFun = (/* /**/) =>{};




function eq(actual, expected) {
    return actual.join(" ") == expected.join(" ")
}

console.assert(eq(parseFunctionArgs(aFun), ["x", "y", "z"]), "a");
console.assert(eq(parseFunctionArgs(bFun), ["x", "y", "z"]), "b");
console.assert(eq(parseFunctionArgs(cFun), ["x", "y", "z"]), "c");
console.assert(eq(parseFunctionArgs(dFun), ["x", "y", "z"]), "d");
console.assert(eq(parseFunctionArgs(eFun), ["x", "y", "z"]), "e");
console.assert(eq(parseFunctionArgs(fFun), ["x", "y", "z"]), "f");
console.assert(eq(parseFunctionArgs(gFun), ["x", "y", "z"]), "g");
console.assert(eq(parseFunctionArgs(hFun), ["x", "y", "z"]), "h");
console.assert(eq(parseFunctionArgs(iFun), ["x", "y", "z"]), "i");
console.assert(eq(parseFunctionArgs(jFun), ["x", "y", "z"]), "j");
console.assert(eq(parseFunctionArgs(kFun), ["x", "y", "z"]), "k");
console.assert(eq(parseFunctionArgs(lFun), ["x", "y", "z"]), "l");
console.assert(eq(parseFunctionArgs(mFun), ["x", "y", "z"]), "m");
console.assert(eq(parseFunctionArgs(nFun), ["x", "y", "z"]), "n");
console.assert(eq(parseFunctionArgs(oFun), ["x", "y", "z"]), "o");
console.assert(eq(parseFunctionArgs(pFun), ["x", "y", "z"]), "p");
console.assert(eq(parseFunctionArgs(qFun), ["x", "y", "z"]), "q");
console.assert(eq(parseFunctionArgs(rFun), ["x", "y", "z"]), "r");
console.assert(eq(parseFunctionArgs(sFun), ["x", "y", "z"]), "s");
console.assert(eq(parseFunctionArgs(tFun), ["x", "y", "z"]), "t");
console.assert(eq(parseFunctionArgs(uFun), ["x", "y", "z"]), "u");
console.assert(eq(parseFunctionArgs(vFun), ["x", "y", "z"]), "v");
console.assert(eq(parseFunctionArgs(wFun), ["x", "y", "z"]), "w");
console.assert(eq(parseFunctionArgs(aaFun), []), "aa");
console.assert(eq(parseFunctionArgs(abFun), []), "ab");
console.assert(eq(parseFunctionArgs(acFun), []), "ac");
console.assert(eq(parseFunctionArgs(adFun), []), "ad");
console.assert(eq(parseFunctionArgs(aeFun), []), "ae");
console.assert(eq(parseFunctionArgs(afFun), []), "af");
console.assert(eq(parseFunctionArgs(agFun), []), "ag");
console.assert(eq(parseFunctionArgs(ahFun), []), "ah");
console.assert(eq(parseFunctionArgs(aiFun), []), "ai");
console.assert(eq(parseFunctionArgs(baFun), []), "ba");
console.assert(eq(parseFunctionArgs(bbFun), ["x", "y", "z"]), "bb");
console.assert(eq(parseFunctionArgs(bcFun), []), "bc");
