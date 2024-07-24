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

});