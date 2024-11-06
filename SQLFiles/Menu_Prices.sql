CREATE TABLE  Menu_Items  (
   Item_Serial_Number  INT,
   Option_Serial_Number  INT,
   Price Decimal(10,2)
);

ALTER TABLE Menu_Prices ADD FOREIGN KEY (Option_Serial_Number) REFERENCES Menu_Options (Option_Serial_Number);

ALTER TABLE Menu_Prices ADD FOREIGN KEY (Item_Serial_Number) REFERENCES Menu_Items (Item_Serial_Number);
INSERT INTO Menu_Options (Item_Serial_Number,Option_Serial_Number,Price) VALUES
(1,4,4.40),
(1,6,5.40),
(1,9,16.00),
(2,4,4.40),
(2,6,5.40),
(2,9,16.00),
(3,4,4.40),
(3,6,5.40),
(3,9,16.00),
(4,4,4.40),
(4,6,5.40),
(4,9,16.00),
(5,1,8.30), -- normal entree
(5,2,9.80),
(5,3,11.30),
(5,4,5.20),
(5,5,8.50),
(5,6,11.20),
(5,7,43.00),
(5,8,6.60),
(5,9,41.00),
(5,10,108.00),
(5,11,154.00),
(5,12,194.00),
(6,1,8.30), -- normal entreee
(6,2,9.80),
(6,3,11.30),
(6,4,5.20),
(6,5,8.50),
(6,6,11.20),
(6,7,43.00),
(6,8,6.60),
(6,9,41.00),
(6,10,108.00),
(6,11,154.00),
(6,12,194.00),
(7,1,11.30), -- premium entree
(7,2,12.80),
(7,3,15.80),
(7,4,6.70),
{7,5,11.50},
(7,6,15.70),
(7,7,56.50),
(7,8,7.60),
(7,9,56.00),
(7,10,138.00),
(7,11,199.00),
(7,12,254.00),
(8,1,11.30), -- premium entree
(8,2,12.80),
(8,3,15.80),
(8,4,6.70),
{8,5,11.50},
(8,6,15.70),
(8,7,56.50),
(8,8,7.60),
(8,9,56.00),
(8,10,138.00),
(8,11,199.00),
(8,12,254.00),
(9,1,8.30), -- normal entreee
(9,2,9.80),
(9,3,11.30),
(9,4,5.20),
(9,5,8.50),
(9,6,11.20),
(9,7,43.00),
(9,8,6.60),
(9,9,41.00),
(9,10,108.00),
(9,11,154.00),
(9,12,194.00),
(10,1,8.30), -- normal entreee
(10,2,9.80),
(10,3,11.30),
(10,4,5.20),
(10,5,8.50),
(10,6,11.20),
(10,7,43.00),
(10,8,6.60),
(10,9,41.00),
(10,10,108.00),
(10,11,154.00),
(10,12,194.00),
(11,1,8.30), -- normal entreee
(11,2,9.80),
(11,3,11.30),
(11,4,5.20),
(11,5,8.50),
(11,6,11.20),
(11,7,43.00),
(11,8,6.60),
(11,9,41.00),
(11,10,108.00),
(11,11,154.00),
(11,12,194.00),
(12,1,8.30), -- normal entreee
(12,2,9.80),
(12,3,11.30),
(12,4,5.20),
(12,5,8.50),
(12,6,11.20),
(12,7,43.00),
(12,8,6.60),
(12,9,41.00),
(12,10,108.00),
(12,11,154.00),
(12,12,194.00),
(13,1,8.30), -- normal entreee
(13,2,9.80),
(13,3,11.30),
(13,4,5.20),
(13,5,8.50),
(13,6,11.20),
(13,7,43.00),
(13,8,6.60),
(13,9,41.00),
(13,10,108.00),
(13,11,154.00),
(13,12,194.00),
(14,1,8.30), -- normal entreee
(14,2,9.80),
(14,3,11.30),
(14,4,5.20),
(14,5,8.50),
(14,6,11.20),
(14,7,43.00),
(14,8,6.60),
(14,9,41.00),
(14,10,108.00),
(14,11,154.00),
(14,12,194.00),
(15,1,8.30), -- normal entreee
(15,2,9.80),
(15,3,11.30),
(15,4,5.20),
(15,5,8.50),
(15,6,11.20),
(15,7,43.00),
(15,8,6.60),
(15,9,41.00),
(15,10,108.00),
(15,11,154.00),
(15,12,194.00),
(16,1,8.30), -- normal entreee
(16,2,9.80),
(16,3,11.30),
(16,4,5.20),
(16,5,8.50),
(16,6,11.20),
(16,7,43.00),
(16,8,6.60),
(16,9,41.00),
(16,10,108.00),
(16,11,154.00),
(16,12,194.00),
(17,1,8.30), -- normal entreee
(17,2,9.80),
(17,3,11.30),
(17,4,5.20),
(17,5,8.50),
(17,6,11.20),
(17,7,43.00),
(17,8,6.60),
(17,9,41.00),
(17,10,108.00),
(17,11,154.00),
(17,12,194.00),
(18,1,8.30), -- normal entreee
(18,2,9.80),
(18,3,11.30),
(18,4,5.20),
(18,5,8.50),
(18,6,11.20),
(18,7,43.00),
(18,8,6.60),
(18,9,41.00),
(18,10,108.00),
(18,11,154.00),
(18,12,194.00),
(19,4,2.00),
(19,6,11.20),
(19,9,41.00),
(20,4,2.00),
(20,6,11.20),
(20,9,41.00),
(21,4,2.00),
(21,6,8.00),
(21,9,34.00),
(22,4,2.00),
(22,5,6.20)
(22,6,8.00),
(22,9,34.00),
(23,4,2.30),
(25,4,2.70),
(26,4,2.10),
(27,4,2.30),
(28,4,2.50);