'use strict';

describe('controller tests', function(){
    
    var scope;
    var controller;
    beforeEach(module('rockPaperScissorsApp'));
    
    beforeEach(inject(function($rootScope, $controller){
        scope = $rootScope.$new();
        controller = $controller('gameController', {
            '$scope': scope
        });
    }));
    
    describe('controller initialization', function(){
        
        it('should start with empty string for computerPick, myPick, and announcement',  function(){
            expect(scope.myPick.length).toBeFalsy();
            expect(scope.computerPick.length).toBeFalsy();
            expect(scope.announcement.length).toBeFalsy();
        });
        
        it('should start with results as an empty array', function(){
            expect(scope.results.length).toBeFalsy();
        });
        
        it('should start with myWins and computerWins as 0', inject(function(scoreTracker){
            expect(scope.myWins).toBe(0);
            expect(scope.computerWins).toBe(0);
        }));
    });
    
    describe('newGame function', function(){ 
        
       it('should set all values of scope to what they were initialized as', inject(function(scoreTracker){
           scoreTracker.myScore = 50;
           scoreTracker.computerScore = 65;
           scope.computerPick = 'r';
           scope.myPick = 'p';
           scope.announcement = 'paper WAS SUPER EFFECTIVE AGAINST rock';
           scope.myWins = 50;
           scope.computerWins = 65;
           scope.newGame();
           
           expect(scoreTracker.myScore).toBe(0);
           expect(scoreTracker.computerScore).toBe(0);
           expect(scope.computerPick.length).toBeFalsy();
           expect(scope.myPick.length).toBeFalsy();
           expect(scope.announcement.length).toBeFalsy();
           expect(scope.myWins).toBe(0);
           expect(scope.computerWins).toBe(0);
       }));
        
    });
    
    describe('updateNpc function should update both strategies', function(){
        it('should add the last move last move variable', inject(function(nonPlayableCharacter){
            scope.myPick = 'r';
            
            nonPlayableCharacter.opponentLastMove = 's';
            nonPlayableCharacter.updateStrategies(scope.myPick);
            expect(nonPlayableCharacter.opponentLastMove).toBe('r');
        }));
        
        it('should add the last move to the favorite move queue', inject(function(nonPlayableCharacter){
            scope.myPick = 'p';

            nonPlayableCharacter.opponentMovesQueue = ['r','s','r'];
            nonPlayableCharacter.updateStrategies(scope.myPick);
            expect(nonPlayableCharacter.opponentMovesQueue.pop()).toBe('p');
        }));
        
        /*it('should remove oldest element and add newest while keeping array length at 10', inject(function(nonPlayableCharacter){
            scope.myPick = 'p';

            nonPlayableCharacter.opponentMovesQueue = ['r','s','r','s','s','r','s','r','s','s'];
            nonPlayableCharacter.updateStrategies(scope.myPick);
            expect(nonPlayableCharacter.opponentMovesQueue.pop()).toBe('p');
            expect(nonPlayableCharacter.opponentMovesQueue[0]).toBe('s');
        }));*/

    });
    
    describe('winner should be announced properly', function(){
        
        it("should announce the player's choice as the winner", inject(function(scoreTracker){
            scope.myPick = 'r';
            scope.computerPick = 's';
            scoreTracker.establishWinner(scope.myPick, scope.computerPick);
            scope.getResults();
            scope.announceWinner();
            expect(scope.announcement).toBe("rock beats scissors");
        }));
        
        it("should announce the computer's choice as the winner", inject(function(scoreTracker){
            scope.myPick = 'p';
            scope.computerPick = 's';
            scoreTracker.establishWinner(scope.myPick, scope.computerPick);
            scope.getResults();
            scope.announceWinner();
            expect(scope.announcement).toBe("scissors beats paper");
        }));
        
        it("should announce no winner", inject(function(scoreTracker){
            scope.myPick = 'p';
            scope.computerPick = 'p';
            scoreTracker.establishWinner(scope.myPick, scope.computerPick);
            scope.getResults();
            scope.announceWinner();
            expect(scope.announcement).toBe("TIE! paper had no effect on paper");
        }));
        
    });
    
    describe('update score properly after a play', function(){
        
        it("it should add one to the player's score when they win", inject(function(scoreTracker){
            scope.myPick = 'r';
            scope.computerPick = 's';
            scoreTracker.myScore = 65;
            scoreTracker.computerScore = 87;
            scope.myWins = 65;
            scope.computerWins = 87;
            
            scope.getResults();
            scope.showNewScore();
            
            expect(scope.myWins).toBe(66);
            expect(scope.computerWins).toBe(87);
        }));
        
        it("it should add one to the computer's score when they win", inject(function(scoreTracker){
            scope.myPick = 'r';
            scope.computerPick = 'p';
            scoreTracker.myScore = 65;
            scoreTracker.computerScore = 87;
            scope.myWins = 65;
            scope.computerWins = 87;

            scope.getResults();
            scope.showNewScore();
            
            expect(scope.myWins).toBe(65);
            expect(scope.computerWins).toBe(88);
        }));
        
        it("it should leave scores the same when there is a tie", inject(function(scoreTracker){
            scope.myPick = 'r';
            scope.computerPick = 'r';
            scoreTracker.myScore = 65;
            scoreTracker.computerScore = 87;
            scope.myWins = 65;
            scope.computerWins = 87;

            expect(scoreTracker.myScore).toBe(65);
            expect(scoreTracker.computerScore).toBe(87);
            scope.getResults();
            
            scope.showNewScore();
            expect(scope.myWins).toBe(65);
            expect(scope.computerWins).toBe(87);
        }));
        
    });
});