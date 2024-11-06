CREATE TABLE  Menu_Options  (
   Option_Serial_Number  SERIAL PRIMARY KEY,
   Option_Name  VARCHAR(80),
   Number_of_sides  INT,
   Number_of_entrees  INT
);

INSERT INTO Menu_Options (Option_Name,Number_of_sides,Number_of_entrees) VALUES
('Bowl',1,1),
('Plate',1,2),
('Bigger Plate',1,3),
('A La Carte Small',0,1),
('A La Carte Medium',0,1),
('A La Carte Large',0,1),
('5 Person Family Meal',2,3),
('Panda Cub Meal',2,1),
('Party Size',2,1),
('12-16 Person Party Bundle',2,2),
('18-22 Person Party Bundle',3,3),
('26-30 Person Party Bundle',4,4);