-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 10:45 PM
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
-- Struktura tabeli dla tabeli `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `project_trainer_id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `project_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `project_trainer_id`, `title`, `start`, `end`, `description`, `created_at`, `updated_at`, `project_id`) VALUES
(11, 1, 'zxzxz', '2024-12-15 12:03:00', '2024-12-15 14:03:00', 'test', '2024-12-15 08:03:50', '2024-12-15 08:03:50', 3),
(12, 2, 'xxxx', '2024-12-15 12:11:00', '2024-12-15 14:11:00', 'test', '2024-12-15 08:11:32', '2024-12-15 08:11:32', 3),
(13, 3, 'kjkjkj', '2024-12-15 15:06:00', '2024-12-15 17:06:00', 'test', '2024-12-15 11:07:02', '2024-12-15 11:07:02', 3),
(14, 3, 'nnjjhjh', '2024-12-15 15:09:00', '2024-12-15 16:09:00', 'test', '2024-12-15 11:10:15', '2024-12-15 11:10:15', 3),
(15, 3, 'nnmmnmn', '2024-12-15 12:23:00', '2024-12-15 14:23:00', 'test', '2024-12-15 11:23:07', '2024-12-15 11:23:07', 3),
(16, 3, 'tttt', '2024-12-13 12:27:00', '2024-12-15 17:27:00', 'test', '2024-12-15 11:27:19', '2024-12-15 11:27:19', 3),
(17, 3, 'dddd', '2024-12-15 12:29:00', '2024-12-22 12:29:00', 'test', '2024-12-15 11:29:57', '2024-12-15 11:29:57', 3),
(18, 3, 'swww', '2024-12-15 12:31:00', '2024-12-15 14:31:00', 'test', '2024-12-15 11:31:33', '2024-12-15 11:31:33', 3);

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
(21, 'StudioSpektrum', 'Adamiak', '50062010422', '', 'Dolnośląskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl1', '', '2024-12-10 10:30:18', 'admin'),
(25, 'StudioSpektrum', 'Adamiak', '50062010421', '', 'Dolnośląskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl2', '', '2024-12-11 16:10:21', 'admin');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `participant_files`
--

CREATE TABLE `participant_files` (
  `id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `file_path` varchar(255) NOT NULL,
  `uploaded_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

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
(21, 'test', '2024-12-10 08:52:40', 'admin'),
(22, 'dfdf', '2024-12-11 08:57:28', NULL),
(25, 'dwa', '2024-12-11 09:40:09', 'admin');

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
(24, 3, 1, '2024-12-12 07:39:36');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_participant_training_types`
--

CREATE TABLE `project_participant_training_types` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `participant_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_trainers`
--

CREATE TABLE `project_trainers` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_trainers`
--

INSERT INTO `project_trainers` (`id`, `project_id`, `training_type_id`, `trainer_id`) VALUES
(1, 3, 1, 1),
(2, 3, 2, 24),
(3, 3, 2, 21);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_training_types`
--

CREATE TABLE `project_training_types` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_training_types`
--

INSERT INTO `project_training_types` (`id`, `project_id`, `training_type_id`) VALUES
(4, 25, 1),
(5, 25, 2),
(47, 3, 2),
(48, 3, 1);

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
(12, 'Tomek'),
(14, '3333'),
(19, 'hh'),
(20, 'Karolin'),
(21, 'Karolin'),
(22, 'dfdf'),
(23, 'inne'),
(24, '22222'),
(25, 'Alina');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `trainer_types`
--

CREATE TABLE `trainer_types` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `type` varchar(255) NOT NULL,
  `type_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainer_types`
--

INSERT INTO `trainer_types` (`id`, `trainer_id`, `type`, `type_id`) VALUES
(29, 12, 'Doradca zawodowy', 1),
(36, 24, 'Psycholog', 2),
(37, 24, 'Doradca zawodowy', 1),
(41, 1, 'Doradca zawodowy', 1),
(42, 14, 'Doradca zawodowy', 1),
(43, 19, 'Psycholog', 2),
(44, 20, 'Psycholog', 2),
(45, 21, 'Psycholog', 2),
(46, 22, 'Doradca zawodowy', 1),
(47, 22, 'Psycholog', 2),
(49, 23, 'Psycholog', 2),
(48, 23, 'Doradca zawodowy', 1),
(50, 25, 'Doradca zawodowy', 1),
(51, 25, 'Psycholog', 2);

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
(0, 'test'),
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
-- Indeksy dla tabeli `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_trainer_id` (`project_trainer_id`),
  ADD KEY `fk_events_projects` (`project_id`);

--
-- Indeksy dla tabeli `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `pesel` (`pesel`),
  ADD UNIQUE KEY `email` (`email`);

--
-- Indeksy dla tabeli `participant_files`
--
ALTER TABLE `participant_files`
  ADD PRIMARY KEY (`id`),
  ADD KEY `participant_id` (`participant_id`);

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
-- Indeksy dla tabeli `project_participant_training_types`
--
ALTER TABLE `project_participant_training_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `participant_id` (`participant_id`),
  ADD KEY `training_type_id` (`training_type_id`);

--
-- Indeksy dla tabeli `project_trainers`
--
ALTER TABLE `project_trainers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `training_type_id` (`training_type_id`),
  ADD KEY `trainer_id` (`trainer_id`);

--
-- Indeksy dla tabeli `project_training_types`
--
ALTER TABLE `project_training_types`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_id` (`project_id`),
  ADD KEY `training_type_id` (`training_type_id`);

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
-- Indeksy dla tabeli `trainer_types`
--
ALTER TABLE `trainer_types`
  ADD KEY `id` (`id`);

--
-- Indeksy dla tabeli `training_types`
--
ALTER TABLE `training_types`
  ADD PRIMARY KEY (`id`);

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
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `participant_files`
--
ALTER TABLE `participant_files`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT for table `project_participants`
--
ALTER TABLE `project_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=25;

--
-- AUTO_INCREMENT for table `project_participant_training_types`
--
ALTER TABLE `project_participant_training_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_trainers`
--
ALTER TABLE `project_trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `project_training_types`
--
ALTER TABLE `project_training_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=49;

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
-- AUTO_INCREMENT for table `trainers`
--
ALTER TABLE `trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=26;

--
-- AUTO_INCREMENT for table `trainer_types`
--
ALTER TABLE `trainer_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=52;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `events`
--
ALTER TABLE `events`
  ADD CONSTRAINT `events_ibfk_1` FOREIGN KEY (`project_trainer_id`) REFERENCES `project_trainers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_events_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `participant_files`
--
ALTER TABLE `participant_files`
  ADD CONSTRAINT `participant_files_ibfk_1` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_participants`
--
ALTER TABLE `project_participants`
  ADD CONSTRAINT `project_participants_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_participants_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_participant_training_types`
--
ALTER TABLE `project_participant_training_types`
  ADD CONSTRAINT `project_participant_training_types_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_participant_training_types_ibfk_2` FOREIGN KEY (`participant_id`) REFERENCES `participants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_participant_training_types_ibfk_3` FOREIGN KEY (`training_type_id`) REFERENCES `training_types` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_trainers`
--
ALTER TABLE `project_trainers`
  ADD CONSTRAINT `project_trainers_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_trainers_ibfk_2` FOREIGN KEY (`training_type_id`) REFERENCES `training_types` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_trainers_ibfk_3` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `project_training_types`
--
ALTER TABLE `project_training_types`
  ADD CONSTRAINT `project_training_types_ibfk_1` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `project_training_types_ibfk_2` FOREIGN KEY (`training_type_id`) REFERENCES `training_types` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
