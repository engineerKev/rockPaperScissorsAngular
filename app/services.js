rockPaperScissorsApp.service('scoreTracker', function(){
    this.myScore = 0;
    this.computerScore= 0;
    this.whoWon = {
        player: false,
        computer: false
    };
    
    this.establishWinner = function(user, computer){
        if(user === 'r'){
            if(computer === 's'){
                this.whoWon.player = true
                this.whoWon.computer = false;
                
            }else if(computer === 'p'){
                this.whoWon.player = false;
                this.whoWon.computer = true;
            }else{
                this.whoWon.player = false;
                this.whoWon.computer = false;
            }
        }else if(user === 'p'){
            if(computer === 's'){
                this.whoWon.player = false;
                this.whoWon.computer = true;
                
            }else if(computer === 'r'){
                this.whoWon.player = true;
                this.whoWon.computer = false;
            }else{
                this.whoWon.player = false;
                this.whoWon.computer = false;
            }
        }else{
            if(computer === 'p'){
                this.whoWon.player = true;
                this.whoWon.computer = false;
                
            }else if(computer === 'r'){
                this.whoWon.player = false;
                this.whoWon.computer = true;
            }else{
                this.whoWon.player = false;
                this.whoWon.computer = false;
            }
        }
        return this.whoWon;
    };
    
    this.updateScore = function(){
        if(this.whoWon.player && !this.whoWon.computer){
            this.myScore += 1;
        }
        if(!this.whoWon.player && this.whoWon.computer){
            this.computerScore += 1;
        }
    };
    
    this.resetScore = function(){
        this.myScore = 0;
        this.computerScore = 0;
    }
});

rockPaperScissorsApp.service('nonPlayableCharacter', function(){
    
    this.strategies = ['lastMove', 'favoriteMove', 'random'];
    this.playbook = ['r', 'p', 's'];
    this.opponentMovesQueue = [];
    this.opponentLastMove = '';
    this.moves = {
        paper: 'p',
        rock: 'r',
        scissors: 's'
    }
    this.randomIndex = Math.round(Math.random()*2);
    
    this.getStrategy = function(strategyIndex){
        return this.strategies[strategyIndex];
    };
    
    this.choseAction = function(strategy){
        if(strategy === 'lastMove'){
            if(this.opponentLastMove === 'r'){
                return this.moves.paper;
            }else if(this.opponentLastMove === 'p'){
                return this.moves.scissors;
            }else if(this.opponentLastMove === 's'){
                return this.moves.rock;
            }else{
                return this.randomPlay();
            }
        }else if(strategy === 'favoriteMove'){
            if (this.opponentMovesQueue.length === 0){
                return this.randomPlay();
            }
            var mode = this.getMode();
            if(mode === 'r'){
                return this.moves.paper;
            }else if(mode === 'p'){
                return this.moves.scissors;
            }else if(mode === 's'){
                return this.moves.rock;
            }
        }else{
            return this.randomPlay();
        }
    };
    
    this.updateStrategies = function(latestLoss){
        this.opponentLastMove = latestLoss;
        this.opponentMovesQueue.push(latestLoss);
    };
    
    this.getMode = function(){
        
        var modesObj = {};
        var moves = this.opponentMovesQueue.slice(0);
        var firstMode = moves.splice(0,1)[0];
        modesObj[firstMode] = 1;
        
        var calculateMode = function(mode, obj, arr){
            if(arr.length === 0){
                return mode;  
            }else{
                var current = arr.splice(0,1)[0];
                if(obj[current]){
                    obj[current] += 1;
                    mode = obj[current] > obj[mode] ? current : mode;
                    return calculateMode(mode, obj, arr);
                }else{
                    obj[current] = 1;
                    return calculateMode(mode, obj, arr);
                }  
            }
        };
        
        return calculateMode(firstMode[0], modesObj, moves);
    };
    
    this.randomPlay = function(){
        return this.playbook[this.randomIndex];
    };
    
    this.resetNpcMemory = function(){
        this.opponentMovesQueue = [];
        this.opponentLastMove = '';
    }
    
});