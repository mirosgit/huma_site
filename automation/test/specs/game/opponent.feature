@regression
Feature: The opponent plays at the strength it advertises
  As a player
  I want each difficulty to mean something
  So that "Medium" is a real step up from "Easy", and "Hard" is worth beating

  Scenario: TC-12 Medium blocks the attack that beats Easy
    Given I am signed in with a generated name playing on "medium"
    When I click the cell 0
    And I wait for the computer to reply
    And I click the cell 3
    And I wait for the computer to reply
    Then the computer should have blocked the cell 6
    And the game should still be in progress

  @known-defect @BUG-001
  Scenario: TC-13 Game outcome for a standard player sequence on Hard difficulty
    Given I am signed in with a generated name playing on "hard"
    When I click the cell 2
    And I wait for the computer to reply
    And I click the cell 4
    And I wait for the computer to reply
    Then the computer should have blocked the cell 6

  @known-defect @BUG-002
  Scenario: TC-14 The computer never takes a cell the player already owns
    Given I am signed in with a generated name playing on "hard"
    And I have played the cells "2, 4, 6"
    When I click the "New Game button"
    And I wait for the board to be ready
    And I click the cell 0
    And I wait for the computer to reply
    Then the cell 0 should hold my mark
    And the board should hold 1 of my marks and 1 computer mark
