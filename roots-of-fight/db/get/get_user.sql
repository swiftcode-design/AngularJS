SELECT * FROM users
WHERE id IN (
  select userid
  from emails
  where email = $1
)
