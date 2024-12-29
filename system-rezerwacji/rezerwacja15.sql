-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 29, 2024 at 10:46 PM
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
-- Struktura tabeli dla tabeli `comments`
--

CREATE TABLE `comments` (
  `id` int(11) NOT NULL,
  `content` text NOT NULL,
  `entityId` int(11) NOT NULL,
  `entityType` enum('project','participant') NOT NULL,
  `createdBy` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `comments`
--

INSERT INTO `comments` (`id`, `content`, `entityId`, `entityType`, `createdBy`, `createdAt`, `updatedAt`) VALUES
(5, 'eee', 3, 'project', 1, '2024-12-25 09:34:49', '2024-12-25 09:34:49'),
(6, 'noo', 3, 'project', 1, '2024-12-26 09:52:24', '2024-12-26 09:52:24'),
(7, 'test szkolenia', 3, 'participant', 1, '2024-12-26 10:01:29', '2024-12-26 10:01:29');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `events`
--

CREATE TABLE `events` (
  `id` int(11) NOT NULL,
  `project_trainer_id` int(11) DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `start` datetime NOT NULL,
  `end` datetime NOT NULL,
  `description` text DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `project_id` int(11) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `participant_id` int(11) NOT NULL DEFAULT 1,
  `isGroupEvent` tinyint(1) DEFAULT 0,
  `groupParticipantIds` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`groupParticipantIds`)),
  `group_trainer_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `events`
--

INSERT INTO `events` (`id`, `project_trainer_id`, `title`, `start`, `end`, `description`, `created_at`, `updated_at`, `project_id`, `type`, `participant_id`, `isGroupEvent`, `groupParticipantIds`, `group_trainer_id`) VALUES
(67, NULL, 'excel', '2024-12-07 21:09:00', '2024-12-07 23:09:00', '', '2024-12-28 20:09:55', '2024-12-28 20:09:55', 3, 'group_training', 1, 1, '[1,25]', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group_trainers`
--

CREATE TABLE `group_trainers` (
  `id` int(10) UNSIGNED NOT NULL,
  `groupId` int(10) NOT NULL,
  `trainerId` int(11) NOT NULL,
  `projectId` int(10) NOT NULL,
  `assignedAt` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_trainers`
--

INSERT INTO `group_trainers` (`id`, `groupId`, `trainerId`, `projectId`, `assignedAt`) VALUES
(4, 1, 28, 3, '2024-12-29 10:17:39');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group_trainings`
--

CREATE TABLE `group_trainings` (
  `id` int(11) NOT NULL,
  `projectId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `hours` int(11) NOT NULL,
  `createdAt` datetime DEFAULT current_timestamp(),
  `updatedAt` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_trainings`
--

INSERT INTO `group_trainings` (`id`, `projectId`, `name`, `hours`, `createdAt`, `updatedAt`) VALUES
(1, 3, 'excel', 2, '2024-12-26 11:25:09', '2024-12-28 23:04:53');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `group_training_participants`
--

CREATE TABLE `group_training_participants` (
  `id` int(11) NOT NULL,
  `trainingId` int(11) NOT NULL,
  `participantId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `group_training_participants`
--

INSERT INTO `group_training_participants` (`id`, `trainingId`, `participantId`) VALUES
(9, 1, 1),
(10, 1, 25);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `participants`
--

CREATE TABLE `participants` (
  `id` int(11) NOT NULL,
  `firstName` varchar(50) NOT NULL,
  `lastName` varchar(50) NOT NULL,
  `pesel` char(11) NOT NULL,
  `gender` enum('Mężczyzna','Kobieta') NOT NULL,
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
  `created_by` varchar(50) NOT NULL DEFAULT 'admin',
  `updated_by` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `participants`
--

INSERT INTO `participants` (`id`, `firstName`, `lastName`, `pesel`, `gender`, `voivodeship`, `city`, `postalCode`, `street`, `houseNumber`, `apartmentNumber`, `phoneNumber`, `email`, `disabilityLevel`, `created_at`, `created_by`, `updated_by`) VALUES
(1, 'Kasia', 'Kowalska', '11111111111', 'Kobieta', 'Łódzkie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl', '', '2024-12-10 09:03:23', 'admin', 'admin'),
(21, 'StudioSpektrum', 'Adamiak', '50062010422', '', 'Dolnośląskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl1', '', '2024-12-10 10:30:18', 'admin', NULL),
(25, 'StudioSpektrum', 'Adamiak', '50062010421', '', 'Dolnośląskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl2', '', '2024-12-11 16:10:21', 'admin', NULL),
(29, 'Łukasz', 'Borowiak', '11111111112', '', 'Lubuskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl4', '', '2024-12-20 10:57:39', 'admin', NULL),
(30, 'StudioSpektrum', 'Adamiak', '11111111113', '', 'Kujawsko-Pomorskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl55', '', '2024-12-20 13:18:45', 'admin', NULL),
(31, 'MIchal', 'Bacala', '11111111116', 'Kobieta', 'Lubelskie', 'Łódź', '90-130', 'Narutowicza', '51', '1', '508791501', 'wojtek@studiospektrum.pl111', '', '2024-12-20 13:21:45', 'admin', NULL);

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
(3, 'Projekt 1', '2024-12-09 11:16:23', NULL),
(4, 'Projekt 2', '2024-12-09 11:16:23', NULL),
(5, 'Projekt 3', '2024-12-09 11:16:23', NULL),
(6, 'Projekt 4', '2024-12-09 11:16:23', NULL),
(7, 'Projekt 5', '2024-12-09 11:16:23', NULL);

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
(24, 3, 1, '2024-12-12 07:39:36'),
(25, 3, 21, '2024-12-18 19:35:06'),
(26, 3, 29, '2024-12-20 11:01:04'),
(27, 3, 25, '2024-12-20 20:11:47');

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
(5, 3, 2, 27),
(6, 3, 1, 26);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `project_training_types`
--

CREATE TABLE `project_training_types` (
  `id` int(11) NOT NULL,
  `project_id` int(11) NOT NULL,
  `training_type_id` int(11) NOT NULL,
  `planned_hours` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `project_training_types`
--

INSERT INTO `project_training_types` (`id`, `project_id`, `training_type_id`, `planned_hours`) VALUES
(56, 3, 1, 2),
(57, 3, 2, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `skills`
--

CREATE TABLE `skills` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `skills`
--

INSERT INTO `skills` (`id`, `name`, `created_at`, `updated_at`) VALUES
(2, 'Word', '2024-12-27 22:43:26', '2024-12-27 22:43:26'),
(3, 'Word 2', '2024-12-28 11:00:48', '2024-12-28 11:00:48'),
(4, 'dane osobowe', '2024-12-29 11:46:32', '2024-12-29 11:46:32');

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
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(15) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainers`
--

INSERT INTO `trainers` (`id`, `name`, `email`, `phone`) VALUES
(26, 'Przemysław Laskowki', 'p@hrstart.pl', '500500500'),
(27, 'Danura Gerts', '', ''),
(28, 'Wojciech Adamiak', '', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `trainer_skills`
--

CREATE TABLE `trainer_skills` (
  `id` int(11) NOT NULL,
  `trainer_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `trainer_skills`
--

INSERT INTO `trainer_skills` (`id`, `trainer_id`, `skill_id`, `created_at`, `updated_at`) VALUES
(8, 28, 2, '2024-12-29 09:16:38', '2024-12-29 09:16:38'),
(10, 26, 4, '2024-12-29 11:46:52', '2024-12-29 11:46:52');

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
(42, 14, 'Doradca zawodowy', 1),
(43, 19, 'Psycholog', 2),
(44, 20, 'Psycholog', 2),
(45, 21, 'Psycholog', 2),
(46, 22, 'Doradca zawodowy', 1),
(47, 22, 'Psycholog', 2),
(49, 23, 'Psycholog', 2),
(48, 23, 'Doradca zawodowy', 1),
(50, 25, 'Doradca zawodowy', 1),
(51, 25, 'Psycholog', 2),
(62, 1, 'Doradca zawodowy', 0),
(64, 27, 'Psycholog', 2),
(67, 28, 'IT', 0),
(78, 26, 'Doradca zawodowy', 1);

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
(0, 'IT'),
(1, 'Doradca zawodowy'),
(2, 'Psycholog');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `username`, `email`, `password`, `role`) VALUES
(1, 'Wojtek', 'wojtek@studiospektrum.pl', 'admin123', 'admin');

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `comments`
--
ALTER TABLE `comments`
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `events`
--
ALTER TABLE `events`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_trainer_id` (`project_trainer_id`),
  ADD KEY `fk_events_projects` (`project_id`),
  ADD KEY `fk_groupTrainer` (`group_trainer_id`);

--
-- Indeksy dla tabeli `group_trainers`
--
ALTER TABLE `group_trainers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_trainerId` (`trainerId`),
  ADD KEY `fk_groupId` (`groupId`),
  ADD KEY `fk_projectId` (`projectId`);

--
-- Indeksy dla tabeli `group_trainings`
--
ALTER TABLE `group_trainings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `fk_projectId` (`projectId`);

--
-- Indeksy dla tabeli `group_training_participants`
--
ALTER TABLE `group_training_participants`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trainingId` (`trainingId`),
  ADD KEY `participantId` (`participantId`);

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
-- Indeksy dla tabeli `skills`
--
ALTER TABLE `skills`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `name` (`name`);

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
  ADD PRIMARY KEY (`id`);

--
-- Indeksy dla tabeli `trainer_skills`
--
ALTER TABLE `trainer_skills`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trainer_id` (`trainer_id`),
  ADD KEY `skill_id` (`skill_id`);

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
-- AUTO_INCREMENT for table `comments`
--
ALTER TABLE `comments`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `events`
--
ALTER TABLE `events`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=69;

--
-- AUTO_INCREMENT for table `group_trainers`
--
ALTER TABLE `group_trainers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `group_trainings`
--
ALTER TABLE `group_trainings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `group_training_participants`
--
ALTER TABLE `group_training_participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `project_participant_training_types`
--
ALTER TABLE `project_participant_training_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_trainers`
--
ALTER TABLE `project_trainers`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `project_training_types`
--
ALTER TABLE `project_training_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=59;

--
-- AUTO_INCREMENT for table `skills`
--
ALTER TABLE `skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=29;

--
-- AUTO_INCREMENT for table `trainer_skills`
--
ALTER TABLE `trainer_skills`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `trainer_types`
--
ALTER TABLE `trainer_types`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=79;

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
  ADD CONSTRAINT `fk_events_projects` FOREIGN KEY (`project_id`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_groupTrainer` FOREIGN KEY (`group_trainer_id`) REFERENCES `group_trainers` (`trainerId`) ON DELETE CASCADE;

--
-- Constraints for table `group_trainers`
--
ALTER TABLE `group_trainers`
  ADD CONSTRAINT `fk_groupId` FOREIGN KEY (`groupId`) REFERENCES `group_trainings` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_projectId` FOREIGN KEY (`projectId`) REFERENCES `projects` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `fk_trainerId` FOREIGN KEY (`trainerId`) REFERENCES `trainers` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `group_training_participants`
--
ALTER TABLE `group_training_participants`
  ADD CONSTRAINT `group_training_participants_ibfk_1` FOREIGN KEY (`trainingId`) REFERENCES `group_trainings` (`id`),
  ADD CONSTRAINT `group_training_participants_ibfk_2` FOREIGN KEY (`participantId`) REFERENCES `participants` (`id`);

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

--
-- Constraints for table `trainer_skills`
--
ALTER TABLE `trainer_skills`
  ADD CONSTRAINT `trainer_skills_ibfk_1` FOREIGN KEY (`trainer_id`) REFERENCES `trainers` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `trainer_skills_ibfk_2` FOREIGN KEY (`skill_id`) REFERENCES `skills` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
