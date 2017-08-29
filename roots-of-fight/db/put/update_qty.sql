UPDATE orders
SET qty = $3
WHERE user_id = $2
AND order_id = $1;
