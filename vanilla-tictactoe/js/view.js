export default class View {
    // Namespaces
    $ = {};
    $$ = {};

    constructor() {
        this.$.menu = this.#qs('[data-id="menu"]');
        this.$.menuBtn = this.#qs('[data-id="menu-button"]');
        this.$.menuItems = this.#qs('[data-id="menu-items"');
        this.$.resetBtn = this.#qs('[data-id="reset-btn"]');
        this.$.newRoundBtn = this.#qs('[data-id="new-round-btn"]');
        this.$.modal = this.#qs('[data-id="modal"]');
        this.$.modalTxt = this.#qs('[data-id="modal-txt"]');
        this.$.modalBtn = this.#qs('[data-id="modal-btn"]');
        this.$.turn = this.#qs('[data-id="turn"]');

        // List elements
        this.$$.squares = this.#qsAll('[data-id="square"]');

        // Menu Toggle Button
        this.$.menuBtn.addEventListener("click", (event) => {
            this.#toggleMenu();
        });
    };

    /**
     * Register all the event listeners
     */

    bindGameResetEvent(handler) {
        this.$.resetBtn.addEventListener("click", handler);
        this.$.modalBtn.addEventListener("click", handler);
    }

    bindNewRoundEvent(handler) {
        this.$.newRoundBtn.addEventListener("click", handler);

    }

    bindPlayerMoveEvent(handler) {
        this.$$.squares.forEach((square) => {
            square.addEventListener("click", () => handler(square))
        });
    }

    /**
    * DOM helpers methods
    */
    openModal(message) {
        this.$.modal.classList.remove("hidden");
        this.$.modalTxt.innerText = message;
    }

    #toggleMenu() {
        this.$.menuItems.classList.toggle("hidden");
        this.$.menuBtn.classList.toggle("border");

        const icon = this.$.menuBtn.querySelector("i");

        icon.classList.toggle("fa-chevron-down");
        icon.classList.toggle("fa-chevron-up");
    };

    #closeModal() {
        this.$.modal.classList.add("hidden");
    }

    #closeMenu() {
        this.$.menuItems.classList.add("hidden");
        this.$.menuItems.classList.remove("border");

        const icon = this.$.menuBtn.querySelector("i");

        icon.classList.add("fa-chevron-down");
        icon.classList.remove("fa-chevron-up");
    }

    closeAll() {
        this.#closeModal();
        this.#closeMenu();
    }


    clearMoves() {
        this.$$.squares.forEach((square) => {
            square.replaceChildren();
        });
    }

    // Player = 1 | 2
    setTurnIndicator(player) {
        const icon = document.createElement("i");
        const label = document.createElement("p");

        icon.classList.add("fa-solid", player.iconClass, player.colorClass);

        label.classList.add(player.colorClass);
        label.innerText = `${player.name} you're up!`;

        this.$.turn.replaceChildren(icon, label);
    }

    handlePlayerMove(squareEl, player) {
        const icon = document.createElement("i");

        icon.classList.add("fa-solid", player.iconClass, player.colorClass);

        squareEl.replaceChildren(icon);
    }

    // querySelector
    #qs(selector, parent) {
        const el = parent
            ? parent.querySelector(selector)
            : document.querySelector(selector);

        if (!el) throw new Error("Could not find elements");

        return el;
    }

    // querySelectorAll
    #qsAll(selector) {
        const elList = document.querySelectorAll(selector);

        if (!elList) throw new Error("Could not find elements");

        return elList;
    }
}