# [QuikVote](https://quikvote.click/)

Struggling to decide what to do with friends? Whether it’s picking a
restaurant, movie, or activity, **QuikVote** makes group decisions fast and fair.
Simply create a vote room, share it, and let everyone vote simultaneously.
Don’t like the options? Add a new one in seconds! Once the votes are in,
the results are clear, and you can get on with your plans. Make decisions
effortlessly with **QuikVote**—the quick, easy solution to group indecision!

## Key features

* Create/join a QuikVote room
* Easily add voting choices
* Vote!
* View results
* Create an account to save/view past QuikVotes

## Technologies used

* **HTML** - Uses correct HTML structure for application. 6-7 HTML pages:
    * Home, with links to Create QuikVote, Join QuikVote, Login
    * Create a QuikVote, with link to QuikVote room
    * Join QuikVote, with link to QuikVote room
    * QuikVote room, with link to Results
    * Results, with link to Home
    * Login, with link to Home
    * Past QuikVotes, with link to Home
* **CSS** - Responsive styling designed for mobile first. Follows good design patterns.  
* **JavaScript** - Provides login, entering a room code, voting and adding choices, backend endpoint calls.  
* **React** - Single page application with reusable and reactive components.  
* **Service** - Backend service with endpoints for:
    * Reading/writing choices
    * Submitting votes
    * Calculating vote results
    * Displaying a random icon picture for the room using the [dicebear](https://www.dicebear.com/) service
* **DB/Login** - Store users, choices, and past QuikVotes in database. Register and login users.
Credentials securely stored in database. Can't save/view past QuikVotes unless authenticated.  
* **WebSocket** - When a user adds a choice, the choices are updated to all users.
Once all users submit their votes, all users are shown the option to view the results.  

## Mockup

![mockup](mockup.jpeg)

## HTML Deliverable

For this deliverable I built out the structure of my application using HTML.

* [ ] HTML pages - 
* [ ] Links - 
* [ ] Text - 
* [ ] Images - 
* [ ] DB/Login - 
* [ ] WebSocket - 

## [Notes](./notes.md)
