DROP TABLE IF EXISTS numbers;

CREATE TABLE numbers (
    id int primary key NOT NULL AUTO_INCREMENT,
    number int NOT NULL,
    text varchar(255)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;

INSERT INTO
 numbers (number, text)
VALUES
(34, "Chercher le pain"),(63, "Faire le repas de lundi"),(75, "Reparer la Machine"),(18, "Declarez ses impots");