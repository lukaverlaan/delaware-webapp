CREATE TABLE `gebruikers` (
	`ID` bigint AUTO_INCREMENT NOT NULL,
	`EERSTELOGIN` tinyint DEFAULT 0,
	`EMAIL` varchar(255),
	`GEBOORTEDATUM` date,
	`GSM` varchar(255),
	`NAAM` varchar(255),
	`PERSONEELSNUMMER` varchar(255),
	`ROL` varchar(255),
	`STATUS` varchar(255),
	`VOORNAAM` varchar(255),
	`WACHTWOORD` varchar(255) NOT NULL,
	`HUISNR` varchar(255),
	`POSTBUS` varchar(255),
	`POSTCODE` int,
	`STAD` varchar(255),
	`STRAAT` varchar(255),
	CONSTRAINT `gebruikers_ID` PRIMARY KEY(`ID`),
	CONSTRAINT `EMAIL` UNIQUE(`EMAIL`),
	CONSTRAINT `PERSONEELSNUMMER` UNIQUE(`PERSONEELSNUMMER`)
);
--> statement-breakpoint
CREATE TABLE `machine_werknemers` (
	`gebruiker_id` bigint NOT NULL,
	`machine_id` bigint NOT NULL,
	CONSTRAINT `machine_werknemers_gebruiker_id_machine_id_pk` PRIMARY KEY(`gebruiker_id`,`machine_id`)
);
--> statement-breakpoint
CREATE TABLE `machines` (
	`ID` bigint AUTO_INCREMENT NOT NULL,
	`CODE` varchar(50),
	`LAATSTEONDERHOUD` date,
	`LOCATIE` varchar(255),
	`PRODUCTIESTATUS` varchar(255),
	`PRODUCTINFO` varchar(255),
	`STATUS` varchar(255),
	`UPTIME` time,
	`SITE_ID` bigint,
	CONSTRAINT `machines_ID` PRIMARY KEY(`ID`)
);
--> statement-breakpoint
CREATE TABLE `notificaties` (
	`ID` bigint AUTO_INCREMENT NOT NULL,
	`CODE` varchar(50),
	`DATUM` datetime,
	`INHOUD` varchar(255),
	`STATUS` varchar(255),
	`TYPE` varchar(255),
	`gebruiker_id` bigint NOT NULL DEFAULT 1,
	CONSTRAINT `notificaties_ID` PRIMARY KEY(`ID`)
);
--> statement-breakpoint
CREATE TABLE `sites` (
	`ID` bigint AUTO_INCREMENT NOT NULL,
	`CAPACITEIT` int,
	`LOCATIE` varchar(255),
	`NAAM` varchar(255),
	`operationele_status` varchar(255),
	`productie_status` varchar(255),
	CONSTRAINT `sites_ID` PRIMARY KEY(`ID`),
	CONSTRAINT `NAAM` UNIQUE(`NAAM`)
);
--> statement-breakpoint
CREATE TABLE `teams` (
	`ID` bigint AUTO_INCREMENT NOT NULL,
	`CODE` varchar(255),
	`SITE_ID` bigint,
	`VERANTWOORDELIJKE_ID` bigint,
	CONSTRAINT `teams_ID` PRIMARY KEY(`ID`)
);
--> statement-breakpoint
CREATE TABLE `teams_gebruikers` (
	`Team_ID` bigint NOT NULL,
	`medewerkers_ID` bigint NOT NULL,
	CONSTRAINT `teams_gebruikers_Team_ID_medewerkers_ID_pk` PRIMARY KEY(`Team_ID`,`medewerkers_ID`)
);
--> statement-breakpoint
ALTER TABLE `machine_werknemers` ADD CONSTRAINT `machine_werknemers_gebruiker_id_gebruikers_ID_fk` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `machine_werknemers` ADD CONSTRAINT `machine_werknemers_machine_id_machines_ID_fk` FOREIGN KEY (`machine_id`) REFERENCES `machines`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `machines` ADD CONSTRAINT `machines_SITE_ID_sites_ID_fk` FOREIGN KEY (`SITE_ID`) REFERENCES `sites`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `notificaties` ADD CONSTRAINT `notificaties_gebruiker_id_gebruikers_ID_fk` FOREIGN KEY (`gebruiker_id`) REFERENCES `gebruikers`(`ID`) ON DELETE restrict ON UPDATE cascade;--> statement-breakpoint
ALTER TABLE `teams` ADD CONSTRAINT `teams_SITE_ID_sites_ID_fk` FOREIGN KEY (`SITE_ID`) REFERENCES `sites`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `teams` ADD CONSTRAINT `teams_VERANTWOORDELIJKE_ID_gebruikers_ID_fk` FOREIGN KEY (`VERANTWOORDELIJKE_ID`) REFERENCES `gebruikers`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `teams_gebruikers` ADD CONSTRAINT `teams_gebruikers_Team_ID_teams_ID_fk` FOREIGN KEY (`Team_ID`) REFERENCES `teams`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
ALTER TABLE `teams_gebruikers` ADD CONSTRAINT `teams_gebruikers_medewerkers_ID_gebruikers_ID_fk` FOREIGN KEY (`medewerkers_ID`) REFERENCES `gebruikers`(`ID`) ON DELETE restrict ON UPDATE restrict;--> statement-breakpoint
CREATE INDEX `idx_notificatie_gebruiker` ON `notificaties` (`gebruiker_id`);