
DROP TABLE IF EXISTS users;

CREATE TABLE users (
    id int primary key NOT NULL AUTO_INCREMENT,
    firstname varchar(255) NOT NULL,
    lastname varchar(255) NOT NULL,
    email varchar(255) UNIQUE NOT NULL,
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
  users (firstname, lastname, email)
VALUES
  (
    'John',
    'Doe',
    'john.doe@example.com',
  ),(
    'Valeriy',
    'Appius',
    'valeriy.ppius@example.com',
  ),(
    'Ralf',
    'Geronimo',
    'ralf.geronimo@example.com',
  ),(
    'Maria',
    'Iskandar',
    'maria.iskandar@example.com',
  ),(
    'Jane',
    'Doe',
    'jane.doe@example.com',
  ),(
    'Johanna',
    'Martino',
    'johanna.martino@example.com',
  );
