/* Name Space */
const App = {
    /* All of our selected HTML elements */
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-popover"'),
        reset_btn: document.querySelector('[data-id="reset-btn"]'),
        new_round_bt: document.querySelector('[data-id="new-round-bt"]'),
    },

    init() {
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });
    }

};

window.addEventListener("load", App.init);