'use strict';

describe('scoreTracker service', function(){
    beforeEach(module('rockPaperScissorsApp'));
    
    describe('when initialized scoreTracker', function(){

        it('should make both scores 0 on start up', inject(function(scoreTracker){
            expect(scoreTracker.myScore).toEqual(0);
            expect(scoreTracker.computerScore).toEqual(0);
        }));
        
        it('should make neither player or computer the winner', inject(function(scoreTracker){
            expect(scoreTracker.whoWon.player).toBe(false);
            expect(scoreTracker.whoWon.computer).toBe(false);
        }));
    });
    
    describe('scoreTracker service deciding winner and loser', function(){
        
        //Player plays rock tests
        describe('tell who wins when player plays rock and computer plays paper', function(){
            it('should make player the loser and computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('r', 'p');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(true);
            }));
        });

        describe('tell who wins when player plays rock and computer plays scissors', function(){
            it('should make player the winner and computer the loser', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('r', 's');
                expect(results.player).toBe(true);
                expect(results.computer).toBe(false);
            }));
        });

        describe('tell who wins when player plays rock and computer plays rock', function(){
            it('should make neither player or computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('r', 'r');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(false);
            }));
        });

        //Player plays paper tests
        describe('tell who wins when player plays paper and computer plays rock', function(){
            it('should make player the winner and computer the loser', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('p', 'r');
                expect(results.player).toBe(true);
                expect(results.computer).toBe(false);
            }));
        });

        describe('tell who wins when player plays paper and computer plays scissors', function(){
            it('should make player the loser and computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('p', 's');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(true);
            }));
        });

        describe('tell who wins when player plays paper and computer plays paper', function(){
            it('should make neither player or computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('p', 'p');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(false);
            }));
        });


        //Player plays scissors tests
        describe('tell who wins when player plays scissors and computer plays rock', function(){
            it('should make player the loser and computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('s', 'r');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(true);
            }));
        });

        describe('tell who wins when player plays scissors and computer plays paper', function(){
            it('should make player the winner and computer the loser', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('s', 'p');
                expect(results.player).toBe(true);
                expect(results.computer).toBe(false);
            }));
        });

        describe('tell who wins when player plays scissors and computer plays scissors', function(){
            it('should make neither player or computer the winner', inject(function(scoreTracker){
                var results = scoreTracker.establishWinner('s', 's');
                expect(results.player).toBe(false);
                expect(results.computer).toBe(false);
            }));
        });
    });
    
    describe('scoreTracker service updating the score', function(){
        
        it("should add one to the player's score if they win", inject(function(scoreTracker){
            scoreTracker.myScore = 3;
            scoreTracker.computerScore = 4;
            var results = scoreTracker.establishWinner('r', 's');
            scoreTracker.updateScore();
            expect(scoreTracker.myScore).toBe(4);
            expect(scoreTracker.computerScore).toBe(4);
        }));
        
        it("should add one to the computer's score if they win", inject(function(scoreTracker){
            scoreTracker.myScore = 3;
            scoreTracker.computerScore = 4;
            var results = scoreTracker.establishWinner('s', 'r');
            scoreTracker.updateScore();
            expect(scoreTracker.myScore).toBe(3);
            expect(scoreTracker.computerScore).toBe(5);
        }));
        
        it("should not change the score if no one wins", inject(function(scoreTracker){
            scoreTracker.myScore = 3;
            scoreTracker.computerScore = 4;
            var results = scoreTracker.establishWinner('r', 'r');
            scoreTracker.updateScore();
            expect(scoreTracker.myScore).toBe(3);
            expect(scoreTracker.computerScore).toBe(4);
        }));
    });
    
    describe('scoreTracker service reseting the score', function(){
        
        it("should make player's score and computer's score 0", inject(function(scoreTracker){
            scoreTracker.myScore = 3;
            scoreTracker.computerScore = 4;
            scoreTracker.resetScore();
            expect(scoreTracker.myScore).toBe(0);
            expect(scoreTracker.computerScore).toBe(0);
        }));

    });
});

describe('nonPlayableCharacter service', function(){
    beforeEach(module('rockPaperScissorsApp'));
    
    //service initialization
    describe('service initialization', function(){
        
        it('should have an empty array for the opponent move queue', inject(function(nonPlayableCharacter){
            expect(nonPlayableCharacter.opponentMovesQueue.length).toBeFalsy();
        }));
        
        it("should have an empty string for the opponent's last move", inject(function(nonPlayableCharacter){
            expect(nonPlayableCharacter.opponentLastMove.length).toBeFalsy();
        }));
        
    });
    
    //strategy selection
    describe('correct strategy is chosen using index from strategy array', function(){
        
        it("it should be 'lastMove' when index is 0", inject(function(nonPlayableCharacter){
            var index = 0;
            expect(nonPlayableCharacter.strategies[index]).toBe('lastMove');
        }));
        
        it("it should be 'favoriteMove' when index is 1", inject(function(nonPlayableCharacter){
            var index = 1;
            expect(nonPlayableCharacter.strategies[index]).toBe('favoriteMove');
        }));

    });
    
    //random play
    describe('random play returns correct play', function(){
        
        it("should return r(rock) when randomIndex is 0", inject(function(nonPlayableCharacter){
            nonPlayableCharacter.randomIndex = 0;
            expect(nonPlayableCharacter.randomPlay()).toBe('r');
        }));
        
        it("should return p(paper) when randomIndex is 1", inject(function(nonPlayableCharacter){
            nonPlayableCharacter.randomIndex = 1;
            expect(nonPlayableCharacter.randomPlay()).toBe('p');
        }));
        
        it("should return s(scissors) when randomIndex is 2", inject(function(nonPlayableCharacter){
            nonPlayableCharacter.randomIndex = 2;
            expect(nonPlayableCharacter.randomPlay()).toBe('s');
        }));
    });
    
    //latest move strategy update
    describe('latest Move is updated properly', function(){
        
        it('should update to r when opponents move was r', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentLastMove = 's';
            nonPlayableCharacter.updateStrategies('r');
            expect(nonPlayableCharacter.opponentLastMove).toBe('r');
        }));
        
    });
    
    //opponent move queue
    describe('player move queue is updated porperly', function(){
        
        it('should add newest play to array, to the end, if array length is 0', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentMovesQueue = [];
            nonPlayableCharacter.updateStrategies('r');
            var arrayLength = nonPlayableCharacter.opponentMovesQueue.length;
            expect(nonPlayableCharacter.opponentMovesQueue[arrayLength-1]).toBe('r');
        }));
        
        it('should add newest play to array, to the end, if array length is less than 5', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentMovesQueue = ['r','s','p'];
            nonPlayableCharacter.updateStrategies('s');
            var arrayLength = nonPlayableCharacter.opponentMovesQueue.length;
            expect(nonPlayableCharacter.opponentMovesQueue[arrayLength-1]).toBe('s');
        }));
        
    });
    
    //get favorite play test
    describe('mode tests->', function(){
        
        it('random play should be made if queue is empty', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentMovesQueue = [];
            nonPlayableCharacter.randomIndex = 0;
            expect(nonPlayableCharacter.choseAction()).toBe('r');
        }));
        
        it('return earliest play if there is no favorite', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentMovesQueue = ['r'];
            expect(nonPlayableCharacter.getMode()).toBe('r');

            nonPlayableCharacter.opponentMovesQueue = ['s','r'];
            expect(nonPlayableCharacter.getMode()).toBe('s');

            nonPlayableCharacter.opponentMovesQueue = ['p','s','r'];
            expect(nonPlayableCharacter.getMode()).toBe('p');
        }));
        
        it('mode should be returned properly regardless of array size', inject(function(nonPlayableCharacter){ 
            nonPlayableCharacter.opponentMovesQueue = ['s','r','s'];
            expect(nonPlayableCharacter.getMode()).toBe('s');
            nonPlayableCharacter.opponentMovesQueue = ['r','r','r','r','s'];
            expect(nonPlayableCharacter.getMode()).toBe('r');
            nonPlayableCharacter.opponentMovesQueue = ['p','r','s','p','p'];
            expect(nonPlayableCharacter.getMode()).toBe('p');
        }));
        
                
        it('mode should be earliest favorite play in case of mulitple favorite plays', inject(function(nonPlayableCharacter){
            nonPlayableCharacter.opponentMovesQueue = ['s','r','s','r'];
            expect(nonPlayableCharacter.getMode()).toBe('s');
            nonPlayableCharacter.opponentMovesQueue = ['p','r','r','p','p'];
            expect(nonPlayableCharacter.getMode()).toBe('p');
            nonPlayableCharacter.opponentMovesQueue = ['s','r','p','p','s'];
            expect(nonPlayableCharacter.getMode()).toBe('p');
        }));
    });
    
    //pick npc move
    describe('picking the right action based on strategy', function(){
        
        describe('last move strategy', function(){
            //play scissors
            it('should play scissors when last player move was paper', inject(function(nonPlayableCharacter){
                var strategy = 'lastMove';
                nonPlayableCharacter.opponentLastMove = 'p'
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('s');
            }));
            
            //play rock
            it('should play rock when last player move was scissors', inject(function(nonPlayableCharacter){
                var strategy = 'lastMove';
                nonPlayableCharacter.opponentLastMove = 's'
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('r');
            }));
            
            //play paper
            it('should play paper when last player move was rock', inject(function(nonPlayableCharacter){
                var strategy = 'lastMove';
                nonPlayableCharacter.opponentLastMove = 'r';
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('p');
            }));
        });
        
        describe('favorite move strategy', function(){
            //play scissors
            it("should play scissors when user's favorite move is paper", inject(function(nonPlayableCharacter){
                var strategy = 'favoriteMove';
                nonPlayableCharacter.opponentMovesQueue = ['r','s','p','p','r'];
                expect(nonPlayableCharacter.getMode()).toBe('p');
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('s');
            }));
            
            //play rock
            it("should play rock when user's favorite move is scissors", inject(function(nonPlayableCharacter){
                var strategy = 'favoriteMove';
                nonPlayableCharacter.opponentMovesQueue = ['s','r','s','p','s'];
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('r');
            }));
            
            //play paper
            it("should play paper when user's favorite move is rock", inject(function(nonPlayableCharacter){
                var strategy = 'favoriteMove';
                nonPlayableCharacter.opponentMovesQueue = ['s','r','p','r','s'];
                expect(nonPlayableCharacter.choseAction(strategy)).toBe('p');
            }));
        });
    });
    
    //reset npc 'memory'
    describe("reseting npc 'memory' in order to start a new game", function(){
       it("player's last move and the move queue should both be empty after reset", inject(function(nonPlayableCharacter){
           nonPlayableCharacter.opponentMovesQueue = ['s','r','s','r'];
           nonPlayableCharacter.opponentLastMove = 'r';
           nonPlayableCharacter.resetNpcMemory();
           expect(nonPlayableCharacter.opponentLastMove.length).toBeFalsy();
           expect(nonPlayableCharacter.opponentMovesQueue.length).toBeFalsy();
       })); 
    });
});