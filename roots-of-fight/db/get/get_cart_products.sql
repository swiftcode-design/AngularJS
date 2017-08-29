-- select order_id, user_id, product_id, size, jsonb_agg(images.img_url)
-- from orders
-- JOIN  products on products.id = orders.product_id
-- join images on images.product_id = products.id;


SELECT *
FROM orders
WHERE user_id = $1;
