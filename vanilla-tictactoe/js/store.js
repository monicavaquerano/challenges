const initialValue = {
    currentGameMoves: [],
    history: {
        currentRoundGames: [],
        allGames: [],
    },
}

export default class Store {
    #state = initialValue;

    constructor(players) {
        this.players = players;
    }

    get game() {
        const state = this.#getState();

        const currentPlayer = this.players[state.currentGameMoves.length % 2];

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

        for (const player of this.players) {
            const selectedSquaresIds = state.currentGameMoves.
                filter((move) => move.player.id === player.id
                ).map((move) => move.squareId)

            for (const combo of winningCombos) {
                if (combo.every(v => selectedSquaresIds.includes(v))) {
                    winner = player
                }
            }
        }

        return {
            moves: state.currentGameMoves,
            currentPlayer,
            status: {
                isComplete: winner != null || state.currentGameMoves.length === 9,
                winner,
            },
        };
    }

    playerMove(squareId) {
        const stateClone = structuredClone(this.#getState());

        stateClone.currentGameMoves.push({
            squareId,
            player: this.game.currentPlayer,
        });

        this.#saveState(stateClone);
    }

    reset() {
        if (this.game.isComplete) {

        }

        this.#saveState(initialValue);
    }

    #getState() {
        return this.#state
    }

    #saveState(stateOrFn) {
        const prevState = this.#getState();

        let newState;

        switch (typeof stateOrFn) {
            case "function":
                newState = stateOrFn(prevState);
                break;
            case "object":
                newState = stateOrFn;
                break;
            default:
                throw new Error("Invalid argument passed to saveState")
        }

        this.#state = newState;
    }
}