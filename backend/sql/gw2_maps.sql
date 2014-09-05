CREATE TABLE IF NOT EXISTS `gw2_maps` (
  `map_id` int(5) unsigned NOT NULL,
  `continent_id` tinyint(3) unsigned NOT NULL DEFAULT '0',
  `region_id` tinyint(2) NOT NULL DEFAULT '0',
  `default_floor` tinyint(3) NOT NULL DEFAULT '0',
  `floors` tinytext COLLATE utf8mb4_bin NOT NULL,
  `map_rect` tinytext COLLATE utf8mb4_bin NOT NULL,
  `continent_rect` tinytext COLLATE utf8mb4_bin NOT NULL,
  `min_level` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `max_level` tinyint(2) unsigned NOT NULL DEFAULT '0',
  `name_de` tinytext COLLATE utf8mb4_bin NOT NULL,
  `name_en` tinytext COLLATE utf8mb4_bin NOT NULL,
  `name_es` tinytext COLLATE utf8mb4_bin NOT NULL,
  `name_fr` tinytext COLLATE utf8mb4_bin NOT NULL,
  `region_de` enum('Ascalon','Befleckte Küste','Dampfsporngebirge','Fraktale der Nebel','Kryta','Reich des Verrückten Königs','Ruinen von Orr','Spieler gegen Spieler','Super Adventure Box','Welt gegen Welt','Zittergipfelgebirge') COLLATE utf8mb4_bin NOT NULL,
  `region_en` enum('Ascalon','Fractals of the Mists','Kryta','Mad King''s Realm','Player vs. Player','Ruins of Orr','Shiverpeak Mountains','Steamspur Mountains','Super Adventure Box','Tarnished Coast','World vs. World') COLLATE utf8mb4_bin NOT NULL,
  `region_es` enum('Ascalon','Costa de Bronze','Fractales de la Niebla','Jugador contra Jugador','Kryta','Montañas Brotavapor','Montañas Picosescalofriantes','Mundo contra Mundo','Reino del Rey Loco','Ruinas de Orr','Super Adventure Box') COLLATE utf8mb4_bin NOT NULL,
  `region_fr` enum('Ascalon','Chaîne de Pointebrume','Chaîne des Cimefroides','Côte ternie','Fractales des Brumes','Joueur contre Joueur','Kryte','Monde contre Monde','Royaume du Roi Dément','Ruines d''Orr','Super Adventure Box') COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`map_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_bin;

-- just the 5 main wvw maps here, if you want to build/refresh the whole table, see my database repo at: https://github.com/codemasher/gw2-database
INSERT INTO `gw2_maps` (`map_id`, `continent_id`, `region_id`, `default_floor`, `floors`, `map_rect`, `continent_rect`, `min_level`, `max_level`, `name_de`, `name_en`, `name_es`, `name_fr`, `region_de`, `region_en`, `region_es`, `region_fr`) VALUES
  (38, 2, 7, 3, '[3]', '[[-36864,-36864],[36864,36864]]', '[[8958,12798],[12030,15870]]', 80, 80, 'Ewige Schlachtfelder', 'Eternal Battlegrounds', 'Campos de batalla eternos', 'Champs de bataille éternels', 'Welt gegen Welt', 'World vs. World', 'Mundo contra Mundo', 'Monde contre Monde'),
  (94, 2, 7, 3, '[3]', '[[-30720,-43008],[30720,43008]]', '[[9214,8958],[11774,12542]]', 80, 80, ' Grenzlande', ' Borderlands', 'Tierras fronterizas de ', 'Territoires frontaliers ()', 'Welt gegen Welt', 'World vs. World', 'Mundo contra Mundo', 'Monde contre Monde'),
  (95, 2, 7, 3, '[3]', '[[-30720,-43008],[30720,43008]]', '[[5630,11518],[8190,15102]]', 80, 80, ' Grenzlande', ' Borderlands', 'Tierras fronterizas de ', 'Territoires frontaliers ()', 'Welt gegen Welt', 'World vs. World', 'Mundo contra Mundo', 'Monde contre Monde'),
  (96, 2, 7, 3, '[3]', '[[-30720,-43008],[30720,43008]]', '[[12798,10878],[15358,14462]]', 80, 80, ' Grenzlande', ' Borderlands', 'Tierras fronterizas de ', 'Territoires frontaliers ()', 'Welt gegen Welt', 'World vs. World', 'Mundo contra Mundo', 'Monde contre Monde'),
  (968, 2, 7, 3, '[3]', '[[-36864,-36864],[36864,36864]]', '[[5994,8446],[9066,11518]]', 80, 80, 'Rand der Nebel', 'Edge of the Mists', 'El Borde de la Niebla', 'La lisière des Brumes', 'Welt gegen Welt', 'World vs. World', 'Mundo contra Mundo', 'Monde contre Monde');
