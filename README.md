removed scrum meeting minutes, added layout for Readme
# Front end
our front end uses React.js
Our front end ui consists of 4 main views
there are universal accesiblity features such as translation and zoom in
## Cashier
This is the cashier interface for the restaurant, a cashier must be logged in in order to make orders.
## Customer
This is the customer interface for the restaurant. A customer may make and submit orders to the restaurant. Additonally, there is a chat bot customers may ask questions to.
## Manager
This is a management interface for a restaurant, a manager must first log in with google authentication. Afterwards, they can access various functions such as creating x, z, sales, and inventory usage reports, aswell as editing employees and making changes to the menu.
## Menu Board
This is a static menu board intended to be displayed on a digital signage board for a restaurant. The prices will reflect any changes made by management.
# Backend
our back end uses Node.js and a PSQL database
4 main components
## chatbot
this is a LLM based chat bot that utilizes grog in order to service customers
## googleoauth
google authentication handles authorization of various interfaces in our product
## manager
various management related API calls and functions are included within this file, you may also wish to consult the wiki for details about calls
## submitOrder
this handles mostly the order submissions, you may wish to consult the wiki on how orders should be passed into the backend application for submission.
