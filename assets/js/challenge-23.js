/*
Vamos desenvolver mais um projeto. A ideia é fazer uma mini-calculadora.
As regras são:

- Deve ter somente 1 input, mas não deve ser possível entrar dados nesse input
diretamente;
- O input deve iniciar com valor zero;
- Deve haver 10 botões para os números de 0 a 9. Cada botão deve ser um número;
- Deve haver 4 botões para as operações principais: soma (+), subtração(-),
multiplicação(x) e divisão(÷);
- Deve haver um botão de "igual" (=) que irá calcular os valores e um botão "CE"
que irá limpar o input, deixando-o com valor 0;

- A cada número pressionado, o input deve atualizar concatenando cada valor
digitado, como em uma calculadora real;
- Ao pressionar um botão com uma das 4 operações, deve aparecer o símbolo da
operação no input. Se o último caractere no input já for um símbolo de alguma
operação, esse caractere deve ser substituído pelo último pressionado.
Exemplo:
- Se o input tem os valores: "1+2+", e for pressionado o botão de
multiplicação (x), então no input deve aparecer "1+2x".
- Ao pressionar o botão de igual, o resultado do cálculo deve ser mostrado no
input;
- Ao pressionar o botão "CE", o input deve ficar zerado.
*/
((win, doc) => {
    function wsQuery(query){
        return doc.querySelector(query);
    }
    function wsEvent(selector, event, callback){
        return selector.addEventListener(event, callback, false);
    }
    function isOperator(entry){
        var operators = ["+", "-", "x", "÷"];
        function operator(op){
            return op == entry.slice(-1);
        }
        var result = operators.find(operator);
        return result;
    }
    var entry = wsQuery('[data-ws="entry"]');
    var one = wsQuery('[data-ws="one"]');
    var two = wsQuery('[data-ws="two"]');
    var tree = wsQuery('[data-ws="tree"]');
    var four = wsQuery('[data-ws="four"]');
    var five = wsQuery('[data-ws="five"]');
    var six = wsQuery('[data-ws="six"]');
    var seven = wsQuery('[data-ws="seven"]');
    var eight = wsQuery('[data-ws="eight"]');
    var nine = wsQuery('[data-ws="nine"]');
    var zero = wsQuery('[data-ws="zero"]');
    var sum = wsQuery('[data-ws="sum"]');
    var sub = wsQuery('[data-ws="sub"]');
    var mult = wsQuery('[data-ws="mult"]');
    var div = wsQuery('[data-ws="div"]');
    var clear = wsQuery('[data-ws="ce"]');
    var equal = wsQuery('[data-ws="equal"]');
    entry.value = 0;
    wsEvent(entry, "keypress", (e) => {
        e.preventDefault();
    });
    wsEvent(one, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "1";
        }else{
            entry.value += "1";
        }
    });
    wsEvent(two, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "2";
        }else{
            entry.value += "2";
        }
    });
    wsEvent(tree, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "3";
        }else{
            entry.value += "3";
        }
    });
    wsEvent(four, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "4";
        }else{
            entry.value += "4";
        }
    });
    wsEvent(five, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "5";
        }else{
            entry.value += "5";
        }
    });
    wsEvent(six, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "6";
        }else{
            entry.value += "6";
        }
    });
    wsEvent(seven, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "7";
        }else{
            entry.value += "7";
        }
    });
    wsEvent(eight, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "8";
        }else{
            entry.value += "8";
        }
    });
    wsEvent(nine, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "9";
        }else{
            entry.value += "9";
        }
    });
    wsEvent(zero, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = "0";
        }else{
            entry.value += "0";
        }
    });
    wsEvent(sum, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = 0;
        }else if(isOperator(entry.value)){
            entry.value = entry.value.slice(0, -1);
            entry.value += "+";
        }else{
            entry.value += "+";
        }
    });
    wsEvent(sub, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = 0;
        }else if(isOperator(entry.value)){
            entry.value = entry.value.slice(0, -1);
            entry.value += "-";
        }else{
            entry.value += "-";
        }
    });
    wsEvent(mult, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = 0;
        }else if(isOperator(entry.value)){
            entry.value = entry.value.slice(0, -1);
            entry.value += "x";
        }else{
            entry.value += "x";
        }
    });
    wsEvent(div, "click", (e) => {
        e.preventDefault();
        if(entry.value == 0){
            entry.value = 0;
        }else if(isOperator(entry.value)){
            entry.value = entry.value.slice(0, -1);
            entry.value += "÷";
        }else{
            entry.value += "÷";
        }
    });
    wsEvent(clear, "click", (e) => {
        e.preventDefault();
        entry.value = 0;
    });

    wsEvent(equal, "click", (e) => {
        e.preventDefault();
        var data = entry.value;
        var arrData = data.match(/\d+[÷x+-]?/g);
        var result = arrData.reduce((accumulated, actual, index) => {
            var gathered = isOperator(accumulated) ? accumulated.slice(0, -1) : accumulated;
            var current = isOperator(actual) ? actual.slice(0, -1) : actual;
            var operating = isOperator(actual) ? actual.slice(-1) : '';
            var operator = isOperator(accumulated) ? accumulated.slice(-1) : '';
            switch(operator){
                case "+":
                    return Number(gathered) + Number(current) + operating;
                case "-":
                    return Number(gathered) - Number(current) + operating;
                case "x":
                    return Number(gathered) * Number(current) + operating;
                case "÷":
                    return Number(gathered) / Number(current) + operating;
            }
        })
        entry.value = result;
    });
    

})(window, document);