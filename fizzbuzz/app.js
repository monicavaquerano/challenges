// Elements
const numberInput = document.getElementById("numberInput");
const submitNumberBtn = document.getElementById("submitNumberBtn");
const textContainer = document.getElementById("fizzbuzz");

// Events
submitNumberBtn.addEventListener("click", () => {
    console.log(numberInput.value);
    clearTextContainer();
    if (numberInput.value == "") {
        textContainer.innerHTML = '<p>Enter a number</p>'
    } else {
        createNumberList(numberInput.value);
    }
    clearInputField();
});

numberInput.addEventListener('keydown', (event) => {
    if (event.key == 'Enter') {
        console.log(numberInput.value);
        clearTextContainer();
        if (numberInput.value == "") {
            textContainer.innerHTML = "<p>Enter a number</p>";
        } else {
            createNumberList(numberInput.value);
        }
        clearInputField();
    }
});

// Functions
function createNumberList(num) {
    const numbers = document.createElement("p");
    numbers.innerHTML = print(num);
    textContainer.append(numbers);
}

function clearInputField() {
    numberInput.value = '';
}
function clearTextContainer() {
    textContainer.innerHTML = '';
}

function fizzbuzz(num) {
    if (num == 0) {
        return 0;
    } if (num % 3 == 0 && num % 5 == 0) {
        return '<span class="fizz-buzz">FizzBuzz</span>';
    } if (num % 5 == 0) {
        return '<span class="buzz">Buzz</span>';
    } if (num % 3 == 0) {
        return '<span class="fizz">Fizz</span>';
    }
    return num;
}

function print(num) {
    let text = '';
    for (let i = 0; i <= num; i++) {
        text += `${fizzbuzz(i)}<br>`
    }
    return text;
}