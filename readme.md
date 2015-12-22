# Step by Step

Onwaba please look at this example. It is the concept that you need for the application form. Initially you add a new entry in the database, then subsequent form posts update the entry in the database.

Note that you need a post and a get route for the same route path - the get to display (and to redirect to) and the post one to add the entry to the database.

To get going:

* clone this repo locally
* install all the dependencies using `npm install`
* then run `nodemon index.js`
* open a browser and point to `http://localhost:3007/step1`

It will create a mongodb called `step_by_step`

**Let me know how you get on...** And if you need some more help.

## It works like this roughly

* Step one (`/apply/step1`) adds a new application
* Step two (`/apply/step2/:id`) updates the application just created
* Step three (`/apply/step3/:id`) shows the state of the entry for :id in the database

## Add more steps

You are going to add more steps... and always use handlebar templates - Step 3 is just for illustration purposes.
