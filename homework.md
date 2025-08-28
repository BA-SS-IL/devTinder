day 1

create a repository
Initialize the repository
node_modules, package.json , package-lock.json
install express
create a server
listen  a server
write request handlers for /tese, /hello
Install nodemon and update scripts inside package.json
what are dependencies
what is the use of "-g" while npm install
differents between caret and tilde(^ vs ~)

day-2

initialized git
.gitignore
create a remote repository github
push all code remote to origin
play with routes and route extension eg : /hello, / , hello/2, xyx
order of routes is very important
install postman app and make a workplace /collection >test api call
write logic and test http methods on post man
explore routing and use - query and params  and * in the routes
use of rejex in routes /a/,/*fly$/
reading the query and params and dynamic routes

multipple route handlers use with app.use()
next()
next() function with errors along with res.send('response')
app.use('/roter',r1,r2,r3,r4)
app.use('/roter',[r1,r2,r3,r4])
app.use('/roter',[r1,r2],r3,r4)should practice with 

what is middleware
how express js basically handles requrests behhind scenes;
differents between app.all() vs app.use().  - routing differents 
write a dummy auth middileware for admin 
write a dummy auth middilware for user
error handling using app.use('/',(err,req,res,next)=>{});



