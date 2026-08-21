@regression
Feature: Game outcomes
  As a player
  I want the game to award the result I actually earned
  So that winning, losing and drawing all mean something

  Background:
    Given I am signed in with a generated name playing on "easy"
    And my history is empty

  Scenario: TC-08 The player wins and the winning line is highlighted
    When I play the scripted game "player wins"
    Then the game should be won
    And the board should look like "xoox..x.."
    And the "status" should read "You win!"
    And the winning line should be cells "0, 3, 6"
    And all 9 cells should be disabled
    And my history should hold exactly one "Easy" game recorded as "Win"

  Scenario: TC-09 The computer wins
    When I play the scripted game "computer wins"
    Then the game should be lost
    And the board should look like "ooox.x.x."
    And the "status" should read "Computer wins."
    And the winning line should be cells "0, 1, 2"
    And my history should hold exactly one "Easy" game recorded as "Loss"

  Scenario: TC-10 A full board with no winner is a draw
    When I play the scripted game "draw"
    Then the game should be drawn
    And the board should look like "oxoxxoxox"
    And the "status" should read "Draw."
    And there should be no winning line
    And my history should hold exactly one "Easy" game recorded as "Draw"
