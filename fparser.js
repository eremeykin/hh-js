export function parseFunctionArgs(fun) {
    let funString = fun.toString();
    let bracketRegExp = /\(([\s\S]*?)\)/;
    let singleLinecommentRegExp = /\/\/.*/g;
    let multyLinecommentRegExp = /\s*\/\*[\s\S]*?\*\/\s*/g;
    funString = funString.replace(singleLinecommentRegExp, '');
    funString = funString.replace(multyLinecommentRegExp, '');

    let varsString = bracketRegExp.exec(funString); //inside brackets: (<here>)
    if (varsString == null) {
        return null; //parsing error
    }
    varsString = varsString[1];
    let vars = varsString.split(',');
    vars = vars.map((el) => el.trim());
    if (vars.length === 1 && vars[0]===""){
        return []
    }
    return vars
}
