Feature: Placing a move
  As a player
  I want my move answered, and the board to refuse anything that is not my move
  So that I cannot play twice, or play on top of a mark that is already there

  Background:
    Given I am signed in with a generated name playing on "easy"

  @smoke
  Scenario: TC-06 A move is placed and answered by the computer
    When I click the cell 4
    And I wait for the computer to reply
    Then the cell 4 should hold my mark
    And the computer should have taken exactly one cell
    And the "status" should read "Your turn (X)"

  @regression
  Scenario: TC-07 The board is locked while the computer is thinking
    When I click the cell 4 without waiting for the computer
    And I try to click the cells "0, 1, 2" before the computer replies
    Then the board should have been locked while the computer was thinking
    And those clicks should have placed no mark
    When I wait for the computer to reply
    Then the "status" should read "Your turn (X)"
    And the cell 4 should hold my mark
    And the cell 4 should be disabled
    When I try to click the cell 4
    Then the cell 4 should hold my mark
    And the board should hold 1 of my marks and 1 computer mark
