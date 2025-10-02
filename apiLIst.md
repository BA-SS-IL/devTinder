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
- post /request/send/:status/:toUserId (it will work for interested and ignored)
 
- post /request/review/accepted/:requestId
- post /request/review/rejected/:requestId
- post /request/review/:status/:requestId (it will work for accepted and rejected)

## userRouter
- get /user/requests/received
- get /user/connections
- get /user/feed - gets you the profiles of other users on platforms 
   
status:ignore,interested,accepted,rejected