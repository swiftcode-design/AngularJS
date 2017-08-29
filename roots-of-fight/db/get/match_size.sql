SELECT * from orders
where user_id = $1
and product_id = $2
and size = $3
and completed_date IS NULL;
