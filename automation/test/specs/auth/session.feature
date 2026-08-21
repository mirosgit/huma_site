@regression
Feature: Staying signed in
  As a player
  I want to be remembered between visits and let go when I ask
  So that a refresh never costs me my place, and logging out really logs me out

  Scenario: TC-05 The session survives a reload, and logging out ends it
    Given I am signed in with a generated name playing on "easy"
    When I reload the application
    Then the "play" screen should be open
    And the "greeting" should read "Hello, <name>"
    When I click the "Log Out button"
    Then the "welcome" screen should be open
    And the "navigation bar" should not be shown
    And the welcome form should be in "register" mode
    And there should be no open session
    And my account should still exist
