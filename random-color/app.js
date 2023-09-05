document.addEventListener('DOMContentLoaded', () => {

    const button = document.querySelector('#btn-color');
    const color = document.querySelector('#color');

    button.addEventListener('click', () => {
        let randomColor = generateRandomHex();
        color.textContent = randomColor;
        document.body.style.backgroundColor = randomColor;

    });

});

function generateRandomHex() {
    let digits = '0123456789ABCDEF';
    let colorHex = "#";

    for (let i = 0; i < 6; i++) {
        let randomIndex = Math.floor(Math.random() * 16);
        colorHex += digits[randomIndex]
    }

    return colorHex;
}