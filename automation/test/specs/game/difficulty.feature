@regression
Feature: Changing the difficulty
  As a player
  I want to be warned before a difficulty change throws my game away
  So that I never lose a game in progress by accident

  Scenario: TC-11 A player can change the game difficulty
    Given I am signed in with a generated name playing on "easy"
    And I have already played the cell 0
    When I select "hard" in the "difficulty selector"
    Then a dialog should ask "Change difficulty and start a new game?"
    When I confirm the dialog
    Then the "difficulty selector" should hold "hard"
    And all 9 cells should be empty and enabled
    And the "status" should read "Your turn (X)"
