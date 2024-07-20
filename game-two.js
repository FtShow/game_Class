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
    start (){

    }
    get settings (){
        return this.#settings
    }
    set settings(settings){
        this.#settings = settings

    }
    get status (){
        return this.#status
    }
    set status (status){
        this.#status = status
    }

}


