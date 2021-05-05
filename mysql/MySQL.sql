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
-- Table `mydb`.`Profile`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Profile` (
  `profileID` INT NOT NULL AUTO_INCREMENT,
  `frequence` VARCHAR(45) NULL,
  `extroversion` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `interests` VARCHAR(45) NULL,
  `expertise` VARCHAR(45) NULL,
  `online` VARCHAR(45) NULL,
  PRIMARY KEY (`profileID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Person` (
  `personID` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `semester` INT NULL,
  `profileID` INT NOT NULL,
  PRIMARY KEY (`personID`),
  INDEX `fk_Person_Profile1_idx` (`profileID` ASC) VISIBLE,
  CONSTRAINT `Person_profileID`
    FOREIGN KEY (`profileID`)
    REFERENCES `mydb`.`Profile` (`profileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Group` (
  `groupID` INT NOT NULL AUTO_INCREMENT,
  `groupname` VARCHAR(45) NULL,
  PRIMARY KEY (`groupID`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Conversation` (
  `conversationID` INT NOT NULL AUTO_INCREMENT,
  `conversationstatus` TINYINT NULL,
  `groupID` INT NOT NULL,
  `personID` INT NOT NULL,
  PRIMARY KEY (`conversationID`),
  INDEX `fk_Conversation_Group1_idx` (`groupID` ASC) VISIBLE,
  INDEX `fk_Conversation_Person1_idx` (`personID` ASC) VISIBLE,
  CONSTRAINT `Conversation_groupID`
    FOREIGN KEY (`groupID`)
    REFERENCES `mydb`.`Group` (`groupID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Conversation_personID`
    FOREIGN KEY (`personID`)
    REFERENCES `mydb`.`Person` (`personID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Message` (
  `messageID` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL,
  `conversationID` INT NOT NULL,
  PRIMARY KEY (`messageID`),
  INDEX `fk_Message_Conversation1_idx` (`conversationID` ASC) VISIBLE,
  CONSTRAINT `Message_conversationID`
    FOREIGN KEY (`conversationID`)
    REFERENCES `mydb`.`Conversation` (`conversationID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Membership` (
  `personID` INT NOT NULL,
  `groupID` INT NOT NULL,
  `profileID` INT NOT NULL,
  PRIMARY KEY (`personID`, `groupID`, `profileID`),
  INDEX `fk_Person_has_Group_Group1_idx` (`groupID` ASC) VISIBLE,
  INDEX `fk_Person_has_Group_Person1_idx` (`personID` ASC) VISIBLE,
  INDEX `fk_Membership_Profile1_idx` (`profileID` ASC) VISIBLE,
  CONSTRAINT `Member_personID`
    FOREIGN KEY (`personID`)
    REFERENCES `mydb`.`Person` (`personID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Member_groupID`
    FOREIGN KEY (`groupID`)
    REFERENCES `mydb`.`Group` (`groupID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `Member_profileID`
    FOREIGN KEY (`profileID`)
    REFERENCES `mydb`.`Profile` (`profileID`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
