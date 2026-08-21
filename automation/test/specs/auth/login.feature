@smoke
Feature: Signing back in
  As a returning player
  I want to get back into my own account
  So that the games I played are still mine

  Scenario: TC-04 An existing player can sign in
    Given my account already exists playing on "easy"
    And I wait for the "name field" to be interactable
    When I click the "switch mode link"
    And I enter my name into the "name field"
    And I click the "Log In button"
    Then the "play" screen should be open
    And the "greeting" should read "Hello, <name>"
