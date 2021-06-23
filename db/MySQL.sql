

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
-- Table `mydb`.`conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`conversation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conversationstatus` TINYINT NULL DEFAULT NULL,
  `learning_group` INT NOT NULL,
  `person` INT NOT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `person_conversation`
   FOREIGN KEY (`person`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE,
   CONSTRAINT `learning_group_conversation`
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
  `semester` INT NULL,
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
-- Table `mydb`.`membership`
-- -----------------------------------------------------



-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL DEFAULT NULL,
  `conversation` INT NOT NULL,
  PRIMARY KEY (`id`),
   CONSTRAINT `conversation_message`
   FOREIGN KEY (`conversation`)
        REFERENCES mydb.conversation(id)
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
  `learning_group` INT,
  PRIMARY KEY (`id`),
  CONSTRAINT `chatroom_sender`
   FOREIGN KEY (`sender`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE,
CONSTRAINT `chatroom_receiver`
   FOREIGN KEY (`receiver`)
        REFERENCES mydb.person(id)
        ON DELETE CASCADE,
CONSTRAINT `chatroom_group`
   FOREIGN KEY (`learning_group`)
        REFERENCES mydb.learning_group(id)
        ON DELETE CASCADE)
        
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;
SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
