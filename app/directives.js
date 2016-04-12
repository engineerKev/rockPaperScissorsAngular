rockPaperScissorsApp.directive('scoreBoard', function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/scoreBoard.htm',
        replace: true,
        scope: {
            userScore: '@',
            computerScore: '@',
            myPick: '@',
            computerPick: '@',
            letterToWord: '=',
            results: '='
        }
    };
});

rockPaperScissorsApp.directive('gameControls', function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/gameControls.htm',
        replace: true,
        scope: {
            processRound: '&'
        }
    };
});

rockPaperScissorsApp.directive('announcement', function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/announcement.htm',
        replace: true,
        scope: {
            results: '=',
            announcement: '@'
        }
    }
});

rockPaperScissorsApp.directive('newGame', function(){
    return {
        restrict: 'E',
        templateUrl: 'directives/newGame.htm',
        replace: true,
        scope:{
            myWins: '@',
            computerWins: '@',
            newGame: '&',
            strategies: '='
        }
    }
})