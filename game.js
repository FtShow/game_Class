export class Game {
    #settings = {
        gridSize: {
            columns: 5,
            rows: 5
        },
        googleJumpInterval: 2000,
    };
    #status = 'pending';
    #player1;
    #player2;
    #google;
    #googleJumpIntervalId;

    #getRandomPosition(takenPosition = []) {
        let newX;
        let newY;


        do {
            newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns,)
            newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows)
        } while (
            takenPosition.some(position => position.x === newX && position.y === newY))

        return new Position(newX, newY)
    }

    #moveGoogleToRandomPosition(isStartPosition) {
        const googlePosition = isStartPosition
            ? this.#getRandomPosition([this.#player1.position, this.#player2.position])
            : this.#getRandomPosition([this.#player1.position, this.#player2.position, this.#google.position])
        this.#google = new Google(googlePosition)
    }

    #createUnits() {
        const player1position = this.#getRandomPosition([])
        this.#player1 = new Player(1, player1position)

        const player2position = this.#getRandomPosition([player1position])
        this.#player2 = new Player(2, player2position)

        this.#moveGoogleToRandomPosition(true)
    }

    start() {
        if (this.#status === 'pending') {
            this.#status = 'in-progress'
            this.#createUnits()
            this.#googleJumpIntervalId = setInterval(() => {
                this.#moveGoogleToRandomPosition(false)
            }, this.#settings.googleJumpInterval)
        }

    }

    stop() {
        this.#status === 'finished'
        clearInterval(this.#googleJumpIntervalId)
    }

    #isBorder(movingPlayer, step) {
        let prevPlayer1Position = movingPlayer.position.copy()
        if (step.x) {
            prevPlayer1Position += step.x
            return prevPlayer1Position.x < 1 || prevPlayer1Position > this.#settings.gridSize.columns
        }
        if (step.y) {
            prevPlayer1Position += step.y
            return prevPlayer1Position.y < 1 || prevPlayer1Position > this.#settings.gridSize.rows
        }

    }

    #isOtherPlayer(movingPlayer, otherPlayer, step) {
        let prevPlayer1Position = movingPlayer.position.copy()
        if (step.x) {
            prevPlayer1Position += step.x

        }
        if (step.y) {
            prevPlayer1Position += step.y
        }
        return prevPlayer1Position.equal(otherPlayer.position)
    }

    #checkGoogleCatching(movingPlayer) {
        if (movingPlayer.position.equal(this.#google.position)) {
            this.#score[movingPlayer[id]].points++

        }
        this.#moveGoogleToRandomPosition(false)

    }

    #movePlayer() {

    }

    movePlayer1Right() {
        const step = {x: 1}
        if (this.#isBorder(this.#player1, step)) {
            return
        }
        if (this.#isOtherPlayer(this.#player1, this.#player2, step)) {
            return
        }
        this.#player1.position.x++
        this.#checkGoogleCatching(this.#player1)

    }

    movePlayer1Left() {
        const step = {x: -1}
    }

    movePlayer1Up() {
        const step = {y: 1}
    }

    movePlayer1Down() {
        const step = {y: -1}
    }

    set settings(settings) {
        this.#settings = settings
    }

    get settings() {
        return this.#settings
    }

    get status() {
        return this.#status
    }

    get player1() {
        return this.#player1
    }

    get player2() {
        return this.#player2
    }

    get google() {
        return this.#google
    }
}

export class Units {
    constructor(position) {
        this.position = position
    }
}

export class Player extends Units {
    constructor(id, position) {
        super(position)
        this.id = id
    }
}

export class Google extends Units {
    constructor(position) {
        super(position)
    }
}

export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Position(this.x, this.y)
    }

    equal(somePosition) {
        return somePosition.x === this.x && somePosition.y === this.y
    }

}

export class NumberUtil {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}
