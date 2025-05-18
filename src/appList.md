# DEV Tinders API

# Auth Router API
-POST /signup
-POST /login
-POST /logout

# Profile Router API
-PATCH /profile/edit
-GET /profile/view
-PATCH /profile/password

# Connection Request Router API
-POST /request/send/status/:userId

-POST /request/review/:status/:requestId


# User Router API
-GET /user/connections
-GET /user/request/received
-GET /user/feed -Gets the profile of the other user 



status: ignore,interested,accepted,rejected