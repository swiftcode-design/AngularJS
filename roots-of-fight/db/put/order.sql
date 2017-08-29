UPDATE orders
SET completed_date = $2
where user_id = $1
and completed_date IS NULL;
