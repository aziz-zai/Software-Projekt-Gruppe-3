

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`learning_group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `groupname` VARCHAR(45) NULL DEFAULT NULL,
  `info` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `email` varchar(256) NOT NULL DEFAULT '',
  `google_user_id` varchar(128) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

-- -----------------------------------------------------
-- Table `mydb`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`membership` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `person` INT NOT NULL,
  `learning_group` INT NOT NULL,
  `is_open` tinyint DEFAULT true,
  `is_accepted` tinyint DEFAULT false,
  `timestamp` datetime,
  PRIMARY KEY (`id`),
   CONSTRAINT `person_memberhsip`
   FOREIGN KEY (`person`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE,
   CONSTRAINT `learning_group_membership`
   FOREIGN KEY (`learning_group`)
        REFERENCES mydb.learning_group(id)
        ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `lastname` VARCHAR(45) NULL DEFAULT NULL,
  `person` INT NOT NULL,
  `frequency` VARCHAR(45) NULL DEFAULT NULL,
  `interests` VARCHAR(45) NULL DEFAULT NULL,
  `extroversion` VARCHAR(45) NULL DEFAULT NULL,
  `expertise` VARCHAR(45) NULL DEFAULT NULL,
  `online` VARCHAR(45) NULL DEFAULT NULL,
  `type_` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `person_profile`
   FOREIGN KEY (`person`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`chatroom`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`chatroom` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `is_accepted` TINYINT NULL DEFAULT NULL,
  `is_open` TINYINT NULL DEFAULT NULL,
  `sender` INT,
  `receiver` INT,
  `timestamp` datetime,
  PRIMARY KEY (`id`),
  CONSTRAINT `chatroom_sender`
   FOREIGN KEY (`sender`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE,
CONSTRAINT `chatroom_receiver`
   FOREIGN KEY (`receiver`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------

CREATE TABLE `mydb`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL,
  `sender` INT NOT NULL,
  `thread_id` BIGINT NOT NULL,
  `is_singlechat` tinyint NULL,
  `timestamp` datetime,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

INSERT INTO `mydb`.`person`(`id`,`email`,`google_user_id`)VALUES(1,"azizperson1@gmail.com","sad45dssdaf4wds5");
INSERT INTO `mydb`.`person`(`id`,`email`,`google_user_id`)VALUES(2,"muradperson2@gmail.com","sad45dsaddf4wds5");
INSERT INTO `mydb`.`person`(`id`,`email`,`google_user_id`)VALUES(3,"cemperson3@gmail.com","sad45dsadsaf4wds5");
INSERT INTO `mydb`.`person`(`id`,`email`,`google_user_id`)VALUES(4,"harbinperson4@gmail.com","sad45dsdsaf4wds5");


INSERT INTO `mydb`.`profile`(`id`,`firstname`,`lastname`,`person`,`frequency`,`interests`,`extroversion`,`expertise`,`online`,`type_`)
VALUES(1,"Aziz","Zai",1,3,"Film und Serien","Extraversion","Python",true,"visually");
INSERT INTO `mydb`.`profile`(`id`,`firstname`,`lastname`,`person`,`frequency`,`interests`,`extroversion`,`expertise`,`online`,`type_`)
VALUES(2,"Murad","Zadran",2,3,"Nichts","Extraversion","Python",true,"visually");
INSERT INTO `mydb`.`profile`(`id`,`firstname`,`lastname`,`person`,`frequency`,`interests`,`extroversion`,`expertise`,`online`,`type_`)
VALUES(3,"Cem","Ardic",3,4,"Nichts","Agreeableness","Chinese",false,"auditory");
INSERT INTO `mydb`.`profile`(`id`,`firstname`,`lastname`,`person`,`frequency`,`interests`,`extroversion`,`expertise`,`online`,`type_`)
VALUES(4,"Harbin","Tairi",4,5,"Nichts","Agreeableness","Chinese",false,"auditory");

INSERT INTO `mydb`.`learning_group`(`id`,`groupname`,`info`)VALUES(1,"Testgruppe1","Diese Gruppe1 ist zum Testen");
INSERT INTO `mydb`.`learning_group`(`id`,`groupname`,`info`)VALUES(2,"Testgruppe2","Diese Gruppe2 ist zum Testen");
INSERT INTO `mydb`.`learning_group`(`id`,`groupname`,`info`)VALUES(3,"Testgruppe3","Diese Gruppe3 ist zum Testen");
INSERT INTO `mydb`.`learning_group`(`id`,`groupname`,`info`)VALUES(4,"Testgruppe4","Diese Gruppe4 ist zum Testen");

INSERT INTO `mydb`.`membership`(`id`,`person`,`learning_group`,`is_open`,`is_accepted`,`timestamp`)
VALUES(1,1,1,false,true,"2020-06-02 23:57:12.120174");
INSERT INTO `mydb`.`membership`(`id`,`person`,`learning_group`,`is_open`,`is_accepted`,`timestamp`)
VALUES(2,1,2,true,false,"2020-06-02 23:57:12.120175");
INSERT INTO `mydb`.`membership`(`id`,`person`,`learning_group`,`is_open`,`is_accepted`,`timestamp`)
VALUES(3,2,3,false,true,"2020-06-02 23:57:12.120176");
INSERT INTO `mydb`.`membership`(`id`,`person`,`learning_group`,`is_open`,`is_accepted`,`timestamp`)
VALUES(4,3,1,false,true,"2020-06-02 23:57:12.120177");

INSERT INTO `mydb`.`chatroom`(`id`,`is_accepted`,`is_open`,`sender`,`receiver`,`timestamp`)
VALUES(1,false,true,1,3,"2020-06-02 23:57:12.120178");
INSERT INTO `mydb`.`chatroom`(`id`,`is_accepted`,`is_open`,`sender`,`receiver`,`timestamp`)
VALUES(2,true,false,1,4,"2020-06-02 23:57:12.120179");
INSERT INTO `mydb`.`chatroom`(`id`,`is_accepted`,`is_open`,`sender`,`receiver`,`timestamp`)
VALUES(3,false,true,3,1,"2020-06-02 23:57:12.120188");

INSERT INTO `mydb`.`message`(`id`,`content`,`sender`,`thread_id`,`is_singlechat`,`timestamp`)
VALUES(1,"hey wie gehts",1,2,true,"2020-06-02 23:57:12.120191");
INSERT INTO `mydb`.`message`(`id`,`content`,`sender`,`thread_id`,`is_singlechat`,`timestamp`)
VALUES(2,"hey gut und dir",4,2,true,"2020-06-02 23:57:12.120192");
INSERT INTO `mydb`.`message`(`id`,`content`,`sender`,`thread_id`,`is_singlechat`,`timestamp`)
VALUES(3,"hey wie gehts dir in der gruppe",1,1,false,"2020-06-02 23:57:12.120193");
INSERT INTO `mydb`.`message`(`id`,`content`,`sender`,`thread_id`,`is_singlechat`,`timestamp`)
VALUES(4,"hey gut gehts mir in der gruppe",4,1,false,"2020-06-02 23:57:12.120193");