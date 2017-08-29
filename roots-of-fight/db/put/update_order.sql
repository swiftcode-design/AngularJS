UPDATE orders
SET qty = $2
WHERE order_id = $1
and completed_date IS NULL
RETURNING *;
