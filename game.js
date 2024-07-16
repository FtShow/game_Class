export class Game {
    #settings = {
        gridSize: {
            columns: 5,
            rows: 5
        }
    };
    #status = 'pending';
    #player1;
    #player2;
    #google;

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

    #createUnits() {
        const player1position = this.#getRandomPosition([])
        this.#player1 = new Player(1, player1position)

        const player2position = this.#getRandomPosition([player1position])
        this.#player2 = new Player(2, player2position)

        const googlePosition = this.#getRandomPosition([player1position, player2position])
        this.#google = new Google(googlePosition)
    }

    start() {
        if (this.#status === 'pending') {
            this.#status = 'in-progress'
        }
        this.#createUnits()
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
export class Player extends Units{
    constructor(id, position) {
        super(position)
        this.id = id
    }

}

export class Google extends Units{
    constructor(position) {
        super(position)
    }
}

export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

export class NumberUtil {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}
