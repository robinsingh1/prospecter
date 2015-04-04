'''
  Scenario: Add Prospect
    Given I have prospects
    When I add prospect
    Then I expect new prospect to be loading in prospect table

  Scenario: CompanyInfo Loading Time
    Given I have added a prospect
    When I add a prospect 
    Then I expect company research to be completed in less than 10 seconds

  Scenario: EmailPattern Loading Time
    Given I have added a prospect
    When I add a prospect
    Then I expect email pattern research to be completed in less than 10 secs

  Scenario: Download Prospect CSV
    Given I have all prospects
    When I download prospects csv
    Then I expect csv to be formatted properly 
    And downloaded prospect csv should contain accurate data

  Scenario: Download Prospect List CSV
    Given I have all prospects
    When I download prospects csv
    Then I expect csv to be formatted properly 
    And csv should contain only prospects from list

  Scenario: Archive Prospect
    Given I have prospects
    When I download archive prospect
    Then I expect prospect to be updated 
    And prospect removed from table ui
    And all prospect count to be updated
    And all prospect lists that prospect was part of to be updated

  Scenario: Pagination
    Given I have all prospects
    When I paginate next
    Then correct prospects should be shown
    When I paginate previous
    Then correct prospects should be shown
    When I paginate fastForward
    Then correct prospects should be shown
    When I paginate fastPrevious
    Then correct prospects should be shown

  Scenario: Launch Prospect Mining Job
    Given I have all prospects
    When I download prospects csv
    Then I expect csv to be formatted properly 

  Scenario: Launch Company Mining Job
    Given I have all prospects
    When I download prospects csv
    Then I expect csv to be formatted properly 


'''
