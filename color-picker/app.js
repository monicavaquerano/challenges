document.addEventListener('DOMContentLoaded', () => {
    // Get the inputs
    const redInput = document.querySelector('#red');
    const greenInput = document.querySelector('#green');
    const blueInput = document.querySelector('#blue');
    // Get the color's text
    const redText = document.querySelector('#red-text');
    const greenText = document.querySelector('#green-text');
    const blueText = document.querySelector('#blue-text');
    // Get the value of the inputs
    let red = redInput.value;
    let green = greenInput.value;
    let blue = blueInput.value;
    // Update the color's text
    redText.innerText = red;
    greenText.innerText = green;
    blueText.innerText = blue

    // Events for every color: RGB
    redInput.addEventListener('change', (e) => {
        red = e.target.value;
        redText.innerText = red;
        updateColor(red, green, blue);
    });
    greenInput.addEventListener('change', (e) => {
        green = e.target.value;
        greenText.innerText = green;
        updateColor(red, green, blue);
    });
    blueInput.addEventListener('change', (e) => {
        blue = e.target.value;
        blueText.innerText = blue;
        updateColor(red, green, blue);
    });
});

function updateColor(red, green, blue) {
    const colorRGB = `rgb(${red}, ${green}, ${blue})`;
    document.body.style.backgroundColor = colorRGB;
}