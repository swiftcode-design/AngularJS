SELECT street, city, state, country
FROM addresses
WHERE user_id = $1;
