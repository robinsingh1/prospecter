Feature: Signals
  Create, Delete, Prospect Signals
  Delete Signal
  Prospect Signal Report
  Prospect Signal
  Signal Finished Loading
  New RealTime Signal Reports
  Daily Signals Cron Jobs

  Scenario: Create Prospect Signal
    Given I have signals
    When I create signal
    Then I expect new loading signal

  Scenario: Delete Prospect Signal
    Given I have signals
    When I delete signal
    Then I expect signal to be removed from ui
    And not present when page is reloaded

  Scenario: Prospect Signal Report
    Given I have signal reports
    When I prospect signal report
    Then I expect all signals to be prospects in signal's prospect list
    And signals UI should be prospected
    And all signals reports UI should be prospected

  Scenario: Prospect Signal 
    Given I have signals in signal report
    When I prospect signal
    Then I expect signal to be in prospects in signal's prospect list
    And signals UI should be prospected

  Scenario: Signal Finished Loading
    Given I have signals
    When I create signal
    Then I expect new loading signal

  Scenario: New Realtime Signal Reports
    Given I have signals
    When I create signal
    Then I expect new loading signal

  Scenario: Daily Signals Cron Jobs
    Given I have signals
    When I create signal
    Then I expect new loading signal

