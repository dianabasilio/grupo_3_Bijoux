CREATE SCHEMA `bijoux_db` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_mysql500_ci ;
SET FOREIGN_KEY_CHECKS=0;

CREATE TABLE `bijoux_db`.`products` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name_product` VARCHAR(100) NOT NULL,
  `description` VARCHAR(100) NULL,
  `price` DECIMAL(3,1) NOT NULL,
  `id_category`  INT(10) UNSIGNED NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `product_id_UNIQUE` (`id` ASC));
  
CREATE TABLE `bijoux_db`.`product_cart` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id _shopping_cart` INT(10) UNSIGNED NOT NULL,
  `id_product` INT(10) UNSIGNED NOT NULL,
  `id_product_size` INT(10) UNSIGNED NOT NULL,
  `price` DECIMAL(3,1) NULL,
  `quantity`  INT(10) UNSIGNED NOT NULL,
  `total` DECIMAL(3,1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );
  
  
CREATE TABLE `bijoux_db`.`category_product` (
  `id`  INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `category` VARCHAR(255) NULL,
  `path` VARCHAR(255) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`id` ASC) );
  
  CREATE TABLE `bijoux_db`.`product_image` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_product` INT(10) UNSIGNED NOT NULL,
  `path` VARCHAR(255) NOT NULL,
  `main` TINYINT(1) NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) );
  
CREATE TABLE `bijoux_db`.`product_size` (
  `id` INT(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `id_product`  INT(10) UNSIGNED NOT NULL,
  `size` VARCHAR(45) NULL,
  PRIMARY KEY (`id`));
  

ALTER TABLE `bijoux_db`.`products` 
ADD INDEX `id_category_idx` (`id_category` ASC) ;
;
ALTER TABLE `bijoux_db`.`products` 
ADD CONSTRAINT `id_category`
  FOREIGN KEY (`id_category`)
  REFERENCES `bijoux_db`.`category_product` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `bijoux_db`.`product_size` 
ADD INDEX `id_product_idx` (`id_product` ASC);
;
ALTER TABLE `bijoux_db`.`product_size` 
ADD CONSTRAINT `id_product`
  FOREIGN KEY (`id_product`)
  REFERENCES `bijoux_db`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  
ALTER TABLE `bijoux_db`.`product_image` 
ADD INDEX `product_image_id_idx` (`id_product` ASC) ;
;
ALTER TABLE `bijoux_db`.`product_image` 
ADD CONSTRAINT `product_image_id`
  FOREIGN KEY (`id_product`)
  REFERENCES `bijoux_db`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;

ALTER TABLE `bijoux_db`.`product_cart` 
ADD CONSTRAINT `id_product_cart`
  FOREIGN KEY (`id_product`)
  REFERENCES `bijoux_db`.`products` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
CREATE TABLE `bijoux_db`.`users` (
  `email` varchar(100) CHARACTER SET ascii COLLATE ascii_bin  NOT NULL,
  `first_name` varchar(100) NOT NULL,
  `last_name` varchar(100)  NOT NULL,
  `image_path` varchar(100)  DEFAULT NULL,
  `password` varchar(100) NOT NULL,
  `created_at` varchar(45) DEFAULT NULL,
  `updated_at` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`email`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8_general_mysql500_ci;


CREATE TABLE `bijoux_db`.`shopping_cart` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` varchar(100) CHARACTER SET ascii COLLATE ascii_bin NOT NULL,
  `status` VARCHAR(100) NOT NULL,
  `shop_date` DATE NOT NULL,
  `method_pay` VARCHAR(100) NOT NULL,
  `created_at` TIMESTAMP NULL DEFAULT NULL,
  `updated_at` TIMESTAMP NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC));
  
  ALTER TABLE `bijoux_db`.`users` 
CHANGE COLUMN `created_at` `created_at` TIMESTAMP NULL DEFAULT NULL ,
CHANGE COLUMN `updated_at` `updated_at` TIMESTAMP NULL DEFAULT NULL ;

ALTER TABLE `bijoux_db`.`product_cart` 
ADD INDEX `id _shopping_cart _idx` (`id _shopping_cart` ASC);
;
ALTER TABLE `bijoux_db`.`product_cart` 
ADD CONSTRAINT `id _shopping_cart `
  FOREIGN KEY (`id _shopping_cart`)
  REFERENCES `bijoux_db`.`product_cart` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
ALTER TABLE `bijoux_db`.`shopping_cart` 
ADD INDEX `id_email_idx` (`email` ASC);
;
ALTER TABLE `bijoux_db`.`shopping_cart` 
ADD CONSTRAINT `id_email`
  FOREIGN KEY (`email`)
  REFERENCES `bijoux_db`.`users` (`email`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;
  
  ALTER TABLE `bijoux_db`.`product_cart` 
ADD INDEX `id_product_size_idx` (`id_product_size` ASC);
;
ALTER TABLE `bijoux_db`.`product_cart` 
ADD CONSTRAINT `id_product_size`
  FOREIGN KEY (`id_product_size`)
  REFERENCES `bijoux_db`.`product_size` (`id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION;