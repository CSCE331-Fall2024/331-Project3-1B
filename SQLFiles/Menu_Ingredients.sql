
CREATE TABLE Menu_Ingredients (
  Option_Serial_Number INT,
  Item_Serial_Number INT,
  Ingredient_Serial_Number INT,
  Servings DECIMAL(10,0.5)
);
ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Option_Serial_Number) REFERENCES Menu_Options (Option_Serial_Number);

ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Item_Serial_Number) REFERENCES Menu_Items (Item_Serial_Number);

ALTER TABLE Menu_Ingredients ADD FOREIGN KEY (Ingredient_Serial_Number) REFERENCES inventory (ID);

INSERT INTO Menu_Ingredients (Option_Serial_Number,Item_Serial_Number,Ingredient_Serial_Number,Servings) VALUES
(1,1,17,1),--Bowl
(1,2,18,1),--Bowl
(1,3,19,1),--Bowl
(1,4,20,1),--Bowl
(1,5,21,1),--Bowl
(1,6,22,1),--Bowl
(1,7,23,1),--Bowl
(1,8,24,1),--Bowl
(1,9,25,1),--Bowl
(1,10,26,1),--Bowl
(1,11,27,1),--Bowl
(1,12,28,1),--Bowl
(1,13,29,1),--Bowl
(1,14,30,1),--Bowl
(1,15,31,1),--Bowl
(1,16,32,1),--Bowl
(1,17,33,1),--Bowl

(2,1,17,1),--Plate
(2,2,18,1),--Plate
(2,3,19,1),--Plate
(2,4,20,1),--Plate
(2,5,21,1),--Plate
(2,6,22,1),--Plate
(2,7,23,1),--Plate
(2,8,24,1),--Plate
(2,9,25,1),--Plate
(2,10,26,1),--Plate
(2,11,27,1),--Plate
(2,12,28,1),--Plate
(2,13,29,1),--Plate
(2,14,30,1),--Plate
(2,15,31,1),--Plate
(2,16,32,1),--Plate
(2,17,33,1),--Plate

(3,1,17,1),--Bigger Plate
(3,2,18,1),--Bigger Plate
(3,3,19,1),--Bigger Plate
(3,4,20,1),--Bigger Plate
(3,5,21,1),--Bigger Plate
(3,6,22,1),--Bigger Plate
(3,7,23,1),--Bigger Plate
(3,8,24,1),--Bigger Plate
(3,9,25,1),--Bigger Plate
(3,10,26,1),--Bigger Plate
(3,11,27,1),--Bigger Plate
(3,12,28,1),--Bigger Plate
(3,13,29,1),--Bigger Plate
(3,14,30,1),--Bigger Plate
(3,15,31,1),--Bigger Plate
(3,16,32,1),--Bigger Plate
(3,17,33,1),--Bigger Plate

(4,1,17,1),--A la carte small
(4,2,18,1),--A la carte small
(4,3,19,1),--A la carte small
(4,4,20,1),--A la carte small
(4,5,21,1),--A la carte small
(4,6,22,1),--A la carte small
(4,7,23,1),--A la carte small
(4,8,24,1),--A la carte small
(4,9,25,1),--A la carte small
(4,10,26,1),--A la carte small
(4,11,27,1),--A la carte small
(4,12,28,1),--A la carte small
(4,13,29,1),--A la carte small
(4,14,30,1),--A la carte small
(4,15,31,1),--A la carte small
(4,16,32,1),--A la carte small
(4,17,33,1),--A la carte small
(4,18,34,1),--A la carte small (egg roll),
(4,19,35,1),--A la carte small 
(4,20,36,1),--A la carte small
(4,21,37,1),--A la carte small (apple pie),
(4,22,12,1), --A la carte small (drink),
(4,23,13,1), --A la carte small (drink),
(4,24,15,1), --A la carte small (drink),
(4,25,9,1), --A la carte small (drink),
(4,26,10,1), --A la carte small (drink),
(4,27,11,1), --A la carte small (drink),

(5,1,17,1.5),--A la carte Medium
(5,2,18,1.5),--A la carte Medium
(5,3,19,1.5),--A la carte Medium
(5,4,20,1.5),--A la carte Medium
(5,5,21,1.5),--A la carte Medium
(5,6,22,1.5),--A la carte Medium
(5,7,23,1.5),--A la carte Medium
(5,8,24,1.5),--A la carte Medium
(5,9,25,1.5),--A la carte Medium
(5,10,26,1.5),--A la carte Medium
(5,11,27,1.5),--A la carte Medium
(5,12,28,1.5),--A la carte Medium
(5,13,29,1.5),--A la carte Medium
(5,14,30,1.5),--A la carte Medium
(5,15,31,1.5),--A la carte Medium
(5,16,32,1.5),--A la carte Medium
(5,17,33,1.5),--A la carte Medium
(5,21,37,1.5),--A la carte Medium (apple pie),


(6,1,17,2),--A la carte Large
(6,2,18,2),--A la carte Large
(6,3,19,2),--A la carte Large
(6,4,20,2),--A la carte Large
(6,5,21,2),--A la carte Large
(6,6,22,2),--A la carte Large
(6,7,23,2),--A la carte Large
(6,8,24,2),--A la carte Large
(6,9,25,2),--A la carte Large
(6,10,26,2),--A la carte Large
(6,11,27,2),--A la carte Large
(6,12,28,2),--A la carte Large
(6,13,29,2),--A la carte Large
(6,14,30,2),--A la carte Large
(6,15,31,2),--A la carte Large
(6,16,32,2),--A la carte Large
(6,17,33,2),--A la carte Large
(6,18,34,2),--A la carte Large (egg roll),
(6,19,35,2),--A la carte Large 
(6,20,36,2),--A la carte Large
(6,21,37,2),--A la carte Large (apple pie),

(7,1,17,2),--5 person party meal
(7,2,18,2),--5 person party meal
(7,3,19,2),--5 person party meal
(7,4,20,2),--5 person party meal
(7,5,21,2),--5 person party meal
(7,6,22,2),--5 person party meal
(7,7,23,2),--5 person party meal
(7,8,24,2),--5 person party meal
(7,9,25,2),--5 person party meal
(7,10,26,2),--5 person party meal
(7,11,27,2),--5 person party meal
(7,12,28,2),--5 person party meal
(7,13,29,2),--5 person party meal
(7,14,30,2),--5 person party meal
(7,15,31,2),--5 person party meal
(7,16,32,2),--5 person party meal
(7,17,33,2),--5 person party meal

(8,1,17,0.5),--Panda cub meal
(8,2,18,0.5),--Panda cub meal
(8,3,19,0.5),--Panda cub meal
(8,4,20,0.5),--Panda cub meal
(8,5,21,0.5),--Panda cub meal
(8,6,22,0.5),--Panda cub meal
(8,7,23,0.5),--Panda cub meal
(8,8,24,0.5),--Panda cub meal
(8,9,25,0.5),--Panda cub meal
(8,10,26,0.5),--Panda cub meal
(8,11,27,0.5),--Panda cub meal
(8,12,28,0.5),--Panda cub meal
(8,13,29,0.5),--Panda cub meal
(8,14,30,0.5),--Panda cub meal
(8,15,31,0.5),--Panda cub meal
(8,16,32,0.5),--Panda cub meal
(8,17,33,0.5),--Panda cub meal
(8,22,12,1), --Panda cub meal drink
(8,23,13,1), --Panda cub meal drink

(9,1,17,12),--Party Size
(9,2,18,12),--Party Size
(9,3,19,12),--Party Size
(9,4,20,12),--Party Size
(9,5,21,12),--Party Size
(9,6,22,12),--Party Size
(9,7,23,12),--Party Size
(9,8,24,12),--Party Size
(9,9,25,12),--Party Size
(9,10,26,12),--Party Size
(9,11,27,12),--Party Size
(9,12,28,12),--Party Size
(9,13,29,12),--Party Size
(9,14,30,12),--Party Size
(9,15,31,12),--Party Size
(9,16,32,12),--Party Size
(9,17,33,12),--Party Size
(9,18,34,12),--Party Size (egg roll),
(9,19,35,12),--Party Size 
(9,20,36,12),--Party Size
(9,21,37,12),--Party Size (apple pie),

(10,1,17,12),-- Party Bundle
(10,2,18,12),-- Party Bundle
(10,3,19,12),-- Party Bundle
(10,4,20,12),-- Party Bundle
(10,5,21,12),-- Party Bundle
(10,6,22,12),-- Party Bundle
(10,7,23,12),-- Party Bundle
(10,8,24,12),-- Party Bundle
(10,9,25,12),-- Party Bundle
(10,10,26,12),-- Party Bundle
(10,11,27,12),-- Party Bundle
(10,12,28,12),-- Party Bundle
(10,13,29,12),-- Party Bundle
(10,14,30,12),-- Party Bundle
(10,15,31,12),-- Party Bundle
(10,16,32,12),-- Party Bundle
(10,17,33,12),-- Party Bundle

(11,1,17,12),-- Party Bundle
(11,2,18,12),-- Party Bundle
(11,3,19,12),-- Party Bundle
(11,4,20,12),-- Party Bundle
(11,5,21,12),-- Party Bundle
(11,6,22,12),-- Party Bundle
(11,7,23,12),-- Party Bundle
(11,8,24,12),-- Party Bundle
(11,9,25,12),-- Party Bundle
(11,10,26,12),-- Party Bundle
(11,11,27,12),-- Party Bundle
(11,12,28,12),-- Party Bundle
(11,13,29,12),-- Party Bundle
(11,14,30,12),-- Party Bundle
(11,15,31,12),-- Party Bundle
(11,16,32,12),-- Party Bundle
(11,17,33,12),-- Party Bundle

(12,1,17,12),-- Party Bundle
(12,2,18,12),-- Party Bundle
(12,3,19,12),-- Party Bundle
(12,4,20,12),-- Party Bundle
(12,5,21,12),-- Party Bundle
(12,6,22,12),-- Party Bundle
(12,7,23,12),-- Party Bundle
(12,8,24,12),-- Party Bundle
(12,9,25,12),-- Party Bundle
(12,10,26,12),-- Party Bundle
(12,11,27,12),-- Party Bundle
(12,12,28,12),-- Party Bundle
(12,13,29,12),-- Party Bundle
(12,14,30,12),-- Party Bundle
(12,15,31,12),-- Party Bundle
(12,16,32,12),-- Party Bundle
(12,17,33,12);-- Party Bundle
