SELECT products.id, products.name, products.info, products.price, products.sku, products.collections, products.type, products.fit, products.fiber, products.color, products.roots,  jsonb_agg(images.img_url) FROM products
INNER JOIN images ON images.product_id = products.id
GROUP BY products.id, products.name, products.info, products.price, products.sku, products.collections, products.type, products.fit, products.fiber, products.color, products.roots;
