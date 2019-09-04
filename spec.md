# Models
## User
* Username
    * String, required, unique
* Password
    * String, required
## Books
* Title
    * String, required
* Author
    * String, required
* Availability
    * String, required, default true
* User
    * User, required, default none/empty

# API
## Routes
### users
* signup
* login
* logout
    
### books
* add
* update
* list
* list/:_id
* delete/:_id
* checkout
* checkin
