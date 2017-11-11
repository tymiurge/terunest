Simple test results viewer app written with react and mobx. 
Created for a concrete project so it is not supposed to be an universal application. 
Test executor (in my case it was a python GUI tests runner) is responsible for gathering results and sending them with curl to the application server in the following format:

Structure of reports: 
IMG results_structure

Where the report headers files (the json ones located in the 'reports' dir) store summarized info about that run:
- initiator
- run name
- stage
- total/passed/failed/skipped/error
etc, etc.

The server part just reads the content of reports headers and sends them to the web app: 

![test runs](/doc/runs_list.png?raw=true)

By clicking on the test run details button (arrow in circle in every row) the app navigates to concrete test run details, with ability to 
observe all tests. 
IMG tree 

By selecting on a specific test in the tests tree user is provided with abilities to get more info on that test steps, console errors and response headers

img steps
