let display = document.getElementById('display');
let buttons = Array.from(document.getElementsByClassName('button'));


function evaluate(expression)
{
    let tokens = expression.split('');
    let values = [];
    let ops = [];

    for (let i = 0; i < tokens.length; i++){
        if (tokens[i] == ' '){
            continue;
        }

        if (tokens[i] >= '0' && tokens[i] <= '9'){
            let sbuf = "";
            while (i < tokens.length &&
                    tokens[i] >= '0' &&
                        tokens[i] <= '9'){
                sbuf = sbuf + tokens[i++];
            }
            values.push(parseInt(sbuf, 10));
              i--;
        }

        else if (tokens[i] == '('){
            ops.push(tokens[i]);
        }

        else if (tokens[i] == ')'){
            while (ops[ops.length - 1] != '('){
              values.push(applyOp(ops.pop(),
                               values.pop(),
                              values.pop()));
            }
            ops.pop();
        }

        else if (tokens[i] == '+' ||
                 tokens[i] == '-' ||
                 tokens[i] == '*' ||
                 tokens[i] == '/')
        {

            while (ops.length > 0 &&
                     hasPrecedence(tokens[i],
                                 ops[ops.length - 1])){
              values.push(applyOp(ops.pop(),
                               values.pop(),
                             values.pop()));
            }

            ops.push(tokens[i]);
        }
    }

    while (ops.length > 0){
        values.push(applyOp(ops.pop(),
                         values.pop(),
                        values.pop()));
    }
    return values.pop();
}

function hasPrecedence(op1, op2){
    if (op2 == '(' || op2 == ')'){
        return false;
    }
    if ((op1 == '*' || op1 == '/') &&
           (op2 == '+' || op2 == '-')){
        return false;
    }
    else{
        return true;
    }
}

function applyOp(op, b, a){
    switch (op){
        case '+':
            return a + b;
        case '-':
            return a - b;
        case '*':
            return a * b;
        case '/':
            if (b == 0){
                document.write("Cannot divide by zero");
            }
            return parseInt(a / b, 10);
        }
    return 0;
}



buttons.map( button => {
    button.addEventListener('click', (e) => {
        switch(e.target.innerText){
            case 'C':
                display.innerText = '';
                break;
            case '=':
                try{
                    display.innerText = evaluate(display.innerText);
                } catch {
                    display.innerText = "Error"
                }
                break;
            case '←':
                if (display.innerText){
                   display.innerText = display.innerText.slice(0, -1);
                }
                break;
            default:
                display.innerText += e.target.innerText;
        }
    });
});
