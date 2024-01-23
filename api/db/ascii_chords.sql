-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jan 23, 2024 at 03:03 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ascii_chords`
--

DROP DATABASE IF EXISTS ascii_chords;
CREATE DATABASE ascii_chords CHARACTER SET utf8 COLLATE utf8_general_ci;
USE ascii_chords;

-- --------------------------------------------------------

--
-- Table structure for table `base_chords`
--

CREATE TABLE `base_chords` (
  `ID` int(11) NOT NULL,
  `name` varchar(10) NOT NULL,
  `acoustic_guitar` varchar(64) NOT NULL,
  `electric_guitar` varchar(64) NOT NULL,
  `ukulele` varchar(64) NOT NULL,
  `tutorial` varchar(128) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `base_chords`
--

INSERT INTO `base_chords` (`ID`, `name`, `acoustic_guitar`, `electric_guitar`, `ukulele`, `tutorial`) VALUES
(1, 'A', 'x-0-2-2-2-0', 'x-0-2-2-2-0', '', ''),
(2, 'A7', 'x-0-2-0-2-0', 'x-0-2-0-2-0', '', ''),
(3, 'Am', 'x-0-2-2-1-0', 'x-0-2-2-1-0', '', ''),
(4, 'Am7', 'x-0-2-0-1-0', 'x-0-2-0-1-0', '', ''),
(5, 'Amaj7', 'x-0-2-1-2-0', 'x-0-2-1-2-0', '', ''),
(6, 'B', 'x-1-3-3-3-x', 'x-1-3-3-3-x', '', ''),
(7, 'B7', 'x-2-1-2-0-2', 'x-2-1-2-0-2', '', ''),
(8, 'Bm', 'x-2-4-4-3-x', 'x-2-4-4-3-x', '', ''),
(9, 'C', 'x-3-2-0-1-0', 'x-3-2-0-1-0', '', ''),
(10, 'C7', 'x-3-2-3-1-0', 'x-3-2-3-1-0', '', ''),
(11, 'Cmaj7', 'x-3-2-0-0-0', 'x-3-2-0-0-0', '', ''),
(12, 'D', 'x-x-0-2-3-2', 'x-x-0-2-3-2', '', ''),
(13, 'D7', 'x-x-0-2-1-2', 'x-x-0-2-1-2', '', ''),
(14, 'Dm', 'x-x-0-2-3-1', 'x-x-0-2-3-1', '', ''),
(15, 'Dm7', 'x-x-0-2-1-1', 'x-x-0-2-1-1', '', ''),
(16, 'Dmaj7', 'x-x-0-2-2-2', 'x-x-0-2-2-2', '', ''),
(17, 'E', '0-2-2-1-0-0', '0-2-2-1-0-0', '', ''),
(18, 'E7', '0-2-0-1-0-0', '0-2-0-1-0-0', '', ''),
(19, 'Em', '0-2-2-0-0-0', '0-2-2-0-0-0', '', ''),
(20, 'Em7', '0-2-0-0-0-0', '0-2-0-0-0-0', '', ''),
(21, 'F', 'x-x-3-2-1-1', 'x-x-3-2-1-1', '', ''),
(22, 'Fmaj7', 'x-x-3-2-1-0', 'x-x-3-2-1-0', '', ''),
(23, 'G', '3-2-0-0-0-3', '3-2-0-0-0-3', '', ''),
(24, 'G7', '3-2-0-0-0-1', '3-2-0-0-0-1', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `chords`
--

CREATE TABLE `chords` (
  `ID` int(11) NOT NULL,
  `userID` int(11) NOT NULL,
  `name` varchar(64) NOT NULL,
  `acoustic_guitar` varchar(64) NOT NULL,
  `electric_guitar` varchar(64) NOT NULL,
  `ukulele` varchar(64) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `chords`
--

INSERT INTO `chords` (`ID`, `userID`, `name`, `acoustic_guitar`, `electric_guitar`, `ukulele`) VALUES
(18, 14, 'D2', 'x-x-2-x-x-x', '', ''),
(19, 14, 'G0', 'x-x-x-0-x-x', '', ''),
(20, 14, 'G2', 'x-x-x-2-x-x', '', ''),
(21, 14, 'B0', 'x-x-x-x-0-x', '', ''),
(22, 14, 'B1', 'x-x-x-x-1-x', '', ''),
(23, 14, 'B3', 'x-x-x-x-3-x', '', ''),
(24, 14, 'E0', 'x-x-x-x-x-0', '', ''),
(25, 14, 'E1', 'x-x-x-x-x-1', '', ''),
(31, 14, 'Empty', 'x-x-x-x-x-x', '', ''),
(36, 14, 'D0G0', 'x-x-0-0-x-x', '', ''),
(37, 14, 'D3G3', 'x-x-3-3-x-x', '', ''),
(38, 14, 'D5G5', 'x-x-5-5-x-x', '', ''),
(39, 14, 'D6G6', 'x-x-6-6-x-x', '', ''),
(40, 14, 'A7', 'x-7-x-x-x-x', '', ''),
(41, 14, 'D9', 'x-x-9-x-x-x', '', ''),
(42, 14, 'A9', 'x-9-x-x-x-x', '', ''),
(45, 14, 'D12', 'x-x-12-x-x-x', '', ''),
(46, 14, 'A5', 'x-5-x-x-x-x', '', ''),
(47, 14, 'D7', 'x-x-7-x-x-x', '', ''),
(48, 14, 'A3', 'x-3-x-x-x-x', '', ''),
(49, 14, 'D5', 'x-x-5-x-x-x', '', ''),
(50, 14, 'A0', 'x-0-x-x-x-x', '', ''),
(51, 14, 'D2', 'x-x-2-x-x-x', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `favourites_base`
--

CREATE TABLE `favourites_base` (
  `userID` int(11) NOT NULL,
  `chordID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `favourites_user`
--

CREATE TABLE `favourites_user` (
  `userID` int(11) NOT NULL,
  `chordID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `favourites_user`
--

INSERT INTO `favourites_user` (`userID`, `chordID`) VALUES
(14, 18),
(14, 19),
(14, 20),
(14, 21),
(14, 22),
(14, 23),
(14, 31);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `ID` int(11) NOT NULL,
  `role` varchar(32) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`ID`, `role`) VALUES
(1, 'user'),
(2, 'admin');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `ID` int(11) NOT NULL,
  `username` varchar(64) NOT NULL,
  `password` varchar(128) NOT NULL,
  `email` varchar(64) NOT NULL,
  `role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`ID`, `username`, `password`, `email`, `role`) VALUES
(14, 'user', '$2y$10$aWBuPL6OApof3rPWbdkxg.Q1z3NMtKwu931fKCKxa1ncwGr/0wpBO', 'user', 1),
(15, 'user1', '$2y$10$stm6ps3usBjLXxNM.pftnew/9BCTUdD8pdH4e65tJQyLayLBOr5Oe', 'user1', 1),
(24, 'admin', '$2y$10$6kI0isSynFrZqJFDysSl1.cZBN47zuk/Lokc9xDdY5MUmtL4Sci9e', 'admin', 2),
(25, 'test', '$2y$10$UhOSMDVFczLaCnYPm/er1uCpk0tgDU1Dt/iYxIWzPEftlGt1bgxrW', 'test', 1),
(27, 'testUser', '$2y$10$aUp1DcUmGNX7YL24tv2DneZHEZWltR98xONClnhD5QVb21WITB92i', 'testUser', 1);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `base_chords`
--
ALTER TABLE `base_chords`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `chords`
--
ALTER TABLE `chords`
  ADD PRIMARY KEY (`ID`),
  ADD KEY `userID_FK` (`userID`);

--
-- Indexes for table `favourites_base`
--
ALTER TABLE `favourites_base`
  ADD PRIMARY KEY (`userID`,`chordID`);

--
-- Indexes for table `favourites_user`
--
ALTER TABLE `favourites_user`
  ADD PRIMARY KEY (`userID`,`chordID`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`ID`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `FK_role` (`role`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `base_chords`
--
ALTER TABLE `base_chords`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `chords`
--
ALTER TABLE `chords`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `chords`
--
ALTER TABLE `chords`
  ADD CONSTRAINT `userID_FK` FOREIGN KEY (`userID`) REFERENCES `users` (`ID`);

--
-- Constraints for table `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `FK_role` FOREIGN KEY (`role`) REFERENCES `roles` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
