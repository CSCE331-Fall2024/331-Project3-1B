CREATE TABLE Menu_Ingredients (
  Option_Serial_Number INT,
  Item_Serial_Number INT,
  Ingredient_Serial_Number INT,
  Servings DECIMAL(10,2)
);
ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Option_Serial_Number) REFERENCES Menu_Options (Option_Serial_Number);

ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Item_Serial_Number) REFERENCES Menu_Items (Item_Serial_Number);

ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Ingredient_Serial_Number) REFERENCES inventory (ID);
