class Calculator
{
    constructor(previousOperatorTextElement, currentOperatorTextElement)
    {
        this.previousOperatorTextElement = previousOperatorTextElement;
        this.currentOperatorTextElement = currentOperatorTextElement;
        this.allClear();
    }

    allClear()
    {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operator = undefined;
    }

    delete()
    {
        if(this.currentOperand==='error')
        {
            this.currentOperand = '';
        }
        else
        {
            this.currentOperand = this.currentOperand.toString().slice(0, -1);
        }
    }

    appendNumber(number)
    {
        if(number==='.' && this.currentOperand.includes('.'))
        {
            retrun;
        }
        if(this.currentOperand==='error')
        {
            this.currentOperand = number.toString();
        }
        else
        {
            this.currentOperand = this.currentOperand.toString() + number.toString();
        }
    }

    chooseOperation(operator)
    {
        if(this.currentOperand==='')
        {
            return;
        }
        if(this.previousOperand!=='')
        {
            this.compute();
        }
        if(this.currentOperand==='error')
        {
            this.operator = null;
        }
        else
        {
            this.operator = operator;
            this.previousOperand = this.currentOperand;
            this.currentOperand = '';
        }
    }

    compute()
    {
        let computatuion;
        const prev = parseFloat(this.previousOperand);
        const curr = parseFloat(this.currentOperand);
        if(isNaN(prev) || isNaN(curr))
        {
            return;
        }
        switch(this.operator)
        {
            case '+':
                computatuion = prev + curr;
                break;
            case '-':
                computatuion = prev - curr;
                break;
            case 'x':
                computatuion = prev * curr;
                break;
            case '÷':
                if(curr==0)
                {
                    computatuion = 'error';
                }
                else
                {
                    computatuion = prev / curr;
                }
                break;
            default:
                return;
        }
        this.operator = undefined;
        this.previousOperand = '';
        this.currentOperand = computatuion;
    }

    getDiplayNumber(number)
    {
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits))
        {
            integerDisplay = '';
        }
        else
        {
            integerDisplay = integerDigits.toLocaleString('en', {maximumFractionDigits: 0});
        }
        if(decimalDigits!=null)
        {
            return `${integerDisplay}.${decimalDigits}`;
        }
        else
        {
            return integerDisplay;
        }
    }
    
    updateDisplay()
    {
        if(this.operator!=null)
        {
            this.previousOperatorTextElement.innerText = `${this.getDiplayNumber(this.previousOperand)} ${this.operator}`;
        }
        else
        {
            this.previousOperatorTextElement.innerText = '';
        }
        if(this.currentOperand==='error')
        {
            this.currentOperatorTextElement.innerText = '😵';
        }
        else
        {
            this.currentOperatorTextElement.innerText = this.getDiplayNumber(this.currentOperand);
        }
    }
}

const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const equalsButton = document.querySelector('[data-equals]');
const previousOperatorTextElement = document.querySelector('[data-previous-operand]');
const currentOperatorTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperatorTextElement, currentOperatorTextElement);

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
})

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
})

allClearButton.addEventListener('click', button => {
    calculator.allClear();
    calculator.updateDisplay();
})

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
})