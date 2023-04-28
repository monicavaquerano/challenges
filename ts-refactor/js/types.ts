type Player = {
    id: number,
    name: string,
    iconClass: string,
    colorClass: string,
}

type Move = {
    squareId: number,
    player: Player,
}

type Game = {
    moves: Move[],
    status: any,
}

type GameState = {
    currentGameMoves: Move[],
    history: {
        currentRoundGames: any[],
        allGames: any[],
    },
}

