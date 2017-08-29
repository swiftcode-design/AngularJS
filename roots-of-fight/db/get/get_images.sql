select DISTINCT img_url, product_id
from images
where product_id = ($1)
ORDER BY product_id;
