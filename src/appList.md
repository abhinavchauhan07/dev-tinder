# DEV Tinders API
-POST /signup
-POST /login
-POST /logout

-PATCH /profile/edit
-GET /profile/view
-PATCH /profile/password

-POST /request/send/interested/:userId
-POST /request/send/ignored/:userId

-POST /request/review/accepted/:requestId
-POST /request/review/rejected/:requestId

-GET /connections
-GET /request/received
-GET /feed -Gets the profile of the other user 



status: ignore,interested,accepted,rejected