use bijoux_db;
INSERT INTO category_product
VALUES (1,"ANILLOS", "anillo.jpg" );

INSERT INTO category_product
VALUES (2,"COLLARES", "collar.jpg" );

INSERT INTO category_product
VALUES (3,"PULSERAS", "pulsera.jpg" );

INSERT INTO category_product
VALUES (4, "PIERCINGS", "piercing.jpg" );

INSERT INTO category_product
VALUES (5,"ARETES", "arete.jpg" );

INSERT INTO category_product
VALUES (6,"RELOJES", "reloj.jpg" );

INSERT INTO products
VALUES (default,"Anillo bolitas", "Anillo plateado 18k", 99.9, "anillos/anillo-plateado1.1.jpg","anillos/anillo-plateado1.1.jpg",  "anillos/anillo-plateado1.2.jpg",  "anillos/anillo-plateado1.3.jpg",1);

INSERT INTO products
VALUES (default,"Aretes Verdes", "Aretes Verdes de oro 18k...", 759, "aretes/1.1Arete.jpg", "aretes/1.1Arete.jpg",  "aretes/1.2Arete.jpg",  "aretes/1.3Arete.jpg",5);

INSERT INTO products
VALUES (default,"Collar perla", "Collar con perla de plata", 1400, "collares/1.1Collar.jpg","collares/1.1Collar.jpg",  "aretes/1.2Collar.jpg",  "aretes/1.3Collar.jpg",2);

INSERT INTO products
VALUES (default,"Collar piedras", "Collar con  piedras de plata", 1200, "collares/4.1Collar.jpg","collares/4.1Collar.jpg",  "aretes/4.2Collar.jpg",  "aretes/4.3Collar.jpg",2);

INSERT INTO products
VALUES (default,"Pulsera con rosas", "Pulsera con rosas plateada", 1700,"pulseras/pulseraPlata1.1.jpeg", "pulseras/pulseraPlata1.1.jpeg",  "pulseras/pulseraPlata1.2.jpeg",  "pulseras/pulseraPlata1.3.jpeg",3);

INSERT INTO products
VALUES (default,"Piercing dorado", "Piercing dorado con piedra oro 10k", 1100, "piercings/piercing1.1.jpeg","piercings/piercing1.1.jpeg",  "piercings/piercing1.2.jpeg",  "piercings/piercing1.3.jpeg",4);

INSERT INTO products
VALUES (null,"Reloj Dorado", "Reloj Dorado circular", 1800,"relojes/relojCirculo-dorado1.1.jpeg", "relojes/relojCirculo-dorado1.1.jpeg",  "relojes/relojCirculo-dorado1.2.jpeg",  "relojes/relojCirculo-dorado1.3.jpeg",6);


SELECT *
FROM category_product;

SELECT *
FROM products;