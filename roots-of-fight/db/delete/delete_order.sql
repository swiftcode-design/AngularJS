DELETE FROM orders where order_id = $2
AND user_id = $1;
