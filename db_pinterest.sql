/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `binh_luan` (
  `binh_luan_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_binh_luan` date DEFAULT NULL,
  `noi_dung` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`binh_luan_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `binh_luan_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `binh_luan_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=34 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `hinh_anh` (
  `hinh_id` int NOT NULL AUTO_INCREMENT,
  `ten_hinh` varchar(255) DEFAULT NULL,
  `duong_dan` varchar(255) DEFAULT NULL,
  `mo_ta` varchar(255) DEFAULT NULL,
  `nguoi_dung_id` int DEFAULT NULL,
  PRIMARY KEY (`hinh_id`),
  KEY `nguoi_dung_id` (`nguoi_dung_id`),
  CONSTRAINT `hinh_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=98 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `luu_anh` (
  `luu_anh_id` int NOT NULL AUTO_INCREMENT,
  `nguoi_dung_id` int DEFAULT NULL,
  `hinh_id` int DEFAULT NULL,
  `ngay_luu` datetime DEFAULT CURRENT_TIMESTAMP,
  `da_luu` tinyint(1) DEFAULT '1',
  PRIMARY KEY (`luu_anh_id`),
  UNIQUE KEY `nguoi_dung_id` (`nguoi_dung_id`,`hinh_id`),
  KEY `hinh_id` (`hinh_id`),
  CONSTRAINT `luu_anh_ibfk_1` FOREIGN KEY (`nguoi_dung_id`) REFERENCES `nguoi_dung` (`nguoi_dung_id`),
  CONSTRAINT `luu_anh_ibfk_2` FOREIGN KEY (`hinh_id`) REFERENCES `hinh_anh` (`hinh_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE `nguoi_dung` (
  `nguoi_dung_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) DEFAULT NULL,
  `mat_khau` varchar(255) DEFAULT NULL,
  `ho_ten` varchar(255) DEFAULT NULL,
  `tuoi` int DEFAULT NULL,
  `anh_dai_dien` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`nguoi_dung_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(11, 11, 58, '2023-12-20', 'Bình luận 11');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(12, 10, 59, '2023-12-20', 'asd');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(13, 10, 60, '2023-12-20', 'asdddd');
INSERT INTO `binh_luan` (`binh_luan_id`, `nguoi_dung_id`, `hinh_id`, `ngay_binh_luan`, `noi_dung`) VALUES
(17, 11, 61, '2023-12-23', 'comment 39'),
(18, 11, 62, '2023-12-23', 'comment 40'),
(19, 11, 63, '2023-12-23', '40'),
(20, 11, 64, '2023-12-23', '40'),
(32, 21, 94, '2023-12-30', 'trời nắng'),
(33, 22, 95, '2023-12-30', 'asjkldhaskldajsdklasjdklasda');

INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(39, 'TEST 2', 'public/img/1703647773734_338f0458e9b723355d833bc473a68c6f.jpg', 'MOTA1', 10);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(40, 'TEST 2', 'public/img/1703648020955_72690f8d53d6bc2863d9e2ecbf90a287.jpg', 'MOTA1', 10);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(41, 'TEST 3', 'public/img/1703648115934_753794368631e5ac40cce68b035c3c67.jpg', 'MOTA1', 10);
INSERT INTO `hinh_anh` (`hinh_id`, `ten_hinh`, `duong_dan`, `mo_ta`, `nguoi_dung_id`) VALUES
(42, 'TEST 1', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'MOTA1', 10),
(43, 'TEST 1', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'MOTA1', 10),
(44, 'TEST 1', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'MOTA1', 10),
(45, 'TEST 1', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'MOTA1', 10),
(46, 'TEST 1', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'MOTA1', 10),
(58, '1703647773731_72a50a37a962f1171b35d54cebbd3c4b.jpg', 'public/img/1703647773731_72a50a37a962f1171b35d54cebbd3c4b.jpg', NULL, 10),
(59, '1703647773734_338f0458e9b723355d833bc473a68c6f.jpg', 'public/img/1703647773734_338f0458e9b723355d833bc473a68c6f.jpg', NULL, 10),
(60, '1703648020955_72690f8d53d6bc2863d9e2ecbf90a287.jpg', 'public/img/1703648020955_72690f8d53d6bc2863d9e2ecbf90a287.jpg', NULL, 10),
(61, '1703648115934_753794368631e5ac40cce68b035c3c67.jpg', 'public/img/1703648115934_753794368631e5ac40cce68b035c3c67.jpg', NULL, 10),
(62, '1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', 'public/img/1703648291330_da40a407d376f45ddcd3b27fb126da6a.jpg', NULL, 11),
(63, '1703648291333_3566fb6a1401703c145e9662bc3a7958.jpg', 'public/img/1703648291333_3566fb6a1401703c145e9662bc3a7958.jpg', NULL, 11),
(64, '1703648291333_18a1c58f53f2027d00d0a75356d494bd.jpg', 'public/img/1703648291333_18a1c58f53f2027d00d0a75356d494bd.jpg', NULL, 11),
(65, '1703648291334_4b6c6ce93265d2a26e38020c340d9e26.jpg', 'public/img/1703648291334_4b6c6ce93265d2a26e38020c340d9e26.jpg', NULL, 11),
(66, '1703648291343_ce7b915b6f366fdffaf38ad081920e7f.jpg', 'public/img/1703648291343_ce7b915b6f366fdffaf38ad081920e7f.jpg', NULL, 11),
(67, '1703648291343_d742f00a3770c41a1d3e2c2b3dadd6b3.jpg', 'public/img/1703648291343_d742f00a3770c41a1d3e2c2b3dadd6b3.jpg', NULL, 11),
(68, '1703648291344_403c6e5bd46ac212351fd80f63a9849f.jpg', 'public/img/1703648291344_403c6e5bd46ac212351fd80f63a9849f.jpg', NULL, 11),
(69, '1703648291345_e2d251034d2cbf60b48b122588c52887.jpg', 'public/img/1703648291345_e2d251034d2cbf60b48b122588c52887.jpg', NULL, 11),
(70, '1703648291348_a1374804474931ed3139fce47a17cbb1.jpg', 'public/img/1703648291348_a1374804474931ed3139fce47a17cbb1.jpg', NULL, 11),
(71, '1703648291349_d6a3837f182fb7cc653744554ff91d0f.jpg', 'public/img/1703648291349_d6a3837f182fb7cc653744554ff91d0f.jpg', NULL, 11),
(72, '1703648291351_cbdfa272cc81ea666d9c2201dbfb26e1.jpg', 'public/img/1703648291351_cbdfa272cc81ea666d9c2201dbfb26e1.jpg', NULL, 11),
(73, '1703648291351_e4a9ad720d3d4b9f99a0964504c8cdf6.jpg', 'public/img/1703648291351_e4a9ad720d3d4b9f99a0964504c8cdf6.jpg', NULL, 11),
(74, '1703648291352_e4a9ad720d3d4b9f99a0964504c8cdf6.jpg', 'public/img/1703648291352_e4a9ad720d3d4b9f99a0964504c8cdf6.jpg', NULL, 11),
(75, '1703648291353_3d04bcc028f6fd21c00d064d0f015f01.jpg', 'public/img/1703648291353_3d04bcc028f6fd21c00d064d0f015f01.jpg', NULL, 11),
(76, '1703648291355_235397ce366fc81d4bc23683cea0b5f0.jpg', 'public/img/1703648291355_235397ce366fc81d4bc23683cea0b5f0.jpg', NULL, 11),
(77, '1703682604000_avaChina.jpg', 'public/img/1703682604000_avaChina.jpg', NULL, 11),
(78, '1703682701359_avaChina.jpg', 'public/img/1703682701359_avaChina.jpg', NULL, 11),
(79, '1703682758358_avaChina.jpg', 'public/img/1703682758358_avaChina.jpg', NULL, 15),
(80, '1703682970251_nauHatDe.jpg', 'public/img/1703682970251_nauHatDe.jpg', NULL, 15),
(81, '1703683034993_nauHatDe.jpg', 'public/img/1703683034993_nauHatDe.jpg', NULL, 15),
(82, '1703683298798_nauHatDe.jpg', 'public/img/1703683298798_nauHatDe.jpg', NULL, 15),
(83, '1703683448471_z4964511887208_f2d324a46b8d7d472e58364787f763ff.jpg', 'public/img/1703683448471_z4964511887208_f2d324a46b8d7d472e58364787f763ff.jpg', NULL, 15),
(84, '1703683503923_nauHatDe.jpg', 'public/img/1703683503923_nauHatDe.jpg', NULL, 15),
(85, '1703683597814_nauHatDe.jpg', 'public/img/1703683597814_nauHatDe.jpg', NULL, 15),
(86, '1703683620699_nauHatDe.jpg', 'public/img/1703683620699_nauHatDe.jpg', NULL, 15),
(87, '1703737805373_origami.jpg', 'public/img/1703737805373_origami.jpg', NULL, 15),
(88, '1703737805380_nauHatDe.jpg', 'public/img/1703737805380_nauHatDe.jpg', NULL, 15),
(89, '1703737830430_user.jpg', 'public/img/1703737830430_user.jpg', NULL, 15),
(90, 'airbnb', 'public/img/1703758525883_airbnb-logo.png', 'airbnbairbnbairbnbairbnbairbnbairbnb', 15),
(91, 'airbnb', 'public/img/1703758551966_airbnb-logo.png', 'airbnbairbnbairbnbairbnbairbnbairbnb', 15),
(92, 'newImg', 'public/img/1703758923664_da40a407d376f45ddcd3b27fb126da6a.jpg', '', 11),
(93, 'Cái cặp', 'public/img/1703759459817_338f0458e9b723355d833bc473a68c6f.jpg', 'Cặp đi học', 15),
(94, 'Hộp quẹt', 'public/img/1703759532432_18a1c58f53f2027d00d0a75356d494bd.jpg', 'Quẹt lửa', 15),
(95, NULL, 'public/img_compress/1703921795779_origami.jpg', NULL, 15);

INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `da_luu`) VALUES
(13, 10, 70, '2023-12-21 11:30:03', 1);
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `da_luu`) VALUES
(14, 10, 71, '2023-12-21 11:31:35', 1);
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `da_luu`) VALUES
(15, 10, 72, '2023-12-21 11:31:51', 0);
INSERT INTO `luu_anh` (`luu_anh_id`, `nguoi_dung_id`, `hinh_id`, `ngay_luu`, `da_luu`) VALUES
(16, 11, 73, '2023-12-23 10:29:33', 0),
(17, 11, 74, '2023-12-23 10:28:03', 1),
(18, 11, 75, '2023-12-23 10:28:11', 1),
(19, 11, 76, '2023-12-23 10:28:12', 1),
(20, 15, 39, '2023-12-30 02:42:01', 1),
(21, 15, 46, '2023-12-30 03:07:05', 1),
(22, 15, 64, '2023-12-30 03:07:07', 1),
(23, 15, 71, '2023-12-30 03:24:29', 0),
(24, 15, 77, '2023-12-30 03:51:34', 0),
(25, 15, 86, '2023-12-30 07:39:04', 0),
(26, 15, 65, '2023-12-30 03:51:39', 0),
(27, 15, 90, '2023-12-30 07:56:59', 1),
(28, 15, 87, '2023-12-30 03:38:58', 1),
(29, 15, 79, '2023-12-30 04:01:33', 0),
(30, 15, 83, '2023-12-30 03:46:21', 1),
(31, 15, 82, '2023-12-30 07:39:07', 0),
(32, 15, 85, '2023-12-30 07:39:04', 0),
(33, 15, 88, '2023-12-30 07:39:07', 0),
(34, 15, 89, '2023-12-30 03:54:05', 1),
(35, 15, 80, '2023-12-30 07:39:08', 0),
(36, 15, 94, '2023-12-30 04:01:25', 0),
(37, 15, 91, '2023-12-30 07:56:57', 1),
(38, 15, 93, '2023-12-30 04:01:56', 1),
(39, 15, 84, '2023-12-30 07:39:05', 0),
(40, 15, 81, '2023-12-30 07:39:06', 0),
(41, 21, 94, '2023-12-30 08:08:24', 0),
(42, 21, 95, '2023-12-30 08:07:48', 1),
(43, 21, 90, '2023-12-30 08:08:06', 1),
(44, 22, 95, '2023-12-30 08:21:06', 0);

INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(1, 'user1@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 1', 25, 'avatar1.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(2, 'user2@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 2', 30, 'avatar2.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(3, 'user3@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 3', 28, 'avatar3.jpg');
INSERT INTO `nguoi_dung` (`nguoi_dung_id`, `email`, `mat_khau`, `ho_ten`, `tuoi`, `anh_dai_dien`) VALUES
(4, 'user4@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 4', 22, 'avatar4.jpg'),
(5, 'user5@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 5', 29, 'avatar5.jpg'),
(6, 'user6@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 6', 35, 'avatar6.jpg'),
(7, 'user7@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 7', 27, 'avatar7.jpg'),
(8, 'user8@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 8', 31, 'avatar8.jpg'),
(9, 'user9@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 9', 26, 'avatar9.jpg'),
(10, 'user10@example.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'Người dùng 10', 24, '1703133636249_nauHatDe.jpg'),
(11, 'user11@example.com', '$2b$10$J4rCoq3wLylb.oEWjlcFkukzeNftvB5yE5tv1HtYvdJBP5UNnozay', 'JOHN PHUC', NULL, '1703597783959_masteri.jpg'),
(12, 'vohaiphuc@gmail.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'phúc võ', 23, NULL),
(13, 'vohaiphu1c@gmail.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'phúc võ1', 53, NULL),
(14, 'vohaiphuc24@gmail.com', '$2b$10$cXihH/hZcvV.1sRZYzBzE.jXkbfs0IFt49X1w9oTPzB1i8skKNstK', 'phuc vo', 0, NULL),
(15, 'phuc24', '$2b$10$l5oWPH6TuShxe1riS7CfWeq3zqy4nUCqStrxlFpwBcqkKFlN1b0OS', 'JOHN PHUC', 26, 'public/img_compress/1703733127001_transparent-vivid-autumn-leaves.jpg'),
(16, 'phuc241', '$2b$10$OE9fYYjZRLmL4UQsxBySw.ASKl5QD3D4kdJfIegvIY4u.I/r6Yday', NULL, 0, NULL),
(17, 'phuc2411', '$2b$10$aVBK82lgifIyfqyAZIE39OlO.OrRjk52wlODC.UCjDDsdqNl5SR9e', NULL, 26, NULL),
(18, 'phuc23', '$2b$10$E1.h/FWly2Fftv8ZLtzbue53eORkpuHPrxVw.nGV9GZOaNH2yAQRi', NULL, 23, NULL),
(19, 'phuc2424242', '$2b$10$U/JrMv/7aWE4W0v8t2Bx5.7I37X1z2IoGk4rWkP8DbkpHijT0MGZa', NULL, 0, NULL),
(20, 'phuc241111', '$2b$10$RkI4vP9q24z6kt0g9ym0o.VuWKrlSzbgFb8qgaUWxznoHF0X0Z6ju', NULL, 0, NULL),
(21, 'phuc1234@gmail.com', '$2b$10$awG/28/RS6UOta72CG.NYOIphIY7qXSOgAAe4A0f5EemqDpsv6sYK', 'Phúc', 27, 'public/img_compress/1703922831643_nauHatDe.jpg'),
(22, 'phuc12345@gmail.com', '$2b$10$T.tE.dXcVxivpA2B8fG/e.IpLcleZyc79aNSGT.ao4IUNrum46iWq', 'Phúc', 23, 'public/img_compress/1703924262678_nauHatDe.jpg');


/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;