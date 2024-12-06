CREATE TABLE  Menu_Items  (
   Item_Serial_Number  SERIAL PRIMARY KEY,
   Item_Name  VARCHAR(80),
   Item_Type  VARCHAR(80),
   Availability  BOOLEAN
);

INSERT INTO Menu_Items (Item_Name,Availability,Item_Type) VALUES
('Chow Mein', '1', 'Sides'),
  ('Fried Rice', '1', 'Sides'),
  ('White Steamed Rice', '1', 'Sides'),
  ('Super Greens', '1', 'Sides'),
  ('Hot Ones Blazing Bourbon Chicken', '1', 'Entrees'),
  ('The Original Orange Chicken', '1', 'Entrees'),
  ('Black Pepper Sirloin Steak', '1', 'Entrees'),
  ('Honey Walnut Shrimp', '1', 'Entrees' ),
  ('Grilled Teriyaki Chicken', '1', 'Entrees'),
  ('Kung Pao Chicken', '1', 'Entrees' ),
  ('Honey Sesame Chicken Breast', '1', 'Entrees'),
  ('Beijing Beef', '1', 'Entrees'),
  ('Mushroom Chicken', '1', 'Entrees'),
  ('SweetFire Chicken Breast', '1', 'Entrees'),
  ('String Bean Chicken Breast', '1', 'Entrees'),
  ('Broccoli Beef', '1', 'Entrees'),
  ('Black Pepper Chicken', '1', 'Entrees'),
  ('Super Greens Entree', '1', 'Entrees'),
  ('Chicken Egg Roll', '1', 'Appetizers'),
  ('Vegetable Spring Roll', '1', 'Appetizers'),
  ('Cream Cheese Rangoon', '1', 'Appetizers'),
  ('Apple Pie Roll', '1', 'Appetizers'),
  ('Bottled Water', '1', 'KidDrinks'),
  ('Juice', '1', 'KidDrinks'),
  ('Gatorade Lemon Lime', '1', 'Gatorade'),
  ('Soft Drink Small', '1', 'SoftDrinks'),
  ('Soft Drink Medium', '1', 'SoftDrinks'),
  ('Soft Drink Large', '1', 'SoftDrinks'),
  ('Utensils', '1', 'Utensils');

