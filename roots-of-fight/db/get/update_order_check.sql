SELECT * FROM orders
WHERE user_id = $1
AND product_id = $2
and completed_date IS NULL;
