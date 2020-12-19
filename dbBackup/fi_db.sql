-- phpMyAdmin SQL Dump
-- version 4.9.5deb2
-- https://www.phpmyadmin.net/
--
-- Anamakine: localhost:3306
-- Üretim Zamanı: 19 Ara 2020, 23:26:34
-- Sunucu sürümü: 8.0.22-0ubuntu0.20.04.3
-- PHP Sürümü: 7.4.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `fi_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblProject`
--

CREATE TABLE `tblProject` (
  `Id` int NOT NULL,
  `ProjectName` varchar(200) NOT NULL,
  `Description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblTask`
--

CREATE TABLE `tblTask` (
  `Id` int NOT NULL,
  `TaskName` varchar(150) NOT NULL,
  `Description` text NOT NULL,
  `CreatedDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `DueDate` datetime NOT NULL,
  `UserID` int NOT NULL,
  `ProjectID` int NOT NULL,
  `TaskStatusName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblTaskLog`
--

CREATE TABLE `tblTaskLog` (
  `Id` int NOT NULL,
  `UserID` int NOT NULL,
  `TaskID` int NOT NULL,
  `TaskStatusName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblTaskStatus`
--

CREATE TABLE `tblTaskStatus` (
  `TaskStatusName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblTaskStatus`
--

INSERT INTO `tblTaskStatus` (`TaskStatusName`) VALUES
('DONE'),
('IN PROGRESS'),
('TEST'),
('TO DO');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUser`
--

CREATE TABLE `tblUser` (
  `Id` int NOT NULL,
  `FirstName` varchar(100) NOT NULL,
  `LastName` varchar(100) NOT NULL,
  `EmailAddress` varchar(200) NOT NULL,
  `Password` varchar(99) NOT NULL,
  `UserTypeName` varchar(25) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblUser`
--

INSERT INTO `tblUser` (`Id`, `FirstName`, `LastName`, `EmailAddress`, `Password`, `UserTypeName`) VALUES
(1, 'İsmet', 'Kizgin', 'fi@project.com', 'password', 'Root');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `tblUserType`
--

CREATE TABLE `tblUserType` (
  `UserTypeName` varchar(25) NOT NULL,
  `UserTypeNumber` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Tablo döküm verisi `tblUserType`
--

INSERT INTO `tblUserType` (`UserTypeName`, `UserTypeNumber`) VALUES
('Administrator', 666),
('Manager', 555),
('Root', 777),
('Staff', 444);

--
-- Dökümü yapılmış tablolar için indeksler
--

--
-- Tablo için indeksler `tblProject`
--
ALTER TABLE `tblProject`
  ADD PRIMARY KEY (`Id`);

--
-- Tablo için indeksler `tblTask`
--
ALTER TABLE `tblTask`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `ProjectID` (`ProjectID`),
  ADD KEY `TaskStatusName` (`TaskStatusName`);

--
-- Tablo için indeksler `tblTaskLog`
--
ALTER TABLE `tblTaskLog`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserID` (`UserID`),
  ADD KEY `TaskID` (`TaskID`),
  ADD KEY `TaskStatusName` (`TaskStatusName`);

--
-- Tablo için indeksler `tblTaskStatus`
--
ALTER TABLE `tblTaskStatus`
  ADD PRIMARY KEY (`TaskStatusName`);

--
-- Tablo için indeksler `tblUser`
--
ALTER TABLE `tblUser`
  ADD PRIMARY KEY (`Id`),
  ADD KEY `UserTypeName` (`UserTypeName`);

--
-- Tablo için indeksler `tblUserType`
--
ALTER TABLE `tblUserType`
  ADD PRIMARY KEY (`UserTypeName`);

--
-- Dökümü yapılmış tablolar için AUTO_INCREMENT değeri
--

--
-- Tablo için AUTO_INCREMENT değeri `tblProject`
--
ALTER TABLE `tblProject`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblTask`
--
ALTER TABLE `tblTask`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblTaskLog`
--
ALTER TABLE `tblTaskLog`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT;

--
-- Tablo için AUTO_INCREMENT değeri `tblUser`
--
ALTER TABLE `tblUser`
  MODIFY `Id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Dökümü yapılmış tablolar için kısıtlamalar
--

--
-- Tablo kısıtlamaları `tblTask`
--
ALTER TABLE `tblTask`
  ADD CONSTRAINT `tblTask_ibfk_1` FOREIGN KEY (`ProjectID`) REFERENCES `tblProject` (`Id`) ON DELETE CASCADE;

--
-- Tablo kısıtlamaları `tblTaskLog`
--
ALTER TABLE `tblTaskLog`
  ADD CONSTRAINT `tblTaskLog_ibfk_1` FOREIGN KEY (`TaskStatusName`) REFERENCES `tblTaskStatus` (`TaskStatusName`),
  ADD CONSTRAINT `tblTaskLog_ibfk_2` FOREIGN KEY (`TaskID`) REFERENCES `tblTask` (`Id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tblTaskLog_ibfk_3` FOREIGN KEY (`UserID`) REFERENCES `tblUser` (`Id`);

--
-- Tablo kısıtlamaları `tblUser`
--
ALTER TABLE `tblUser`
  ADD CONSTRAINT `tblUser_ibfk_1` FOREIGN KEY (`UserTypeName`) REFERENCES `tblUserType` (`UserTypeName`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
