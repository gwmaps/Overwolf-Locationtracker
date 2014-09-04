CREATE TABLE IF NOT EXISTS `gw2_guilds` (
  `guild_id` varchar(40) COLLATE utf8mb4_bin NOT NULL,
  `name` tinytext COLLATE utf8mb4_bin NOT NULL,
  `tag` varchar(4) COLLATE utf8mb4_bin NOT NULL,
  `foreground_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `background_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `foreground_primary_color_id` smallint(4) unsigned NOT NULL DEFAULT '0',
  `foreground_secondary_color_id` smallint(4) unsigned NOT NULL DEFAULT '0',
  `background_color_id` smallint(4) unsigned NOT NULL DEFAULT '0',
  `flags` tinyint(2) unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`guild_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- one empty guild
INSERT INTO `gw2_guilds`(`guild_id`, `name`, `tag`, `foreground_id`, `background_id`, `foreground_primary_color_id`, `foreground_secondary_color_id`, `background_color_id`, `flags`) VALUES ('00000000-0000-0000-0000-000000000000','','',0,0,0,0,0,0);
