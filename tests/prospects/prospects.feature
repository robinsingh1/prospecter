Feature: ProspectsTable
  Copy, Move Prospects
  Create List
  Add Prospect
  Test EmailPattern, CompanyInfo Loading Time
  Download CSV
  Archive
  Pagination
  Launch Prospect, Company Mining Job

  Scenario: Copy Prospects
    Given I have prospects to copy
    When I copy prospect to prospect list
    Then I expect prospect to be in prospect list

  Scenario: Move Prospect
    Given I have prospects to move
    When I move prospects from one to prospect list
    Then I expect prospect to be in prospect list 
    And removed from current prospect list
    And counts for both list should be updated

  Scenario: Create List
    Given I have lists
    When I create list
    Then I expect new list to be in lists
