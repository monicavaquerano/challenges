document.addEventListener('DOMContentLoaded', () => {
    // Powered by Quotable
    // https://github.com/lukePeavey/quotable

    const button = document.querySelector('#btn-quote');
    const quote = document.querySelector('#quote');
    const author = document.querySelector('#author');

    updateQuote();

    button.addEventListener('click', updateQuote)

});

async function updateQuote() {
    const response = await fetch("https://api.quotable.io/random");
    const data = await response.json();
    console.log(data);
    if (response.ok) {
        quote.innerText = `"${data.content}"`;
        author.innerText = `— ${data.author}`;
    } else {
        quote.innerText = "An error ocurred."
        console.log(data);
    }
}