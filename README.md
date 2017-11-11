Simple test results viewer app written with react and mobx. 
Created for a concrete project so it is not supposed to be an universal application. 
Test executor (in my case it was a python GUI tests runner) is responsible for gathering results and sending them with curl to the application server in the following format/structure:

![reports structure](/doc/reports_structure.png?raw=true)

Where the report headers files (the json ones located directly in the 'reports' dir) store summarized info about the runs:
- initiator
- run name
- stage
- total/passed/failed/skipped/error
- start time
- duration
- etc, etc.

The server part just reads the content of reports headers and sends them to the web app: 

![test runs](/doc/runs_list.png?raw=true)

By clicking on the test run details button (arrow in circle in every row) the app navigates to concrete test run details, with ability to observe all tests of that run; by selecting a specific test in the tests tree the app shows more info on steps, console errors and response headers of the selected test:

![test report](/doc/test_steps.png?raw=true)

In the future versions the following functionality is planned to be implemented:
- statistics page
- step images (if any) review

