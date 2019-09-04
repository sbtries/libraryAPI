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
    * allows a user to signup
* login
    * allows a user to signup
* logout
    * allows a user to signup
    
### books
* add
    * add a book
* update
    * update a book
* list
    * get a list of all books
* list/:_id
    * return a book given its id
* delete/:_id
    * delete a book by its id
* checkout
    * checkout a book
* checkin
    * check a book in
