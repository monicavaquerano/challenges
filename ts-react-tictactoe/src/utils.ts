import { GameState, Player } from "./types";

const players: Player[] = [
    {
        id: 1,
        name: "Player 1",
        iconClass: "fa-x",
        colorClass: "turquoise",
    },
    {
        id: 2,
        name: "Player 2",
        iconClass: "fa-o",
        colorClass: "yellow",
    },
]

export function deriveGame(state: GameState) {

    const currentPlayer = players[state.currentGameMoves.length % 2];

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

    for (const player of players) {
        const selectedSquaresIds = state.currentGameMoves.
            filter((move) => move.player.id === player.id
            ).map((move) => move.squareId)

        for (const combo of winningCombos) {
            if (combo.every((v) => selectedSquaresIds.includes(v))) {
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

export function deriveStats(state: GameState) {
    return {
        playerWithStats: players.map((player) => {
            const wins = state.history.currentRoundGames.filter(
                (game) => game.status.winner?.id === player.id
            ).length;

            return {
                ...player,
                wins,
            }
        }),

        ties: state.history.currentRoundGames.filter(
            (game) => game.status.winner === null
        ).length,
    }
}