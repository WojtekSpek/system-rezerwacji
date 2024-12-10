-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 10, 2024 at 08:10 PM
-- Wersja serwera: 10.4.32-MariaDB
-- Wersja PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `rezerwacja`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `pesel` char(11) NOT NULL,
  `gender` enum('M','F','Other') NOT NULL,
  `voivodeship` varchar(50) NOT NULL,
  `city` varchar(100) NOT NULL,
  `postalCode` char(6) NOT NULL,
  `street` varchar(100) DEFAULT NULL,
  `houseNumber` varchar(10) NOT NULL,
  `apartmentNumber` varchar(10) DEFAULT NULL,
  `phoneNumber` char(9) NOT NULL,
  `email` varchar(100) NOT NULL,
  `disabilityLevel` enum('Brak','Lekki','Umiarkowany','Znaczny') NOT NULL DEFAULT 'Brak',
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `created_by` varchar(50) NOT NULL DEFAULT 'admin'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`id`, `firstName`, `lastName`, `pesel`, `gender`, `voivodeship`, `city`, `postalCode`, `street`, `houseNumber`, `apartmentNumber`, `phoneNumber`, `email`, `disabilityLevel`, `created_at`, `created_by`) VALUES
(1, 'StudioSpektrum', 'Adamiak', '11111111111', '', 'sdfdf', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl', '', '2024-12-10 09:03:23', 'admin'),
(21, 'StudioSpektrum', 'Adamiak', '50062010422', '', 'Dolnośląskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl1', '', '2024-12-10 10:30:18', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `projects`
--

CREATE TABLE `projects` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `created_at`, `created_by`) VALUES
(3, 'pierwszy projekt', '2024-12-09 11:16:23', NULL),
(4, 'drugi projekt', '2024-12-09 11:16:23', NULL),
(5, 'trzeci projekt', '2024-12-09 11:16:23', NULL),
(6, 'piaty projekt', '2024-12-09 11:16:23', NULL),
(7, 'szósty projekt', '2024-12-09 11:16:23', NULL),
(21, 'test', '2024-12-10 08:52:40', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_participants`
--

CREATE TABLE `project_participants` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `assigned_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_participants`
--

INSERT INTO `project_participants` (`id`, `project_id`, `participant_id`, `assigned_at`) VALUES
(1, 3, 1, '2024-12-10 17:22:32');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `supports`
--

CREATE TABLE `supports` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `supports`
--

INSERT INTO `supports` (`id`, `project_id`, `type`, `hours`) VALUES
(1, 3, 'Psycholog', 1),
(2, 3, 'Doradca zawodowy', 3),
(3, 3, 'Szkolenie zawodowe', 4),
(4, 4, 'Psycholog', 1),
(5, 4, 'Szkolenie zawodowe', 3),
(6, 4, 'Doradca zawodowy', 3),
(7, 5, 'Psycholog', 2),
(8, 5, 'Doradca zawodowy', 3),
(9, 5, 'Szkolenie zawodowe', 3),
(10, 6, 'Psycholog', 3),
(11, 6, 'Doradca zawodowy', 1),
(12, 6, 'Szkolenie zawodowe', 4),
(13, 7, 'Psycholog', 2),
(14, 7, 'Doradca zawodowy', 2),
(15, 7, 'Szkolenie zawodowe', 4),
(16, 8, 'Doradca zawodowy', 2),
(17, 9, 'Doradca zawodowy', 1),
(18, 9, 'Psycholog', 2),
(19, 0, 'Doradca zawodowy', 2),
(20, 0, 'Doradca zawodowy', 2),
(21, 0, 'Psycholog', 3),
(22, 0, 'Doradca zawodowy', 2),
(23, 0, 'Psycholog', 3),
(42, 16, '', 1),
(43, 16, '', 1),
(44, 17, '', 4),
(45, 17, '', 6);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `support_trainers`
--

CREATE TABLE `support_trainers` (
  `id` int(11) NOT NULL,
  `support_id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `support_trainers`
--

INSERT INTO `support_trainers` (`id`, `support_id`, `trainer_id`) VALUES
(1, 0, 1),
(2, 0, 12),
(3, 0, 14),
(4, 42, 1),
(5, 43, 12),
(6, 44, 14),
(7, 45, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `trainers`
--

CREATE TABLE `trainers` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `name`) VALUES
(1, 'Wojciech Adamiak'),
(12, 'mmm'),
(13, 'fff'),
(14, '3333');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `trainer_types`
--

CREATE TABLE `trainer_types` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainer_types`
--

INSERT INTO `trainer_types` (`id`, `trainer_id`, `type`) VALUES
(1, 14, 'Doradca zawodowy'),
(2, 1, 'Doradca zawodowy'),
(3, 1, 'Psycholog'),
(4, 12, 'Psycholog');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `training_types`
--

CREATE TABLE `training_types` (
  `id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `training_types`
--

INSERT INTO `training_types` (`id`, `type`) VALUES
(1, 'Doradca zawodowy'),
(2, 'Psycholog');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `password`, `role`) VALUES
(1, 'admin', 'admin123', 'admin'),
(2, 'operator', 'password123', 'user'),
(3, 'test', 'tesdfdg', 'user');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pesel` (`pesel`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `project_participants`
--
ALTER TABLE `project_participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `participant_id` (`participant_id`);

--
-- Indeksy dla tabeli `supports`
--
ALTER TABLE `supports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id` (`id`);

--
-- Indeksy dla tabeli `support_trainers`
--
ALTER TABLE `support_trainers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `support_id` (`support_id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indeksy dla tabeli `trainers`
--
ALTER TABLE `trainers`
  ADD KEY `id` (`id`);

--
-- Indeksy dla tabeli `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `username` (`username`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `project_participants`
--
ALTER TABLE `project_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `supports`
--
ALTER TABLE `supports`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT for table `support_trainers`
--
ALTER TABLE `support_trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `project_participants`
--
ALTER TABLE `project_participants`
  ADD CONSTRAINT `project_participants_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_participants_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `support_trainers`
--
ALTER TABLE `support_trainers`
  ADD CONSTRAINT `support_trainers_ibfk_1` FOREIGN KEY (`support_id`) REFERENCES `supports` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `support_trainers_ibfk_2` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
