UPDATE addresses
SET street = $2, city = $3, state = $4, country = $5, zipcode = $6, phone = $7, firstname = $8, lastname = $9, company = $10, apt = $11
WHERE user_id = $1
RETURNING *;
