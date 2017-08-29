-- select emails.email, users.firstname, users.lastname, addresses.street, addresses.city, addresses.state, addresses.country, addresses.zipcode, addresses.phone
-- from emails
-- join users on users.id = emails.userid
-- join addresses on addresses.user_id = users.id
-- where emails.userid = $1
SELECT email
FROM emails
WHERE userid = $1;
