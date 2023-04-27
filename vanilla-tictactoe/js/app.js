import View from "./view.js";
import Store from "./store.js";

const App = {
    $: {
        menu: document.querySelector('[data-id="menu"]'),
        menuItems: document.querySelector('[data-id="menu-items"'),
        resetBtn: document.querySelector('[data-id="reset-btn"]'),
        newRoundBtn: document.querySelector('[data-id="new-round-bt"]'),
        squares: document.querySelectorAll('[data-id="square"]'),
        modal: document.querySelector('[data-id="modal"]'),
        modalTxt: document.querySelector('[data-id="modal-txt"]'),
        modalBtn: document.querySelector('[data-id="modal-btn"]'),
        turn: document.querySelector('[data-id="turn"]'),
    },

    state: {
        moves: [],
    },

    getGameStatus(moves) {
        const p1Moves = moves.filter(move => move.playerId === 1).map(move => +move.squareId);
        const p2Moves = moves.filter(move => move.playerId === 2).map(move => +move.squareId);

        // Check if there is a winner or a tie
        const winningCombos = [
            [1, 2, 3],
            [4, 5, 6],
            [7, 8, 9],
            [1, 4, 7],
            [2, 5, 8],
            [3, 6, 9],
            [1, 5, 9],
            [3, 5, 7],
        ];

        let winner = null;

        winningCombos.forEach(combo => {
            const p1Wins = combo.every(v => p1Moves.includes(v));
            const p2Wins = combo.every(v => p2Moves.includes(v));

            if (p1Wins) winner = 1;
            if (p2Wins) winner = 2;
        });

        return {
            status: moves.length === 9 || winner != null ? "complete" : "in-progress",
            winner, // 1 | 2 | null
        };
    },

    init() {
        App.registerEventListeners();
    },

    registerEventListeners() {
        // Toggle Menu
        App.$.menu.addEventListener("click", (event) => {
            App.$.menuItems.classList.toggle("hidden");
        });
        // TODO
        App.$.resetBtn.addEventListener("click", (event) => {
            console.log("Reset the game");
        });
        // TODO
        App.$.newRoundBtn.addEventListener("click", (event) => {
            console.log("New round");
        });
        // TODO - Modal button - play again
        App.$.modalBtn.addEventListener("click", (event) => {
            App.state.moves = [];
            App.$.squares.forEach((square) => square.replaceChildren());
            App.$.modal.classList.add("hidden");
        });
        // TODO - Game
        App.$.squares.forEach((square) => {
            square.addEventListener("click", (event) => {
                // Check if the square was clicked already
                const hasMove = (squareId) => {
                    const existingMove = App.state.moves.find(move => move.squareId === squareId);
                    return existingMove !== undefined;
                }

                if (hasMove(+square.id)) {
                    return;
                };
                // Determine Current Player and icon (X or O)
                const lastMove = App.state.moves.at(-1);
                const getOppositePlayer = (playerId) => (playerId === 1 ? 2 : 1);
                const currentPlayer = App.state.moves.length === 0 ? 1 : getOppositePlayer(lastMove.playerId);
                const nextPlayer = getOppositePlayer(currentPlayer);


                const squareIcon = document.createElement("i");
                const turnIcon = document.createElement("i");
                const turnLabel = document.createElement("p");
                turnLabel.innerText = `Player ${nextPlayer}, you're up!`;

                if (currentPlayer === 1) {
                    turnLabel.classList.add("yellow");
                    turnIcon.classList.add("fa-solid", "fa-o", "yellow");
                    squareIcon.classList.add("fa-solid", "fa-x", "turquoise");
                } else {
                    turnIcon.classList.add("fa-solid", "fa-x", "turquoise");
                    squareIcon.classList.add("fa-solid", "fa-o", "yellow");
                };

                App.$.turn.replaceChildren(turnIcon, turnLabel);

                App.state.moves.push({
                    squareId: +square.id,
                    playerId: currentPlayer,
                });

                square.replaceChildren(squareIcon);

                // Check if there is a winner or a tie
                const game = App.getGameStatus(App.state.moves)

                // Modal
                if (game.status === "complete") {

                    App.$.modal.classList.remove("hidden");

                    let message = "";

                    if (game.winner) {
                        message = `Player ${game.winner} wins!`
                    } else {
                        message = `It's a tie!`
                    };

                    App.$.modalTxt.textContent = message;
                };

            });
        });
    },

};

const players = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x", //"fa-solid" ?
        colorClass: "turquoise",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "yellow",
    },
]

function init() {
    const view = new View();
    const store = new Store(players);

    console.log(store.game)

    view.bindGameResetEvent((event) => {
        view.closeAll();
        store.reset();
        view.clearMoves();
        view.setTurnIndicator(store.game.currentPlayer);
    });

    view.bindNewRoundEvent((event) => {
        console.log("New round");
        console.log(event);
    });

    view.bindPlayerMoveEvent((square) => {

        // Checks that there's nothing in a square
        const existingMove = store.game.moves.find(
            (move) => move.squareId === +square.id
        );

        if (existingMove) {
            return;
        }

        // Place an icon of the current player in a square
        view.handlePlayerMove(square, store.game.currentPlayer);

        // Advance to the next state by pushing a move to the moves array
        store.playerMove(+square.id);

        // 
        if (store.game.status.isComplete) {
            view.openModal(store.game.status.winner ? `${store.game.status.winner.name} wins!` : "It's a tie!");

            return;
        }

        // Set tje mext player's turn indicator
        view.setTurnIndicator(store.game.currentPlayer);

    });
}

window.addEventListener("load", init);