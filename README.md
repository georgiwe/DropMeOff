TripRoulette
=========

An application meant to be used to arrange trips, where one party shares their trip details and looks for passengers in need of a ride to the same destination.

MEAN stack appplcation.


TODO
- add validation middleware for all the Trips endpoints
- make casting invalid objids error messages friendly
- add "random trip from/to..." and "first trip to..." or some other *fun* random nonsense
- add mandatory phone number for drivers
- think how to reduce the passed around data - what to populate and what to select
- add validation for freeSeats in database
- move controllers to separate folder, outside routes
- move filter parameters validation and defaults to middleware after creating it
- extract the catch() function in controllers - 3 times same two lines
- add validations for user first/last name - only letters and dashes, maybe only one word
- solve 1.users and 2.trips file naming in a different way that can prioritize their creation
- maybe move some activities into service/services
- add dynamic username availability checking
- almost all error status codes returned are 400 - check for better assignment techniques
- MOVE THE HIDEOUS REPETATIVE FORM MARKUP INTO DIRECTIVE(S)
- use cdn libraries