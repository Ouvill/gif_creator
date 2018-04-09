CREATE DATABASE IF NOT EXISTS `flash_gif_maker_db` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE flash_gif_maker_db
CREATE TABLE `posts` (
  `post_id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text DEFAULT NULL,
  `font_size` int(11) DEFAULT NULL,
  `delay` int(11) DEFAULT NULL,
  `repeat` int(11) DEFAULT NULL,
  `font_family` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`post_id`),
  UNIQUE KEY `post_id_UNIQUE` (`post_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8
