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

    #getRandomPosition(coordinates = []) {
        let newX = null
        let newY = null

        do {
            newX = NumberUtils.randomNumber(this.#settings.gridSize.columns)
            newY = NumberUtils.randomNumber(this.#settings.gridSize.rows)
        }
        while (
            coordinates.some(pos => pos.x === newX && pos.y === newY)
            )
        return new Position(newX, newY)
    }

    #createUnits() {

        const pos1 = this.#getRandomPosition()
        this.#player1 = new Player(1, pos1)
        //console.log(this.#player1)

        const pos2 = this.#getRandomPosition([pos1])
        this.#player2 = new Player(2, pos2)

        //console.log(this.#player2)

        const pos3 = this.#getRandomPosition([pos1, pos2])
        this.#google = new Google(pos3)

    }

    start() {
        if (this.#status === 'pending') {
            this.#status = "in-progress"
            this.#createUnits()
        }

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

class Google extends Units {
    constructor(position) {
        super(position);
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


