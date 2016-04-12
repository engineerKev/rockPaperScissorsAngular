rockPaperScissorsApp.controller('gameController', ['$scope', 'scoreTracker','nonPlayableCharacter', function($scope, scoreTracker, nonPlayableCharacter){

    $scope.results = {};
    $scope.myWins = scoreTracker.myScore;
    $scope.computerWins = scoreTracker.computerScore;
    $scope.computerPick = '';
    $scope.announcement = '';
    $scope.myPick = '';
    $scope.letterToWord = {
        r: 'rock',
        p: 'paper',
        s: 'scissors'
    };
    $scope.strategies = {
        optionsAvailable: [
            {name: 'Last Move', value: 'lastMove'},
            {name: 'Favorite Move', value: 'favoriteMove'},
            {name: 'Default', value: 'alwaysRandom'}
        ],
        defaultOption: {name: 'Default', value: 'alwaysRandom'}
    };
    
    $scope.processRound = function(usersPlay){
        
        var strategyIndex = Math.round(Math.random()*2);
        var computerStrategy = $scope.strategies.defaultOption.value != 'alwaysRandom' ?$scope.strategies.defaultOption.value : nonPlayableCharacter.getStrategy(strategyIndex);
        
        console.log(computerStrategy);
        
        $scope.myPick = usersPlay;
        $scope.computerPick = nonPlayableCharacter.choseAction(computerStrategy);
        
        $scope.updateNpc();
        
        $scope.getResults();
        
        $scope.announceWinner();
        
        $scope.showNewScore();

    };
    
    $scope.showNewScore = function(){
        scoreTracker.updateScore();
        $scope.myWins = scoreTracker.myScore;
        $scope.computerWins = scoreTracker.computerScore;
    }
    
    $scope.getResults = function(){
        $scope.results = scoreTracker.establishWinner($scope.myPick, $scope.computerPick);
    }
    
    $scope.announceWinner = function(){
        
        if($scope.results.player){
            $scope.announcement = $scope.letterToWord[$scope.myPick]+" beats "+$scope.letterToWord[$scope.computerPick];
        }else if($scope.results.computer){
            $scope.announcement = $scope.letterToWord[$scope.computerPick]+" beats "+$scope.letterToWord[$scope.myPick];
        }else{
            $scope.announcement = "TIE! "+$scope.letterToWord[$scope.myPick]+" had no effect on "+$scope.letterToWord[$scope.computerPick];
        } 
    }

    $scope.newGame = function(){
        
        scoreTracker.resetScore();
        $scope.computerPick = '';
        $scope.announcement = '';
        $scope.myPick = '';
        $scope.myWins = scoreTracker.myScore;
        $scope.computerWins = scoreTracker.computerScore;
    };
    
    $scope.updateNpc = function(){
        
        nonPlayableCharacter.updateStrategies($scope.myPick);
        
    };
}]);
