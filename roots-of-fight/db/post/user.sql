INSERT INTO users (firstname, lastname, password)
VALUES
($1, $2, $3)
RETURNING *
