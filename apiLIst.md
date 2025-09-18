# devTinderAPIs

## authRouter
- post /signUp
- post /login
- post /logout

## profileRouter
- get /profile (view)
- patch /profile (edit)
- patch /profile(password)

## connectionRequestRouter
- post /request/send/interested/:userId
- post /request/send/ignored/:userId
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId

## userRouter
- get /user/connection
- get /user/requests
- get /user/feed - gets you the profiles of other users on platforms 
   
status:ignore,interested,accepted,rejected