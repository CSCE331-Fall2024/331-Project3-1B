# Front end
Technologies Used: React.js<br />
Our front end ui consists of a Cashier View, Customer View, Manager View, and Menu Board. 
## Cashier
 - Order handling with an intutive receipt page for easy employee use.
## Customer
 - Allows customers to view menu options, allergen information, and add/remove items from order.
 - Shopping bag dynamically updates with order and offers useful order management features.
## Manager
 - OpenWeatherMap API panel shows accurate temperature and weather data to help predict daily customer flow.
 - Recent orders screen updates to track orders for quick lookup.
 - Order Trends pie chart dynamically shows daily orders by menu option to help follow trends.
 - Employee Management screen displays all public employee information and allows for adding, removing, and editing employees for quick employee management.
 - Menu Items screen displays all menu items and handles adding menu items, adding ingredients, and updating item prices.
 - Sales Report screen has options for a variety of sales and inventory usage reports in both table and graph format to further analyze store data.
## Menu Board
 - Dynamically displays all menu options and menu option prices along with choices for entrees, sides, and appetizers, with associated calorie counts.
## Accessibility
 - Toggle Zoom button toggles a 1.4x zoomed version of the page, formatted to be just as accessible while increasing image and button sizes drastically.
 - All buttons have both visual and audio feedback to ensure an intuitive and responsive system and ordering experience.
 - All buttons are explicitely accessible with and clearly highlighted for easy and intuitive keyboard-only navigation.
 - All buttons pair both large text with an associated icon to ensure they are easily understood by all users.
# Backend
Technologies Used: Node JS, PSQL<br />
Our backed consists of a 
## chatbot
 - LLM based chatbot using grog.
 - Loaded with information on Panda menu options and allergen information, as well as knowledge of Panda Express business practices and history.
## googleoauth
 - Google authentication handles authorization of various interfaces in our product.
 - Requires @tamu.edu or associated email address to access cashier or manager screens.
## googletranslate
 - Google translate feature supports 10 languages for additional lanauge support and accessibility.
## manager
 - Contains various management related API calls and functions important for the management features stated.
## submitOrder
 - Contains the API calls and functions required to handle order submission and associated database updates. 
