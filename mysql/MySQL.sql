-- MySQL Workbench Forward Engineering

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
CREATE TABLE IF NOT EXISTS `mydb`.`group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `groupname` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`person` (
  `personID` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL DEFAULT NULL,
  `surname` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`personID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`conversation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conversationstatus` TINYINT NULL DEFAULT NULL,
  `groupID` INT NOT NULL,
  `personID` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Conversation_Group1_idx` (`groupID` ASC) VISIBLE,
  INDEX `fk_Conversation_Person1_idx` (`personID` ASC) VISIBLE,
  CONSTRAINT `groupID`
    FOREIGN KEY (`groupID`)
    REFERENCES `mydb`.`group` (`id`),
  CONSTRAINT `personID`
    FOREIGN KEY (`personID`)
    REFERENCES `mydb`.`person` (`personID`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`profile` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `owner` INT NOT NULL,
  `semester` INT NULL,
  `frequence` VARCHAR(45) NULL DEFAULT NULL,
  `interests` VARCHAR(45) NULL DEFAULT NULL,
  `extroversion` VARCHAR(45) NULL DEFAULT NULL,
  `expertise` VARCHAR(45) NULL DEFAULT NULL,
  `online` VARCHAR(45) NULL DEFAULT NULL,
  `type_` VARCHAR(45) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`membership` (
  `personID` INT NOT NULL,
  `groupID` INT NOT NULL,
  `profileID` INT NOT NULL,
  PRIMARY KEY (`personID`, `groupID`, `profileID`),
  INDEX `fk_Person_has_Group_Group1_idx` (`groupID` ASC) VISIBLE,
  INDEX `fk_Person_has_Group_Person1_idx` (`personID` ASC) VISIBLE,
  INDEX `fk_Membership_Profile1_idx` (`profileID` ASC) VISIBLE,
  CONSTRAINT `Member_groupID`
    FOREIGN KEY (`groupID`)
    REFERENCES `mydb`.`group` (`id`),
  CONSTRAINT `Member_personID`
    FOREIGN KEY (`personID`)
    REFERENCES `mydb`.`person` (`personID`),
  CONSTRAINT `Member_profileID`
    FOREIGN KEY (`profileID`)
    REFERENCES `mydb`.`profile` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


-- -----------------------------------------------------
-- Table `mydb`.`message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`message` (
  `messageID` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL DEFAULT NULL,
  `conversationID` INT NOT NULL,
  PRIMARY KEY (`messageID`),
  INDEX `fk_Message_Conversation1_idx` (`conversationID` ASC) VISIBLE,
  CONSTRAINT `conversationID`
    FOREIGN KEY (`conversationID`)
    REFERENCES `mydb`.`conversation` (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
