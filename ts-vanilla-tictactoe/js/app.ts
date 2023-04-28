import View from "./view.js";
import Store from "./store.js";
import { Player } from "./types";

const players: Player[] = [
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
    const store = new Store("storage-key", players);

    // Current Tab State changes
    store.addEventListener("stateChange", () => {
        view.render(store.game, store.stats);
    })

    // A different Tab State changes
    window.addEventListener("storage", () => {
        console.log("Changeeeeee in other tab :)");
        view.render(store.game, store.stats);
    });

    // The first load load of the document
    view.render(store.game, store.stats);

    view.bindGameResetEvent((event) => {
        store.reset();
    });

    view.bindNewRoundEvent((event) => {
        store.newRound();
    });

    view.bindPlayerMoveEvent((square) => {
        // Checks that there's nothing in a square
        const existingMove = store.game.moves.find(
            (move) => move.squareId === +square.id
        );

        if (existingMove) {
            return;
        }

        // Advance to the next state by pushing a move to the moves array
        store.playerMove(+square.id);
    });
}

window.addEventListener("load", init);