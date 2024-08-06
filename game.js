
export class Game {
    #settings = {
        gridSize: {
            columns: 5,
            rows: 5
        },
        googleJumpInterval: 2000,
        pointsToWin: 3
    };
    #status = 'pending';
    #player1;
    #player2;
    #google;
    #googleJumpIntervalId;
    #score = {
        1: {points: 0},
        2: {points: 0},
    }

    constructor(eventEmmiter) {
        this.eventEmmiter = eventEmmiter
    }

    #getRandomPosition(takenPosition = []) {
        let newX;
        let newY;

        do {
            newX = NumberUtil.getRandomNumber(this.#settings.gridSize.columns);
            newY = NumberUtil.getRandomNumber(this.#settings.gridSize.rows);
        } while (takenPosition.some(position => position.x === newX && position.y === newY));

        return new Position(newX, newY);
    }

    #moveGoogleToRandomPosition(isStartPosition) {
        const googlePosition = isStartPosition
            ? this.#getRandomPosition([this.#player1.position, this.#player2.position])
            : this.#getRandomPosition([this.#player1.position, this.#player2.position, this.#google.position]);
        this.#google = new Google(googlePosition);
        this.eventEmmiter.emit("changePosition")
    }

    #createUnits() {
        const player1position = this.#getRandomPosition([]);
        this.#player1 = new Player(1, player1position);

        const player2position = this.#getRandomPosition([player1position]);
        this.#player2 = new Player(2, player2position);

        this.#moveGoogleToRandomPosition(true);
    }

    start() {
        if (this.#status === 'pending') {
            this.#status = 'in-progress';
            this.#createUnits();
            this.#googleJumpIntervalId = setInterval(() => {
                this.#moveGoogleToRandomPosition(false);
            }, this.#settings.googleJumpInterval);
        }
    }

    stop() {
        this.#status = 'finished';
        clearInterval(this.#googleJumpIntervalId);
    }

    #isBorder(movingPlayer, step) {
        let prevPlayerPosition = movingPlayer.position.copy();

        if (step.x) {
            prevPlayerPosition.x += step.x;
            return prevPlayerPosition.x < 1 || prevPlayerPosition.x > this.#settings.gridSize.columns;
        }
        if (step.y) {
            prevPlayerPosition.y += step.y;
            return prevPlayerPosition.y < 1 || prevPlayerPosition.y > this.#settings.gridSize.rows;
        }
    }

    #isOtherPlayer(movingPlayer, otherPlayer, step) {
        let prevPlayerPosition = movingPlayer.position.copy();
        if (step.x) {
            prevPlayerPosition.x += step.x;
        }
        if (step.y) {
            prevPlayerPosition.y += step.y;
        }
        return prevPlayerPosition.equal(otherPlayer.position);
    }

    #checkGoogleCatching(movingPlayer) {
        if (movingPlayer.position.equal(this.#google.position)) {
            this.#score[movingPlayer.id].points++;
            this.#moveGoogleToRandomPosition(false);
        }
        if (this.#score[movingPlayer.id].points === this.#settings.pointsToWin) {
            this.stop()
            this.#google = new Google(new Position(0, 0))
        }

    }

    #movePlayer(movingPlayer, otherPlayer, step) {
        const isBorder = this.#isBorder(movingPlayer, step);
        const isOtherPlayer = this.#isOtherPlayer(movingPlayer, otherPlayer, step);
        if (isBorder || isOtherPlayer) {
            return;
        }
        if (step.x) {
            movingPlayer.position.x += step.x;
        }
        if (step.y) {
            movingPlayer.position.y += step.y;
        }
        this.#checkGoogleCatching(movingPlayer);
        this.eventEmmiter.emit('changePosition')
    }

    movePlayer1Right() {
        this.#movePlayer(this.#player1, this.#player2, {x: 1});
    }

    movePlayer1Left() {
        this.#movePlayer(this.#player1, this.#player2, {x: -1});
    }

    movePlayer1Up() {
        this.#movePlayer(this.#player1, this.#player2, {y: -1});
    }

    movePlayer1Down() {
        this.#movePlayer(this.#player1, this.#player2, {y: 1});
    }

    movePlayer2Right() {
        this.#movePlayer(this.#player2, this.#player1, {x: 1});
    }

    movePlayer2Left() {
        this.#movePlayer(this.#player2, this.#player1, {x: -1});
    }

    movePlayer2Up() {
        this.#movePlayer(this.#player2, this.#player1, {y: -1});
    }

    movePlayer2Down() {
        this.#movePlayer(this.#player2, this.#player1, {y: 1});
    }

    set settings(settings) {
        this.#settings = settings;
    }

    get settings() {
        return this.#settings;
    }

    get status() {
        return this.#status;
    }

    get player1() {
        return this.#player1;
    }

    get player2() {
        return this.#player2;
    }

    get google() {
        return this.#google;
    }

    get score() {
        return this.#score;
    }
}

export class Units {
    constructor(position) {
        this.position = position;
    }
}

export class Player extends Units {
    constructor(id, position) {
        super(position);
        this.id = id;
    }
}

export class Google extends Units {
    constructor(position) {
        super(position);
    }
}

export class Position {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    copy() {
        return new Position(this.x, this.y);
    }

    equal(somePosition) {
        return somePosition.x === this.x && somePosition.y === this.y;
    }
}

export class NumberUtil {
    static getRandomNumber(max) {
        return Math.floor(Math.random() * max + 1);
    }
}
class B {
    create(type){
        if(type === 'A')
            return new String('asaasas')
    }
}
