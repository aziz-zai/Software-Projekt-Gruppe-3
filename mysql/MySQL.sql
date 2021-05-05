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
  `id` INT NOT NULL AUTO_INCREMENT,
  `frequence` VARCHAR(45) NULL,
  `extroversion` VARCHAR(45) NULL,
  `type` VARCHAR(45) NULL,
  `interests` VARCHAR(45) NULL,
  `expertise` VARCHAR(45) NULL,
  `online` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Person`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Person` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NULL,
  `surname` VARCHAR(45) NULL,
  `semester` INT NULL,
  `Profile_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Person_Profile1_idx` (`Profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_Person_Profile`
    FOREIGN KEY (`Profile_id`)
    REFERENCES `mydb`.`Profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Group`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Group` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `groupname` VARCHAR(45) NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Conversation`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Conversation` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `conversationstatus` TINYINT NULL,
  `Group_id` INT NOT NULL,
  `Person_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Conversation_Group1_idx` (`Group_id` ASC) VISIBLE,
  INDEX `fk_Conversation_Person1_idx` (`Person_id` ASC) VISIBLE,
  CONSTRAINT `fk_Conversation_Group`
    FOREIGN KEY (`Group_id`)
    REFERENCES `mydb`.`Group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Conversation_Person`
    FOREIGN KEY (`Person_id`)
    REFERENCES `mydb`.`Person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Message`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `content` VARCHAR(45) NULL,
  `Conversation_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_Message_Conversation1_idx` (`Conversation_id` ASC) VISIBLE,
  CONSTRAINT `fk_Message_Conversation`
    FOREIGN KEY (`Conversation_id`)
    REFERENCES `mydb`.`Conversation` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`Membership`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`Membership` (
  `Group_id` INT NOT NULL,
  `Person_id` INT NOT NULL,
  `Profile_id` INT NOT NULL,
  PRIMARY KEY (`Group_id`, `Person_id`, `Profile_id`),
  INDEX `fk_Membership_Person1_idx` (`Person_id` ASC) VISIBLE,
  INDEX `fk_Membership_Profile1_idx` (`Profile_id` ASC) VISIBLE,
  CONSTRAINT `fk_Membership_Group`
    FOREIGN KEY (`Group_id`)
    REFERENCES `mydb`.`Group` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Membership_Person`
    FOREIGN KEY (`Person_id`)
    REFERENCES `mydb`.`Person` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_Membership_Profile`
    FOREIGN KEY (`Profile_id`)
    REFERENCES `mydb`.`Profile` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
