Feature: Registering a player
  As a new player
  I want to create an account under a name that is mine
  So that I can start playing and be recognised when I come back

  @smoke
  Scenario: TC-01 A new player registers and reaches a playable board
    Given I wait for the "name field" to be interactable
    When I enter a generated name into the "name field"
    And I click the "Create Account button"
    Then the "play" screen should be open
    And the "greeting" should read "Hello, <name>"
    And all 9 cells should be empty and enabled
    And the "status" should read "Your turn (X)"
    And my account should be stored on "easy" with an empty history


  @regression
  Scenario: TC-02 Registration is refused for an already taken account
    Given my account already exists playing on "easy"
    And I wait for the "name field" to be interactable
    When I enter my name into the "name field"
    And I click the "Create Account button"
    Then the "error message" should read "This name is already taken. Try logging in."
    And the "welcome" screen should be open

    When I enter my name in lower case into the "name field"
    And I click the "Create Account button"
    Then the "error message" should read "This name is already taken. Try logging in."
    And the "welcome" screen should be open

  @regression
  Scenario: TC-03 Registration is refused for an empty name
    Given I wait for the "name field" to be interactable
    When I clear the "name field"
    And I click the "Create Account button"
    Then the "error message" should read "Please enter a name."
    And the "welcome" screen should be open
    When I enter "   " into the "name field"
    And I click the "Create Account button"
    Then the "error message" should read "Please enter a name."
    And the "welcome" screen should be open
    And no account should have been created
