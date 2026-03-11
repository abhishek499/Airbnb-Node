create database airbnb_booking_dev;

show databases;

use airbnb_booking_dev;

show tables;

desc Booking;

desc IdempotencyKey;

select * from Booking;

select * from IdempotencyKey;

delete from IdempotencyKey where id = 1 AND 2;

SELECT * FROM IdempotencyKey WHERE idemKey = 'ecfea128-c4fd-4df6-994e-deddbf15b9a3' FOR UPDATE;

