@e2e
Feature: Deleting an account
  As a player
  I want deleting my account to be confirmed and complete
  So that I am never wiped out by a stray click, and nothing is left behind

  Scenario: TC-15 Deleting the account asks first, removes the data and signs me out
    Given I am signed in with a generated name playing on "easy"
    And my history contains a "win" and a "loss"
    When I click the "Profile link"
    Then the "profile" screen should be open
    When I click the "Delete Account button"
    Then a dialog should ask "Delete this account and all its data? This cannot be undone."
    When I dismiss the dialog
    Then the "profile" screen should be open
    And the "greeting" should read "Hello, <name>"
    And my account should still exist
    When I click the "Delete Account button"
    And I confirm the dialog
    Then the "welcome" screen should be open
    And my account should no longer exist
    And there should be no open session
