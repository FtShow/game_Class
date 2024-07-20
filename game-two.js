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

    getRandomPosition(coordinates = []) {
        let newX = null
        let newY = null

        do {
            newX = NumberUtils.randomNumber(this.#settings.gridSize.columns)
            newY = NumberUtils.randomNumber(this.#settings.gridSize.columns)
        }
        while (
            coordinates.some(pos => pos.x === newX && pos.y === newY)
            )
        return new Position(newX, newY)
    }

    createUnits() {
        this.#player1 = Player(1, Position(NumberUtils.randomNumber(),))

    }

    start() {
        if (this.#status !== 'pending') {
            this.#status = "in-progress";
        }
        this.#createUnits()
    }


    get settings() {
        return this.#settings
    }

    set settings(settings) {
        this.#settings = settings

    }

    get status() {
        return this.#status
    }

    set status(status) {
        this.#status = status
    }
}

class Units {
    constructor(position) {
        this.position = position
    }
}

class Player extends Units {
    constructor(id, position) {
        super(position);
        this.id = id
    }
}

class NumberUtils {
    static randomNumber(max) {
        return Math.floor(Math.random() * max + 1)
    }
}

class Position {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}


