
CREATE TABLE IF NOT EXISTS inventory(
    Name VARCHAR(80), 
    ID SERIAL PRIMARY KEY,
    Servings DECIMAL (10, 2), 
    Recommended_Quantity INT,
    Currently_Serving_Quantity INT
);
INSERT INTO Inventory (Name, Servings, Recommended_Quantity,Currently_Serving_Quantity) VALUES 
('plastic bag', 899, 951,50),
('paper box', 836, 610,50),
('plastic container', 926, 782,50),
('large plastic container', 920, 887,50),
('Styrofoam box', 777, 652,50),
('chopsticks', 897, 908,50),
('fork', 967, 888,50),
('spoon', 790, 904,50),
('fountain drink small', 773, 831,50),
('fountain drink medium', 779, 837,50),
('fountain drink large', 786, 769,50),
('bottled water', 904, 527,50),
('kids juice', 875, 684,50),
('apple crisps', 976, 741,50),
('lemon lime Gatorade', 778, 665,50),
('fortune cookie', 820, 821, 50),
('Chow Mein',500,500,50),
('Fried Rice',500,500,50),
('Steamed Rice',500,500,50),
('Super Greens Side',500,500,50),
('Hot Ones Blazing Bourbon Chicken',500,500,50),
('The Original Orange Chicken',500,500,50),
('Black Pepper Sirloin Steak',500,500,50),
('Honey Walnut Shrimp',500,500,50),
('Grilled Teriyaki Chicken',500,500,50),
('Kung Pao Chicken',500,500,50 ),
('Honey Sesame Chicken Breast' ,500,500,50),
('Beijing Beef' ,500,500,50),
('Mushroom Chicken',500,500,50 ),
('SweetFire Chicken Breast' ,500,500,50),
('String Bean Chicken Breast' ,500,500,50),
('Broccoli Beef' ,500,500,50),
('Black Pepper Chicken' ,500,500,50),
('Super Greens Entree' ,500,500,50),
('Chicken Egg Roll',500,500,50),
('Vegetable Spring Roll',500,500,50),
('Cream Cheese Rangoon',500,500,50),
('Apple Pie Roll',500,500,50);
