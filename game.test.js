import {Game, Position} from "./game";


describe('Game test', () => {

    let game = new Game()
    beforeEach(() => {
        game = new Game()
    })
    afterEach(() => {
        game.stop()
    })
    it('should return grid size', function () {
        const game = new Game()
        game.settings = {
            gridSize: {
                columns: 5,
                rows: 5
            }
        }

        const settings = game.settings

        expect(settings.gridSize.rows).toBe(5)
        expect(settings.gridSize.columns).toBe(5)
    });
    it('should shange status', function () {
        game = new Game()
        game.settings = {
            gridSize: {
                columns: 5,
                rows: 5
            }
        }

        const settings = game.settings

        expect(game.status).toBe('pending')
        game.start()
        expect(game.status).toBe('in-progress')
    });

    it('should unit have uniq pos', function () {

        for (let i = 0; i < 5; i++) {
            game = new Game()
            game.settings = {
                gridSize: {
                    columns: 5,
                    rows: 5
                }
            }
            game.start()
            expect([1, 2, 3, 4, 5]).toContain(game.player1.position.x)
            expect([1, 2, 3, 4, 5]).toContain(game.player1.position.y)
            expect([1, 2, 3, 4, 5]).toContain(game.player2.position.x)
            expect([1, 2, 3, 4, 5]).toContain(game.player2.position.y)

        }
    });
    it('should google change position', async () => {
        for (let i = 0; i < 5; i++) {
            game = new Game();
            game.settings = {
                gridSize: {
                    columns: 5,
                    rows: 5
                },
                googleJumpInterval: 100,
            }
            game.start()
            const prevPosition = game.google.position.copy()
            await sleep(150)
            expect(prevPosition.equal(game.google.position)).toBe(false)
            game.stop()

        }
    })
    const sleep = (delay) => {
        return new Promise(res => setTimeout(res, delay))
    }
    it('should google be caught by player1 or player2 for one row', async () => {
        for (let i = 0; i < 10; i++) {
            game = new Game()        // setter
            game.settings = {
                gridSize: {
                    columns: 3, rows: 1,
                },
            }
            game.start()
            // p1 p2 g | p1 g p2 | p2 p1 g | p2 g p1 | g p1 p2 | g p2 p1
            const diffForPlayer1 = game.google.position.x - game.player1.position.x
            const prevGooglePosition = game.google.position.copy()
            if (Math.abs(diffForPlayer1) === 2) {
                const diffForPlayer2 = game.google.position.x - game.player2.position.x
                if (diffForPlayer2 > 0) {
                    game.movePlayer2Right()
                } else {
                    game.movePlayer2Left()
                }
                expect(game.score[1].points).toBe(0)
                expect(game.score[2].points).toBe(1)
            } else {
                if (diffForPlayer1 > 0) {
                    game.movePlayer1Right()
                } else {
                    game.movePlayer1Left()
                }
                expect(game.score[1].points).toBe(1)
                expect(game.score[2].points).toBe(0)
            }
            expect(game.google.position.equal(prevGooglePosition)).toBe(false)
            game.stop();
        }
    })
    it("first or second player wins", () => {
        game = new Game();
        game.settings = {
            pointsToWin: 3, gridSize: {
                columns: 3, rows: 1,
            },
        };
        game.start();
        const diffForPlayer1 = game.google.position.x - game.player1.position.x;
        if (Math.abs(diffForPlayer1) === 2) {
            const diffForPlayer2 = game.google.position.x - game.player2.position.x;
            if (diffForPlayer2 > 0) {
                game.movePlayer2Right();
                game.movePlayer2Left();
                game.movePlayer2Right();
            } else {
                game.movePlayer2Left();
                game.movePlayer2Right();
                game.movePlayer2Left();
            }
            expect(game.status).toBe("finished");
            expect(game.score[1].points).toBe(0);
            expect(game.score[2].points).toBe(3);
        } else {
            if (diffForPlayer1 > 0) {
                game.movePlayer1Right();
                game.movePlayer1Left();
                game.movePlayer1Right();
            } else {
                game.movePlayer1Left();
                game.movePlayer1Right();
                game.movePlayer1Left();
            }

            expect(game.status).toBe("finished");
            expect(game.score[1].points).toBe(3);
            expect(game.score[2].points).toBe(0);
        }
    });
});
