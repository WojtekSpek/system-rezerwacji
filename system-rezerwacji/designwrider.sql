-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: designwrider.mysql.db
-- Generation Time: Dec 22, 2024 at 11:17 AM
-- Wersja serwera: 8.0.39-30
-- Wersja PHP: 8.1.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `designwrider`
--

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_aktualnosc`
--

CREATE TABLE `portal_aktualnosc` (
  `asc_id` int NOT NULL,
  `asc_data` date NOT NULL,
  `asc_tytul` varchar(50) COLLATE utf8mb3_polish_ci NOT NULL,
  `asc_intro` text COLLATE utf8mb3_polish_ci,
  `asc_tekst` text COLLATE utf8mb3_polish_ci,
  `asc_widocznosc` tinyint NOT NULL DEFAULT '0',
  `asc_meta_tytul` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `asc_meta_opis` text COLLATE utf8mb3_polish_ci,
  `asc_meta_klucze` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_aktualnosc`
--

INSERT INTO `portal_aktualnosc` (`asc_id`, `asc_data`, `asc_tytul`, `asc_intro`, `asc_tekst`, `asc_widocznosc`, `asc_meta_tytul`, `asc_meta_opis`, `asc_meta_klucze`) VALUES
(1, '2013-12-18', 'zxczxcxz', '<p>xzcxzczxczx x cxz sadasdaskdh kashd kjahs kdh akjsdh kjas dkjhakjsdhkjahdkjh sakdhkajsh dkj hdkh asaskdjhkjash dkjha skdj hkjsah dkjahs dkjh aksjdh kajh dkjahdkahdsdsdsdasdsad as dasd sa dsad as as sad sadasdasdasdsddkjh askdhkajd kajdhkahdkahdkjashdkjha sdadasdsdadasdasdasdasdasdasdasfrgfdeg', '<p>fdg df gdf sdgdfg dsf gdfg</p>', 0, '', '', ''),
(2, '2013-12-31', 'info', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności.</p>', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności. Dając przykład banalny: kt&oacute;ż z nas kiedyś nie podejmował się trudnego wysiłku fizycznego mając na względzie uzyskanie z tego korzyści? Kto ma jakiekolwiek prawo obwiniać człowieka, kt&oacute;ry wybiera przyjemność nie wiążącą się z przykrymi konsekwencjami, albo tego, kto unika takiego cierpienia, kt&oacute;re nie prowadzi do przyjemności?&rdquo; (i dalej: &bdquo;jednocześnie potępiamy ze słusznym oburzeniem i czujemy niechęć do ludzi, kt&oacute;rzy są tak owładnięci urokami nietrwałej przyjemności, tak zaślepieni jej pragnieniem, że nie dostrzegają, iż następstwem ich postępowania będą z pewnością cierpienie i trudności.&rdquo;).</p>', 0, '', '', ''),
(3, '2013-12-31', 'info', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności.</p>', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności. Dając przykład banalny: kt&oacute;ż z nas kiedyś nie podejmował się trudnego wysiłku fizycznego mając na względzie uzyskanie z tego korzyści? Kto ma jakiekolwiek prawo obwiniać człowieka, kt&oacute;ry wybiera przyjemność nie wiążącą się z przykrymi konsekwencjami, albo tego, kto unika takiego cierpienia, kt&oacute;re nie prowadzi do przyjemności?&rdquo; (i dalej: &bdquo;jednocześnie potępiamy ze słusznym oburzeniem i czujemy niechęć do ludzi, kt&oacute;rzy są tak owładnięci urokami nietrwałej przyjemności, tak zaślepieni jej pragnieniem, że nie dostrzegają, iż następstwem ich postępowania będą z pewnością cierpienie i trudności.&rdquo;).</p>', 0, '', '', ''),
(4, '2013-12-31', 'info', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności.</p>', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności. Dając przykład banalny: kt&oacute;ż z nas kiedyś nie podejmował się trudnego wysiłku fizycznego mając na względzie uzyskanie z tego korzyści? Kto ma jakiekolwiek prawo obwiniać człowieka, kt&oacute;ry wybiera przyjemność nie wiążącą się z przykrymi konsekwencjami, albo tego, kto unika takiego cierpienia, kt&oacute;re nie prowadzi do przyjemności?&rdquo; (i dalej: &bdquo;jednocześnie potępiamy ze słusznym oburzeniem i czujemy niechęć do ludzi, kt&oacute;rzy są tak owładnięci urokami nietrwałej przyjemności, tak zaślepieni jej pragnieniem, że nie dostrzegają, iż następstwem ich postępowania będą z pewnością cierpienie i trudności.&rdquo;).</p>', 0, '', '', ''),
(5, '2013-12-31', 'info', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności.</p>', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności. Dając przykład banalny: kt&oacute;ż z nas kiedyś nie podejmował się trudnego wysiłku fizycznego mając na względzie uzyskanie z tego korzyści? Kto ma jakiekolwiek prawo obwiniać człowieka, kt&oacute;ry wybiera przyjemność nie wiążącą się z przykrymi konsekwencjami, albo tego, kto unika takiego cierpienia, kt&oacute;re nie prowadzi do przyjemności?&rdquo; (i dalej: &bdquo;jednocześnie potępiamy ze słusznym oburzeniem i czujemy niechęć do ludzi, kt&oacute;rzy są tak owładnięci urokami nietrwałej przyjemności, tak zaślepieni jej pragnieniem, że nie dostrzegają, iż następstwem ich postępowania będą z pewnością cierpienie i trudności.&rdquo;).</p>', 0, '', '', ''),
(6, '2013-12-31', 'info', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności.</p>', '<p>&bdquo;Nie ma zatem takiego człowieka, kt&oacute;ry kocha cierpienie samo w sobie, kto by do niego dążył lub chciał go doświadczyć, tylko dlatego, że jest to cierpienie, a dlatego, że czasami zdarzają się takie okoliczności, w kt&oacute;rych to cierpienie może doprowadzić go do jakiejś wielkiej przyjemności. Dając przykład banalny: kt&oacute;ż z nas kiedyś nie podejmował się trudnego wysiłku fizycznego mając na względzie uzyskanie z tego korzyści? Kto ma jakiekolwiek prawo obwiniać człowieka, kt&oacute;ry wybiera przyjemność nie wiążącą się z przykrymi konsekwencjami, albo tego, kto unika takiego cierpienia, kt&oacute;re nie prowadzi do przyjemności?&rdquo; (i dalej: &bdquo;jednocześnie potępiamy ze słusznym oburzeniem i czujemy niechęć do ludzi, kt&oacute;rzy są tak owładnięci urokami nietrwałej przyjemności, tak zaślepieni jej pragnieniem, że nie dostrzegają, iż następstwem ich postępowania będą z pewnością cierpienie i trudności.&rdquo;).</p>', 0, '', '', ''),
(7, '2013-12-31', 'SADASDDS', '<p class=\"paragraph\">Petroniusz<a name=\"anchor-idp104086816\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104086816\">[1]</a> obudził się zaledwie koło południa i jak zwykle, zmęczony bardzo. Poprzedniego dnia był na uczcie u Nerona<a name=\"anchor-idp104088704\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104088704\">[2]</a>, kt&oacute;ra przeciągnęła się do p&oacute;źna w noc. Od pewnego czasu zdrowie jego zaczęło się psuć. Sam m&oacute;wił, że rankami budzi się jakby zdrętwiały i bez możności zebrania myśli. Ale poranna kąpiel i staranne wygniatanie ciała przez wprawionych do tego niewolnik&oacute;w przyśpieszało stopniowo obieg jego leniwej krwi, rozbudzało go, cuciło, wracało mu siły, tak że z elaeothesium<a name=\"anchor-idp104090224\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104090224\">[3]</a>, to jest z ostatniego kąpielowego przedziału, wychodził jeszcze jakby wskrzeszony, z oczami błyszczącymi dowcipem i wesołością, odmłodzon<a name=\"anchor-idp104091024\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104091024\">[4]</a>, pełen życia, wykwintny, tak niedościgniony, że sam Otho<a name=\"anchor-idp104091664\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104091664\">[5]</a> nie m&oacute;gł się z nim por&oacute;wnać, i prawdziwy, jak go nazywano: arbiter elegantiarum<a name=\"anchor-idp104092448\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104092448\">[6]</a>.</p>\r\n<p>&nbsp;</p>\r\n<p class=\"paragraph\"><a class=\"target\" name=\"f2\"></a> <a class=\"anchor\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#f2\">2</a><a name=\"sec5\"></a>W łaźniach publicznych<a name=\"anchor-idp104094096\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104094096\">[7]</a> bywał rzadko: chyba że zdarzył się jakiś budzący podziw retor<a name=\"anchor-idp104095072\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104095072\">[8]</a>, o kt&oacute;rym m&oacute;wiono w mieście, lub gdy w efebiach<a name=\"anchor-idp104095856\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104095856\">[9]</a> odbywały się wyjątkowo zajmujące zapasy. Zresztą miał w swej insuli<a name=\"anchor-idp104096880\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104096880\">[10]</a> własne kąpiele, kt&oacute;re słynny wsp&oacute;lnik Sewerusa, Celer<a name=\"anchor-idp104097664\"></a><a class=\"annotation\" href=\"http://wolnelektury.pl/katalog/lektura/quo-vadis.html#footnote-idp104097664\">[11]</a>, rozszerzył mu, przebudował i urządził z tak nadzwyczajnym smakiem, iż sam Nero przyznawał im wyższość nad cezariańskimi, chociaż cezariańskie były obszerniejsze i urządzone z nier&oacute;wnie większym przepychem.</p>', '', 0, '', '', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_cecha`
--

CREATE TABLE `portal_cecha` (
  `cha_id` int NOT NULL,
  `cha_typ` tinyint NOT NULL DEFAULT '0',
  `cha_nazwa` varchar(100) COLLATE utf8mb3_polish_ci NOT NULL,
  `cha_etykieta` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `cha_opis` text COLLATE utf8mb3_polish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_cecha`
--

INSERT INTO `portal_cecha` (`cha_id`, `cha_typ`, `cha_nazwa`, `cha_etykieta`, `cha_opis`) VALUES
(1, 4, 'Województwo', 'Województwo', '<p>zzzzzzzzz</p>');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_dotpay_platnosc`
--

CREATE TABLE `portal_dotpay_platnosc` (
  `pac_id` int NOT NULL,
  `pac_tytul` varchar(250) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pac_email` varchar(250) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pac_wartosc` float NOT NULL,
  `pac_data` date NOT NULL,
  `pac_log` text COLLATE utf8mb3_polish_ci NOT NULL,
  `pac_status` tinyint NOT NULL,
  `pac_typ` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pac_zlecenie` text COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_dotpay_platnosc`
--

INSERT INTO `portal_dotpay_platnosc` (`pac_id`, `pac_tytul`, `pac_email`, `pac_wartosc`, `pac_data`, `pac_log`, `pac_status`, `pac_typ`, `pac_zlecenie`) VALUES
(7, 'nazwa usługi | Zapłata za: 130', 'klient1@design.type.pl', 22, '2015-06-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"130\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(8, 'nazwa usługi | Zapłata za: 1', 'maciejolszewski1970@gmail.com', 22, '2015-06-27', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(9, 'nazwa usługi | Zapłata za: 2', 'pradzimowski@gmail.com', 333, '2015-06-30', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"333.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"115\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"pradzimowski@gmail.com\";}'),
(10, 'nazwa usługi | Zapłata za: 2', 'wfwf@interia.pl', 333, '2015-07-07', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"333.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"121\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:15:\"wfwf@interia.pl\";}'),
(11, 'nazwa usługi | Zapłata za: 1', 'maciejolszewski1970@gmail.com', 22, '2015-07-13', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(12, 'nazwa usługi | Zapłata za: 171', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"171\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(13, 'nazwa usługi | Zapłata za: 171', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"171\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(14, 'nazwa usługi | Zapłata za: 171', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"171\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(15, 'nazwa usługi | Zapłata za: 171', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"171\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(16, 'nazwa usługi | Zapłata za: 172', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"172\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(17, 'nazwa usługi | Zapłata za: 172', 'klient1@design.type.pl', 22, '2015-07-13', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"172\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(18, ' | Zapłata za: 176', 'klient1@design.type.pl', 9, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(19, ' | Zapłata za: 176', 'klient1@design.type.pl', 9, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(20, ' | Zapłata za: 176', 'klient1@design.type.pl', 9, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(21, ' | Zapłata za: 176', 'klient1@design.type.pl', 9, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(22, ' | Zapłata za: 176', 'klient1@design.type.pl', 50, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(23, ' | Zapłata za: 176', 'klient1@design.type.pl', 50, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"176\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(24, ' | Zapłata za: 177', 'klient1@design.type.pl', 50, '2015-07-21', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"177\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(25, ' | Zapłata za: 179', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"179\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(26, ' | Zapłata za: 180', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"180\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(27, ' | Zapłata za: 181', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"181\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(28, ' | Zapłata za: 182', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"182\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(29, ' | Zapłata za: 183', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"183\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(30, ' | Zapłata za: 184', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"184\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(31, ' | Zapłata za: 185', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"185\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(32, ' | Zapłata za: 186', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"186\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(33, ' | Zapłata za: 187', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"187\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(34, ' | Zapłata za: 188', 'klient1@design.type.pl', 50, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"188\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(35, 'Drobne | Zapłata za: 190', 'spektrum4@wp.pl', 9, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"190\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(36, 'Drobne | Zapłata za: 191', 'spektrum4@wp.pl', 15, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"191\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(37, 'Drobne | Zapłata za: 192', 'spektrum4@wp.pl', 9, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:4:\"9.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"192\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(38, 'Drobne | Zapłata za: 193', 'klient1@design.type.pl', 15, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"193\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(39, 'Drobne | Zapłata za: 194', 'klient1@design.type.pl', 15, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"194\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(40, 'Drobne | Zapłata za: 196', 'spektrum4@wp.pl', 15, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"196\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(41, 'Drobne | Zapłata za: 197', 'klient1@design.type.pl', 15, '2015-07-22', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"197\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(42, 'Pakiet 20 | Zapłata za: 4', 'klient1@design.type.pl', 190, '2015-07-22', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:1:\"4\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(43, 'Pakiet 20 | Zapłata za: 4', 'klient1@design.type.pl', 190, '2015-07-22', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:1:\"4\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(44, 'Pakiet 20 | Zapłata za: 4', 'klient1@design.type.pl', 190, '2015-07-22', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:1:\"4\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(45, 'Drobne | Zapłata za: 198', 'spektrum4@wp.pl', 15, '2015-07-23', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"198\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(46, 'Pojazdy | Zapłata za: 199', 'maciejolszewski1970@gmail.com', 22, '2015-07-24', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"199\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(47, 'Drobne | Zapłata za: 207', 'spektrum4@wp.pl', 15, '2015-07-27', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"207\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:15:\"spektrum4@wp.pl\";}'),
(48, 'Drobne | Zapłata za: 208', 'maciejolszewski1970@gmail.com', 15, '2015-07-27', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"15.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"208\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(49, 'Pojazdy | Zapłata za: 210', 'maciejolszewski1970@gmail.com', 22, '2015-07-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"210\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(50, 'Pakiet 20 | Zapłata za: 12', 'klient1@design.type.pl', 120, '2015-07-31', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:1:\"4\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"klient1@design.type.pl\";}'),
(51, 'Pakiet 20 | Zapłata za: 12', 'maciejolszewski1970@gmail.com', 120, '2015-07-31', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(52, 'Pakiet 20 | Zapłata za: 12', 'maciejolszewski1970@gmail.com', 120, '2015-08-03', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(53, 'Pakiet 50+ | Zapłata za: 11', 'maciejolszewski1970@gmail.com', 580, '2015-08-03', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"580.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:3:\"150\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(54, 'Pojazdy | Zapłata za: 223', 'maciejolszewski1970@gmail.com', 27, '2015-08-03', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"27.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"223\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(55, 'Pakiet 20 | Zapłata za: 12', 'maciejolszewski1970@gmail.com', 120, '2015-08-03', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(56, 'Pakiet 50+ | Zapłata za: 11', 'maciejolszewski1970@gmail.com', 580, '2015-08-03', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"580.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:3:\"150\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(57, 'Pojazdy | Zapłata za: 226', 'maciejolszewski1970@gmail.com', 22, '2015-08-05', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"22.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"226\";s:5:\"okres\";s:2:\"14\";s:10:\"wyrozniony\";s:1:\"0\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(58, 'Pakiet 20 | Zapłata za: 12', 'maciejolszewski1970@gmail.com', 120, '2015-08-06', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(59, 'Pakiet 50+ | Zapłata za: 11', 'maciejolszewski1970@gmail.com', 580, '2015-08-06', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"580.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:3:\"150\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(60, 'Pakiet 50+ | Zapłata za: 11', 'maciejolszewski1970@gmail.com', 580, '2015-08-06', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"580.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:3:\"150\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(61, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-08-06', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(62, 'Pojazdy  | Zapłata za: 227', 'maciejolszewski1970@gmail.com', 50, '2015-08-06', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"227\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(63, 'Pakiet 20 | Zapłata za: 12', NULL, 120, '2015-08-13', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"125\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";N;}'),
(64, 'Pakiet 20 | Zapłata za: 4', 'maciejolszewski1970@gmail.com', 190, '2015-08-13', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"114\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";}'),
(65, 'Pakiet 20 | Zapłata za: 12', 'zygtar@yahoo.com', 120, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"129\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:16:\"zygtar@yahoo.com\";}'),
(66, 'Pakiet 20 | Zapłata za: 12', 'zygzakvtx@gmail.com', 120, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"130\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"zygzakvtx@gmail.com\";}'),
(67, 'Pakiet 20 | Zapłata za: 4', 'zygzakvtx@gmail.com', 190, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"130\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"zygzakvtx@gmail.com\";}'),
(68, 'Pakiet 20 | Zapłata za: 5', 'zygzakvtx@gmail.com', 250, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"250.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"130\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"zygzakvtx@gmail.com\";}'),
(69, 'Pakiet 20 | Zapłata za: 5', 'zygzakvtx@gmail.com', 250, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"250.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"130\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"zygzakvtx@gmail.com\";}'),
(70, 'Pakiet 20 | Zapłata za: 12', 'mazak@orange.pl', 120, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"131\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:15:\"mazak@orange.pl\";}'),
(71, 'Pakiet 20 | Zapłata za: 12', 'mazak@orange.pl', 120, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"131\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:15:\"mazak@orange.pl\";}'),
(72, 'Pakiet 20 | Zapłata za: 12', 'wieczor74@gmail.com', 120, '2015-08-18', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"135\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"wieczor74@gmail.com\";}'),
(73, 'Pakiet 20 | Zapłata za: 12', 'homo.ineptus@gmail.com', 120, '2015-08-19', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"141\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:22:\"homo.ineptus@gmail.com\";}'),
(74, 'Pakiet 20 | Zapłata za: 5', 'mikers@op.pl', 250, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"250.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"146\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:12:\"mikers@op.pl\";}'),
(75, 'Pakiet 20 | Zapłata za: 5', 'mikers@op.pl', 250, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"250.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"146\";s:5:\"okres\";s:2:\"90\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:12:\"mikers@op.pl\";}'),
(76, 'Pakiet 20 | Zapłata za: 12', 'grychole@gmail.com', 120, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"147\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:18:\"grychole@gmail.com\";}'),
(77, 'Pakiet 20 | Zapłata za: 12', 'grychole@gmail.com', 120, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"120.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"147\";s:5:\"okres\";s:2:\"14\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:18:\"grychole@gmail.com\";}'),
(78, 'Pakiet 20 | Zapłata za: 4', 'robertsternik@wp.pl', 190, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"139\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"robertsternik@wp.pl\";}'),
(79, 'Pakiet 20 | Zapłata za: 4', 'robertsternik@wp.pl', 190, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"139\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"robertsternik@wp.pl\";}'),
(80, 'Pakiet 20 | Zapłata za: 4', 'robertsternik@wp.pl', 190, '2015-08-24', '', 1, 'pakiet', 'O:32:\"Packages\\Payments\\Model\\Zlecenie\":3:{s:11:\"\0*\0_wartosc\";s:6:\"190.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"139\";s:5:\"okres\";s:2:\"28\";s:5:\"ilosc\";s:2:\"20\";}s:9:\"\0*\0_email\";s:19:\"robertsternik@wp.pl\";}'),
(81, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-11-07', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(82, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-11-07', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(83, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2015-11-26', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(84, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-12-08', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(85, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-12-08', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(86, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-12-08', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(87, 'Pojazdy  | Zapłata za: 173', 'maciejolszewski1970@gmail.com', 50, '2015-12-08', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"173\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(88, 'Pojazdy  | Zapłata za: 318', 'maciejolszewski1970@gmail.com', 50, '2015-12-10', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"318\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(89, 'Pojazdy  | Zapłata za: 318', 'maciejolszewski1970@gmail.com', 50, '2015-12-10', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"318\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(90, 'Pojazdy  | Zapłata za: 318', 'maciejolszewski1970@gmail.com', 50, '2015-12-10', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"318\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(91, 'Pojazdy  | Zapłata za: 318', 'maciejolszewski1970@gmail.com', 50, '2015-12-12', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"318\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(92, 'Pojazdy  | Zapłata za: 318', 'maciejolszewski1970@gmail.com', 50, '2015-12-12', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"318\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:29:\"maciejolszewski1970@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(93, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(94, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(95, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(96, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(97, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(98, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(99, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(100, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(101, 'Pojazdy  | Zapłata za: 237', 'paulo_andrespol@poczta.fm', 50, '2016-04-28', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:3:\"237\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"paulo_andrespol@poczta.fm\";s:8:\"\0*\0_info\";N;}'),
(102, 'Pojazdy  | Zapłata za: 4548', 'rzemieniecki.kr@gmail.com', 50, '2017-10-27', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:4:\"4548\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"rzemieniecki.kr@gmail.com\";s:8:\"\0*\0_info\";N;}'),
(103, 'Pojazdy  | Zapłata za: 4548', 'rzemieniecki.kr@gmail.com', 50, '2017-10-27', '', 1, 'ogloszenie', 'O:31:\"Notices\\Payments\\Model\\Zlecenie\":4:{s:11:\"\0*\0_wartosc\";s:5:\"50.00\";s:10:\"\0*\0_obiekt\";O:8:\"stdClass\":3:{s:2:\"id\";s:4:\"4548\";s:5:\"okres\";s:2:\"28\";s:10:\"wyrozniony\";s:1:\"1\";}s:9:\"\0*\0_email\";s:25:\"rzemieniecki.kr@gmail.com\";s:8:\"\0*\0_info\";N;}');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_email`
--

CREATE TABLE `portal_email` (
  `eml_id` int NOT NULL,
  `eml_nazwa` varchar(100) COLLATE utf8mb3_polish_ci NOT NULL,
  `eml_tytul` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `eml_tekst` text COLLATE utf8mb3_polish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_email`
--

INSERT INTO `portal_email` (`eml_id`, `eml_nazwa`, `eml_tytul`, `eml_tekst`) VALUES
(1, 'naglowek', 'Nagłówek', '<h1>Riders Buy</h1>'),
(2, 'stopka', 'Stopka', '-------------'),
(3, 'panel-uzytkownik-aktywacja-1', 'panel-uzytkownik-aktywacja-1', '<p>Witamy,</p>\n<p>Dziękujemy za zarejestrowanie się w naszym portalu ogłoszeniowym <a href=\"http://www.ridersbuy.pl\">http://www.ridersbuy.pl</a>,</p> \n<p>Twoje konto jeszcze nie jest aktywne.</p>'),
(4, 'panel-uzytkownik-aktywacja-2', 'panel-uzytkownik-aktywacja-2', '<br><br><br>\n<p>Pozdrawiamy</p>\n<p>Zespół Ridersbuy</p>'),
(5, 'notices-ogloszenie-wygaslo-1', 'notices-ogloszenie-wygaslo-1', '<p>Twoje ogłoszenie wygasło</p>'),
(6, 'notices-ogloszenie-wygaslo-2', 'notices-ogloszenie-wygaslo-2', ''),
(7, 'panel-uzytkownik-haslo-1', 'panel-uzytkownik-haslo-1', '<p>Twoje hasło zostało zmienione.</p><p>Twoje nowe hasło:</p>'),
(8, 'panel-uzytkownik-haslo-2', 'panel-uzytkownik-haslo-2', ''),
(9, 'notices-ogloszenie-wygasnie-1', 'notices-ogloszenie-wygasnie-1', '<p>Dobiega koniec aktywności twojego ogłoszenia.</p>'),
(10, 'notices-ogloszenie-wygasnie-2', 'notices-ogloszenie-wygasnie-2', ''),
(11, 'subscription-1', 'subscription-1', '<p>Twoje subskrypcje: </p>'),
(12, 'subscription-2', 'subscription-2', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_info`
--

CREATE TABLE `portal_info` (
  `ino_id` int NOT NULL,
  `ino_ino_id` int DEFAULT NULL,
  `ino_nazwa` varchar(30) COLLATE utf8mb3_polish_ci NOT NULL,
  `ino_url` varchar(40) COLLATE utf8mb3_polish_ci NOT NULL,
  `ino_tytul` varchar(50) COLLATE utf8mb3_polish_ci NOT NULL,
  `ino_intro` text COLLATE utf8mb3_polish_ci,
  `ino_tekst` text COLLATE utf8mb3_polish_ci,
  `ino_widocznosc` tinyint DEFAULT NULL,
  `ino_strona_glowna` tinyint DEFAULT NULL,
  `ino_meta_tytul` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_meta_opis` text COLLATE utf8mb3_polish_ci,
  `ino_meta_klucze` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_lp` tinyint NOT NULL DEFAULT '0',
  `ino_nazwa_en` varchar(30) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_url_en` varchar(40) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_tytul_en` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_intro_en` text COLLATE utf8mb3_polish_ci,
  `ino_tekst_en` text COLLATE utf8mb3_polish_ci,
  `ino_widocznosc_en` tinyint DEFAULT NULL,
  `ino_strona_glowna_en` tinyint DEFAULT NULL,
  `ino_meta_tytul_en` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ino_meta_opis_en` text COLLATE utf8mb3_polish_ci,
  `ino_meta_klucze_en` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_info`
--

INSERT INTO `portal_info` (`ino_id`, `ino_ino_id`, `ino_nazwa`, `ino_url`, `ino_tytul`, `ino_intro`, `ino_tekst`, `ino_widocznosc`, `ino_strona_glowna`, `ino_meta_tytul`, `ino_meta_opis`, `ino_meta_klucze`, `ino_lp`, `ino_nazwa_en`, `ino_url_en`, `ino_tytul_en`, `ino_intro_en`, `ino_tekst_en`, `ino_widocznosc_en`, `ino_strona_glowna_en`, `ino_meta_tytul_en`, `ino_meta_opis_en`, `ino_meta_klucze_en`) VALUES
(1, NULL, 'O nas', 'onas.html', 'O nas', NULL, '<h3>Standardowy fragment Lorem Ipsum, używany od XV w.</h3>\r\n<p>\"Lorem <strong>ipsum dolor</strong> sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\"</p>\r\n<h3>Fragment 1.10.32 z \"de Finibus Bonorum et Malorum\", napisanej przez Cycerona w 45 r.p.n.e.</h3>\r\n<p>\"Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?\"</p>\r\n<h3>Tłumaczenie H. Rackhama z 1914 roku</h3>\r\n<p>\"But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?\"</p>\r\n<h3>Fragment 1.10.33 z \"de Finibus Bonorum et Malorum\", napisanej przez Cycerona w 45 r.p.n.e.</h3>\r\n<p>\"At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.\"</p>\r\n<h3>Tłumaczenie H. Rackhama z 1914 roku</h3>\r\n<p>\"On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains.\"</p>', NULL, NULL, 'O nas', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(60, 1, 'Regulamin', 'Regulamin', 'Regulamin', '<p>POSTANOWIENIA  OG&Oacute;LNE</p>\r\n<p>&nbsp;</p>', '<p><strong>I. <span style=\"text-decoration: underline;\">POSTANOWIENIA OG&Oacute;LNE</span></strong></p>\r\n<p>Art. 1 DEFINICJE<br />Art. 2 WARUNKI UCZESTNICTWA W RIDERSBUY</p>\r\n<p><strong>II. <span style=\"text-decoration: underline;\">OFERTY REKLAMOWE I OGŁOSZENIA</span></strong></p>\r\n<p>Art. 3 OFERTY REKLAMOWE<br />Art. 4 OGŁOSZENIA ZAKAZANE<br />Art. 5 ROZPOCZĘCIE EMISJI OGŁOSZENIA<br />Art. 6 ROLA RIDERSBUY<br />Art. 7 OPŁATY I PROWIZJE<br />Art. 8 INNE OBOWIĄZKI UŻYTKOWNIK&Oacute;W<br />Art. 9 INNE USŁUGI</p>\r\n<p><strong>III.</strong> <strong><span style=\"text-decoration: underline;\">POSTANOWIENIA KOŃCOWE</span></strong></p>\r\n<p>Art. 10 PRYWATNOŚĆ I POUFNOŚĆ<br />Art. 11 ZMIANY REGULAMINU<br />Art. 12 ROZWIĄZANIE UMOWY<br />Art. 13 KONTAKT I POSTĘPOWANIE REKLAMACYJNE<br />Art. 14 PRAWO WŁAŚCIWE I SPORY<br />Art. 15 ZAŁĄCZNIKI<br />Art. 16 WAŻNOŚĆ</p>\r\n<p>&nbsp;</p>\r\n<p><strong>I.</strong> <strong><span style=\"text-decoration: underline;\">POSTANOWIENIA OG&Oacute;LNE</span></strong></p>\r\n<p><strong>Art. 1 </strong><strong>DEFINICJE</strong></p>\r\n<p>Terminy użyte w Regulaminie oznaczają:</p>\r\n<p><strong>RIDERSBUY</strong>&nbsp; sp&oacute;łka cywilna &nbsp;o numerze identyfikacji podatkowej &nbsp;7282803020.</p>\r\n<p><strong>RIDERSBUY</strong> prowadzona w języku polskim platforma reklamowo - ogłoszeniowa on-line o otwartym charakterze, w ramach kt&oacute;rej przedstawiane są oferty reklamowe i ogłoszenia, utrzymywana przez RIDERSBUY w domenie Ridersbuy.pl, dostępna r&oacute;wnież w ramach innych serwis&oacute;w internetowych prowadzonych przez partner&oacute;w Ridersbuy.pl.</p>\r\n<p><strong>SERWIS</strong> &ndash; portal motocyklowy w domenie Ridersbuy.pl.</p>\r\n<p><strong>OFERTA &ndash; </strong>oferta przedstawiana na platformie ogłoszeniowej RIDERSBUY, kt&oacute;rej celem jest zawarcie prawnie dopuszczalnej umowy pomiędzy Wystawiającym i Nabywcą.</p>\r\n<p><strong>UŻYTKOWNIK &ndash; </strong>podmiot, kt&oacute;ry uzyskał dostęp do usług świadczonych przez RIDERSBUY w ramach RIDERSBUY na zasadach określonych w Regulaminie.</p>\r\n<p><strong>WYSTAWIAJĄCY</strong> &ndash; użytkownik wystawiający ofertę reklamową/sprzedaży w ramach RIDERSBUY.&nbsp;</p>\r\n<p><strong>NABYWCA</strong> &ndash; użytkownik korzystający z platformy RIDERSBUY w celu zapoznania się z ofertami reklamowymi i ogłoszeniami zamieszczonymi przez WYSTAWIAJĄCYCH.</p>\r\n<p><strong>KONTO</strong> &ndash; prowadzone dla Użytkownika przez RIDERSBUY&nbsp; pod unikalną nazwą (login) konto będące zbiorem zasob&oacute;w, w kt&oacute;rym gromadzone są dane Użytkownika oraz informacje o jego działaniach w ramach RIDERSBUY.</p>\r\n<p><strong>REJESTRACJA</strong> &ndash; procedura zakładania Konta, polega na wypełnieniu odpowiedniego formularza zgodnie z warunkami uczestnictwa w RIDERSBUY.</p>\r\n<p><strong>TRANSAKCJA</strong> &ndash; czynność zachodząca pomiędzy Wystawiającym i Nabywcą, kt&oacute;ra ma na celu wymianę towaru lub usługi.</p>\r\n<p><strong>TOWAR</strong> &ndash; rzecz, kt&oacute;ra może być przedmiotem Transakcji, zgodnie z Regulaminem RIDERSBUY.</p>\r\n<p><strong>USŁUGA</strong> &ndash; działanie podjęte w celu zaspokojenia danej potrzeby (lub potrzeb) Nabywcy i zrealizowane z jego udziałem.</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;<strong>Art. 2 </strong><strong>WARUNKI</strong><strong> UCZESTNICTWA W RIDERSBUY</strong></p>\r\n<p>2.1. Użytkownikami mogą być osoby fizyczne, kt&oacute;re ukończyły 18 lat i posiadają pełną zdolność do czynności prawnych, osoby prawne oraz jednostki organizacyjne nieposiadające osobowości prawnej, ale mogące we własnym imieniu nabywać prawa i zaciągać zobowiązania. Użytkownikami mogą być osoby fizyczne, kt&oacute;re ukończyły 13 rok życia, ale nie ukończyły 18 lat w zakresie w jakim mogą nabywać prawa i zaciągać zobowiązania zgodnie z przepisami powszechnie obowiązującego prawa.</p>\r\n<p>2.2. Osoby fizyczne nieprowadzące w ramach RIDERSBUY działalności gospodarczej w celu Rejestracji powinny wybrać jeden z 3 sposob&oacute;w jej dokonania:</p>\r\n<ol style=\"list-style-type: lower-alpha;\">\r\n<li>Rejestracja pełna, kt&oacute;rej dokonanie umożliwia umieszczenie treści reklamowych. W celu jej dokonania należy przed dokonaniem pierwszej czynności lub podczas Aktywacji Konta uzupełnić dane poprzez podanie: swojego imienia i nazwiska, adresu zamieszkania wraz z nazwą kraju i regionu (wojew&oacute;dztwa), numeru telefonu kontaktowego, adresu e-mail bądź dodatkowo nazwy (login), pod kt&oacute;rą osoba rejestrująca zamierza występować w RIDERSBUY oraz hasła (Konta Zwykłe);</li>\r\n<li>Rejestracja uproszczona za pomocą serwisu Facebook.com, przeznaczona wyłącznie dla użytkownik&oacute;w rejestrujących się w serwisie RIDERSBUY w charakterze KUPUJĄCEGO - w celu jej dokonania należy wybrać w formularzu rejestracyjnym przycisk \"Zarejestruj przez Facebook\" i dokonać logowania do serwisu Facebook.com, udzielając tym samym zgody na pobranie&nbsp;z serwisu Facebook.com danych osobowych: daty urodzenia i adresu e-mail, na kt&oacute;ry kierowana jest korespondencja, a następnie ustalić hasło do Konta za pomocą formularza;</li>\r\n<li>Rejestracja uproszczona dla użytkownika, kt&oacute;ry rejestruje się w serwisie RIDERSBUY wyłącznie w charakterze KUPUJĄCEGO za pomocą odpowiedniego formularza dostępnego na stronie RIDERSBUY.</li>\r\n</ol>\r\n<p>2.3. Rejestracji osoby fizycznej korzystającej z RIDERSBUY w związku z prowadzoną działalnością gospodarczą, osoby prawnej oraz jednostki organizacyjnej, o kt&oacute;rej mowa w pkt 2.1., a także wszystkich dalszych czynności tych podmiot&oacute;w w RIDERSBUY, może dokonać osoba, kt&oacute;ra jest umocowana do dokonywania w ich imieniu wszelkich czynności związanych z Rejestracją oraz do wykonywania wszystkich praw i obowiązk&oacute;w Użytkownika. W celu Rejestracji osoba ta powinna wypełnić formularz rejestracyjny poprzez podanie nazwy (login), pod kt&oacute;rą podmiot ten zamierza występować w RIDERSBUY oraz hasła, a także podać: swoje imię i nazwisko, adres e-mail, numer telefonu kontaktowego, pełną nazwę (firmy) podmiotu rejestrowanego oraz adres jego siedziby wraz z nazwą kraju i regionu (wojew&oacute;dztwa) .</p>\r\n<p>2.4. Po wypełnieniu i potwierdzeniu prawdziwości danych w formularzu rejestracyjnym oraz potwierdzeniu zapoznania się z niniejszym regulaminem, na podany w nim adres e-mail zostanie wysłana wiadomość wskazująca spos&oacute;b potwierdzenia Rejestracji, aktywacji konta oraz inne wymagane prawem informacje. Z chwilą potwierdzenia Rejestracji dochodzi do zawarcia umowy pomiędzy podmiotem rejestrowanym a RIDERSBUY, kt&oacute;rej przedmiotem są usługi świadczone przez RIDERSBUY&nbsp; w ramach RIDERSBUY, na warunkach określonych w Regulaminie.</p>\r\n<p>2.5. W terminie 14 dni od zawarcia umowy, o kt&oacute;rej mowa w pkt 2.4., Użytkownik może od niej odstąpić, poprzez zlikwidowanie konta bez podania przyczyn. Zasady odstąpienia od umowy, w tym wz&oacute;r formularza o odstąpieniu od umowy, z kt&oacute;rego Użytkownik może skorzystać, określone są w pouczeniu, stanowiącym Załącznik nr 1 do Regulaminu. Prawo odstąpienia od umowy nie przysługuje jednak Użytkownikowi, jeżeli wykonał on jakąkolwiek czynność w ramach RIDERSBUY w szczeg&oacute;lności skutecznie umieścił Ofertę w serwisie.</p>\r\n<p>2.6. RIDERSBUY może uzależnić Rejestrację lub korzystanie z RIDERSBUY przez Użytkownika od uwiarygodnienia jego danych wymienionych w pkt 2.2. i 2.3.</p>\r\n<p>2.7. W wyniku prawidłowej Rejestracji&nbsp; RIDERSBUY tworzy dla Użytkownika Konto przypisane do nazwy (loginu). Użytkownik, kt&oacute;ry dokonał Rejestracji pełnej lub uproszczonej , nie jest zobowiązany do utworzenia własnego loginu, w takim przypadku login generowany jest automatycznie w postaci ciągu znak&oacute;w. Użytkownik uzyskuje dostęp do Konta po podaniu w RIDERSBUY adresu e-mail i hasła (logowanie). Rolę loginu Użytkownika może pełnić podany przez niego adres e-mail. Użytkownik, kt&oacute;ry dokonał Rejestracji za pomocą&nbsp; serwisu Facebook bądź też powiązał Konto w RIDERSBUY z kontem w serwisie Facebook może r&oacute;wnież dokonać logowania za pośrednictwem aplikacji Facebook Connect.</p>\r\n<p>2.8. Logowanie do serwisu RIDERSBUY za pośrednictwem WebAPI oraz za pośrednictwem aplikacji Facebook Connect powoduje takie same skutki jak logowanie bezpośrednio ze strony serwisu RIDERSBUY.</p>\r\n<p>2.9. Konto zawiera dane&nbsp; podane przez Użytkownika podczas Rejestracji. W przypadku p&oacute;źniejszej zmiany jakichkolwiek z tych danych Użytkownik powinien niezwłocznie zaktualizować je, korzystając z odpowiedniego formularza dostępnego na stosownej stronie RIDERSBUY. Zabrania się usuwania przez Użytkownika danych, o kt&oacute;rych mowa w pkt 2.2. i 2.3., w trakcie korzystania z usług RIDERSBUY, a także podawania danych niepełnych bądź nieprawdziwych. Po dokonaniu Rejestracji pełnej Użytkownik nie ma możliwości zmiany przyjętej w trakcie rejestracji nazwy Konta (loginu). Do każdego Konta musi być przyporządkowany inny adres e-mail.</p>\r\n<p>2.10. Wystawca w celu uzyskania dostępu do usług świadczonych przez RIDERSBUY&nbsp; musi dokonać Rejestracji i aktywacji Konta.&nbsp;&nbsp;</p>\r\n<p>2.11. Użytkownik może posiadać więcej niż jedno Konto, jednakże nie może ich wykorzystywać do dokonywania jakichkolwiek czynności stanowiących naruszenie postanowień Regulaminu.</p>\r\n<p>2.12. Użytkownikowi nie wolno korzystać z Kont innych Użytkownik&oacute;w oraz udostępniać swojego Konta innym osobom, z wyjątkiem przypadk&oacute;w:</p>\r\n<ol style=\"list-style-type: lower-alpha;\">\r\n<li>udostępnienia Konta osobom należycie umocowanym przez Użytkownika do działania w jego imieniu,</li>\r\n</ol>\r\n<p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; b. udostępnienia Konta małżonkowi Użytkownika poprzez umieszczenie danych małżonka Użytkownika w specjalnym formularzu pod warunkiem, że Użytkownik Konta przynajmniej raz skorzystał <br />&nbsp;&nbsp; &nbsp; &nbsp; &nbsp;&nbsp; z usługi DotPay lub przynajmniej raz w inny spos&oacute;b uregulował należności za usługi związane z działalnością świadczoną przez RIDERSBUY.<br /><br /><br />2.13. Użytkownik, kt&oacute;ry udostępnił Konto na zasadach określonych powyżej ponosi odpowiedzialność za wszystkie działania podejmowane w ramach RIDERSBUY.<br /><br />2.14. Użytkownik powinien zachować w tajemnicy hasło do Konta.<br /><br />2.15. Konta są niezbywalne, z zastrzeżeniem, że:<br /><br /></p>\r\n<ol style=\"list-style-type: lower-alpha;\">\r\n<li>Konto założone przez firmę może przejść na rzecz innego przedsiębiorcy w razie zbycia przedsiębiorstwa bądź jego zorganizowanej części,</li>\r\n<li>za zgodą RIDERSBUY Konto Zwykłe może zostać przekazane przez Użytkownika jego małżonkowi.</li>\r\n</ol>\r\n<p><br />2.16. RIDERSBUY zastrzega sobie możliwość czasowego zablokowania Konta bądź dostępu do wybranych usług świadczonych przez RIDERSBUY w przypadku stwierdzenia, że bezpieczeństwo Konta jest zagrożone. RIDERSBUY może uzależnić dalsze korzystanie z Konta przez Użytkownika od dokonania zmiany hasła dostępowego do tego Konta. Po dokonaniu zmiany hasła Użytkownik natychmiast odzyska dostęp do Konta.</p>\r\n<p>2.17. Zabronione jest jakiekolwiek wykorzystywanie Konta do działania na szkodę innych Użytkownik&oacute;w RIDERSBUY.<br /><br /></p>\r\n<p><strong>II. <span style=\"text-decoration: underline;\">OFERTY REKLAMOWE I OGŁOSZENIA</span></strong></p>\r\n<p><strong>Art. 3 OFERTY REKLAMOWE</strong></p>\r\n<p>RIDERSBUY, jako operator RIDERSBUY, umożliwia Użytkownikom zamieszczanie materiał&oacute;w reklamowych, ogłoszeń ofert sprzedaży, zamiany, darowizny i tym podobnych. RIDERSBUY nie jest stroną ewentualnych um&oacute;w zawieranych w wyniku zamieszczonych ogłoszeń.</p>\r\n<p><strong>Art. 4 OGŁOSZENIA ZAKAZANE</strong></p>\r\n<p>Wystawca zobowiązuje się do niezamieszczania ogłoszeń dotyczących towar&oacute;w, kt&oacute;rymi obr&oacute;t narusza obowiązujące przepisy prawa lub uprawnienia os&oacute;b trzecich (w szczeg&oacute;lności prawa autorskie i inne prawa własności intelektualnej), jak r&oacute;wnież kt&oacute;rych wystawienie może być uznane za naruszające dobre obyczaje.</p>\r\n<p><strong>Art. 5 ROZPOCZĘCIE EMISJI OGŁOSZENIA</strong></p>\r\n<p>5.1. Aby zamieścić ofertę reklamową Wystawca powinien stworzyć jej opis. W tym celu Wystawca powinien wypełnić dostępny na stosownej stronie RIDERSBUY formularz. Tworząc opis oferty, Wystawca określa og&oacute;ł warunk&oacute;w umowy jaką planuje zawrzeć z Odbiorcą/Odbiorcami.</p>\r\n<p>5.2. Poprzez zamieszczenie oferty Wystawca oświadcza, że oferowany Towar/Usługa nie narusza przepis&oacute;w obowiązującego prawa lub praw os&oacute;b trzecich, a także, że jest uprawniony do zawarcia i wykonania umowy w celu, kt&oacute;rej została zamieszczona oferta.</p>\r\n<p>5.4. Opis oferowanego towaru/usługi powinien być rzetelny i kompletny oraz nie może wprowadzać w błąd innych Użytkownik&oacute;w, w szczeg&oacute;lności co do właściwości oferowanego towaru/usługi, takich jak: jego jakość, pochodzenie, marka czy producent. Opis Towaru powinien być zgodny z wymogami prawa, w szczeg&oacute;lności powinien zawierać wymagane w określonych okolicznościach informacje, w tym informacje wskazane w obowiązujących przepisach dotyczących ochrony konsument&oacute;w. WYSTAWIAJĄCY ponosi pełną odpowiedzialność za treści umieszczone przez siebie w Ofercie, w tym jest odpowiedzialny za wszelkie błędy lub nieścisłości takiego opisu.</p>\r\n<p>5.5. Ofertę należy umieścić w kategorii odpowiedniej ze względu na rodzaj oferowanego Towaru, usługi. RIDERSBUY zastrzega sobie prawo odmowy umieszczenia oferty w serwisie RIDERSBUY,&nbsp; w przypadku rażących odstępstw treści ogłoszenia od zadeklarowanej kategorii.</p>\r\n<p>5.6. Informacje zawarte w Ofercie mogą dotyczyć wyłącznie przedmiotu danej Transakcji. Szczeg&oacute;łowe zasady dotyczące tworzenia opisu, w tym tworzenia opisu Towaru, zamieszczania zdjęć oraz stosowania opcji dodatkowych, określa Załącznik nr 2 do Regulaminu.</p>\r\n<p><strong>Art. 6 ROLA RIDERSBUY</strong></p>\r\n<p>6.1. RIDERSBUY jest platformą umożliwiająca zapoznanie się Kupującego/Kupujących z ofertą reklamową zamieszczoną przez Wystawiającego/Wystawiających w celu zawarcia stosownej umowy pomiędzy Użytkownikami (Wystawiający/Kupujący). RIDERSBUY nie ponosi odpowiedzialności za zachowania Użytkownik&oacute;w w ramach RIDERSBUY ani za nienależyte wykonanie bądź niewykonanie przez nich um&oacute;w zawartych w ramach przedstawionej Oferty, jak r&oacute;wnież nie ponosi odpowiedzialności za następstwa działań podjętych przez Użytkownik&oacute;w oraz osoby trzecie, a stanowiących naruszenie postanowień Regulaminu. RIDERSBUY&nbsp; w szczeg&oacute;lności nie ponosi odpowiedzialności za jakość, bezpieczeństwo lub legalność Towar&oacute;w oferowanych w ramach&nbsp; Ofert, prawdziwość i rzetelność informacji podawanych przez Użytkownik&oacute;w, zdolność Sprzedających do ich sprzedaży, darowizny itp. RIDERSBUY&nbsp; nie ponosi odpowiedzialności za niezawarcie przez Użytkownik&oacute;w umowy. RIDERSBUY nie jest stroną um&oacute;w zawieranych pomiędzy użytkownikami.</p>\r\n<p>6.2. RIDERSBUY nie sprawdza Towar&oacute;w oferowanych w ramach ogłoszeń, zastrzega sobie jednak możliwość zmiany kategorii Towaru bądź edycji błędnie ustawionych parametr&oacute;w opisujących podstawowe właściwości oferty albo usunięcia ogłoszenia bez podania przyczyny. Informacja o zmianie kategorii, edycji błędnie ustawionych parametr&oacute;w lub usunięciu ogłoszenia niezwłocznie przekazywana jest Wystawcy. Usunięcie przez RIDERSBUY ogłoszenia w wyniku naruszenia przez Wystawiającego postanowień niniejszego regulaminu nie stanowi podstawy do roszczeń Wystawiającego o zwrot koszt&oacute;w zamieszczenia przedmiotowego ogłoszenia.</p>\r\n<p>6.3. RIDERSBUY może nie zamieścić lub usunąć zamieszczone Oferty w przypadku, gdy ich zamieszczenie narusza postanowienia Regulaminu lub obowiązujące przepisy prawa bądź negatywnie wpływa na dobre imię RIDERSBUY. Wskutek usunięcia Oferty informacje dotyczące jej przestają być dostępne w RIDERSBUY a dalsze czynności w ramach tej&nbsp; Transakcji są niemożliwe.&nbsp;</p>\r\n<p>6.4. W przypadku, gdy działania Użytkownika naruszają postanowienia Regulaminu bądź w uzasadnionych przypadkach, gdy Konto lub działalność Użytkownika w ramach RIDERSBUY wymaga dodatkowej weryfikacji danych, o kt&oacute;rych mowa w pkt 2.2. lub 2.3., RIDERSBUY może:</p>\r\n<ol style=\"list-style-type: lower-alpha;\">\r\n<li>udzielić Użytkownikowi ostrzeżenia za pośrednictwem poczty elektronicznej,</li>\r\n<li>ograniczyć na czas określony lub nieokreślony funkcjonalność Konta Użytkownika w zakresie dostępu do poszczeg&oacute;lnych usług świadczonych w ramach RIDERSBUY,</li>\r\n<li>uzależnić korzystanie z RIDERSBUY od potwierdzenia przez Użytkownika jego wiarygodności innymi dowodami,</li>\r\n<li>zawiesić na czas określony lub nieokreślony jedno, kilka bądź wszystkie Konta tego Użytkownika.</li>\r\n</ol>\r\n<p>Zawieszenie Konta może nastąpić w konsekwencji naruszenia zapis&oacute;w niniejszego Regulaminu.&nbsp;</p>\r\n<p>Niezależnie od zawieszenia Konta Użytkownik ponosi pełną odpowiedzialność za swoje działania będące podstawą do zawieszenia Konta, w szczeg&oacute;lności może ponosić odpowiedzialność odszkodowawczą względem RIDERSBUY lub innych Użytkownik&oacute;w.</p>\r\n<p>6.5. W przypadku zawieszenia Konta Użytkownik posiada jedynie wgląd do Konta oraz dostęp do funkcji pozwalających uregulować należności wobec RIDERSBUY i sfinalizować zawarte przed zawieszeniem Konta umowy, nie może on natomiast korzystać z żadnych innych usług świadczonych przez RIDERSBUY &nbsp;w ramach RIDERSBUY. Wraz z zawieszeniem Konta wszystkie Oferty zamieszczone przez Wystawcę zostają usunięte.&nbsp;</p>\r\n<p>6.6. Użytkownik, w przypadku gdy konto, z kt&oacute;rego korzystał jest zawieszone, nie może w tym czasie ponownie zarejestrować Konta bądź korzystać z innego Konta bez uprzedniej zgody. RIDERSBUY może odm&oacute;wić Użytkownikowi kolejnej rejestracji i korzystania z Konta także w&oacute;wczas, gdy jakiekolwiek Konto, z kt&oacute;rego Użytkownik korzystał było zawieszone w przeszłości.</p>\r\n<p><strong>Art. 7 OPŁATY I PROWIZJE</strong></p>\r\n<p>7.1. Usługi świadczone przez RIDERSBUY&nbsp; w ramach RIDERSBUY są odpłatne. Wszystkimi opłatami i prowizjami obciążany jest wyłącznie Wystawiający. Wysokość opłat i prowizji za poszczeg&oacute;lne usługi i ich opcje oraz zasady ich pobierania określa aktualny cennik dostępny na stronie RIDERSBUY.</p>\r\n<p>7.2. Warunkiem skorzystania z usług RIDERSBUY przez Wystawiającego jest dokonanie opłaty.&nbsp;</p>\r\n<p>7.3. Użytkownikom Kont <span style=\"text-decoration: line-through;\">&nbsp;</span>&nbsp;z rejestracją pełną mogą być wystawiane faktury. W tym celu powinni oni podczas Rejestracji wypełnić odpowiedni formularz.&nbsp;</p>\r\n<p>7.4. Faktury wystawiane są z użyciem danych Użytkownika zawartych na jego Koncie.</p>\r\n<p>7.5. Opłaty za usługi świadczone przez RIDERSBUY w ramach RIDERSBUY uiszczane są przez Użytkownika na rachunek bankowy DOTpay S.A. wskazany na jego Koncie.</p>\r\n<p><strong>Art. 8 INNE OBOWIĄZKI UŻYTKOWNIK&Oacute;W</strong></p>\r\n<p>8.1. Wszelkie działania podejmowane przez Użytkownika w ramach RIDERSBUY powinny być zgodne z obowiązującymi przepisami prawa i dobrymi obyczajami. Użytkownik nie może podejmować działań, kt&oacute;re negatywnie wpływają na bezpieczeństwo funkcjonowania RIDERSBUY lub w inny spos&oacute;b szkodzą innym Użytkownikom.</p>\r\n<p>8.2. Wszelkie materiały, w tym elementy grafiki, układ i kompozycja tych element&oacute;w (tzw. layout), znaki towarowe oraz&nbsp; inne informacje, dostępne na stronach internetowych Serwisu RIDERSBUY stanowią przedmiot praw wyłącznych RIDERSBUY lub Użytkownik&oacute;w Serwisu. Wskazane elementy stanowią przedmiot autorskich praw majątkowych, praw własności przemysłowej, w tym praw z rejestracji znak&oacute;w towarowych oraz praw do baz danych i jako takie korzystają z ustawowej ochrony prawnej.</p>\r\n<p>8.3. Pobieranie lub wykorzystywanie w jakimkolwiek zakresie dostępnych w ramach Serwisu RIDERSBUY materiał&oacute;w wymaga każdorazowo zgody RIDERSBUY&nbsp; i nie może naruszać postanowień regulaminu Serwisu oraz powszechnie obowiązującego prawa, jak r&oacute;wnież nie może naruszać interes&oacute;w RIDERSBUY oraz Użytkownik&oacute;w Serwisu. Zabronione jest jakiekolwiek agregowanie i przetwarzanie danych oraz innych informacji dostępnych w Serwisie RIDERBUY w celu ich dalszego udostępniania osobom trzecim w ramach innych serwis&oacute;w internetowych jak i poza Internetem. Zabronione jest r&oacute;wnież wykorzystywanie oznaczeń Serwisu RIDERSBUY, w tym charakterystycznych element&oacute;w grafiki, w ramach własnych usługowych serwis&oacute;w internetowych.</p>\r\n<p>&nbsp;<strong>Art. 9 INNE USŁUGI</strong></p>\r\n<p>Dla Użytkownik&oacute;w mogą być przewidziane inne usługi związane z ofertami i RIDERSBUY. Rodzaje i zakres takich usług określany jest w odrębnych regulaminach. Do cel&oacute;w realizacji omawianych usług prawa i obowiązki Użytkownik&oacute;w mogą zostać ukształtowane w inny spos&oacute;b niż określone w Regulaminie. Warunkiem korzystania z takich usług przez Użytkownik&oacute;w jest zaakceptowanie przez Użytkownika właściwego regulaminu.</p>\r\n<p>&nbsp;</p>\r\n<p><strong><span style=\"text-decoration: underline;\">III. POSTANOWIENIA KOŃCOWE</span></strong></p>\r\n<p><strong>Art. 10 PRYWATNOŚĆ I POUFNOŚĆ</strong></p>\r\n<p>10.1. Podane przez Użytkownik&oacute;w dane osobowe, RIDERSBUY zbiera i przetwarza zgodnie z <em>Ustawą</em><em> z </em>dnia 29 sierpnia 1997 r<em>. </em>o <em>ochronie danych osobowych</em> oraz zgodnie z polityką ochrony prywatności zawartą w Załączniku nr 3 do Regulaminu.</p>\r\n<p>10.2. Użytkownikom ujawniane są dane osobowe innych Użytkownik&oacute;w jedynie w przypadkach przewidzianych w Regulaminie oraz w innych uzasadnionych przypadkach, za uprzednią zgodą osoby, kt&oacute;rej dane dotyczą.</p>\r\n<p>10.3. Użytkownik zobowiązany jest nie ujawniać osobom trzecim informacji dotyczących innych Użytkownik&oacute;w, kt&oacute;re otrzymał od RIDERSBUY w związku z korzystaniem z RIDERSBUY, chyba że uzyskał uprzednią zgodę od Użytkownika, kt&oacute;rego dane dotyczą. Otrzymane od RIDERSBUY informacje Użytkownik może wykorzystać wyłącznie w celach związanych z przeprowadzeniem Transakcji i z realizacją um&oacute;w zawartych w wyniku Transakcji.</p>\r\n<p>10.4. Zakończone oferty mogą być publikowane w subdomenie archiwum.riderbuy.pl. RIDERSBUY nie zapewnia, ani nie gwarantuje pełnego i kompleksowego upubliczniania informacji o zakończonych transakcjach, a informacje publikowane mają jedynie charakter poglądowy.</p>\r\n<p>&nbsp;<strong>Art. 11 ZMIANY REGULAMINU</strong></p>\r\n<p>11.1. RIDERSBUY może zmienić Regulamin i uruchomić nową wersję usług świadczonych w ramach RIDERSBUY. Zmiana staje się skuteczna w terminie wskazanym przez RIDERSBUY, kt&oacute;ry nie może być kr&oacute;tszy niż 7 dni od momentu udostępnienia w RIDERSBUY zmienionego Regulaminu, z zastrzeżeniem, że zamieszczone oferty przed wejściem w życie zmian są prowadzone na zasadach dotychczasowych.</p>\r\n<p>11.2. Użytkownik przy pierwszym logowaniu w RIDERSBUY licząc od chwili wejścia w życie zmian zostanie powiadomiony o takich zmianach i o możliwości ich akceptacji. Za akceptację zmian uważa się także automatyczne złożenie Oferty zlecone przez Użytkownika, choćby odbyło się bez logowania w RIDERSBUY. Odmowa akceptacji zmian jest r&oacute;wnoznaczna z rozwiązaniem umowy z RIDERSBUY ,ze skutkiem określonym w art. 12.1.</p>\r\n<p><strong>Art. 12 ROZWIĄZANIE UMOWY</strong></p>\r\n<p>12.1. Świadczenie usług w ramach RIDERSBUY ma charakter bezterminowy, z zastrzeżeniem zdania następnego oraz postanowień zawartych w art.12.2 poniżej. Użytkownik może w każdym czasie wypowiedzieć umowę z RIDERSBUY (dotyczącą określonego Konta) poprzez wypełnienie dostępnego na stosownej stronie formularza, obejmującego oświadczenie o rozwiązaniu umowy, a następnie potwierdzenie wprowadzonych danych &ndash; nazwy (loginu) i hasła. Z uwzględnieniem warunku określonego w art. 12.4., umowa ulega rozwiązaniu ze skutkiem natychmiastowym w momencie potwierdzenia danych.</p>\r\n<p>12.2. Z ważnych przyczyn umowa może zostać rozwiązana przez RIDERSBUY za wypowiedzeniem, z zachowaniem siedmiodniowego terminu wypowiedzenia, z zastrzeżeniami wymienionymi <br />w pkt 12.1.</p>\r\n<p>12.3. Jeżeli umowa została rozwiązana na podstawie decyzji RIDERSBUY, Użytkownik nie może ponownie zarejestrować się w RIDERSBUY bez uprzedniej zgody RIDERSBUY.</p>\r\n<p>12.4. Rozwiązanie przez Wystawcę umowy z RIDERSBUY (dotyczącej określonego Konta) odnosi skutek najwcześniej po upływie 14 dni od zakończenia emisji ostatniej Oferty, złożonej przez Wystawcę przy użyciu danego Konta.</p>\r\n<p><strong>Art. 13 KONTAKT I POSTĘPOWANIE REKLAMACYJNE</strong></p>\r\n<p>13.1. Użytkownik może kontaktować się z RIDERSBUY w sprawie usług świadczonych na podstawie niniejszego Regulaminu w formie:</p>\r\n<ol>\r\n<li>elektronicznej na adres: <a href=\"mailto:biuro@ridersbuy.pl\">biuro@ridersbuy.pl</a> bądź &nbsp;info@ridersbuy.pl,</li>\r\n<li>telefonicznie pod numerem telefonu i w godzinach określonych w zakładce &bdquo;kontakt&rdquo; na stronie RIDERSBUY.</li>\r\n</ol>\r\n<p>13.2. Użytkownik może złożyć reklamację, jeżeli usługi przewidziane w niniejszym Regulaminie nie są realizowane przez RIDERSBUY lub są realizowane niezgodnie z postanowieniami Regulaminu.</p>\r\n<p>13.3. Reklamację można złożyć w formie elektronicznej za pomocą formularza kontaktowego lub pisemnej. Reklamacja powinna zawierać co najmniej nazwę (login), pod jaką Użytkownik występuje w RIDERSBUY oraz opis zgłaszanych zastrzeżeń.</p>\r\n<p>13.4. Jeżeli podane w reklamacji dane lub informacje wymagają uzupełnienia, przed rozpatrzeniem reklamacji RIDERSBUY zwraca się do składającego reklamację o jej uzupełnienie we wskazanym zakresie, w terminie 7 dni.</p>\r\n<p>13.5. RIDERSBUY rozpoznaje reklamację w terminie 14 dni od daty jej otrzymania w prawidłowej postaci, z zastrzeżeniem, że RIDERSBUY może odm&oacute;wić rozpatrzenia reklamacji złożonych po upływie &nbsp;60 dni od ujawnienia się przyczyn reklamacji.</p>\r\n<p>13.6. Odpowiedź na reklamację wysyłana jest wyłącznie na adres e-mail przypisany do Konta danego Użytkownika. W szczeg&oacute;lnie uzasadnionych przypadkach RIDERSBUY może wysłać odpowiedź na inny, wskazany przez składającego reklamację, adres e-mail, kt&oacute;ry nie jest przypisany do Konta Użytkownika.</p>\r\n<p><strong>Art. 14 PRAWO WŁAŚCIWE I SPORY</strong></p>\r\n<p>Prawem właściwym dla umowy pomiędzy Użytkownikiem a RIDERSBUY, kt&oacute;rej przedmiotem są usługi świadczone przez RIDERSBUY w ramach RIDERSBUY&nbsp; na warunkach określonych w Regulaminie, jest prawo polskie. Wszelkie spory związane z usługami świadczonymi przez RIDERSBUY w ramach RIDERSBUY będą rozstrzygane przez właściwe polskie sądy powszechne. Użytkownik będący konsumentem ma możliwość skorzystania z pozasądowego sposobu rozpatrywania reklamacji i dochodzenia roszczeń przed Stałym Polubownym Sądem Konsumenckim przy Wojew&oacute;dzkim Inspektorze Inspekcji Handlowej w Łodzi. Informacje o sposobie dostępu do w/w trybu i procedur rozstrzygania spor&oacute;w,&nbsp; znajdują się pod następującym adresem: www.uokik.gov.pl , w zakładce &bdquo;Rozstrzyganie spor&oacute;w konsumenckich&rdquo;.</p>\r\n<p><strong>Art. 15 ZAŁĄCZNIKI</strong></p>\r\n<p>15.1. Regulamin zawiera następujące załączniki, kt&oacute;re stanowią jego integralną część:</p>\r\n<p><a href=\"#Zał 1\">Załącznik nr 1</a>:&nbsp; Zasady odstąpienia od umowy wraz z formularzem;</p>\r\n<p><a href=\"#Zał 2\">Załącznik nr 2</a><strong>:</strong> Zasady tworzenia opisu Oferty;</p>\r\n<p><a href=\"#Zał%203\">Załącznik nr 3</a>: Polityka ochrony prywatności;</p>\r\n<p><a href=\"#Zał%204\">Załącznik nr 4</a>: Regulamin usługi DOTpay. &nbsp;</p>\r\n<p>15.2. Dokumenty inne, niż wymienione powyżej załączniki, nie stanowią części Regulaminu.</p>\r\n<p><strong>Art. 16 WAŻNOŚĆ</strong></p>\r\n<p>Jeżeli kt&oacute;rekolwiek postanowienie Regulaminu zostanie uznane prawomocnym orzeczeniem sądu za nieważne, pozostałe postanowienia pozostają w mocy.</p>\r\n<p>&nbsp;&nbsp;</p>\r\n<p>&nbsp;</p>\r\n<h3>Załącznik nr 1<a id=\"Zał 1\"></a></h3>\r\n<p>Informacja o sposobie odstąpienia od umowy oraz wz&oacute;r stosownego oświadczenia.</p>\r\n<p>W ciągu 14 dni od zawarcia umowy (utworzenie Konta) możesz od niej odstąpić bez podawania jakiejkolwiek przyczyny. <br />Aby zrezygnować z umowy, poinformuj nas o swojej decyzji, pisząc na adres e-mail: <a href=\"mailto:biuro@ridersbuy.pl\">biuro@ridersbuy.pl</a> lub <a href=\"mailto:info@ridersbuy.pl\">info@ridersbuy.pl</a> . W tym celu proponujemy gotowy wz&oacute;r - poniżej.&nbsp; <br />&nbsp;</p>\r\n<p><a href=\"/Files/Formularz_odstapienia.docx\">WZ&Oacute;R FORMULARZA ODSTĄPIENIA OD UMOWY</a>.doc</p>\r\n<p style=\"text-align: right;\">&nbsp;<br /><br /></p>\r\n<p>&nbsp;&nbsp;</p>\r\n<h3>Załącznik nr 2<a id=\"Zał 2\"></a></h3>\r\n<p>Zasady tworzenia opisu oferty</p>\r\n<ol>\r\n<li>W celu stworzenia opisu Oferty należy wypełnić dostępny na stronie RIDERSBUY formularz , w kt&oacute;rym należy w szczeg&oacute;lności zamieścić tytuł Oferty, opis towaru/usługi, określić kategorię. Możliwe jest uzupełnienie opisu poprzez załączenie zdjęć.</li>\r\n<li>Zabrania się umieszczania w opisie Oferty treści naruszających przepisy prawa, Regulaminu, sł&oacute;w, wyrażeń i zwrot&oacute;w wulgarnych oraz treści drastycznych.</li>\r\n<li>Treści zamieszczone w Ofercie powinny być prezentowane w języku polskim. Powinny one być wprowadzone w formie tekstowej. Dopuszcza się używanie zwrot&oacute;w obcojęzycznych.</li>\r\n<li>Oferta powinna zawierać opis istotnych cech oferowanego towaru lub usługi. Niedopuszczalne jest pozostawianie Kupującemu wyboru co do jednej bądź kilku istotnych cech oferowanego Towaru, ( rozmiar, model itp.) bez podania informacji o ilości dostępnych kolor&oacute;w lub wzor&oacute;w graficznych.</li>\r\n<li>Elementy HTML, JavaScript, Java lub innych język&oacute;w programowania bądź jakiekolwiek inne technologie nie mogą być stosowane do działań negatywnie wpływających na funkcjonowanie RIDERSBUY lub wprowadzających innych Użytkownik&oacute;w w błąd.</li>\r\n<li>Dopuszczalne jest umieszczanie w opisie Oferty adres&oacute;w stron internetowych w sytuacji, w kt&oacute;rej ze względu na specyfikę oferowanego towaru lub usługi umieszczenie adresu strony internetowej jest konieczne (np. sprzedaż domen, serwis&oacute;w internetowych, usług hostingowych). Poza tym dopuszczalne jest umieszczanie w opisie Transakcji adres&oacute;w stron internetowych (także odsyłaczy/link&oacute;w), pod warunkiem jednak, że ma to służyć wyłącznie poszerzeniu informacji o oferowanym towarze/usłudze.</li>\r\n<li>Treść Oferty nie może naruszać praw os&oacute;b trzecich, w tym praw autorskich. Wykorzystywanie zdjęć i tekst&oacute;w należących do innych os&oacute;b wymaga uzyskania ich zgody. W treści Oferty zabronione jest stosowanie znak&oacute;w graficznych lub innych, do kt&oacute;rych używania Użytkownik nie jest uprawniony.</li>\r\n</ol>\r\n<p><strong>&nbsp;<br /><br /><br /></strong></p>\r\n<h3>Załącznik nr 3<a id=\"Zał 3\"></a></h3>\r\n<p>&nbsp;Polityka ochrony prywatności</p>\r\n<ol>\r\n<li>RIDERSBUY szczeg&oacute;lnie dba o ochronę prywatności Użytkownik&oacute;w. Z należytą starannością dobierane są odpowiednie środki techniczne i organizacyjne zapewniające ochronę przetwarzanych danych w tym zabezpieczenia o charakterze programistycznym (np. szyfrowanie danych). Dane Użytkownik&oacute;w chronione są przed udostępnieniem osobom nieupoważnionym, jak r&oacute;wnież przed ich przetwarzaniem z naruszeniem obowiązujących przepis&oacute;w prawa. Sprawowana jest stała kontrola nad procesem przetwarzania danych oraz ogranicza dostęp do danych w możliwie największym stopniu, udzielając stosownych upoważnień tylko w&oacute;wczas, gdy jest to niezbędne do prawidłowego prowadzenia serwisu.</li>\r\n<li>Podstawą przetwarzania danych osobowych jest zgoda Użytkownika.</li>\r\n<li>Podanie danych osobowych jest dobrowolne. Podanie danych wymienionych w pkt. 2.2. i 2.3. Regulaminu jest konieczne do zawarcia umowy o świadczenie usług w ramach RIDERSBUY.</li>\r\n<li>Dane podawane przez Użytkownika w trakcie Rejestracji są wykorzystywane do cel&oacute;w księgowych, do kontaktowania się z Użytkownikiem oraz do innych czynności związanych z zawarciem lub wykonywaniem umowy o świadczenie usług w ramach RIDERSBUY. Dane mogą służyć do weryfikacji, czy osoba rejestrująca spełnia wymagane przez Regulamin i przepisy prawne warunki.</li>\r\n<li>RIDERSBUY zapewnia realizację uprawnień Użytkownik&oacute;w wynikających z ustawy o ochronie danych osobowych, w tym prawa dostępu do treści własnych danych osobowych i ich poprawiania oraz prawa do kontroli przetwarzania własnych danych osobowych na zasadach opisanych w przedmiotowej ustawie. W ramach realizacji prawa do kontroli przetwarzania własnych danych osobowych, Użytkownicy mają w szczeg&oacute;lności prawo do wniesienia &ndash; w przypadkach określonych w ustawie o ochronie danych osobowych &ndash; pisemnego, umotywowanego żądania zaprzestania przetwarzania danych osobowych ze względu na swoją szczeg&oacute;lną sytuację, a także wniesienia sprzeciwu wobec przetwarzania swoich danych.</li>\r\n<li>Zapewnia się możliwość przeglądania i modyfikacji własnych danych osobowych na zasadach określonych w pkt. 2.9. Regulaminu. Zapewnia się Użytkownikom możliwość usunięcia danych osobowych ze zbioru danych w przypadku odstąpienia od umowy, a także w innych przypadkach jeśli to wynika z obowiązujących przepis&oacute;w prawa. RIDERSBUY może odm&oacute;wić usunięcia danych Użytkownika wyłącznie w przypadkach wskazanych przez obowiązujące przepisy, w szczeg&oacute;lności jeżeli Użytkownik ten nie uregulował wszystkich należności&nbsp; lub RIDERSBUY uzyska i utrwali wiadomość, że Użytkownik swoim dotychczasowym zachowaniem naruszył Regulamin bądź obowiązujące przepisy prawa, a zachowanie tych danych jest niezbędne do wyjaśnienia tych okoliczności i ustalenia odpowiedzialności Użytkownika.</li>\r\n<li>RIDERSBUY wykorzystuje adresy IP zbierane w trakcie połączeń internetowych w celach technicznych , związanych z administracją serwerami oraz informacyjnych.</li>\r\n<li>RIDERSBUY stosuje pliki \"cookies\". Informacje zbierane przy pomocy \"cookies\" pozwalają dostosowywać usługi i treści do indywidualnych potrzeb i preferencji Użytkownik&oacute;w, jak r&oacute;wnież służą do opracowywania og&oacute;lnych statystyk dotyczących korzystania przez Użytkownik&oacute;w.</li>\r\n</ol>\r\n<p>&nbsp;<br /><br /><br /></p>\r\n<h3>Załącznik nr 4<a id=\"Zał 4\"></a></h3>\r\n<p>Regulamin usługi DOTpay</p>', 1, 0, 'Ridersbuy.pl - zasady korzystania z portalu motocyklowego.', 'Zapoznaj się z regulaminem korzystania z portalu motocyklowego. ', 'moto giełda, motogiełda, portal motocyklowy', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);
INSERT INTO `portal_info` (`ino_id`, `ino_ino_id`, `ino_nazwa`, `ino_url`, `ino_tytul`, `ino_intro`, `ino_tekst`, `ino_widocznosc`, `ino_strona_glowna`, `ino_meta_tytul`, `ino_meta_opis`, `ino_meta_klucze`, `ino_lp`, `ino_nazwa_en`, `ino_url_en`, `ino_tytul_en`, `ino_intro_en`, `ino_tekst_en`, `ino_widocznosc_en`, `ino_strona_glowna_en`, `ino_meta_tytul_en`, `ino_meta_opis_en`, `ino_meta_klucze_en`) VALUES
(61, 60, 'Poradnik', '', 'Poradnik', NULL, '<p>Owoce kawowca wykorzystywane były w Etiopii już w I tysiącleciu p.n.e. Spożywano je gotowane z dodatkiem <a href=\"/wiki/Mas%C5%82o\" title=\"Masło\">masła</a> i <a href=\"/wiki/S%C3%B3l_kuchenna\" title=\"Sól kuchenna\">soli</a>, lecz nie uprawiano, tylko zbierano ze stanowisk naturalnych. Przypuszczalnie w <a href=\"/wiki/XIII_wiek\" title=\"XIII wiek\">XIII</a> lub <a href=\"/wiki/XIV_wiek\" title=\"XIV wiek\">XIV w.</a> przywiezione zostały przez kupców arabskich do <a href=\"/wiki/Jemen\" title=\"Jemen\">Jemenu</a>, który do dziś dostarcza najdroższą kawę. Prawdopodobnie tam opracowano metodę preparowania nasion przez prażenie i wytwarzanie z nich napoju, który <a href=\"/wiki/Beduini\" title=\"Beduini\">Beduini</a> rozpowszechnili w całej <a href=\"/wiki/Arabia\" title=\"Arabia\">Arabii</a>. Z odkryciem kawy wiążą się dwie legendy. Pierwsza przypisuje związane z tym zasługi <a href=\"/wiki/Sufizm\" title=\"Sufizm\">sufiemu</a> Shaikh ash-Shadhilemu. Miał on w czasie swojej wędrówki po <a href=\"/wiki/Afryka\" title=\"Afryka\">Afryce</a> przypadkiem natrafić na stado wyjątkowo pobudzonych kóz. Z ciekawości spróbował zjadanych przez nie owoców, poznając ich niezwykły wpływ na organizm człowieka. Druga, bardzo podobna historia jako odkrywcę podaje etiopskiego pasterza o imieniu Kaldi.</p>\r\n<p>Już w końcu <a href=\"/wiki/XV_wiek\" title=\"XV wiek\">XV wieku</a> położony na południowym krańcu <a href=\"/wiki/Morze_Czerwone\" title=\"Morze Czerwone\">Morza Czerwonego</a> arabski port <a href=\"/w/index.php?title=Al-Mucha&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Al-Mucha (strona nie istnieje)\">Al-Mucha</a> (bardziej znany jako <a href=\"/w/index.php?title=Mokka&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Mokka (strona nie istnieje)\">Mokka</a>) był dużym ośrodkiem handlu ziarnami rośliny zwanej <i>kohwet</i>. Wraz z ekspansją arabską zwyczaj picia kawy rozpowszechnił się na całym Bliskim Wschodzie. Początkowo budził on wiele nieufności, czy wręcz niechęci. Spożycie kawy zostało zabronione w Mekce w roku 1511, a w Kairze w 1532. Wobec szybkiego wzrostu popularności napoju zakazy wkrótce zniesiono. W 1554 w Stambule otwarto pierwszą <a href=\"/wiki/Kawiarnia\" title=\"Kawiarnia\">kawiarnię</a>. O ile w Arabii kontrowersje wokół nowej używki szybko zanikły, o tyle nad <a href=\"/wiki/Bosfor\" title=\"Bosfor\">Bosforem</a> jej kariera rozwijała się znacznie wolniej. Pobudzające właściwości palonych ziaren bywały obiektem krytyki religijnych ortodoksów, a pierwsze kawiarnie stawały się nieraz forami burzliwych dyskusji, co niepokoiło <a href=\"/wiki/Su%C5%82tan\" title=\"Sułtan\">sułtanów</a>. Restrykcje ustały u schyłku <a href=\"/wiki/XVI_wiek\" title=\"XVI wiek\">XVI wieku</a>. Zarazem <a href=\"/wiki/Imperium_osma%C5%84skie\" title=\"Imperium osmańskie\">Imperium Osmańskie</a> jako pośrednik w handlu stało się mocarstwem kawowym.</p>\r\n<p>Jako pierwszy Europejczyk kawę opisał niemiecki botanik i podróżnik <a href=\"/w/index.php?title=Leonard_Rauwolf&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Leonard Rauwolf (strona nie istnieje)\">Leonard Rauwolf</a>. W <a href=\"/wiki/1573\" title=\"1573\">1573</a> rozpoczął on trzyletnią podróż po Bliskim Wschodzie. Celem eskapady było odkrycie nowych ziół i lekarstw dla kompanii kupieckiej jego szwagra, Melchiora Manlicha. Rauwolf powrócił z wieloma cennymi towarami, jak również obfitymi zapiskami dotyczącymi tureckich zwyczajów. Na temat kawy wyraził się w następujący sposób:</p>\r\n<p><i>Bardzo dobry napój zwany przez nich „Chaube”, który jest niemal tak czarny jak inkaust i bardzo dobry na dolegliwości, szczególnie żołądkowe. Spożywają go oni o poranku, w otwartych miejscach, przed wszystkimi i bez najmniejszej oznaki strachu czy ostrożności. Napój popijają małymi łyczkami, tak ciepły jak to tylko możliwe, z glinianych i porcelanowych kubków.</i></p>\r\n<p>Duże znaczenie dla rozpowszechnienia wiedzy o używce miały również zapiski włoskiego botanika i lekarza <a href=\"/w/index.php?title=Prosper_d%27Alpino&amp;action=edit&amp;redlink=1\" class=\"new\" title=\"Prosper d\'Alpino (strona nie istnieje)\">Prospera d’Alpino</a>. Towarzyszył on weneckiemu poselstwu do <a href=\"/wiki/Egipt\" title=\"Egipt\">Egiptu</a> i po powrocie opisał lecznicze działanie kawy. Prawdopodobnie to dzięki niemu nazwa „caffè” przeniknęła do większości języków zachodniej Europy (<a href=\"/wiki/J%C4%99zyk_angielski\" title=\"Język angielski\">ang.</a> <i>coffee</i>, <a href=\"/wiki/J%C4%99zyk_francuski\" title=\"Język francuski\">fr.</a> <i>café</i>).</p>\r\n<p>Trudno określić dokładnie kiedy kawa po raz pierwszy trafiła do Europy. W oparciu o zapiski Leonarda Rauwulfa z 1583 roku można stwierdzić, że stała się ona dostępna jeszcze w XVI wieku. Jej import był zasługą dwóch kompanii wschodnioindyjskich: <a href=\"/wiki/Brytyjska_Kompania_Wschodnioindyjska\" title=\"Brytyjska Kompania Wschodnioindyjska\">brytyjskiej</a> i <a href=\"/wiki/Holenderska_Kompania_Wschodnioindyjska\" title=\"Holenderska Kompania Wschodnioindyjska\">holenderskiej</a>. Pierwszą kawiarnię w <a href=\"/wiki/Anglia\" title=\"Anglia\">Anglii</a> otwarto w <a href=\"/wiki/Oksford\" title=\"Oksford\">Oksfordzie</a> w roku <a href=\"/wiki/1650\" title=\"1650\">1650</a>. Należała ona do osmańskiego Żyda imieniem Jakub (<a href=\"/wiki/J%C4%99zyk_angielski\" title=\"Język angielski\">ang.</a> Jacob lub Jacobs). W <a href=\"/wiki/Londyn\" title=\"Londyn\">Londynie</a> podobny przybytek rozpoczął działalność dwa lata później przy alei świętego Michała.</p>\r\n<p>Na kontynencie kawa rozpowszechniła się ze sporym opóźnieniem. Pierwszy raz sprowadzono ją do Francji prawdopodobnie dopiero w roku <a href=\"/wiki/1644\" title=\"1644\">1644</a>. W <a href=\"/wiki/1669\" title=\"1669\">1669</a> napój poznały elity paryskie na przyjęciu wydanym przez posła osmańskiego Mustafę Paszę. Pierwszy kafehauz w stolicy kraju otwarto w <a href=\"/wiki/1671\" title=\"1671\">1671</a>. W tym czasie w Anglii działało już ponad 3000 kawiarni. Napój zyskiwał także rosnącą popularność za oceanem. W <a href=\"/wiki/1670\" title=\"1670\">1670</a> rozpoczęła działalność pierwsza kawiarnia w <a href=\"/wiki/Boston\" title=\"Boston\">Bostonie</a>.</p>\r\n<p>Po zwycięstwie pod <a href=\"/wiki/Wiede%C5%84\" title=\"Wiedeń\">Wiedniem</a> w <a href=\"/wiki/1683\" title=\"1683\">1683</a> <a href=\"/wiki/Jerzy_Franciszek_Kulczycki\" title=\"Jerzy Franciszek Kulczycki\">Jerzy Franciszek Kulczycki</a> założył pierwszy kafehauz w stolicy <a href=\"/wiki/Austria\" title=\"Austria\">Austrii</a>. Legenda mówi, że zrobił to korzystając z zapasów kawy porzuconych przez uciekających Turków. Następnie pomógł on spopularyzować zwyczaj dodawania do napoju cukru i mleka. Do niedawna w Wiedniu istniała tradycja wywieszania portretu Kulczyckiego (<a href=\"/wiki/J%C4%99zyk_niemiecki\" title=\"Język niemiecki\">niem.</a> Kolschitzky) w oknach kawiarni. Ostatnio mówi się, że pierwszym właścicielem kawiarni w Imperium Habsburgów był jednak Ormianin <a href=\"/wiki/Johannes_Diodato\" title=\"Johannes Diodato\">Johannes Diodato</a><sup id=\"cite_ref-1\" class=\"reference\"><a href=\"#cite_note-1\">[1]</a></sup>.</p>\r\n<p>Pierwszą kawiarnią w <a href=\"/wiki/Salzburg\" title=\"Salzburg\">Salzburgu</a> była istniejąca do dziś <a href=\"/wiki/Caf%C3%A9_Tomaselli\" title=\"Café Tomaselli\">Café Tomaselli</a>. Kawiarnia ta jest najstarszą do dziś istniejącą kawiarnią Europy Zachodniej. Bywali w niej: <a href=\"/wiki/Wolfgang_Amadeusz_Mozart\" title=\"Wolfgang Amadeusz Mozart\">Wolfgang Amadeusz Mozart</a>, <a href=\"/wiki/Michael_Haydn\" title=\"Michael Haydn\">Michael Haydn</a>, <a href=\"/wiki/Hugo_von_Hofmannsthal\" title=\"Hugo von Hofmannsthal\">Hugo von Hofmannsthal</a> i <a href=\"/wiki/Max_Reinhardt\" title=\"Max Reinhardt\">Max Reinhardt</a>.</p>\r\n<p>Nowa używka budziła na starym kontynencie wiele kontrowersji. Była produktem pochodzenia arabskiego, niektórzy widzieli więc w niej dzieło <a href=\"/wiki/Szatan\" title=\"Szatan\">szatana</a>. Na początku <a href=\"/wiki/XVII_wiek\" title=\"XVII wiek\">XVII w.</a> na temat kawy wypowiedział się sam papież <a href=\"/wiki/Klemens_VIII\" title=\"Klemens VIII\">Klemens VIII</a>, za którego przyzwoleniem napój ten wkroczył do świata chrześcijańskiego. W XVII i XVIII w. wielkie potęgi kolonialne rozpoczęły uprawę kawowca w swoich koloniach. <a href=\"/wiki/Holandia\" title=\"Holandia\">Holandia</a> w <a href=\"/wiki/1658\" title=\"1658\">1658</a> założyła pierwsze plantacje na <a href=\"/wiki/Cejlon\" title=\"Cejlon\">Cejlonie</a>. Następnie rozszerzyła uprawę na <a href=\"/wiki/Jawa\" title=\"Jawa\">Jawę</a>, z której rozprzestrzeniła się ona na cały <a href=\"/wiki/Archipelag_Sundajski\" title=\"Archipelag Sundajski\">Archipelag Sundajski</a>. <a href=\"/wiki/Francja\" title=\"Francja\">Francja</a> pierwsze plantacje założyła na <a href=\"/wiki/Martynika\" title=\"Martynika\">Martynice</a>. Wkrótce uprawę kawy rozpoczęto również w <a href=\"/wiki/Gujana_Francuska\" title=\"Gujana Francuska\">Gujanie Francuskiej</a>.</p>\r\n<p>W <a href=\"/wiki/1719\" title=\"1719\">1719</a> <a href=\"/wiki/Portugalia\" title=\"Portugalia\">Portugalczycy</a> wykradli z Gujany sadzonki i założyli pierwsze plantacje w <a href=\"/wiki/Brazylia\" title=\"Brazylia\">Brazylii</a>. Dzięki nim do roku <a href=\"/wiki/1800\" title=\"1800\">1800</a> kawa zmieniła się z używki dla elit w ogólnodostępny napój dla każdego. Przez cały wiek <a href=\"/wiki/XIX_wiek\" title=\"XIX wiek\">XIX</a> i pierwsze dekady <a href=\"/wiki/XX_wiek\" title=\"XX wiek\">XX</a> Brazylia pozostawała głównym producentem i niemal <a href=\"/wiki/Monopol\" title=\"Monopol\">monopolistą</a> na rynku kawy. Dopiero w kolejnych latach polityka utrzymywania wysokich cen otworzyła drzwi dla kolejnych państw: <a href=\"/wiki/Kolumbia\" title=\"Kolumbia\">Kolumbii</a>, <a href=\"/wiki/Gwatemala\" title=\"Gwatemala\">Gwatemali</a> i <a href=\"/wiki/Indonezja\" title=\"Indonezja\">Indonezji</a>.</p>\r\n<p>Pod koniec <a href=\"/wiki/XIX_wiek\" title=\"XIX wiek\">XIX wieku</a> <a href=\"/wiki/Wiede%C5%84\" title=\"Wiedeń\">Wiedeń</a> posiadał ponad 1200 kawiarni.</p>\r\n<p>Obecnie kawa jest jednym z najpopularniejszych na świecie napojów. Wypija jej się około 400 mld filiżanek rocznie.</p>', NULL, NULL, 'Poradnik', NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(74, 1, 'Kontakt', 'Kontakt', 'Kontakt', '', '<div class=\"description\">\r\n<h2 style=\"text-align: center;\">Ridersbuy</h2>\r\n<p style=\"text-align: center;\">&nbsp;od poniedziałku do piątku</p>\r\n<p style=\"text-align: center;\"><span style=\"color: #ff0000;\">w godz. 08.00-16.00</span></p>\r\n<p style=\"text-align: center;\"><br /><a href=\"mailto:biuro@ridersbuy.pl\">biuro@ridersbuy.pl</a></p>\r\n<p style=\"text-align: center;\"><a href=\"mailto:info@ridersbuy.pl\">info@ridersbuy.pl</a></p>\r\n<p style=\"text-align: center;\"><span style=\"font-size: large;\">Tel: +48 884 000 347</span></p>\r\n<p style=\"text-align: center;\"><span style=\"color: #ff0000;\">Jeżeli masz jakiekolwiek pytanie, wyślij do Nas e-mail.&nbsp;</span></p>\r\n<p>&nbsp;</p>\r\n<h2 style=\"text-align: center;\">&nbsp;</h2>\r\n</div>', 1, 0, 'Zamieść ogłoszenie motocyklowe na Ridersbuy.pl!', 'Jeśli masz jakiekolwiek wątpliwości czy pytania, albo jeśli chcesz zamieścić ogłoszenie motocyklowe na Ridersbuy, zadzwoń pod numre +48 884 000 347! Chętnie pomożemy!', 'ogłoszenia motoryzacyjne, moto gratka, motogratka', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(75, 2, 'test', 'ddddf', 'test', NULL, '<p>sdfsdfdsf</p>', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(76, 60, '----', '', '----', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(77, 61, '----', '', '----', NULL, NULL, NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(84, 1, 'NEWS', 'NEWS', 'Riders Buy NEWS ', '<p style=\"text-align: right;\">&nbsp;<img src=\"/grafika/obrazki/img_0567.jpg\" alt=\"\" width=\"298\" height=\"198\" /></p>\r\n<p style=\"text-align: left;\">Koleżanki i Koledzy (moto)cykliści !!</p>\r\n<p style=\"text-align: left;\"><strong>Już zaistniał nowy <a href=\"/i/z-milosci-do-motocykli.html\">portal ogłoszeniowy</a>&nbsp;przeznaczony &nbsp;dla miłośnik&oacute;w jednoślad&oacute;w &ndash; motocykli, skuter&oacute;w, rower&oacute;w i innych niesamochodowych jeździdeł.</strong></p>\r\n<p style=\"text-align: left;\">Portal ma za zadanie umożliwienie SPRZEDANIA wszystkiego, co związane z jednośladami i ich wszelkimiodmianami z pojazdami w całości włącznie.<br /><br /></p>', '<h2 style=\"text-align: center;\"><span style=\"color: #000000;\">&nbsp;<span style=\"color: #800000;\">Koleżanki i Koledzy (moto)cykliści !!</span></span></h2>\r\n<p style=\"text-align: left;\">Już zaistniał nowy <a href=\"/i/z-milosci-do-motocykli.html\">portal ogłoszeniowy</a>&nbsp;przeznaczony dla miłośnik&oacute;w jednoślad&oacute;w &ndash; motocykli, skuter&oacute;w, rower&oacute;w i innych niesamochodowych jeździdeł.</p>\r\n<p style=\"text-align: left;\">Portal ma za zadanie umożliwienie <strong>SPRZEDANIA</strong> wszystkiego, co związane z jednośladami i ich wszelkimi odmianami z pojazdami w całości włącznie.</p>\r\n<p style=\"text-align: left;\">Nie pobieramy opłat za transakcje, za rejestrację ani za czytanie strony. A wystawiane ogłoszenia zawsze będą za darmo.</p>\r\n<p style=\"text-align: left;\">Zapraszamy: garażowych ciułaczy, mega-sklepo-hurtownie, posiadaczy sprzętu niepotrzebnego acz smakowitego, importer&oacute;w, zapaleńc&oacute;w i wszystkich pozostałych. A z okazji szczęśliwych narodzin</p>\r\n<p style=\"text-align: left;\">oferujemy zniżki, promocje a nawet darmochę w pierwszych tygodniach działalności <strong>www.ridersbuy.pl<img style=\"float: right;\" src=\"/grafika/obrazki//medium/img_0094.jpg\" alt=\"\" width=\"300\" /></strong></p>\r\n<ul style=\"list-style-type: square;\">\r\n<li>co można wystawić na sprzedaż &ndash; wszystko co legalne i mieści się w kategorii &bdquo;riders&rdquo;</li>\r\n<li>komu można sprzedać &ndash; to się zobaczy, trzymamy kciuki</li>\r\n<li>jak to działa - wyśmienicie !</li>\r\n<li>ile za ogłoszenie &ndash;!!! u nas zawsze za darmo!!!</li>\r\n<li>za reklamę ............ &ndash; napiszcie proszę na biuro@ridersbuy.pl choćby sł&oacute;wko, a</li>\r\n<li>pędzikiem wyślemy ofertę.</li>\r\n</ul>\r\n<p>Z lewą ręką w g&oacute;rze i niskim ukłonem zakończonym stuknięciem kaskiem w podłoże</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;<strong>Maciek i Paweł</strong></p>', 1, 1, 'Wszystkie niezbędne akcesoria do motocykli!', 'Bądź na bieżąco! Zobacz, co nowego na portalu motocyklowym Ridersbuy.pl!', 'moto gratka, motogratka, strony motoryzacyjne, portal ogłoszeniowy', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(85, 1, 'Ridersbuy dla motocyklistów', 'Ridersbuy-motocyklowy-portal-ogloszen', 'Serwis motocyklowy Ridersbuy', '<p><strong>Badania naukowe wciąż trwają, ale czy było to wynikiem nadmiaru spalin, czy tlenu a może nadmiarem czegoś zupełnie innego, tak czy owak pewnego (najprawdopodobniej) poranka spłynęła na nas świetlistym strumieniem IDEA.</strong></p>\r\n<p>Jednośladowcy są przecież r&oacute;wnoprawnymi, ale nieco odmiennymi użytkownikami dr&oacute;g niż pozostali. Ot choćby dlatego, że pozdrawiamy się uniesieniem całej dłoni, a nie tylko jednego palca. Większość z nas potrafi samodzielnie podłubać w swoim rumaku, często po to tylko, by z przerażeniem odkryć bolesny brak jakiegoś gadżetu, na kt&oacute;ry i tak nie ma już miejsca. W 99% przypadk&oacute;w wypasiony Hary zatrzyma się widząc zrozpaczonego brakiem paliwa chuderlawego mopeda na poboczu, zamiast go zwyczajnie obtrąbić. Właściciel obłożonego jaskrawym plastikiem silnika o mocy elektrociepłowni w Turoszowie wychyli szczery kufelek z jeźdźcem na czterdziestoletniej SHL-ce, a wszyscy, do sp&oacute;łki z bezsilnikowcami ruszą jak jeden mąż (i żona) jeśli tylko usłyszą, że trzeba wspom&oacute;c kolegę, oddać krew czy zrobić frajdę dzieciakom z sierocińca.</p>', '<p>Badania naukowe wciąż trwają, ale czy było to wynikiem nadmiaru spalin, czy tlenu a może nadmiarem czegoś zupełnie innego, tak czy owak pewnego (najprawdopodobniej) poranka spłynęła na nas świetlistym strumieniem IDEA.</p>\r\n<p>Jednośladowcy są przecież r&oacute;wnoprawnymi, ale nieco odmiennymi użytkownikami dr&oacute;g niż pozostali. Ot choćby dlatego, że pozdrawiamy się uniesieniem całej dłoni, a nie tylko jednego palca. Większość z nas potrafi samodzielnie podłubać w swoim rumaku, często po to tylko, by z przerażeniem odkryć bolesny brak jakiegoś gadżetu, na kt&oacute;ry i tak nie ma już miejsca. W 99% przypadk&oacute;w wypasiony Hary zatrzyma się widząc zrozpaczonego brakiem paliwa chuderlawego mopeda na poboczu, zamiast go zwyczajnie obtrąbić. Właściciel obłożonego jaskrawym plastikiem silnika o mocy elektrociepłowni w Turoszowie wychyli szczery kufelek z jeźdźcem na czterdziestoletniej SHL-ce, a wszyscy, do sp&oacute;łki z bezsilnikowcami ruszą jak jeden mąż (i żona) jeśli tylko usłyszą, że trzeba wspom&oacute;c kolegę, oddać krew czy zrobić frajdę dzieciakom z sierocińca.</p>\r\n<p>&nbsp;</p>\r\n<p>I to jest właśnie rys historyczny portalu RIDERSBUY.pl<br /> Potem było już trudniej. No bo jak marynarz z biologiem zaczynają robić portal motocyklowy to w najlepszym razie może być zabawnie.<br /> Ilość nowych sł&oacute;w i pojęć do przyswojenia w pierwszym tygodniu spowodowała permanentny wytrzeszcz i tachykardię. Rodziny szeptały po kątach z troską chlustającą z każdego spojrzenia w naszą stronę. Ludzie zaczęli nam ustępować miejsca w tramwajach i pytali czy może trzeba nas przeprowadzić przez ulicę albo ponieść zakupy. Wkr&oacute;tce okazało się, że w tym roku maj wypada we wrześniu.<br /> Aż wreszcie &ndash; możemy napisać: witajcie w RIDERSBUY!!</p>', 1, 0, 'Bezpłatne ogłoszenia motocyklowe na Riderbuy.pl', 'Kupuj, sprzedawaj, oglądaj... Ridersbuy.pl portal motocyklowy i ogłoszenia przeznaczone tylko dla motocyklistów!', 'bezpłatne ogłoszenia motoryzacyjne, darmowe ogłoszenia motoryzacja, ogłoszenia motocyklowe, ogłoszen', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(86, 1, 'WSPÓŁPRACA', 'wspolpraca', 'OFERTA WSPÓŁPRACY', '<p><strong>Jeśli posiadasz sklep motoryzacyjny, komis, masz szeroką wiedzę z zakresu motoryzacji, kochasz motory bądź inne pojazdy jednośladowe</strong><strong>, zapraszamy do wsp&oacute;łpracy!</strong></p>\r\n<p><span style=\"background-color: #ffffff;\">Wypływamy na szerokie internetowe fale. Miło nam zauważyć, że nasz portal motocyklowy przyciąga coraz więcej użytkownik&oacute;w. Ridersbuy.pl powstał z myślą o motocyklistach i fanach pojazd&oacute;w jednośladowych. Chcemy go rozwijać i udoskonalać. Zapraszamy do wsp&oacute;łpracy sklepy motoryzacyjne, komisy, ekspert&oacute;w w tej dziedzinie oraz Was, drodzy miłośnicy motor&oacute;w. Razem tw&oacute;rzmy ten poratal!</span></p>', '<p><strong>Wypływamy na szerokie internetowe fale. Miło nam zauważyć, że nasz portal motocyklowy przyciąga coraz więcej użytkownik&oacute;w. Ridersbuy.pl powstał z myślą o motocyklistach i fanach pojazd&oacute;w jednośladowych. Chcemy go rozwijać i udoskonalać. Zapraszamy do wsp&oacute;łpracy sklepy motoryzacyjne, komisy, ekspert&oacute;w w tej dziedzinie oraz Was, drodzy miłośnicy motor&oacute;w. Razem tw&oacute;rzmy ten portal!</strong>&nbsp;</p>\r\n<p><strong>JEŚLI PROWADZISZ SKLEP MOTORYZACYJNY ALBO KOMIS, WSP&Oacute;ŁPRACUJĄC Z PORTALEM OGŁOSZENIOWYM RIDERSBUY.PL ZYSKASZ:</strong></p>\r\n<ul>\r\n<li>\r\n<p align=\"JUSTIFY\">możliwość prezentowania swojej oferty,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">bezpłatną reklamę,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">status partnera.</p>\r\n</li>\r\n</ul>\r\n<p><strong>JEŚLI POSIADASZ SZEROKĄ WIEDZĘ Z ZAKRESU MOTORYZACJI, DZIĘKI WSP&Oacute;ŁPRACY Z RIDERSBUY.PL:</strong></p>\r\n<ul>\r\n<li>\r\n<p align=\"JUSTIFY\">zdobędziesz ciekawe doświadcznie,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">Twoja wiedza pomoże rozwiązać problemy techniczne - i nietylko - wielu ludziom,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">poznasz smak satysfakcji, jaką dają miłe słowa i podziękowania internaut&oacute;w,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">nawiążesz wiele interesujących kontakt&oacute;w związanych z branżą motoryzacyjną,</p>\r\n</li>\r\n<li>\r\n<p align=\"JUSTIFY\">być może odkryjesz w sobie nowe pasje i talenty?</p>\r\n</li>\r\n</ul>\r\n<p><strong>JEŚLI KOCHASZ MOTORY BĄDŹ INNE POJAZDY JEDOŚLADOWE, PRZEŻYŁEŚ Z NIMI NIEZWYKŁE PRZYGODY, TO...</strong></p>\r\n<p align=\"JUSTIFY\">podziel się nimi z nami i z naszymi użytkownikami! Pokaż, jak ważne miejsce w Twoim życiu zajmuje Twoja maszyna i ile niezapomnianych chwil z nią się wiąże. Twoje osobiste doświadczenia na pewno będą ispirujące dla wielu z nas! Czekamy na Twoją wiadomość pod adresem mailowym: <a href=\"mailto:biuro@ridersbuy.pl\">biuro@ridersbuy.pl</a> :)</p>\r\n<p>&nbsp;</p>\r\n<p>&nbsp;</p>', 1, 1, 'Ridersbuy – motocyklowy portal ogłoszeń.', 'Zapraszamy do współpracy sklepy motocyklowe, fanów motocykli, a także producentów.', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(87, 1, 'Z miłości do motocykli', 'z-milosci-do-motocykli', 'Z miłości do motocykli', '<p><strong>Prawdziwi motocykliści uwielbiają godzinami majstrować przy swoim motorze. Dbają o niego niczym o własne dziecko. Chętnie inwestują w r&oacute;żnego rodzaju gadżety, felgi, opony. Wyznają zasadę, że motocyklista to coś więcej niż styl życia.</strong></p>', '<p><strong>Prawdziwi motocykliści uwielbiają godzinami majstrować przy swoim motorze. Dbają o niego niczym o własne dziecko. Chętnie inwestują w r&oacute;żnego rodzaju gadżety, felgi, opony. Wyznają zasadę, że motocyklista to coś więcej niż styl życia.</strong></p>\r\n<h2 align=\"JUSTIFY\"><strong>WYJĄTKOWY PORTAL MOTOCYKLOWY</strong></h2>\r\n<p align=\"JUSTIFY\">Wiemy, jak trudno w tej przepastnej sieci internetowej znaleźć naprawdę warte uwagi dodatki do motocykli i motocykle. Z myślą o miłośnikach pojazd&oacute;w jednośladowych powstał wyjątkowy portal ogłoszeniowy, Ridersbuy.pl. Tutaj znajdziesz wszystko, co ma związek z pojazdami jednośladowymi.</p>\r\n<h2 align=\"JUSTIFY\"><strong>MOTO GIEŁDA</strong></h2>\r\n<p align=\"JUSTIFY\">Ridersbuy.pl. jest jedną z pierwszych stron motoryzacyjnych, na kt&oacute;rej można sprzedać bądź kupić tylko pojazdy dwukołowe, kaski, buty motocyklowe i inne akcesoria motocyklowe. I co najważniejsze &ndash; każdy użytkownik serwisu korzysta z niego za darmo! A więc możesz dodawać bezpłatnie ogłoszenia kiedy chcesz i ile chcesz!</p>\r\n<p align=\"JUSTIFY\">Zaletą zar&oacute;wno serwisu ogłoszeniowego jak i grona motocyklist&oacute;w jest jakość. Na portalu motocyklowym Ridersbuy.pl dostępne są zar&oacute;wno nowe sprzęty, jak i używane motocykle. Znajdziesz tutaj r&oacute;wnież zabytkowe perełki! Wierzymy, że każdy pojazd wystawiony na stronie jest godny polecenia, zadbany i sprawny.</p>\r\n<h2 align=\"JUSTIFY\"><strong>WYBIERZ RIDERSBUY.PL</strong></h2>\r\n<p align=\"JUSTIFY\">Jeśli zatem szukasz motocyklu, dodatk&oacute;w do niego, kasku, rękawiczek czy but&oacute;w &ndash; wbijaj do Ridersbuy.pl! Jeśli chcesz sprzedać swojego wiernego towarzysza i mieć pewność, że trafi w dobre ręce &ndash; wystaw darmowe ogłoszenie na Ridersbuy.pl!</p>\r\n<p align=\"JUSTIFY\">&nbsp;</p>\r\n<p align=\"JUSTIFY\"><em>Ridersbuy.pl. - portal ogłoszeniowy przeznaczony dla miłośnik&oacute;w pojazd&oacute;w jednośladowych...</em></p>\r\n<p>&nbsp;</p>', 1, 0, 'Ridersbuy.pl - portal dla motocyklistów.', 'Sprzedaż, kupno, porcja ciekawych informacji... wszystko na portalu motocyklowym Ridersbuy.pl!', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(88, 1, 'Warsztat/ narzędzia', 'warsztat--narzedzia', 'Warsztat/ narzędzia', '', '<p></p>\r\n<p>Motocykl jest wizyt&oacute;wką każdego motocyklisty. Należy pamiętać, by nie tylko z zewnątrz ładnie się prezentował. Dla własnego i innych bezpieczeństwa zadbaj o takie niuanse jak opony, felgi, hamulce, dźwignie czy zębatki.</p>\r\n<p>&nbsp;</p>', 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(89, 1, 'Gadżety motocyklowe / akcesori', 'gadzety-motocyklowe---akcesoria-uzywane', 'Gadżety motocyklowe / akcesoria używane', '', '<p></p>\r\n<p>Cały urok tkwi w szczeg&oacute;łach! Świetne, designerskie akcesoria do motocykli potrafią bardzo korzystnie wpłynąć na image zar&oacute;wno pojazdu jak i właściciela. Mało tego, mogą niezwykle uprzyjemnić i uwygodnić jazdę! ;)</p>\r\n<p>&nbsp;</p>', 0, 0, 'Akcesoria do motocykli. Ridersbuy.pl', 'Znajdziesz tutaj akcesoria do każdego motocyklu! Zarówno używanego jak i nowego.', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(90, 1, 'Kamery nawigacje telefony', 'kamery-nawigacje-telefony', 'Kamery, nawigacje, telefony...', '', '<p></p>\r\n<p>&hellip; i wiesz gdzie jesteś! W każdej chwili możesz skontaktować się z bliskimi, uwiecznić godne zapamiętania obrazy, zwiedzić nieznane tereny... Zam&oacute;w kamerę, nawigację albo telefon. Przymocuj go do swego motoru i jedź, gdzie oczy poniosą, czując się pewnie oraz bezpiecznie na każdej drodze.&nbsp;</p>\r\n<p>&nbsp;</p>', 0, 0, 'Gadżety do motocykli. Ridersbuy.pl', 'Kamery, nawigacje, telefony. Wszystkie niezbędne akcesoria do motocykli.', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(91, 1, 'Odzież obuwie', 'odziez-obuwie', 'Odzież/ obuwie', '', '<p>&nbsp;</p>\r\n<p>Buty motocyklowe damskie lub męskie i rękawice motocyklowe &ndash; to odpowiedni str&oacute;j dla motocyklisty czy motocyklistki. Wybierając odzież motocyklową, należy kierować się porą roku i pogodą. Ubi&oacute;r motocyklisty musi być przede wszystkim wygodny, ciepły i robić wrażenie.</p>\r\n<p>&nbsp;</p>', 0, 0, 'Odzież i buty motocyklowe. Ridersbuy.pl', 'Odzież i buty odpowiednie na przejażdżki motocyklowe dostępne w atrakcyjnych cenach!', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(92, 1, 'Kaski', 'kaski', 'kaski', '', '<p></p>\r\n<p>Kaski motocyklowe pełnią funkcję ochronną. Ich zadaniem jest ochrona głowy przed urazami. Każdy motocyklista powinien mieć dwa przy swoim motocyklu: dla siebie i dla pasażera. Nie ryzykuj, jeszcze dziś zam&oacute;w kask motocyklowy!</p>\r\n<p>&nbsp;</p>', 0, 0, 'Kaski motocyklowe. Ridersbuy.pl', 'Chroń głowę! Zamów kask motocyklowy dla siebie i dla osoby towarzyszącej!', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(93, 1, 'Motocykle', 'motocykle', 'Motocykle', '', '<p></p>\r\n<p>Na portalu ogłoszeniowym Ridersbuy.pl znajdziesz zar&oacute;wno oferty nowych jak i używanych motocykli. Dla fan&oacute;w motocykli honda mamy dobrą wiadomość &ndash; na kartach naszego serwisu pełno jest ogłoszeń z tym modelem. A miłośnicy zabytkowtych okaz&oacute;w znajdą tutaj wiekowe roczniki!</p>\r\n<p>&nbsp;</p>', 0, 0, 'Motocykle. Ridersbuy.pl', 'Motocykle używane i nowe na sprzedaż. Sprawne i w atrakcyjnych cenach.', '', 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(94, 1, 'Blacharstwo lakiernictwo', 'blacharstwo-lakiernictwo', 'Blacharstwo/ lakiernictwo', '', '<p></p>\r\n<p>Tę kategorię utworzyliśmy z myślą o tych, kt&oacute;rzy uwielbaiją godzinami udoskonalać sw&oacute;j motocykl. Materiały ścierne, zestawy lakiernicze, spawarki, kompresory... tu jest wszystko, co sprawi, że Tw&oacute;j używany motocykl będzie jak nowy!</p>\r\n<p>&nbsp;</p>', 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(95, 1, 'Oleje i smary', 'oleje-i-smary', 'Oleje i smary', '', '<p></p>\r\n<p>Jeśli chcesz, by tw&oacute;j motocykl cieszył się długo sprawnością, nie miał problem&oacute;w z korozją, a jego&nbsp;silnik by dobrze pracował &ndash; smaruj go! Tutaj znajdziesz wysokiej jakości oleje i smary, kt&oacute;re są najlepszymi przyjaci&oacute;łmi jednośladowych pojazd&oacute;w.</p>\r\n<p>&nbsp;</p>', 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(96, 1, 'serwis', 'serwis', 'Serwis', '', '<p></p>\r\n<p>Por&oacute;wnaj ceny! Zobacz ile kosztuje naprawa poszczeg&oacute;lnych części motocykli!</p>\r\n<p>&nbsp;</p>', 0, 0, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_kategoria`
--

CREATE TABLE `portal_kategoria` (
  `kta_id` int NOT NULL,
  `kta_kta_id` int DEFAULT NULL,
  `kta_nazwa` varchar(40) COLLATE utf8mb3_polish_ci NOT NULL,
  `kta_opis` text COLLATE utf8mb3_polish_ci,
  `kta_url` varchar(100) COLLATE utf8mb3_polish_ci NOT NULL,
  `kta_meta_tytul` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_meta_opis` text COLLATE utf8mb3_polish_ci,
  `kta_meta_klucze` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_widocznosc` tinyint NOT NULL DEFAULT '0',
  `kta_liczebnosc` int NOT NULL DEFAULT '0',
  `kta_lp` tinyint NOT NULL DEFAULT '0',
  `kta_nazwa_en` varchar(30) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_opis_en` text COLLATE utf8mb3_polish_ci,
  `kta_url_en` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_meta_tytul_en` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_meta_opis_en` text COLLATE utf8mb3_polish_ci,
  `kta_meta_klucze_en` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `kta_widocznosc_en` tinyint DEFAULT NULL,
  `kta_liczebnosc_en` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_kategoria`
--

INSERT INTO `portal_kategoria` (`kta_id`, `kta_kta_id`, `kta_nazwa`, `kta_opis`, `kta_url`, `kta_meta_tytul`, `kta_meta_opis`, `kta_meta_klucze`, `kta_widocznosc`, `kta_liczebnosc`, `kta_lp`, `kta_nazwa_en`, `kta_opis_en`, `kta_url_en`, `kta_meta_tytul_en`, `kta_meta_opis_en`, `kta_meta_klucze_en`, `kta_widocznosc_en`, `kta_liczebnosc_en`) VALUES
(1, NULL, 'Menu', NULL, '1-asasa', 'sasas', NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(10, 1, 'Chopper Cruiser', '<p>W tej kategorii znajdziecie mn&oacute;stwo motocykl&oacute;w Chopper i Cruiser.</p>\r\n<p>Motocykle typu Chopper to pierwotnie przerobione motory. Stały się popularne po emisji amerykańskiego filmu \"Easy Rider\". Charakteryzują się&nbsp;wąskim przednim kołem, dość mocno wysuniętym do przodu i grubą, tylną oponą. Jak sama nazwa wskazuje, choppery (top chop - odcinać) zostały pozbawione wszelkich niepotrzebnych akcesorii. Zmodernizowane motocykle powstawały gł&oacute;wnie z motocykli H-D. Dziś&nbsp;do ich produkcji wykorzystuje się najczęściej części Harleya.</p>\r\n<p>Cruiser, to motocykl odpowiedni dla podr&oacute;żnika. Posiada&nbsp;nisko położone siedzenie i kierownicę wydłużoną ku tyłowi. Bardzo dobrze widać jego silnik, ponieważ ma ubogą karoserię.&nbsp;</p>', 'chopper-cruiser', 'Motocykle Chopper Cruiser. Ridersbuy.pl', 'Oferujemy w bardzo dobrym stanie choppery cruiser.', 'chopper, choppery, chopperowe, chopperowy', 1, 0, -20, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(11, 1, 'Sportowe', '<p>Motocykl sportowy to nielada gratka dla tych, kt&oacute;rzy lubią czuć wiatr we włosach. Zostały&nbsp;zoptymalizowane pod kątem prędkości, przyspieszenia i hamowania. Może troszkę przez to komfort jazdy się pogorszył i paliwa szybciej ubywa, ale za to w końcu można się pościgać!</p>\r\n<p>Motocykle sportowe są lekkie w por&oacute;wnaniu z innymi motocyklami. Motocykle sportowe znajdziesz wśr&oacute;d takich modeli jak:&nbsp;Honda, Kawasaki, Yamaha, Suzuki,&nbsp;Ducati, MV Agusta&nbsp;czy&nbsp;Bimota.</p>', 'sportowe', 'Motocykle sportowe. Ridersbuy.pl', 'Motocykle sportowe. Super oferta! Sprawdź teraz na Ridersbuy.pl', '', 1, 0, -19, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(12, 10, 'motocykle', '', '12-motocykle', 'motocykle cruiser', 'Posiadamy motocykle chopper cruiser', 'motocykle chopper, motocykle cruiser', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, NULL, 'ffdfdf', NULL, '13-', NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(14, NULL, 'kawa', NULL, '14-kawa', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(15, NULL, 'herbata', NULL, '15-herbata', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(16, NULL, 'ffffdsssAa', NULL, '16-ffffdsssAa', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, NULL, 'cvcvcvcv', NULL, '17-cvcvcvcv', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(18, NULL, 'cxaaqw', NULL, '18-cxaaqw', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(19, NULL, 'cxaaqw', NULL, '19-cxaaqw', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(20, NULL, 'cxaaqw', NULL, '20-cxaaqw', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, NULL, 'cxaaqw1', NULL, '21-cxaaqw', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(22, 1, 'Szosowo turystyczne', '<p>Motocykle szosowo - turystyczne są kompilacją&nbsp;motocykla turystycznego i sportowego.&nbsp;Motocykle szosowo - turystyczne są o wiele bardziej wygodne niż sportowe, ale r&oacute;wnie szybkie. Wyprostowana pozycja kierowcy podczas jazdy, komfortowe siedzenie i miękkie zawieszenie - to najistotniejsze cechy, kt&oacute;re przekonują wielu miłośnik&oacute;w jednośladowc&oacute;w do zakupu.&nbsp;</p>\r\n<p>Wśr&oacute;d reprezentant&oacute;w tego typu motocykli znajdują się:&nbsp;&nbsp;Honda, Kawasaki, Yamaha, BMW.</p>', 'szosowo-turystyczne', 'Motocykle i inne produkty szosowo turystyczne. Risersbuy.pl', 'Szeroka i atrakcyjna oferta motocykli szosowo turystycznych. Motocykle używane i nowe. ', 'szosowo turystyczne', 1, 0, -18, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(25, 11, 'motocykle', '', '25-motocykle', 'Motocykle sportowe', 'Duża oferta motocykli sportowych', 'motocykle sportowe, motocyklowe, motocyklowy sport', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(27, 1, 'Cross / Enduro', '<p>Zar&oacute;wno motocykle cross jak i motocykle enduro stworzone są do wyścig&oacute;w. Jeśli uwielbiasz ścigać sie na torze czy w terenie wybierz jeden z nich!&nbsp;Motocykle typu enduro są bardzo popularne&nbsp;wśr&oacute;d początkujących motocyklist&oacute;w. Posiadają wysokie zawieszenie, opony kostki i nie są bardzo ciężkie. Motocykle typu cross bardziej sprawdzą się w jeździe po torze, niż w naturalnych warunkach. Dlatego jeśli jesteś fanem endurowania po lasach i innych wybojach wybierz enduro. A jak wolisz wyścigi na torze motocyklowym, polecamy cross.</p>', 'cross-enduro', 'Motocykle marki Cross i Enduro. Ridersbuy.pl', 'Duży wybór motocykli cross i enduro na portalu motocyklowym Ridersbuy.pl', '', 1, 0, -17, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(29, 1, 'Samochody', '<p>&nbsp;</p>\r\n<p>Dodawanie ogłoszenia na portal jest bezpłatne. Każdy, kto chce sprzedać sw&oacute;j samoch&oacute;d albo akcesoria z nim związane, niech dodaje ogłoszenie na Ridersbuy.pl! </p>', 'quady', 'Motocykle i quady. Ridersbuy.pl', 'Na serwisie ogłoszeniowym Ridersbuy.pl dodawaj za darmo ogłoszenia motocyklowe!', '', 1, 0, -15, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(30, 1, 'Części samochodowe', '<p>Dodawanie ogłoszę jest bezpłatne</p>', 'skutery-motorowery', 'Skutery i motorowery. Ridersbuy.pl', 'Skutery, motorowery i akcesoria do nich na serwisie stronie z ogłoszeniami motocyklowymi Ridersbuy.pl', '', 1, 0, -14, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(32, 1, 'Rowery', '', 'rowery', NULL, NULL, NULL, 0, 0, -12, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(34, 1, 'Akcesoria do motocykli', '<h1>Akcesoria do motocykli</h1>\r\n<p>Akcesoria do motocykli. Tutaj znajdziesz wszystko, czego potrzebujesz.</p>\r\n<p>Szeroki wyb&oacute;r akcesori&oacute;w do motocykli na każdą kieszeń. Sprzedawaj i kupuj na Ridersbuy.pl</p>', 'akcesoria-do-motocykli', 'Akcesoria do motocykli', 'Akcesoria do motocykli. Tutaj znajdziesz wszystko, czego potrzebujesz.\r\nSzeroki wyb&oacute;r akcesori&oacute;w do motocykli na każdą kieszeń. Sprzedawaj i kupuj na Ridersbuy.pl', '', 1, 0, -10, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(35, 1, 'Akumulatory / prostowniki', '', 'Kaski', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(54, 22, 'motocykle', '', '54-motocykle', 'Motocykle szosowo turystyczne', 'Polecamy motocykle szosowo turystyczne', 'motocykle szosowe, motocykle turystyczne', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(56, 29, 'dostawcze', '', '56-akcesoria', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(63, 1, 'Gadżety motocyklowe', '', 'Serwis-Ubezpieczenia', 'Gadżety do motocykli na portalu Riderbuy.pl', 'Super oferta. Bogaty wybór akcesoriów do motocykli na stronie z ogłoszeniami motoryzacyjnymi.', '', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(65, 32, 'rowery2', '', '65-rowery', NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(86, 27, 'motocykle', '', '86-motocykle', 'Motocykle cross i ednudo', 'Polecamy motocykle cross i motocykle enduro', 'motocykle cross, motocykle enduro', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(127, 30, 'części/akcesoria', '', '127-cz----ci-akcesoria', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(128, 30, 'felgi/opony', '', '128-felgi-opony', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(129, 30, 'gadżety', '', '129-gad--ety', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(131, 30, 'oleje/smary', '', '131-oleje-smary', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(132, 30, 'oświetlenie/tuning       ', '', '132-o--wietlenie-tuning-------', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(159, 1, 'Kaski', '<h1>Kaski motocyklowe</h1>\r\n<p>Kaski motocyklowe to obowiązkowy&nbsp;element wyposażenia motocyklisty. W zestawie każdy powinien mieć dwa - czasem zdarza nam się zabrać na przejażdżkę pasażera. Kaski motocyklowe chronią przed urazami, kiedy dochodzi do wypadku, podczas wstrząs&oacute;w. Aby czuć się nie tylko bezpiecznie, ale i komfortowo, dobierz kaski do swoich predyspozycji. Warto więc zwr&oacute;cić uwagę, jaki preferowane przez nas kaski motocyklowe mają rodzaj wyści&oacute;łki wnętrza, czy posiadają wbudowaną blendę przeciwsłoneczną z filtrem UV albo zintegrowane gogle. Na naszym portalu motocyklowym znajdziesz r&oacute;żnego rodzaju kaski motycklowe: od używanych po zupełnie&nbsp;nowe, mniej lub baedziej znanych marek. Tutaj jest miejsce dla Was, drodzy motocykliści! Zapraszamy do przeglądania, kupowania i sprzedawania własnych kask&oacute;w!</p>', 'Kamery-Nawigacja-Akcesoria', 'Kaski motocyklowe. Ridersbuy.pl', 'Chroń głowę! Zamów kask motocyklowy dla siebie i dla osoby towarzyszącej!', '', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(190, 30, 'silnik/osprzęt/zawieszenie', '', '190-silnik-osprz--t-zawieszenie', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(191, 30, 'inne', '', '191-inne', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(271, 1, 'Odzież/obuwie', '<h1>ODZIEŻ MOTOCYKLOWA I BUTY MOTOCYKLOWE</h1>\r\n<p>Odzież motocyklowa dla pań i pan&oacute;w. Tutaj znajdziesz odpowiednie ubranie na przejażdzki motocyklem. Zapoznaj się z oferowanymi przez motocyklist&oacute;w i renomowane sklepy&nbsp;kurtkami, spodniami, kombinezonami i butami motocyklowymi. Na chłodniejsze dni proponujemy też zaopatrzeć się w specjalne rękawice motocyklowe.</p>\r\n<p>Mimo, że zimą pruszy śnieg i łatwo można zmarznąć, nie musisz rezygnować ze swojej pasji! Zajrzyj tutaj, a znajdziesz odzież motocyklową ocieplaną i termoaktywną. W ofercie mamy r&oacute;wnież buty&nbsp;motocyklowe damskie i męskie. Znajdziesz tutaj buty przyjazne dla Twojej stopy&nbsp;i portfela.</p>', 'odziez_obuwie', 'Odzież i buty motocyklowe. Ridersbuy.pl', 'Odzież i buty odpowiednie na przejażdżki motocyklowe dostępne w atrakcyjnych cenach!', '', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(274, 159, 'motocyklowe', '', 'motocyklowe', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(279, 159, 'akcesoria do kasków', '', 'akcesoria-do-kask--w', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(281, 274, 'enduro', '', 'enduro', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(283, 274, 'braincap', '', 'braincap', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(284, 274, 'integralne/modułowe', '', 'integralne-modu--owe', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(285, 274, 'otwarte/szczękowe', '', 'otwarte-szcz--kowe', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(292, 271, 'czapki/chusty', '', 'czapki-chusty', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(295, 271, 'gogle/okulary', '', 'gogle-okulary', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(296, 271, 'kołnierze/kominiarki/maski', '', 'ko--nierze-kominiarki-maski', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(298, 271, 'odzież/obuwie', '', 'odzie---obuwie', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(299, 271, 'ochraniacze/zbroje-żółw', '', 'ochraniacze-zbroje-------w', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(300, 271, 'pasy nerkowe', '', 'pasy-nerkowe', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(301, 271, 'rękawice', '', 'r--kawice', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(302, 271, 'pozostałe', '', 'pozosta--e', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(303, 1, 'Oleje i smary', '', 'Oleje-i-smary', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(304, 1, 'Serwis / ubezpieczenia', '', 'Serwis---ubezpieczenia', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(305, 1, 'Warsztat / narzędzia', '', 'Warsztat---narz--dzia', NULL, NULL, NULL, 1, 0, -11, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(306, 304, 'serwis', '', 'serwis', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(308, 305, 'wyposażenie warsztatowe', '', 'wyposa--enie-warsztatowe', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(310, 305, 'części/akcesoria', '', 'cz----ci-akcesoria', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(313, 303, 'oleje i smary', '', 'oleje-i-smary2', '', '', '', 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(314, 303, 'filtry', '', 'filtry', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(315, 303, 'płyny', '', 'p--yny', NULL, NULL, NULL, 1, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(316, 29, 'dostawcze', '', 'dostawcze', NULL, NULL, NULL, 0, 0, 0, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_kategoria_cecha`
--

CREATE TABLE `portal_kategoria_cecha` (
  `kca_id` int NOT NULL,
  `kca_kta_id` int NOT NULL,
  `kca_cha_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_kategoria_cecha`
--

INSERT INTO `portal_kategoria_cecha` (`kca_id`, `kca_kta_id`, `kca_cha_id`) VALUES
(1, 1, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_kategoria_usluga`
--

CREATE TABLE `portal_kategoria_usluga` (
  `kua_id` int NOT NULL,
  `kua_kta_id` int DEFAULT NULL,
  `kua_usa_id` int DEFAULT NULL,
  `kua_okres` smallint DEFAULT NULL,
  `kua_wyroznienie` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_kategoria_usluga`
--

INSERT INTO `portal_kategoria_usluga` (`kua_id`, `kua_kta_id`, `kua_usa_id`, `kua_okres`, `kua_wyroznienie`) VALUES
(1, 10, 4, 14, 1),
(2, 10, 3, 14, 0),
(3, 12, 8, 14, 1),
(4, 12, 5, 14, 0),
(5, 12, 7, 28, 0),
(6, 12, 9, 28, 1),
(7, 25, 5, 14, 0),
(8, 25, 8, 14, 1),
(9, 25, 7, 28, 0),
(10, 25, 9, 28, 1),
(11, 54, 5, 14, 0),
(12, 54, 8, 14, 1),
(13, 54, 7, 28, 0),
(14, 54, 9, 28, 1),
(15, 86, 5, 14, 0),
(16, 86, 8, 14, 1),
(17, 86, 7, 28, 0),
(18, 86, 9, 28, 1),
(19, 28, 3, 14, 0),
(20, 28, 4, 14, 1),
(21, 28, 4, 28, 0),
(22, 28, 6, 28, 1),
(23, 29, 3, 14, 0),
(24, 29, 4, 14, 1),
(25, 29, 4, 28, 0),
(26, 29, 6, 28, 1),
(27, 30, 3, 14, 0),
(28, 30, 4, 14, 1),
(29, 30, 4, 28, 0),
(30, 30, 6, 28, 1),
(31, 31, 3, 14, 0),
(32, 31, 4, 14, 1),
(33, 31, 4, 28, 0),
(34, 31, 6, 28, 1),
(39, 33, 3, 14, 0),
(40, 33, 4, 14, 1),
(41, 33, 4, 28, 0),
(42, 33, 6, 28, 1),
(43, 10, 4, 28, 0),
(44, 10, 6, 28, 1),
(45, 11, 3, 14, 0),
(46, 11, 5, 14, 1),
(47, 11, 4, 28, 0),
(48, 11, 7, 28, 1),
(49, 22, 3, 14, 0),
(50, 22, 4, 14, 1),
(51, 22, 4, 28, 0),
(52, 22, 6, 28, 1),
(53, 27, 3, 14, 0),
(54, 27, 4, 14, 1),
(55, 27, 4, 28, 0),
(56, 27, 6, 28, 1),
(61, 113, 5, 14, 0),
(62, 113, 8, 14, 1),
(63, 113, 7, 28, 0),
(64, 113, 9, 28, 1),
(65, 126, 5, 14, 0),
(66, 126, 8, 14, 1),
(67, 126, 7, 28, 0),
(68, 126, 9, 28, 1),
(69, 125, 5, 14, 0),
(70, 125, 8, 14, 1),
(71, 125, 7, 28, 0),
(72, 125, 9, 28, 1),
(73, 124, 5, 14, 0),
(74, 124, 8, 14, 1),
(75, 124, 7, 28, 0),
(76, 124, 9, 28, 1),
(77, 55, 5, 14, 0),
(78, 55, 8, 14, 1),
(79, 55, 7, 28, 0),
(80, 55, 9, 28, 1),
(81, 76, 5, 14, 0),
(82, 76, 8, 14, 1),
(83, 76, 7, 28, 0),
(84, 76, 9, 28, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_newsletter`
--

CREATE TABLE `portal_newsletter` (
  `nst_id` int NOT NULL,
  `nst_email` varchar(150) COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_newsletter`
--

INSERT INTO `portal_newsletter` (`nst_id`, `nst_email`) VALUES
(1, 'sebastiank31@gmail.com'),
(11, 'pawel.adamiak@designspektrum.pl'),
(14, 'spektrum173@gmail.com'),
(16, 'spektrum.spektrum@o2.pl'),
(17, 'pradzimowski@gmail.com'),
(18, 'pawel@radzimowski.com'),
(20, 'zygzakvtx@gmail.com'),
(21, 'robertsternik@wp.pl'),
(22, 'picasco@poczta.pl'),
(23, 'Mondeo3@op.pl'),
(24, 'ewzarebska@gmail.com'),
(25, 'marika-owsiak@wp.pl'),
(26, 'asd@asd.pl'),
(27, 'carbafos68@mail.ru'),
(28, 'bykovaalla9@gmail.com'),
(29, 'allaafonina52@gmail.com'),
(30, 'ccady337@aol.com'),
(31, 'georgegallardo2009@gmail.com'),
(32, 'alexromani7@yahoo.com'),
(33, 'briannguyen66@yahoo.com'),
(34, 'equinones3@gmail.com'),
(35, 'wjlu99@gmail.com'),
(36, 'cindy.hasty@bellsouth.net'),
(37, 'pmccue@allaboutkidsteeth.com'),
(38, 'jgeehrer@twcny.rr.com'),
(39, 'hbzheng@uchicago.edu'),
(40, 'hughsmith@rogers.com'),
(41, 'jonathan.oreilly@me.com'),
(42, 'marksanderson@clara.co.uk'),
(43, 'amandac1@sbcglobal.net'),
(44, 'mr.pakiboy@gmail.com'),
(45, 'gfelty417@charter.net'),
(46, 'moonchild624@gmail.com'),
(47, 'denallcon@gmail.com'),
(48, 'jasonm@rapid-imports.com'),
(49, 'instrep1@roadrunner.com'),
(50, 'donnav@karenkane.com'),
(51, 'clean122897@yahoo.com'),
(52, 'MREED@TEAMBMS.COM'),
(53, 'a_dzakula@yahoo.com'),
(54, 'brockb92@hotmail.com'),
(55, 'sherylcreech@creechsplumbing.com'),
(56, 'KATHY@GREENGOODSNURSERY.COM'),
(57, 'franciscotylor15@gmail.com'),
(58, 'cassandra.c.horton@gmail.com'),
(59, 'wcoscarelli@wdsullivanco.com'),
(60, 'jeffg@kwgadv.com'),
(61, 'korries3@yahoo.com'),
(62, 'econnor333@gmail.com'),
(63, 'leliabusha@gmail.com'),
(64, 'facegal17@aol.com'),
(65, 'linlanae@yahoo.com'),
(66, 'BKAZANAS@YAHOO.COM'),
(67, 'bernard_ward@aol.com'),
(68, 'JAMESDOVER75@gmail.com'),
(69, 'wagerman@bellsouth.net'),
(70, 'blackcelica23@aol.com'),
(71, 'henry.womble@yahoo.com'),
(72, 'justin@aadya.vc'),
(73, 'sue.fliess@gmail.com'),
(74, 'alfredo_berumen@juno.com'),
(75, 'jaetjville@gmail.com'),
(76, 'Rajnisharma1973@yahoo.com'),
(77, 'seatrain.cht@gmail.com'),
(78, 'fussellk@bellsouth.net'),
(79, 'meganlin@hotmail.com'),
(80, 'holmseylad@yahoo.co.uk'),
(81, 'tncarters@comcast.net'),
(82, 'cj8695@yahoo.com'),
(83, 'collectorqueen@verizon.net'),
(84, 'hebbar_k@hotmail.com'),
(85, 'SONJAHARRIS66@GMAIL.COM'),
(86, 'jrramsgate2@yahoo.com'),
(87, 'pchafe67@gmail.com'),
(88, 'gemski1@hotmail.com'),
(89, 'juansmommy13@yahoo.com'),
(90, 'lgc5vette@charter.net'),
(91, 'michael.bielick@unisys.com'),
(92, 'nlosh@aol.com'),
(93, 'aoconnor@tekworks.com'),
(94, 'gmcneil1260@yahoo.com'),
(95, 'alison@iflock.org'),
(96, 'Owen@sykatz.com'),
(97, 'niksternick1@gmail.com'),
(98, 'sahilycorrea@yahoo.com'),
(99, 'cwang12001@yahoo.com'),
(100, 'es1960a@student.american.edu'),
(101, 'sehajc@gmail.com'),
(102, 'al68vet@yahoo.com'),
(103, 'lexid98@gmail.com'),
(104, 'melody4853@sbcglobal.net'),
(105, 'chikuri456@gmail.com'),
(106, 'runnerx724@yahoo.com'),
(107, 'sri3179@gmail.com'),
(108, 'rajnishrajnishsharma@yahoo.co.in'),
(109, 'bimiller@yahoo.com'),
(110, 'jaredswan_21@hotmail.com'),
(111, 'jasont.anderson@icloud.com'),
(112, 'mtkrug418@gmail.com'),
(113, 'jburton48@hotmail.com'),
(114, 'sylcas87s@ameritech.net'),
(115, 'jli5@brynmawr.edu'),
(116, 'kwirgau99@yahoo.com'),
(117, 'hehe_tiger@yahoo.com'),
(118, 'Frankt@ftmechanicalinc.com'),
(119, 'claudeh@sysolinc.com'),
(120, 'socialprepper@gmail.com'),
(121, 'cheshirechef1@yahoo.com'),
(122, 'lhhotbasil@att.net'),
(123, 'lisa@botticelliandpohl.com'),
(124, 'jpyott@mbhrc.com'),
(125, 'tshillingtonsr@gmail.com'),
(126, 'theo.park@snapchat.com'),
(127, 'rhynz0410@gmail.com'),
(128, 'mbracken@bcps.org'),
(129, 'tubaleslie@me.com'),
(130, 'chrispapadatos87@yahoo.com'),
(131, 'davestepina@optonline.net'),
(132, 'mchapmansd@gmail.com'),
(133, 'fatture@car-zone.it'),
(134, 'PAUL@BADYRUEL.COM'),
(135, 'pakalakarthik1@gmail.com'),
(136, 'things4u2@yahoo.com'),
(137, 'tonitrapani@gmail.com'),
(138, 'mirellarodriguez_07@yahoo.com'),
(139, 'lacasadecarlo@ymail.com'),
(140, 'afigu103@hotmail.com'),
(141, 'mollysandtan@gmail.com'),
(142, 'austinellis89@gmail.com'),
(143, 'pennander009@gmail.com'),
(144, 'kebrith92@gmail.com'),
(145, 'ciprian.ene@gmail.com'),
(146, 'jkim.kp@gmail.com'),
(147, 'rchovatiya88@gmail.com'),
(148, 'vilebvevlav@gmail.com'),
(149, 'scott@ventnorsportscafe.com'),
(150, 'azmathullah32@gmail.com'),
(151, 'marnihonaker@gmail.com'),
(152, 'wanderlust014@gmail.com'),
(153, 'makemws@yahoo.com'),
(154, 'brenda@milfeld.com'),
(155, 'dingwen888@yahoo.com'),
(156, 'ZhaofengZeng@gmail.com'),
(157, 'xiaozhong.zhang@utoledo.edu'),
(158, 'ya4design@yahoo.com'),
(159, 'bennie213@sbcglobal.net'),
(160, 'timinsd23@gmail.com'),
(161, 'connerh@me.com'),
(162, 'jose.araullo@nychhc.org'),
(163, 'ctcubbie@rediffmail.com'),
(164, 'chuck@maltproducts.com'),
(165, 'bsc02@hotmail.com'),
(166, 'gregoryfaery@bellsouth.net'),
(167, 'aashik420@excite.com'),
(168, 'chambers_marie@yahoo.com'),
(169, 'prodev88@gmail.com'),
(170, 'Estrellauy@hotmail.com'),
(171, 'lz0j57@gmail.com'),
(172, 'kingcorey1221@gmail.com'),
(173, 'tamisha.young@yahoo.com'),
(174, 'DSCUBADIVE@YAHOO.COM'),
(175, 'earn_hardtfan@myway.com'),
(176, 'brittany@aquatecus.com'),
(177, 'beings225@hotmail.com'),
(178, 'kthompson43@verizon.net'),
(179, 'schekta02@aol.com'),
(180, 'christianmigliore@free.fr'),
(181, 'fawcett_jack@yahoo.com'),
(182, 'wvb@comcast.net'),
(183, 'badjou@optonline.net'),
(184, 'rdtimberlake@netscape.net'),
(185, 'sunnyarora5684@gmail.com'),
(186, 'gugarecife@hotmail.com'),
(187, 'deborahafanning@gmail.com'),
(188, 'dylandiantonio@gmail.com'),
(189, 'joncleva@gmail.com'),
(190, 'knastav@martin-mech.com'),
(191, 'Sfhconsultants@aol.com'),
(192, 'tttooner@comcast.net'),
(193, 'maxgonzales@hotmail.it'),
(194, 'timgarrett@buckeyeweb.com'),
(195, 'andyserwer@gmail.com'),
(196, 'w4kkw@aol.com'),
(197, 'rockyxu@me.com'),
(198, 'andykartiganer@gmail.com'),
(199, 'ccox37@bellsouth.net'),
(200, 'moh.baabit@gmail.com'),
(201, 'montse@garrigagrup.com'),
(202, 'kiki_voyage@live.cn'),
(203, 'jordystewart31@gmail.com'),
(204, 'jfshull63@gmail.com'),
(205, 'brodriguez@varietyfoodspr.com'),
(206, 'egosumpater@yahoo.com'),
(207, 'brendavarelaa@gmail.com'),
(208, 'dbrown@bdlawfirm.com'),
(209, 'DMOOREBUILD@AOL.COM'),
(210, 'nanko.novatchkov@klinikum-coburg.de'),
(211, 'jfunck@ingragistics.com'),
(212, 'cooldaddee@hotmail.com'),
(213, 'michaeljuulthomsen@me.com'),
(214, 'amarkstar@gmail.com'),
(215, 'autos@cgocable.ca'),
(216, 'dontknowshiz@gmail.com'),
(217, 'tcr10112@gmail.com'),
(218, 'patsyrasmussen@aol.com'),
(219, 'buckleykmxfr@aol.com'),
(220, 'mattl@web.de'),
(221, 'brycedestinedlover@yahoo.com'),
(222, 'tiffanytinney@yahoo.com'),
(223, 'yao50@hotmail.com'),
(224, 'matty.mas95@hotmail.it'),
(225, 'GMONTGOMERYPROTECT@GMAIL.COM'),
(226, 'dling8@gmail.com'),
(227, 'cindyturbeville@yahoo.com'),
(228, 'ashleighmcfarlin@aol.com'),
(229, 'kcord123@netzero.com'),
(230, 'NICK.WALKER@AVENUENASHVILLE.COM'),
(231, 'teresaakel@gmail.com'),
(232, 'james.henry3@nscorp.com'),
(233, 'kingsballdancecomp@aol.com'),
(234, 'aurlenecalif@aol.com'),
(235, 'accounting@icsserka.com'),
(236, 'ckerner2@me.com'),
(237, 'twstedtheory22@yahoo.com'),
(238, 'bkreuer@yahoo.com'),
(239, 'eltonpeace12345@gmail.com'),
(240, 'astrid.angeline@gmail.com'),
(241, 'forcl@sonic.net'),
(242, 'amadi57@att.net'),
(243, 'jarigarcia@sbcglobal.net'),
(244, 'dstodolski@godental365.com'),
(245, 'jph@goldsteinhayes.com'),
(246, 'greenshante39@gmail.com'),
(247, 'rajesh.jagadeesan@gmail.com'),
(248, 'lynknield@gmail.com'),
(249, 'crispin54@gmail.com'),
(250, 'bibourk@yahoo.com'),
(251, 'yozhoney.kimi@hotmail.com'),
(252, 'saphiemarie2000@gmail.com'),
(253, 'manuel_angeles@verizon.net'),
(254, 'brianandfran@gmail.com'),
(255, 'smampre@yahoo.com'),
(256, 'lmcdonald149@aol.com'),
(257, 'stefenw93@hotmail.com'),
(258, 'ishtarl1956@yahoo.com'),
(259, 'leoweis@aol.com'),
(260, 'isaac@lhrgoup.com'),
(261, 'dvasaya@gmail.com'),
(262, 'jerm171717@gmail.com'),
(263, 'cbehan@student.norwich.edu'),
(264, 'cyber50@comcast.net'),
(265, 'roadagent@cox.net'),
(266, 'dookie3280@aol.com'),
(267, 'baycityart1@mail.com'),
(268, 'carmenlychow@yahoo.com'),
(269, 'bwilliamson@nsd131.org'),
(270, 'kellimatt69@gmail.com'),
(271, 'nmiller@veincenters.com'),
(272, 'ahoym8t@yahoo.com'),
(273, 'bobomirus@yahoo.com'),
(274, 'vaughntyl1620@yahoo.com'),
(275, 'steveguensler@gmail.com'),
(276, 'c2farr@sbcglobal.net'),
(277, 'mjreischl@wi.rr.com'),
(278, 'dkenjura@sbcglobal.net'),
(279, 'bebi183@hotmail.com'),
(280, 'j_meetze89mustang@yahoo.com'),
(281, 'skutan@aol.com'),
(282, 'sheera@sheerala.com'),
(283, 'DANIELJDOHERTY@HOTMAIL.COM'),
(284, 'pastortw@hotmail.com'),
(285, 'davecowles3@gmail.com'),
(286, 'lauraewolfram@yahoo.com'),
(287, 'brumekam@yahoo.com'),
(288, 'jrigby_29@icloud.com'),
(289, 'lstoney6@gmail.com'),
(290, 'justjademartin@gmail.com'),
(291, 'haynes@rowan.edu'),
(292, 'vlopezc1@ithaca.edu'),
(293, 'japytlik@yahoo.com'),
(294, 'rlandgrebe2006@gmail.com'),
(295, 'sjwillette@comcast.net'),
(296, 'nyr73mets@yahoo.com'),
(297, 'polaca1971@live.com'),
(298, 'burgess751@yahoo.com'),
(299, 'labberton@gmail.com'),
(300, 'ken.haff@gmail.com'),
(301, 'jvmorrison@gmail.com'),
(302, 'gkm7404@naver.com'),
(303, 'mterry121@yahoo.com'),
(304, 'arclipper@yahoo.com'),
(305, 'trnsdoctorr2@gmail.com'),
(306, 'jennibe84@msn.com'),
(307, 'pulip1213@Hotmail.com'),
(308, 'areilly33@gmail.com'),
(309, 'JLarson312@gmail.com'),
(310, 'andreea.pavel@afsromania.ro'),
(311, 'dtrieb@hotmail.com'),
(312, 'makram0506@gmail.com'),
(313, 'shannonsrawls@yahoo.com'),
(314, 'Jeff@prestopasta.com'),
(315, 'blythedaly@yahoo.com'),
(316, 'alvin.mcnabb@yahoo.com'),
(317, 'Joni3988@comcast.net'),
(318, 'mmbangels3@yahoo.com'),
(319, 'eddiemaxjams@yahoo.com'),
(320, 'staay-hispa@staayfoodgroup.com'),
(321, 'lianamireaafs9@gmail.com'),
(322, 'rkuckelman@yahoo.com'),
(323, 'burt@arnowitz.net'),
(324, 'triangle2@frontienet.net'),
(325, 'jamian@gmail.com'),
(326, 'atessler1@gmail.com'),
(327, 'frank@auntbutchies.com'),
(328, 'gospapil@hotmail.com'),
(329, 'gberba@comcast.net'),
(330, 'kdziuk@roadrunner.com'),
(331, 'ewilson002@gmail.com'),
(332, 'richard.j.hazzouri@ms.com'),
(333, 'bob@manlysteel.com'),
(334, 'hjeffcoat1@aol.com'),
(335, 'lambwood@earthlink.net'),
(336, 'tink_abell1974@yahoo.co.uk'),
(337, 'mckeera@oakfarmsangus.com'),
(338, 'mamos@maine.rr.com'),
(339, 'tlftatum78@aol.com'),
(340, 'kamleshp30@yahoo.com'),
(341, 'darchuleta@gmail.com'),
(342, 'jefferdr@gmail.com'),
(343, 'Cifrians@bellsouth.net'),
(344, 'lizzybaby33@aol.com'),
(345, 'pebblesduck82@gmail.com'),
(346, 'micahcabrera@gmail.com'),
(347, 'marshallbartlett@me.com'),
(348, 'ranellsloan93@gmail.com'),
(349, 'yayaleon@gmail.com'),
(350, 'jonnydiamond@hotmail.com'),
(351, 'ladelley6@gmail.com'),
(352, 'clong837@gmail.com'),
(353, 'vickygk498@aol.com'),
(354, 'rogie_wright@yahoo.com'),
(355, 'peter.emerson@mac.com'),
(356, 'rylandhilbert@gmail.com'),
(357, 'harry@sardanis.com'),
(358, 'james1smith1@gmail.com'),
(359, 'progers944@hotmail.com'),
(360, 'kccmonaco@aol.com'),
(361, 'bpalka@roadrunner.com'),
(362, 'joanne@willifordcpa.com'),
(363, 'david.acott@gmail.com'),
(364, 'bleeteacher@aol.com'),
(365, 'closetfactorysd@sbcglobal.net'),
(366, 'frankcrit484@gmail.com'),
(367, 'don.tatum@gmail.com'),
(368, 'garrettcry@gmail.com'),
(369, 'tmkelly@debevoise.com'),
(370, 'jtouchette1@yahoo.com'),
(371, 'stezzystiles@gmail.com'),
(372, 'spencer.bland@gmail.com'),
(373, 'chipstein1@outlook.com'),
(374, 'PHOTOBYVIN@comcast.net'),
(375, 'danny@topperlimo.com'),
(376, 'carlatigue68@gmail.com'),
(377, 'elya848586@gmail.com'),
(378, 'emmat@yahoo.com'),
(379, '4alegup@gmail.com'),
(380, 'ccmcloud@comcast.net'),
(381, 'edmur@charter.net'),
(382, 'pconway@mlmic.com'),
(383, 'neilpadover@gmail.com'),
(384, 'pikeminnow9@frontiernet.net'),
(385, 'linda@foxhuntland.com'),
(386, 'mduffy@chmiowa.org'),
(387, 'eugenebhong@gmail.com'),
(388, 'elyse.corwin@mckay-brothers.com'),
(389, 'roger.haggerty2@gmail.com'),
(390, 'batesdnd@aol.com'),
(391, 'lparco@gmail.com'),
(392, 'narenv@yahoo.com'),
(393, 'robertcmillerjr@aol.com'),
(394, 'mygracepoint@gmail.com'),
(395, 'vladinov.vladimir@gmail.com'),
(396, 'ajh@evimgt.com'),
(397, 'cookiesvab@aol.com'),
(398, 'bwhitstone@gmail.com'),
(399, 'lauryn.goldstein@heart.org'),
(400, 'charleen.nagy@heart.org'),
(401, 'orlowh24@aol.com'),
(402, 'josemedina201.cell@gmail.com'),
(403, 'jesse.l.chen@gmail.com'),
(404, 'coopmon@knology.net'),
(405, 'TFC@TCONDONLAW.COM'),
(406, 'chrystalde@comcast.net'),
(407, 'mariamontes1980@msn.com'),
(408, 'punitmshah@gmail.com'),
(409, 'bradastahl@gmail.com'),
(410, 'mmorello05@yahoo.com'),
(411, 'robmahaz@att.net'),
(412, 'greg.pitts@primerica.com'),
(413, 'surajtolani@yahoo.com'),
(414, 'cchen0822@gmail.com'),
(415, 'crystalmalchukhair@gmail.com'),
(416, 'rrenzullo@gmail.com'),
(417, 'letitiamaye@aol.com'),
(418, 'mark_potter@rogers.com'),
(419, 'torres.michelled292t@yahoo.com'),
(420, 'tbaxter@rochester.com'),
(421, 'e.hoff7@verizon.net'),
(422, 'adrianabanguera@icloud.com'),
(423, 'abchiappetta@hotmail.com'),
(424, 'rickmelaragni@gmail.com'),
(425, 'airis0904@hotmail.com'),
(426, 'hcohen14@gmail.com'),
(427, 'jefashap@aol.com'),
(428, 'mbrillanti@att.net'),
(429, 'hartnerr68@gmail.com'),
(430, 'j-e.bodri@comcast.net'),
(431, 'Seifertp@gmail.com'),
(432, 'ccrupi@cox.net'),
(433, 'keith@agmllc.com'),
(434, 'arrsma68@outlook.com'),
(435, 'christopherjkearns@gmail.com'),
(436, 'ian.cropp@gmail.com'),
(437, 'amvickery@comcast.net'),
(438, 'lrosa@frontiernet.net'),
(439, 'Nienadrake@Gmail.com'),
(440, 'admin@ontimenj.com'),
(441, 'rz_dstny@yahoo.com'),
(442, 'sarahkatechamp@gmail.com'),
(443, 'pcicala@cicalaonline.com'),
(444, 'TNUNN27413@AOL.COM'),
(445, 'cherie.a.peterson@doc.state.or.us'),
(446, 'rosscarter0816@gmail.com'),
(447, 'sasey99@aol.com'),
(448, 'fuad.egeli@gmail.com'),
(449, 'sridharamurthy.srinivasan@gmail.com'),
(450, 'TSWYGERT@me.com'),
(451, 'lancep82@comcast.net'),
(452, 'tom@tomdarnall.com'),
(453, 'tareqelk@gmail.com'),
(454, 'letsfellowship@hotmail.com'),
(455, 'synn211@gmail.com'),
(456, 'joecutrera106@yahoo.com'),
(457, 'PAUL@PROSPERITYTRUCKING.COM'),
(458, 'silverqsy@gmail.com'),
(459, 'jeff.breloski@gmail.com'),
(460, 'ATORRES@HOSPICEONCALL.COM'),
(461, 'dgaudette2011@hotmail.com'),
(462, 'matt@room-search.co.uk'),
(463, 'arcan.miles@gmail.com'),
(464, 'harvjo@googlemail.com'),
(465, 'joojobruno@gmail.com'),
(466, 'tcfranks@torchmarkcorp.com'),
(467, 'mattmasak15@yahoo.com'),
(468, 'kmproduct@yahoo.com'),
(469, 'info@ntetinc.com'),
(470, 'MCDOWELLC@GMAIL.COM'),
(471, 'rjrosati@mac.com'),
(472, 'jporcarelli@grosselle.com'),
(473, 'chrissy@opcatl.com'),
(474, 'lueve55@gmail.com'),
(475, 'TIM.LIMON@GMAIL.COM'),
(476, 'hairjjojo@gmail.com'),
(477, 'toc14@aol.com'),
(478, 'BUBBA@BUBBASAMUELS.COM'),
(479, 'barbm20079@live.com'),
(480, 'momfpmd@gmail.com'),
(481, 'balsam7777@gmail.com'),
(482, 'kcampb8580@ameritech.net'),
(483, 'jannick.nouvelle9@orange.fr'),
(484, 'littlejo1225@hotmail.com'),
(485, 'sjlh1954@hotmail.com'),
(486, 'ahnbae1@hanmail.net'),
(487, 'michaelballison@icloud.com'),
(488, 'algernol@comcast.net'),
(489, 'plouffe250@yahoo.com'),
(490, 'JADMD7@YAHOO.COM'),
(491, 'linglingliu16@yahoo.com'),
(492, 'Chrystal.christopher@gmail.com'),
(493, 'ap@centroinc.com'),
(494, 'Adamjsiegler@Gmail.Com'),
(495, 'afarcas05@hotmail.com'),
(496, 'BARBARAKIDDO22@MSN.COM'),
(497, 'chargeme@verizon.net'),
(498, 'beverage112@hotmail.com'),
(499, 'dylan.begnaud@gmail.com'),
(500, 'rosspatj@att.net'),
(501, 'yato124495@yahoo.com'),
(502, 'shkimpk@gmail.com'),
(503, 'eddiegjr@att.net'),
(504, 'kgibb@mailwest.net'),
(505, 'dailysa@aol.com'),
(506, 'robbinsd66@gmail.com'),
(507, 'aditibajpayi@google.com'),
(508, 'SUNSHINECAM24@HOTMAIL.COM'),
(509, 'james108108@yahoo.com'),
(510, 'kakavanagh@gmail.com'),
(511, 'cmschmittaz@gmail.com'),
(512, 'delorian33@comcast.net'),
(513, 'lilkid904@gmail.com'),
(514, 'apwrwla@yahoo.com'),
(515, 'rmhahn8898@yahoo.com'),
(516, 'dceferino@yahoo.es'),
(517, 'alfremadd30@hotmail.es'),
(518, 'kentuh@gmail.com'),
(519, 'bigmac600@comcast.net'),
(520, 'jeffnjen7@comcast.net'),
(521, 'obsd@mwt.net'),
(522, 'weicao@gmail.com'),
(523, 'lemleydw@yahoo.com'),
(524, 'Mpoustinchi@yahoo.com'),
(525, 'linton_jones@bellsouth.net'),
(526, 'mario.tano3@gmail.com'),
(527, 'edwinmontanez@gmail.com'),
(528, 'mbuckle72@live.com'),
(529, 'slgrey2@aol.com'),
(530, 'swimjanet@gmail.com'),
(531, 'guillaume.roche@ieseg.fr'),
(532, 'alexgreenberg8646@yahoo.com'),
(533, 'ESPIRITUS@GMAIL.COM'),
(534, 'DWARFS_MOM@YAHOO.COM'),
(535, 'elravello@comcast.net'),
(536, 'andi.ireland@hotmail.co.uk'),
(537, 'rich198406@hotmail.co.uk'),
(538, 'kerry_fagg@yahoo.co.uk'),
(539, 'spidergator1@yahoo.com'),
(540, 'jwalits1@yahoo.com'),
(541, 'ronsaf@rocketmail.com'),
(542, 'jschimp@usfamily.net'),
(543, 'ncarr@enontab.org'),
(544, 'whitepe59@hotmail.com'),
(545, 'b0ndie@live.co.uk'),
(546, 'erinmac@live.co.uk'),
(547, 'beckylouj82@yahoo.co.uk'),
(548, 'emin@ysrcpas.com'),
(549, 'LCORRIVEAU@WARRENSINCLAIR.COM'),
(550, 'taiwantl@gmail.com'),
(551, 'chris@ajcpas.com'),
(552, 'eunjung66@gmail.com'),
(553, 'stacey@advancehomespecialty.com'),
(554, 'CNOBLES@DICOMSOFTWARE.COM'),
(555, 'stclo3@yahoo.com'),
(556, 'ryan20081906@live.co.uk'),
(557, 'whoisnicknelson@gmail.com'),
(558, 'scault15@yahoo.com'),
(559, 'DRNn_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(560, 'mKzX_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(561, 'g7M2_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(562, 'awEH_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(563, 'a01Y_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(564, 'yfmq_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(565, 'DR4H_generic_c52e8514_ridersbuy.shop@data-backup-store.com'),
(566, 'yaahab@any.pink'),
(567, 'Mkd2_generic_c52e8514_ridersbuy.shop@data-backup-store.com');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_ogloszenie`
--

CREATE TABLE `portal_ogloszenie` (
  `oge_id` int NOT NULL,
  `oge_uzk_id` int DEFAULT NULL,
  `oge_kta_id` int DEFAULT NULL,
  `oge_data_dodania` datetime DEFAULT NULL,
  `oge_data_koniec` date DEFAULT NULL,
  `oge_wyrozniony_data_koniec` date DEFAULT NULL,
  `oge_okres` tinyint DEFAULT NULL,
  `oge_nazwa` varchar(80) COLLATE utf8mb3_polish_ci NOT NULL,
  `oge_opis` text COLLATE utf8mb3_polish_ci,
  `oge_ilosc` int DEFAULT NULL,
  `oge_widmo` tinyint DEFAULT NULL,
  `oge_aktywny` tinyint DEFAULT NULL,
  `oge_wyrozniony` tinyint DEFAULT NULL,
  `oge_polecany` tinyint DEFAULT NULL,
  `oge_cena` decimal(7,2) DEFAULT NULL,
  `oge_url` varchar(200) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `oge_meta_tytul` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `oge_meta_opis` text COLLATE utf8mb3_polish_ci,
  `oge_meta_klucze` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `oge_lp` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_ogloszenie_cecha`
--

CREATE TABLE `portal_ogloszenie_cecha` (
  `tca_id` int NOT NULL,
  `tca_oge_id` int NOT NULL,
  `tca_cha_id` int NOT NULL,
  `tca_magazyn` tinyint NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_ogloszenie_wartosc`
--

CREATE TABLE `portal_ogloszenie_wartosc` (
  `twc_id` int NOT NULL,
  `twc_oge_id` int NOT NULL,
  `twc_wtc_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_pakiet`
--

CREATE TABLE `portal_pakiet` (
  `pkt_id` int NOT NULL,
  `pkt_usa_id` int DEFAULT NULL,
  `pkt_nazwa` varchar(100) COLLATE utf8mb3_polish_ci NOT NULL,
  `pkt_opis` text COLLATE utf8mb3_polish_ci,
  `pkt_ilosc` int DEFAULT NULL,
  `pkt_okres` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_pakiet`
--

INSERT INTO `portal_pakiet` (`pkt_id`, `pkt_usa_id`, `pkt_nazwa`, `pkt_opis`, `pkt_ilosc`, `pkt_okres`) VALUES
(4, 11, 'pakiet  20 / 28', '<p>20 ogłoszeń / 28 dni<br />34gr/dzień</p>', 20, 28),
(5, 12, 'pakiet  20 / 90', '<p>20 ogłoszeń /&nbsp;90 dni</p>', 20, 90),
(6, 13, 'pakiet  50 / 14', '<p>50 ogłoszeń&nbsp;/ 14 dni</p>', 50, 14),
(7, 14, 'pakiet  50 / 28', '<p>50 ogłoszeń / 28 dni</p>', 50, 28),
(8, 15, 'pakiet  50 / 90', '<p>50 ogłoszeń /&nbsp;90 dni</p>', 50, 90),
(9, 16, 'pakiet 150 / 14', '<p>150 ogłoszeń / 14 dni</p>', 150, 14),
(10, 17, 'pakiet 150 / 28', '<p>150 ogłoszeń /&nbsp;28 dni</p>', 150, 28),
(11, 18, 'pakiet 150 / 90', '<p>150 ogłoszeń /&nbsp;90 dni</p>', 150, 90),
(12, 10, 'pakiet  20 / 14', '<p>20 ogłoszeń /&nbsp;14 dni</p>', 20, 14);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_platnosc_sms`
--

CREATE TABLE `portal_platnosc_sms` (
  `sms_id` int NOT NULL,
  `sms_numer` int NOT NULL,
  `sms_cena_brutto` decimal(5,2) DEFAULT NULL,
  `sms_widocznosc` tinyint DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_platnosc_sms`
--

INSERT INTO `portal_platnosc_sms` (`sms_id`, `sms_numer`, `sms_cena_brutto`, `sms_widocznosc`) VALUES
(1, 112233, 12.00, 1),
(2, 223344, 22.00, 1);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_platnosc_usluga`
--

CREATE TABLE `portal_platnosc_usluga` (
  `usa_id` int NOT NULL,
  `usa_identyfikator` varchar(10) COLLATE utf8mb3_polish_ci NOT NULL,
  `usa_cena_brutto` decimal(7,2) DEFAULT NULL,
  `usa_promocja_brutto` decimal(7,2) DEFAULT NULL,
  `usa_sms` tinyint DEFAULT NULL,
  `usa_platnosc` tinyint DEFAULT NULL,
  `usa_tytul` varchar(200) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `usa_opis` text COLLATE utf8mb3_polish_ci,
  `usa_sms_opis` text COLLATE utf8mb3_polish_ci,
  `usa_platnosc_opis` text COLLATE utf8mb3_polish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_platnosc_usluga`
--

INSERT INTO `portal_platnosc_usluga` (`usa_id`, `usa_identyfikator`, `usa_cena_brutto`, `usa_promocja_brutto`, `usa_sms`, `usa_platnosc`, `usa_tytul`, `usa_opis`, `usa_sms_opis`, `usa_platnosc_opis`) VALUES
(3, 'drobne1', 9.00, 0.00, 1, 1, 'Drobne', NULL, 'Zapłać wysyłając SMS', 'Zapłać online'),
(4, 'drobne2', 15.00, 0.00, 1, 1, 'Drobne', NULL, 'Zapłać wysyłając SMS', 'kliknij aby zapłacić'),
(5, 'pojazdy1', 22.00, 0.00, 0, 1, 'Pojazdy', NULL, '', 'kliknij aby zapłacić'),
(6, 'drobne4', 25.00, 25.00, 1, 0, 'Drobne', NULL, 'kliknij aby zapłacić', ''),
(7, 'pojazdy2', 27.00, 0.00, 0, 1, 'Pojazdy', NULL, '', 'kliknij aby zapłacić'),
(8, 'poajzdy3', 35.00, 35.00, 0, 1, 'Pojazdy', NULL, '', 'kliknij aby zapłacić'),
(9, 'poajzdy4', 50.00, 50.00, 0, 1, 'Pojazdy ', NULL, '', 'kliknij aby zapłacić'),
(10, 'pakiet1', 120.00, 0.00, 0, 1, 'Pakiet 20', NULL, '', 'kliknij aby zapłacić'),
(11, 'pakiet2', 190.00, 0.00, 0, 1, 'Pakiet 20', NULL, '', 'kliknij aby zapłacić'),
(12, 'pakiet3', 250.00, 0.00, 0, 1, 'Pakiet 20', NULL, '', 'kliknij aby zapłacić'),
(13, 'pakiet4', 160.00, 0.00, 0, 1, 'Pakiet 50', NULL, '', 'kliknij aby zapłacić'),
(14, 'pakiet5', 280.00, 0.00, 0, 1, 'Pakiet 50', NULL, '', 'kliknij aby zapłacić'),
(15, 'pakiet6', 480.00, 0.00, 0, 1, 'Pakiet 50', NULL, '', 'kliknij aby zapłacić'),
(16, 'pakiet7', 220.00, 0.00, 0, 1, 'Pakiet 50+', NULL, '', 'kliknij aby zapłacić'),
(17, 'pakiet8', 400.00, 0.00, 0, 1, 'Pakiet 50+', NULL, '', 'kliknij aby zapłacić'),
(18, 'pakiet9', 580.00, 0.00, 0, 1, 'Pakiet 50+', NULL, '', 'kliknij aby zapłacić'),
(19, 'drobne3', 15.00, 15.00, 1, 0, 'Drobne', NULL, 'Zapłać wysyłając SMS', '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_powiadomienie`
--

CREATE TABLE `portal_powiadomienie` (
  `pow_id` int NOT NULL,
  `pow_data_utworzenia` datetime DEFAULT NULL,
  `pow_typ` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_zdarzenie` varchar(15) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_odbiorca_typ` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_odbiorca_id` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_tresc` varchar(250) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_url` varchar(250) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `pow_data_przeczytania` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_powiadomienie`
--

INSERT INTO `portal_powiadomienie` (`pow_id`, `pow_data_utworzenia`, `pow_typ`, `pow_zdarzenie`, `pow_odbiorca_typ`, `pow_odbiorca_id`, `pow_tresc`, `pow_url`, `pow_data_przeczytania`) VALUES
(17, '2016-07-13 15:53:43', NULL, 'notice-new', 'admin', 'admin', '<img  src=\"/grafika/ogloszenia/lista/default.png\"/>\r\ndsfsdfds\r\n588 dni do końca\r\npozostało 3 szt.\r\n44.00zł', NULL, NULL),
(18, '2016-07-13 15:56:38', NULL, 'notice-new', 'admin', 'admin', '<img  src=\"/grafika/ogloszenia/lista/default.png\"/>\r\ndsfsdfds\r\n616 dni do końca\r\npozostało 3 szt.\r\n44.00zł', NULL, NULL),
(19, '2016-07-13 15:56:39', NULL, 'notice-new', 'admin', 'admin', '<img  src=\"/grafika/ogloszenia/lista/default.png\"/>\r\n#######\r\ndsfsdfds\r\n644 dni do końca\r\npozostało 3 szt.\r\n44.00zł', NULL, '2016-07-05 00:00:00'),
(20, '2016-07-14 12:39:45', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\r\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: klient2@designs.type.pl\r\nNick: \r\nImię: Test\r\nnazwisko: sdasd\r\nTelefon: 34234324\r\n', NULL, NULL),
(21, '2016-08-22 21:22:26', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: mackafar@gmail.com\nNick: \nImię: Robert\nnazwisko: Maciaszzek\nTelefon: \n', NULL, NULL),
(22, '2016-08-25 21:59:43', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>VTX 1800 S\n28 dni do końca\npozostało 1 szt.\n25000.00zł', NULL, NULL),
(23, '2016-08-30 12:30:29', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: konopie@o2.pl\nNick: \nImię: Marcin\nnazwisko: Konopa\nTelefon: 503 75 75 75\n', NULL, NULL),
(24, '2016-08-30 10:35:07', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Honda VTX 1300c Custom 2007. Bezwypadkowa \n28 dni do końca\npozostało 1 szt.\n21900.00zł', NULL, NULL),
(25, '2016-08-31 15:29:53', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>mała rolka narzędziowa\n14 dni do końca\npozostało 1 szt.\n30.00zł', NULL, NULL),
(26, '2016-09-09 20:59:53', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4500/mini/20160804_132626.jpg\"/>VTX 1800 S\n28 dni do końca\npozostało 1 szt.\n25000.00zł', NULL, NULL),
(27, '2016-09-10 16:53:20', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4502/mini/11717519_1083508875009849_2720248754137576341_o.jpg\"/>yamaha dragstar 125\n28 dni do końca\npozostało 1 szt.\n11500.00zł', NULL, NULL),
(28, '2016-09-14 09:50:53', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: lesterkidson@wp.pl\nNick: \nImię: Lester\nnazwisko: Kidson\nTelefon: \n', NULL, NULL),
(29, '2016-09-14 08:31:36', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4503/mini/2016_08_24_17_28_30.jpg\"/>Honda VTX 1800 Neo-N3\n28 dni do końca\npozostało 1 szt.\n25900.00zł', NULL, NULL),
(30, '2016-09-28 18:31:17', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4506/mini/14467033_1127133917376615_967965863_o.jpg\"/>tłumiki Kalińskiego honda vtx 1800\n28 dni do końca\npozostało 1 szt.\n1000.00zł', NULL, NULL),
(31, '2016-09-28 19:01:18', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4507/mini/cat_s50_640x300.jpg\"/>telefon CAT S50 używany w idealnym stanie TYLKO 1100.\n28 dni do końca\npozostało 1 szt.\n1100.00zł', NULL, NULL),
(32, '2016-09-29 11:56:12', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: artu3@poczta.onet.pl\nNick: \nImię: Artur\nnazwisko: Wróbel\nTelefon: 530406286\n', NULL, NULL),
(33, '2016-09-29 12:32:41', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4509/mini/20160929_125448(1).jpg\"/>Stelaż - mocowanie oparcia pasażera do VTX 1800 \n28 dni do końca\npozostało 1 szt.\n150.00zł', NULL, NULL),
(34, '2016-11-06 16:09:32', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: pmedrek5@gmail.com\nNick: \nImię: Pawel\nnazwisko: M..\nTelefon: +46707541238\n', NULL, NULL),
(35, '2016-11-12 16:47:38', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: apoko@poczta.onet.pl\nNick: \nImię: Artur\nnazwisko: Pokojski\nTelefon: 501297522\n', NULL, NULL),
(36, '2016-11-12 15:54:03', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4511/mini/sam_1238.jpg\"/>Honda VTX 1300R z 2005r dużo dodatków stan bardzo dobry\n28 dni do końca\npozostało 1 szt.\n23500.00zł', NULL, NULL),
(37, '2016-11-17 13:22:25', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: sklep.deltamoto@gmail.com\nNick: \nImię: Jerzy\nnazwisko: Barcinski\nTelefon: 662723750\n', NULL, NULL),
(38, '2016-11-17 16:53:46', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4517/mini/1_ml13hs_1.jpg\"/>Podnośnik motocyklowy krzyżakowy hydrauliczny 135 kg\n28 dni do końca\npozostało 10 szt.\n530.00zł', NULL, NULL),
(39, '2016-11-17 17:05:48', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4518/mini/2_ml70hk_1.jpg\"/>Podnośnik motocyklowy HARLEY 680 kg \n28 dni do końca\npozostało 10 szt.\n530.00zł', NULL, NULL),
(40, '2016-11-17 17:17:35', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4519/mini/3_ml37kh_1.jpg\"/>Podnośnik motocyklowy krzyżakowy 360 kg\n28 dni do końca\npozostało 10 szt.\n1150.00zł', NULL, NULL),
(41, '2016-11-17 19:11:06', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Podnośnik motocyklowy krzyżakowy 450 kg\n28 dni do końca\npozostało 10 szt.\n1694.00zł', NULL, NULL),
(42, '2016-11-17 19:22:34', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4522/mini/5_ml45phs_1.jpg\"/>Podnośnik hydrauliczny motocyklowy trapezowy  wąski 450 kg\n28 dni do końca\npozostało 10 szt.\n1839.20zł', NULL, NULL),
(43, '2016-11-17 19:30:53', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4523/mini/6_ml45ka_1.jpg\"/>Podnośnik motocyklowy krzyżakowy hydrauliczno - pneumatyczny  450 kg\n28 dni do końca\npozostało 10 szt.\n1887.00zł', NULL, NULL),
(44, '2016-11-17 20:00:19', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4524/mini/7_ml45ph_1.jpg\"/>Podnośnik hydrauliczny motocyklowy trapezowy  450 kg\n28 dni do końca\npozostało 10 szt.\n1923.00zł', NULL, NULL),
(45, '2016-11-17 20:09:18', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4525/mini/8_ml45pa_1.jpg\"/>Podnośnik motocyklowy hydrauliczno – pneumatyczny trapezowy  450 kg\n28 dni do końca\npozostało 10 szt.\n1996.50zł', NULL, NULL),
(46, '2016-11-17 20:17:14', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4526/mini/9_ml75has_1.jpg\"/>Podnośnik motocyklowy hydrauliczno – pneumatyczny krzyżakowy 675 kg\n28 dni do końca\npozostało 10 szt.\n3206.00zł', NULL, NULL),
(47, '2016-11-17 20:24:47', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Podnośnik do quada hydrauliczno – pneumatyczny krzyżakowy 675 kg\n28 dni do końca\npozostało 10 szt.\n3230.70zł', NULL, NULL),
(48, '2016-11-17 20:36:34', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4528/mini/11_ml34b.jpg\"/>Mini podnośnik motocyklowy mechaniczny 500 kg\n28 dni do końca\npozostało 16 szt.\n338.00zł', NULL, NULL),
(49, '2016-11-19 12:30:32', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4529/mini/11_ml75he_1.jpg\"/>Podnośnik do quada elektryczny 750 kg\n28 dni do końca\npozostało 10 szt.\n6957.00zł', NULL, NULL),
(50, '2016-11-19 20:41:36', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4530/mini/1_ms150mm_1.jpg\"/>Stojak motocykle/motorowery, skutery\n28 dni do końca\npozostało 10 szt.\n120.00zł', NULL, NULL),
(51, '2016-11-19 20:50:02', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Rolki pod koło motoru/skutera/motoroweru\n28 dni do końca\npozostało 10 szt.\n181.00zł', NULL, NULL),
(52, '2016-11-19 21:00:38', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4532/mini/3_mms45_1.jpg\"/>Stojak motocyklowy / motorower. Przeznaczony do podparcia tylnego koła.\n28 dni do końca\npozostało 10 szt.\n181.00zł', NULL, NULL),
(53, '2016-11-19 21:06:21', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Stojak motocyklowy / motorower\n28 dni do końca\npozostało 10 szt.\n229.90zł', NULL, NULL),
(54, '2016-11-19 21:12:22', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4534/mini/5_mt150cm_1.jpg\"/>Stojak/podnośnik stołowy motocyklowy\n28 dni do końca\npozostało 10 szt.\n242.00zł', NULL, NULL),
(55, '2016-11-19 21:17:25', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4535/mini/6_ms150wm.jpg\"/>Wózek motocyklowy mały.\n28 dni do końca\npozostało 10 szt.\n178.30zł', NULL, NULL),
(56, '2016-11-19 21:22:25', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4536/mini/7_ms400fw_1.jpg\"/>Stojak motocyklowy\n28 dni do końca\npozostało 10 szt.\n302.50zł', NULL, NULL),
(57, '2016-11-19 21:27:47', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4537/mini/8_es400m.jpg\"/>Stojak motocyklowy najazdowy\n28 dni do końca\npozostało 10 szt.\n302.50zł', NULL, NULL),
(58, '2016-11-19 21:32:35', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4538/mini/9_es400mh_4.jpg\"/>Stojak motocyklowy najazdowy\n28 dni do końca\npozostało 10 szt.\n338.80zł', NULL, NULL),
(59, '2016-11-19 21:39:29', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4540/mini/10_mms60_1.jpg\"/>Wózek motocyklowy\n28 dni do końca\npozostało 10 szt.\n484.00zł', NULL, NULL),
(60, '2016-11-27 16:24:45', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: melusia6@onet.pl\nNick: \nImię: Amelia\nnazwisko: krzyk\nTelefon: 604549321\n', NULL, NULL),
(61, '2016-11-27 15:34:10', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Kask motocyklowy czerwone czaszki rozmiar XXL\n28 dni do końca\npozostało 1 szt.\n150.00zł', NULL, NULL),
(62, '2016-12-06 10:46:23', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/mini/default.png\"/>Napinacz łańcuszka rozrządu manualnu Yamaha R6\n28 dni do końca\npozostało 1 szt.\n190.00zł', NULL, NULL),
(63, '2016-12-06 11:48:01', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: natalia.motohybrid@gmail.com\nNick: \nImię: Natalia\nnazwisko: Fruk\nTelefon: 794338975\n', NULL, NULL),
(64, '2016-12-06 11:27:30', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4547/mini/dsc_0413.jpg\"/>Buty BMW Hyper beżowe\n14 dni do końca\npozostało 1 szt.\n499.00zł', NULL, NULL),
(65, '2016-12-16 17:54:57', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4528/mini/11_ml34b.jpg\"/>Mini podnośnik motocyklowy mechaniczny 500 kg\n28 dni do końca\npozostało 16 szt.\n338.00zł', NULL, NULL),
(66, '2016-12-16 17:55:55', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4527/mini/10_ml75ha_1.jpg\"/>Podnośnik do quada hydrauliczno – pneumatyczny krzyżakowy 675 kg\n28 dni do końca\npozostało 10 szt.\n3230.70zł', NULL, NULL),
(67, '2016-12-16 17:56:10', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4526/mini/9_ml75has_1.jpg\"/>Podnośnik motocyklowy hydrauliczno – pneumatyczny krzyżakowy 675 kg\n28 dni do końca\npozostało 10 szt.\n3206.00zł', NULL, NULL),
(68, '2016-12-16 17:56:26', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4525/mini/8_ml45pa_1.jpg\"/>Podnośnik motocyklowy hydrauliczno – pneumatyczny trapezowy  450 kg\n28 dni do końca\npozostało 10 szt.\n1996.50zł', NULL, NULL),
(69, '2016-12-16 17:56:40', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4524/mini/7_ml45ph_1.jpg\"/>Podnośnik hydrauliczny motocyklowy trapezowy  450 kg\n28 dni do końca\npozostało 10 szt.\n1923.00zł', NULL, NULL),
(70, '2016-12-16 17:56:57', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4523/mini/6_ml45ka_1.jpg\"/>Podnośnik motocyklowy krzyżakowy hydrauliczno - pneumatyczny  450 kg\n28 dni do końca\npozostało 10 szt.\n1887.00zł', NULL, NULL),
(71, '2016-12-16 17:57:13', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4522/mini/5_ml45phs_1.jpg\"/>Podnośnik hydrauliczny motocyklowy trapezowy  wąski 450 kg\n28 dni do końca\npozostało 10 szt.\n1839.20zł', NULL, NULL),
(72, '2016-12-16 17:57:30', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4517/mini/1_ml13hs_1.jpg\"/>Podnośnik motocyklowy krzyżakowy hydrauliczny 135 kg\n28 dni do końca\npozostało 10 szt.\n641.30zł', NULL, NULL),
(73, '2016-12-16 17:57:47', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4518/mini/2_ml70hk_1.jpg\"/>Podnośnik motocyklowy HARLEY 680 kg\n28 dni do końca\npozostało 10 szt.\n641.30zł', NULL, NULL),
(74, '2016-12-16 17:58:03', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4519/mini/3_ml37kh_1.jpg\"/>Podnośnik motocyklowy krzyżakowy 360 kg\n28 dni do końca\npozostało 10 szt.\n1391.00zł', NULL, NULL),
(75, '2016-12-16 17:58:18', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4520/mini/4_ml45kh_1.jpg\"/>Podnośnik motocyklowy krzyżakowy 450 kg\n28 dni do końca\npozostało 10 szt.\n1694.00zł', NULL, NULL),
(76, '2016-12-18 07:35:31', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4540/mini/10_mms60_1.jpg\"/>Wózek motocyklowy\n28 dni do końca\npozostało 10 szt.\n484.00zł', NULL, NULL),
(77, '2016-12-18 07:35:49', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4538/mini/9_es400mh_4.jpg\"/>Stojak motocyklowy najazdowy\n28 dni do końca\npozostało 10 szt.\n338.80zł', NULL, NULL),
(78, '2016-12-18 07:36:13', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4538/mini/9_es400mh_4.jpg\"/>Stojak motocyklowy najazdowy\n56 dni do końca\npozostało 10 szt.\n338.80zł', NULL, NULL),
(79, '2016-12-18 07:36:13', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4538/mini/9_es400mh_4.jpg\"/>Stojak motocyklowy najazdowy\n84 dni do końca\npozostało 10 szt.\n338.80zł', NULL, NULL),
(80, '2016-12-18 07:36:28', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4537/mini/8_es400m.jpg\"/>Stojak motocyklowy najazdowy\n28 dni do końca\npozostało 10 szt.\n302.50zł', NULL, NULL),
(81, '2016-12-18 07:36:58', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4536/mini/7_ms400fw_1.jpg\"/>Stojak motocyklowy\n28 dni do końca\npozostało 10 szt.\n302.50zł', NULL, NULL),
(82, '2016-12-18 07:37:30', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4535/mini/6_ms150wm.jpg\"/>Wózek motocyklowy mały.\n28 dni do końca\npozostało 10 szt.\n178.30zł', NULL, NULL),
(83, '2016-12-18 07:37:57', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4534/mini/5_mt150cm_1.jpg\"/>Stojak/podnośnik stołowy motocyklowy\n28 dni do końca\npozostało 10 szt.\n242.00zł', NULL, NULL),
(84, '2016-12-18 07:38:28', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4533/mini/4_ms200bw.jpg\"/>Stojak motocyklowy / motorower\n28 dni do końca\npozostało 10 szt.\n229.90zł', NULL, NULL),
(85, '2016-12-18 07:38:48', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4532/mini/3_mms45_1.jpg\"/>Stojak motocyklowy / motorower. Przeznaczony do podparcia tylnego koła.\n28 dni do końca\npozostało 10 szt.\n181.00zł', NULL, NULL),
(86, '2016-12-18 07:40:10', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4531/mini/2_mwr1.jpg\"/>Rolki pod koło motoru/skutera/motoroweru\n28 dni do końca\npozostało 10 szt.\n181.00zł', NULL, NULL),
(87, '2016-12-18 07:41:38', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4530/mini/1_ms150mm_1.jpg\"/>Stojak motocykle/motorowery, skutery\n28 dni do końca\npozostało 10 szt.\n145.20zł', NULL, NULL),
(88, '2016-12-18 14:21:42', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: rzemieniecki.kr@gmail.com\nNick: \nImię: Krzysztof\nnazwisko: Rzemieniecki\nTelefon: 793523007\n', NULL, NULL),
(89, '2016-12-18 13:34:53', NULL, 'notice-new', 'admin', 'admin', 'Aktywowano ogłoszenie\n<img  src=\"/grafika/ogloszenia/4548/mini/841996675_2_1080x720_honda_cbr_1000_rr_2007_dodaj_zdjecia.jpg\"/>Honda CBR 1000rr 2007\n28 dni do końca\npozostało 1 szt.\n19900.00zł', NULL, NULL),
(90, '2017-01-31 14:41:05', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: aneta-d5@wp.pl\nNick: \nImię: Aneta\nnazwisko: Dobrowolska \nTelefon: 604124324\n', NULL, NULL),
(91, '2017-02-14 17:47:03', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: dawidun8@gmail.com\nNick: \nImię: Dawid\nnazwisko: W\nTelefon: 664999839\n', NULL, NULL),
(92, '2017-02-26 11:55:33', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: dawidun7@tlen.pl\nNick: \nImię: Dawid\nnazwisko: Wilkos\nTelefon: 664999839\n', NULL, NULL),
(93, '2017-02-27 14:58:50', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: katarzyna.wozniak@designspektrum.pl\nNick: \nImię: Katarzyna\nnazwisko: Spektrum\nTelefon:  530 359 070\n', NULL, NULL),
(94, '2017-02-28 17:28:28', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: spektrum5@interia.pl\nNick: \nImię: test28\nnazwisko: test\nTelefon: \n', NULL, NULL),
(95, '2017-02-28 17:34:51', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: spektrum1@onet.pl\nNick: \nImię: test2\nnazwisko: test\nTelefon: \n', NULL, NULL),
(96, '2017-06-02 09:32:57', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: tomaszlog2@o2.pl\nNick: \nImię: TOMASZ\nnazwisko: STANISZEWSKI\nTelefon: 603120830\n', NULL, NULL),
(97, '2017-06-28 05:20:33', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: damiansobieski9393@gmail.com\nNick: \nImię: Damian\nnazwisko: Sobieski\nTelefon: 725406825\n', NULL, NULL),
(98, '2017-06-28 05:29:26', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: damiansobieski9393@gmial.com\nNick: \nImię: Damian\nnazwisko: Sobieski\nTelefon: 725406825\n', NULL, NULL),
(99, '2017-07-16 23:11:49', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: mankers@interia.pl\nNick: \nImię: mariusz\nnazwisko: \nTelefon: 792056423\n', NULL, NULL),
(100, '2017-08-27 17:23:43', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: mitrandir1@o2.pl\nNick: \nImię: Wojciech\nnazwisko: Romanowski\nTelefon: 733463221\n', NULL, NULL),
(101, '2018-01-12 08:12:28', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: roland.ruchwa3@wp.pl\nNick: \nImię: roland\nnazwisko: ruchwa\nTelefon: 608547983\n', NULL, NULL),
(102, '2018-02-26 10:12:53', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: dezpol@interia.pl\nNick: \nImię: Romuald\nnazwisko: Salinski\nTelefon: 512101882\n', NULL, NULL),
(103, '2018-03-28 20:10:00', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: paulinaj63@wp.pl\nNick: \nImię: Paulina\nnazwisko: Jankowska\nTelefon: \n', NULL, NULL),
(104, '2018-05-22 20:34:19', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: osekksf@o2.pl\nNick: \nImię: Arkadiusz\nnazwisko: Kruczek\nTelefon: 695326018\n', NULL, NULL),
(105, '2018-06-09 19:28:50', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/grafika/uzytkownicy/mini/default.png\"/>Email: a.bolimowski@gmail.com\nNick: \nImię: Adrian\nnazwisko: Bolimowski\nTelefon: 696487507\n', NULL, NULL),
(106, '2019-05-31 10:58:17', NULL, 'user-new', 'admin', 'admin', 'Nowy użytkownik\n<img  src=\"/public/grafika/uzytkownicy/mini/default.png\"/>Email: klient2@design.type.pl\nNick: \nImię: \nnazwisko: \nTelefon: \n', NULL, NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_schowek_ogloszenie`
--

CREATE TABLE `portal_schowek_ogloszenie` (
  `sch_id` int NOT NULL,
  `sch_uzk_id` int NOT NULL,
  `sch_oge_id` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_subskrypcja`
--

CREATE TABLE `portal_subskrypcja` (
  `sub_id` int NOT NULL,
  `sub_typ` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `sub_email` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `sub_filtr` varchar(200) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `sub_opis` varchar(200) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_subskrypcja`
--

INSERT INTO `portal_subskrypcja` (`sub_id`, `sub_typ`, `sub_email`, `sub_filtr`, `sub_opis`) VALUES
(8, 'notices-ogloszenie', 'maciejolszewski1970@gmail.com', '{\"kategoria\":\"196\"}', NULL),
(9, 'notices-ogloszenie', 'maciejolszewski1970@gmail.com', '{\"kategoria\":\"24\"}', NULL),
(12, 'notices-ogloszenie', 'emi.miod@gmail.com', '{\"kategoria\":\"24\"}', 'Kategoria: akcesoria'),
(13, 'notices-ogloszenie', 'emi.miod@gmail.com', '{\"uzytkownik\":\"145\",\"aktywny\":\"1\"}', 'Sprzedawca: sprzedawca'),
(14, 'notices-ogloszenie', 'klient1@design.type.pl', '{\"uzytkownik\":\"154\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/154-sprzedawca.html#content\">sprzedawca</a>'),
(15, 'notices-ogloszenie', 'klient1@design.type.pl', '{\"kategoria\":\"194\"}', 'Kategoria: <a class=\"kategoria\" href=\"/n/k/194-Harley-Davidson--------------.html#content\">Harley-Davidson              </a>'),
(16, 'notices-ogloszenie', 'pawel.adamiak@desigsnpektrum.pl', '{\"uzytkownik\":\"167\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/167-sprzedawca.html#content\">sprzedawca</a>'),
(17, 'notices-ogloszenie', 'pawel.adamiak@desigsnpektrum.pl', '{\"uzytkownik\":\"145\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/-sprzedawca.html#content\">sprzedawca</a>'),
(19, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"114\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/114-sprzedawca.html#content\">sprzedawca</a>'),
(20, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"145\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/-sprzedawca.html#content\">sprzedawca</a>'),
(21, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"128\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/128-sprzedawca.html#content\">sprzedawca</a>'),
(22, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"130\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/130-sprzedawca.html#content\"></a>'),
(23, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"177\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/177-sprzedawca.html#content\">sprzedawca</a>'),
(24, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"178\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/178-sprzedawca.html#content\">sprzedawca</a>'),
(25, 'notices-ogloszenie', 'jakub.kacprzak@designspektrum.pl', '{\"uzytkownik\":\"178\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/178-sprzedawca.html#content\">sprzedawca</a>'),
(26, 'notices-ogloszenie', 'ewzarebska@gmail.com', '{\"uzytkownik\":\"114\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/114-sprzedawca.html#content\">sprzedawca</a>'),
(28, 'notices-ogloszenie', 'jakub.lisiak@yahoo.com', '{\"uzytkownik\":\"176\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/176-sprzedawca.html#content\">sprzedawca</a>'),
(29, 'notices-ogloszenie', 'pawel.adamiak@desigsnpektrum.pl', '{\"uzytkownik\":\"114\",\"aktywny\":\"1\"}', 'Sprzedawca: <a class=\"sprzedawca\" href=\"/n/s/114-sprzedawca.html#content\">sprzedawca</a>');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_subskrypcja_zdarzenie`
--

CREATE TABLE `portal_subskrypcja_zdarzenie` (
  `suz_id` int NOT NULL,
  `suz_data` date DEFAULT NULL,
  `suz_email` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `suz_typ` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `suz_zdarzenie` varchar(15) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `suz_opis` text COLLATE utf8mb3_polish_ci
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_uzytkownik`
--

CREATE TABLE `portal_uzytkownik` (
  `uzk_id` int NOT NULL,
  `uzk_login` varchar(70) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uzk_haslo` varchar(32) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uzk_hash` varchar(32) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uzk_status` tinyint NOT NULL DEFAULT '0',
  `uzk_rabat_json` text COLLATE utf8mb3_polish_ci,
  `uzk_fb` bigint DEFAULT NULL,
  `uzk_allegro_nick` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uzk_konto_ilosc` int DEFAULT NULL,
  `uzk_konto_wygasa` date DEFAULT NULL,
  `uzk_opis` text COLLATE utf8mb3_polish_ci,
  `uzk_url` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uzk_nick` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_uzytkownik`
--

INSERT INTO `portal_uzytkownik` (`uzk_id`, `uzk_login`, `uzk_haslo`, `uzk_hash`, `uzk_status`, `uzk_rabat_json`, `uzk_fb`, `uzk_allegro_nick`, `uzk_konto_ilosc`, `uzk_konto_wygasa`, `uzk_opis`, `uzk_url`, `uzk_nick`) VALUES
(112, 'pawel.adamiak@desigsnpektrum.pl', '5416d7cd6ef195a0f7622a9c56b55e84', NULL, 1, NULL, 192486761242271, NULL, NULL, NULL, NULL, '112-sprzedawca', NULL),
(114, 'maciejolszewski1970@gmail.com', '75b62962f2148fdaf1716ea7d17f508d', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p><a href=\"google.pl\">ggoooooo</a></p>', '114-sprzedawca', NULL),
(115, 'pradzimowski@gmail.com', '2f047e93f1e815deca5efdae65db71d8', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '115-sprzedawca', NULL),
(116, 'kuba.radzimowski@gmail.com', '7cef8a734855777c2a9d0caf42666e69', 'a5e536aafee3b8909120c54cc8808823', 0, NULL, NULL, NULL, NULL, NULL, NULL, '116-sprzedawca', NULL),
(121, 'wfwf@interia.pl', '5063740c7bea08e598126e89aa0f4f05', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '121-sprzedawca', NULL),
(126, 'pawel@radzimowski.com', '5394cc164884fedd23df7d4c853821f6', 'dfa71e7bff44d9dd6c7bdc5457c39259', 0, NULL, NULL, NULL, NULL, NULL, NULL, '126-sprzedawca', NULL),
(127, 'idsjacek@poczta.onet.pl', '32a50b3dc8e8e0fb0ff672362c0d563d', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '127-sprzedawca', NULL),
(128, 'paulo_andrespol@poczta.fm', '353ca47f5b717264ca352983f34c3632', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '128-sprzedawca', NULL),
(129, 'zygtar@yahoo.com', '57d20183746bde491ba35aead7469bc0', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '129-sprzedawca', NULL),
(130, 'zygzakvtx@gmail.com', 'cd9b7d0eb716480848323533517b99c0', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '130-sprzedawca', NULL),
(131, 'mazak@orange.pl', 'e2891786a1bdeabeb0b52ee2ca7192dc', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '131-sprzedawca', NULL),
(132, 'r.zalewski@poczta.onet.pl', 'e9b334623258bbf22a1f610a48314cc2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '132-sprzedawca', NULL),
(133, 'stokrotka_@autograf.pl', '34711c143864d67cda7618f755cf187c', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '133-sprzedawca', NULL),
(134, 'pawelszczesniak@jmdi.pl', '2900ad585db6623d4a7270a208da7f68', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '134-sprzedawca', NULL),
(135, 'wieczor74@gmail.com', '67fb5b761a8183a6a27e5d00d77ce206', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '135-sprzedawca', NULL),
(136, 'jarekpila@o2.pl', 'd1e0441b916c561d865b556ce7d7ba2c', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '136-sprzedawca', NULL),
(137, 'deafust@o2.pl', 'eb63abea7e065af467f4cdf2dd5478d6', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '137-sprzedawca', NULL),
(138, 'swazy2@o2.pl', 'd57543ea8ca51a39f40d974b2df458f9', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '138-sprzedawca', NULL),
(139, 'robertsternik@wp.pl', '6c9c8aa9569f0d4db28516d42fe3d08e', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '139-sprzedawca', NULL),
(140, 'andrzej_cieslinski@op.pl', '46dcd580eb0c0b66cbaf6ae307f9d4bc', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '140-sprzedawca', NULL),
(141, 'homo.ineptus@gmail.com', '3b1c3d247133ca4ec70f92a5d70d2cc2', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '141-sprzedawca', NULL),
(142, 'auganov.gm@wp.pl', '1476ba463d0dc0b8fc2658f1d82add15', '4e6d12119238c60ef2bf9a3f4a3bc55d', 0, NULL, NULL, NULL, NULL, NULL, NULL, '142-sprzedawca', NULL),
(143, '11luczak11@wp.pl', '5cd8bd1570decbda581cf4a2ac02af1e', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '143-sprzedawca', NULL),
(144, 'andrzej.goss@vp.pl', '7dc4609304c7d11bffe8919c61d57b48', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '144-sprzedawca', NULL),
(145, 'jacek@powercruiser.pl', '522c804061cb3bb663d0a140cd11e184', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p><a title=\"części i motocykle\" href=\"http://www.powercruiser.pl\" target=\"_blank\">www.powercruiser.pl</a></p>', '-sprzedawca', NULL),
(146, 'mikers@op.pl', '8993b63c1e35cde0ec13fafb029de5db', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '146-sprzedawca', NULL),
(147, 'grychole@gmail.com', '183d3ae0d21398b6aeaeb1a0f0669163', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '147-sprzedawca', NULL),
(148, 'biuro@smwproject.com', '469947406df722af3cea01863ab9ceaf', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '148-', NULL),
(149, 'marco.richter@wp.pl', '60d726a1533b43ef4ec748dde05c86b1', '237118154bdfc9c60031f78f6a9f25bb', 0, NULL, NULL, NULL, NULL, NULL, NULL, '149-sprzedawca', NULL),
(150, 'zdzichu1@wp.pl', '142c65e00f4f7cf2e6c4c996e34005df', '39f79ad13e48b197c4e4db0639166741', 0, NULL, NULL, NULL, NULL, NULL, NULL, '150-sprzedawca', NULL),
(151, 'beny21087@gmail.com', 'a3a5784b1b8d35f1adb9c1da9ff44581', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '151-sprzedawca', NULL),
(152, 'toro102@o2.pl', '90a18cd0753fb35890b8d2215d5dd77b', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '152-sprzedawca', NULL),
(153, 'ziolkowskit@op.pl', 'f2be174cc4a7fabe4797336e69bd94f5', '6f640b9deeb02fd27c657cd717ae5f8f', 0, NULL, NULL, NULL, NULL, NULL, NULL, '153-', NULL),
(154, 'robert_gd@tlen.pl', '44c72de13e59b53dd623c095ef9b3587', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '154-sprzedawca', NULL),
(155, 'ziba@op.pl', '94891363698056dc3080e3f7ae75f9b5', 'd95e61bdfcf30aabc3fba260f8fc738f', 0, NULL, NULL, NULL, NULL, NULL, NULL, '155-sprzedawca', NULL),
(156, 'karolinaanna.k@gmail.com', '25691d84398b099874cc282259ff411c', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '156-sprzedawca', NULL),
(157, 'h.wasniewski22@gmail.com', '211b3efcc582c9f6b6ded579965d5d2f', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '157-sprzedawca', NULL),
(158, 'dam_mat@poczta.onet.pl', '750447285be6e742d7967b55471b5ab6', '375d178936b15a23bf654ffef24c83d2', 0, NULL, NULL, NULL, NULL, NULL, NULL, '158-sprzedawca', NULL),
(163, 'ebastyan@tlen.pl', 'ecef27638bfc6df84de32d8ebb5e12d8', 'a4992a63a993d292a51deeb950658edf', 0, NULL, NULL, NULL, NULL, NULL, NULL, '163-sprzedawca', NULL),
(164, 'szulckuba@onet.pl', '5f7f298574ecb9d3dd8a8051c0c4bab7', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '164-sprzedawca', NULL),
(165, 'wojciech.adamiak@designspektrum.pl', 'b9d26a39359f4a10fe2520b247436403', 'c6199f0bc44812a4614da50c182ac8a3', 0, NULL, NULL, NULL, NULL, NULL, NULL, '165-sprzedawca', NULL),
(166, 'marek.pawlak13@gmail', '471ce32ba75bd18a71f1ffb4cd088f37', 'bbb16b6e2e3fdcef7e682bd654cc13bf', 0, NULL, NULL, NULL, NULL, NULL, NULL, '166-sprzedawca', NULL),
(167, 'marek.pawlak13@gmail.com', '471ce32ba75bd18a71f1ffb4cd088f37', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '167-sprzedawca', NULL),
(168, 'motormaniac@op.pl', '1224e89c54e75acef3d8f2f3e0821e1f', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '168-sprzedawca', NULL),
(169, 'yoobatman@o2.pl', '39cd4ddb18fe230b310cf581aa9253aa', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '169-sprzedawca', NULL),
(170, 'jacek-play@wp.pl', '905c0134b18294355709fac076c323b0', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '170-sprzedawca', NULL),
(171, 'emi.miod@gmail.com', '202cb962ac59075b964b07152d234b70', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '171-sprzedawca', NULL),
(172, 'klient1@design.type.pl', '5416d7cd6ef195a0f7622a9c56b55e84', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '172-sprzedawca', NULL),
(173, 'wmx@o2.pl', '608c66b676421f36d2967a6dbe5aeae4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '173-sprzedawca', NULL),
(174, 'oryginalzamosc@interia.pl', 'baa2a6107c26a7037f3582bd6b40d713', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '174-sprzedawca', NULL),
(175, 'heniekstar@gmail.com', 'fbe61cc4bff2e8258547ad33222d8fd8', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '175-sprzedawca', NULL),
(176, 'skies@interia.eu', '7579f13d84daa7a0add93cb16e11160a', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '176-sprzedawca', NULL),
(177, 'ewzarebska@gmail.com', 'e1838867e3d7cdc8efd99a9f06de25e4', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '177-sprzedawca', NULL),
(178, 'jakub.lisiak@yahoo.com', 'ce7c7874f0fd21b216664869d0b8c4fa', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p>Jestem marzycielem, zwykłym ridersbuy\'erem.</p>\r\n<p><a title=\"Google\" href=\"https://www.google.pl/?gws_rd=ssl\" target=\"_blank\">Google</a></p>', '178-sprzedawca', NULL),
(179, 'jakub.kacprzak@designspektrum.pl', 'bad08911b67521816d3dc96daded3926', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '179-sprzedawca', NULL),
(180, 'izabela.skonecka@gmail.com', '99a75c52f8b8153e5f02b0ad9272c158', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '180-sprzedawca', NULL),
(181, 'monbader@gmail.com', '96071f70b8660ce16740b7c30fc7051d', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '181-sprzedawca', NULL),
(182, 'moniqe007@op.pl', 'a6cc44012425081495d664ef090f4daf', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '182-sprzedawca', NULL),
(183, 'sklep@amracing.pl', '5416d7cd6ef195a0f7622a9c56b55e84', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p style=\"text-align: justify;\"><strong>Amracing.pl</strong> to og&oacute;lnopolska hurtownia oraz sklep motocyklowy Rzg&oacute;w k / ł&oacute;dź. Na stanie posiadamy około 17000 części i akcesori&oacute;w do motocykli, quad&oacute;w, skuter&oacute;w, cross&oacute;w, utv. Na stanie w naszym sklepie posiadamy: odzież, opony, napędy, kierownice, filtry, akcesoria, oleje, smary, klocki, tarcze, manetki, sworzenie, osłony, błotniki i wiele innych.</p>\r\n<p style=\"text-align: justify;\">Zapraszamy do naszego sklepu motocyklowego Rzg&oacute;w / k Ł&oacute;dź, Gospodarz ul.Cegielniana 31 782-301-398. Odwiedź r&oacute;wnież nasz sklep internetowy amracing.pl i dobierz części dedykowane do swojego motocykla, quada, skutera czy cross.</p>\r\n<p style=\"text-align: justify;\">Zapraszamy do kontaktu z naszym konsultantem lub na&nbsp;amracing.pl.</p>\r\n<p style=\"text-align: justify;\">&nbsp;</p>\r\n<h4 style=\"text-align: center;\">www.amracing.pl</h4>\r\n<h4 style=\"text-align: center;\">Rzg&oacute;w / k Ł&oacute;dź, Gospodarz</h4>\r\n<h4 style=\"text-align: center;\">ul. Cegielniana 31</h4>\r\n<h4 style=\"text-align: center;\">782-301-398</h4>\r\n<h4 style=\"text-align: left;\"><em><a href=\"http://amracing.pl/ogolna-1/\" target=\"_blank\">amracing.pl</a></em></h4>', '183-Amracing', NULL),
(184, 'altrans2@o2.pl', '75b80c93b1326486b49db08d6c7987ec', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '184-sprzedawca', NULL),
(185, 'roker79@interia.pl', '98edfd216e16ab038ac299f3de092efd', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '185-sprzedawca', NULL),
(186, 'cerweza@wp.pl', 'ad7753955de4bbc93e087f4666a0753e', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '186-sprzedawca', NULL),
(187, 'lordbabka@wp.pl', '9110bae12b33bb331e02758e43218a64', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '187-sprzedawca', NULL),
(188, 'agnieszka010370@interia.pl', '9618a87b04cd66876fe44b0c0997c63a', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '188-sprzedawca', NULL),
(189, 'elzbieta.adamiak@designspektrum.pl', '098f6bcd4621d373cade4e832627b4f6', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '189-sprzedawca', NULL),
(190, 'anna.ziarkowska@designspektrum.pl', '5e7b6d747419b6659b4050fbe9a0e539', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '190-sprzedawca', NULL),
(191, 'biuro@wolfmoto.pl', 'f67b58b95b212daddcf5ae4661fb3ec3', 'a97b8e82f50844c0600d4746504efdcd', 0, NULL, NULL, NULL, NULL, NULL, NULL, '191-sprzedawca', NULL),
(192, 'info@designspektrum.pl', 'f67b58b95b212daddcf5ae4661fb3ec3', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '192-sprzedawca', NULL),
(193, 'f.rockabilly@gmail.com', 'fe7852ad5ec3952fda22db53d9ad5a8b', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '193-sprzedawca', NULL),
(194, 'piotroszczyk39@gmail.com', 'f5bb26c508cfdda9c1989bb8879ca758', '8b227ee7acb4a36a506df247b7069412', 0, NULL, NULL, NULL, NULL, NULL, NULL, '194-sprzedawca', NULL),
(195, 'mackafar@gmail.com', 'ff78d436b17efebd30bf97874d7b749b', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '195-sprzedawca', NULL),
(196, 'konopie@o2.pl', '60867ecc5485b156746ef5c1b8929f9d', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '196-sprzedawca', NULL),
(197, 'lesterkidson@wp.pl', '73adfc99aa548560ca71f42efa0a77a5', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '197-sprzedawca', NULL),
(198, 'artu3@poczta.onet.pl', '8a707e0fb89ae701b131e3bd1c54ac97', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '198-sprzedawca', NULL),
(199, 'pmedrek5@gmail.com', 'a3407b5170ff4eb509ad32559d7dff4a', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '199-sprzedawca', NULL),
(200, 'apoko@poczta.onet.pl', 'a6b842e8d3bb16cf2f1383377bf65bd7', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '200-sprzedawca', NULL),
(201, 'sklep.deltamoto@gmail.com', '58247150c20539455f1d7eb5751d888f', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p><sub>sklep.deltamoto@gmail.com</sub></p>', '201-', NULL),
(202, 'melusia6@onet.pl', 'b159da4ac83b763835cbb1b17fd04955', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '202-sprzedawca', NULL),
(203, 'natalia.motohybrid@gmail.com', '236a5bf985a33a18baf755d266362003', NULL, 1, NULL, NULL, NULL, NULL, NULL, '<p>Motocykle to pasja, kt&oacute;ra towarzyszy nam od najmłodszych lat. Stale rozwijamy swoje umiejętności, biorąc udział w szkoleniach oraz imprezach motocyklowych. Stawiamy na jakość a nie na ilość, pracujemy dokładnie. Prowadzimy&nbsp;<strong>serwis motocyklowy w Zabrzu</strong>. Oferujemy pełen zakres usług serwisowych wszystkich marek motocykli.</p>\r\n<p>Dysponujemy warsztatem wyposażonym w najwyższej jakości narzędzia. Oferujemy diagnostykę komputerową.Wykonujemy ekspertyzy przedzakupowe i ubezpieczeniowe. &nbsp; W naszym salonie traktujemy Cię tak, jakbyśmy sami chcieli być traktowani, dzielimy się doświadczeniem i pasją. Oferujemy między innymi spodnie, kurtki, rękawice, kaski, buty, opony, akcesoria motocyklowe takie jak hamulce, filtry, crash pady, pokrowce, zabezpieczenia, świece. Nasz zesp&oacute;ł od dawna korzysta z urok&oacute;w podr&oacute;żowania na dw&oacute;ch k&oacute;łkach więc problemy związane z doborem sprzętu nie są nam obce.&nbsp; Produkty pochodzą od renomowanych firm, są oferowane w salonie sklepie, na allegro, oraz na www.motohybrid.pl</p>', '203-', NULL),
(204, 'rzemieniecki.kr@gmail.com', '93264acc0f5b856f89363304b6384984', NULL, 1, NULL, NULL, NULL, NULL, NULL, NULL, '204-sprzedawca', NULL),
(205, 'aneta-d5@wp.pl', 'e887587218e1d418eb255d885669c2dc', '7d6d7dd51ceeb0d7f2e94f68f078de15', 0, NULL, NULL, NULL, NULL, NULL, NULL, '205-sprzedawca', NULL),
(206, 'dawidun8@gmail.com', '558f1528fd2930dcefdfd81c9a438ede', '4cd278c37c97b1f8122ef10db5a5fc1c', 0, NULL, NULL, NULL, NULL, NULL, NULL, '206-sprzedawca', NULL),
(207, 'dawidun7@tlen.pl', '558f1528fd2930dcefdfd81c9a438ede', '481f945c2d6c8611566d1751d3a00370', 0, NULL, NULL, NULL, NULL, NULL, NULL, '207-sprzedawca', NULL),
(208, 'katarzyna.wozniak@designspektrum.pl', 'b48cca5aebb82a328227b78d899506f5', 'c4b91366cfcc95c3f4b0f4512ece776c', 0, NULL, NULL, NULL, NULL, NULL, NULL, '208-sprzedawca', NULL),
(209, 'spektrum5@interia.pl', 'fa176cd442fde3c5e7143fc02340fbb0', 'c0a52e13b50fc129219572fa2684ff7b', 0, NULL, NULL, NULL, NULL, NULL, NULL, '209-sprzedawca', NULL),
(210, 'spektrum1@onet.pl', 'fa176cd442fde3c5e7143fc02340fbb0', 'f294b6501756101edb81349c424744e1', 0, NULL, NULL, NULL, NULL, NULL, NULL, '210-sprzedawca', NULL),
(211, 'tomaszlog2@o2.pl', 'fdd5709a3b9b7e7bf61b56fdd48cf27a', 'aec82bb9abfbcebf62df88b4e428223e', 0, NULL, NULL, NULL, NULL, NULL, NULL, '211-sprzedawca', NULL),
(212, 'damiansobieski9393@gmail.com', '24aa0238a74677a793c100c1adad3ecc', '49898cf54f8cd9b3eb0561893d26541d', 0, NULL, NULL, NULL, NULL, NULL, NULL, '212-sprzedawca', NULL),
(213, 'damiansobieski9393@gmial.com', '24aa0238a74677a793c100c1adad3ecc', '79a6674e6eb075bdf88adf129cca9bbc', 0, NULL, NULL, NULL, NULL, NULL, NULL, '213-sprzedawca', NULL),
(214, 'mankers@interia.pl', 'a4054b18b2e7f8c3688bbaa418323baf', 'f584bd1c6af17f8ccb9dd8e986fa384a', 0, NULL, NULL, NULL, NULL, NULL, NULL, '214-sprzedawca', NULL),
(215, 'mitrandir1@o2.pl', 'b527c8896d99f9db4525801f9958c3b2', '4f053ae5563566ed8716321ae312fa42', 0, NULL, NULL, NULL, NULL, NULL, NULL, '215-sprzedawca', NULL),
(216, 'roland.ruchwa3@wp.pl', 'efe02629a9f0727efc8e0be4b7295b18', '823d35e6da402227d73536854d11b3e0', 0, NULL, NULL, NULL, NULL, NULL, NULL, '216-sprzedawca', NULL),
(217, 'dezpol@interia.pl', '7f6d68c6dde0153879f7f5282a7808d5', 'cf239111329e9ba7024f3594de88b8c2', 0, NULL, NULL, NULL, NULL, NULL, NULL, '217-sprzedawca', NULL),
(218, 'paulinaj63@wp.pl', 'c3e9eaba5701c2b962effaf4176d36dd', 'f8bfb6c9483b6d802f0f819f649bc273', 0, NULL, NULL, NULL, NULL, NULL, NULL, '218-sprzedawca', NULL),
(219, 'osekksf@o2.pl', 'e2bfc6d75e362f689e149636d052b30e', 'a0f0bef19efb78fddf66f2e344cb1393', 0, NULL, NULL, NULL, NULL, NULL, NULL, '219-sprzedawca', NULL),
(220, 'a.bolimowski@gmail.com', 'cfac3c0b8ee6075b622f110574c70faf', '16a520fd6e19bf7cbac41415c9717349', 0, NULL, NULL, NULL, NULL, NULL, NULL, '220-sprzedawca', NULL),
(221, 'klient2@design.type.pl', '5416d7cd6ef195a0f7622a9c56b55e84', 'd6ad91558ebcc70dfd70a1f4af27b45c', 0, NULL, NULL, NULL, NULL, NULL, NULL, '221-sprzedawca', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_uzytkownik_adres`
--

CREATE TABLE `portal_uzytkownik_adres` (
  `uas_id` int NOT NULL,
  `uas_uzk_id` int NOT NULL,
  `uas_imie` varchar(50) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_nazwisko` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_adres_ulica` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_adres_dom` varchar(5) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_adres_lokal` varchar(5) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_miasto` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_kod` varchar(6) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `uas_telefon` varchar(15) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_uzytkownik_adres`
--

INSERT INTO `portal_uzytkownik_adres` (`uas_id`, `uas_uzk_id`, `uas_imie`, `uas_nazwisko`, `uas_adres_ulica`, `uas_adres_dom`, `uas_adres_lokal`, `uas_miasto`, `uas_kod`, `uas_telefon`) VALUES
(36, 112, '', '', '', '', '', '', '', ''),
(38, 114, 'Maciej', 'Olszewski', '', '', '', '', '', '+48570000982'),
(39, 115, '', '', '', '', '', '', '', ''),
(40, 116, '', '', '', '', '', '', '', ''),
(44, 121, 'Wojciech', 'Firman', NULL, NULL, NULL, NULL, NULL, NULL),
(47, 126, 'marceli', 'radzimowski', NULL, NULL, NULL, NULL, NULL, '570000149'),
(48, 127, 'Jacek', 'Napierała', NULL, NULL, NULL, NULL, NULL, ''),
(49, 128, 'paweł', 'otocki', NULL, NULL, NULL, NULL, NULL, '509020963'),
(50, 129, 'Cezary', 'Poljanowski', NULL, NULL, NULL, NULL, NULL, ''),
(51, 130, 'Zygzak', '', NULL, NULL, NULL, NULL, NULL, '660760147'),
(52, 131, 'Krzysiek', 'mazak', NULL, NULL, NULL, NULL, NULL, '888565997'),
(53, 132, 'Ryszard ', 'Zalewski', NULL, NULL, NULL, NULL, NULL, '510-575-865'),
(54, 133, 'Bożena', 'Stańczyk', NULL, NULL, NULL, NULL, NULL, ''),
(55, 134, 'Paweł', 'Szcześniak', NULL, NULL, NULL, NULL, NULL, '501 644 045'),
(56, 135, 'Marcin', 'Wieczorek', NULL, NULL, NULL, NULL, NULL, '604225827'),
(57, 136, 'Jarosłąw ', 'Biniecki', NULL, NULL, NULL, NULL, NULL, '504006427'),
(58, 137, 'krystian', 'paterka', NULL, NULL, NULL, NULL, NULL, '517943098'),
(59, 138, 'Krystian', '', NULL, NULL, NULL, NULL, NULL, '792031759'),
(60, 139, 'Robert', 'Sternik', NULL, NULL, NULL, NULL, NULL, '510902210'),
(61, 140, 'Andrzej', 'Cieśliński', NULL, NULL, NULL, NULL, NULL, '698100500'),
(62, 141, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(63, 142, 'Grzegorz', 'Mikołajczak', NULL, NULL, NULL, NULL, NULL, '600561018'),
(64, 143, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(65, 144, 'Andrzej', 'Goss', NULL, NULL, NULL, NULL, NULL, '517974773'),
(66, 145, 'Jacek', '', NULL, NULL, NULL, NULL, NULL, '790202418'),
(67, 146, 'Dariusz', 'Mikut', NULL, NULL, NULL, NULL, NULL, '660539324'),
(68, 147, 'Łukasz', 'Grychowski', NULL, NULL, NULL, NULL, NULL, '601778662'),
(69, 148, 'Marko', 'Shalenko', NULL, NULL, NULL, NULL, NULL, '600958844 '),
(70, 149, 'Marek', 'Richter', NULL, NULL, NULL, NULL, NULL, '695200656'),
(71, 150, 'zdzisław', 'milczarek', NULL, NULL, NULL, NULL, NULL, '519543293'),
(72, 151, 'Mariusz', 'Kowalczyk', NULL, NULL, NULL, NULL, NULL, '601/ 54 44 30'),
(73, 152, 'Łukasz', 'Blachowski', NULL, NULL, NULL, NULL, NULL, '601416351'),
(74, 153, 'Tomasz', 'Ziółkowski', NULL, NULL, NULL, NULL, NULL, '723366633'),
(75, 154, 'Robert', 'Gdula', NULL, NULL, NULL, NULL, NULL, '693 372 988'),
(76, 155, 'Zbigniew', 'Kałaska', NULL, NULL, NULL, NULL, NULL, '604219558'),
(77, 156, 'Karolina', 'Michalska', NULL, NULL, NULL, NULL, NULL, '660 926 585'),
(78, 157, 'Hubert', 'Waśniewski', NULL, NULL, NULL, NULL, NULL, '509 455 871'),
(79, 158, 'Damian', 'Matysik', NULL, NULL, NULL, NULL, NULL, '515215532'),
(82, 163, 'Sebastian', 'Michalski', NULL, NULL, NULL, NULL, NULL, ''),
(83, 164, 'Jakub', 'Szulc', NULL, NULL, NULL, NULL, NULL, '697842520'),
(84, 165, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(85, 166, 'Marek', 'Pawlak', NULL, NULL, NULL, NULL, NULL, '506067109'),
(86, 167, 'Marek', 'Pawlak', NULL, NULL, NULL, NULL, NULL, '506067109'),
(87, 168, 'Michał', 'Mężyński', NULL, NULL, NULL, NULL, NULL, '509672669'),
(88, 169, 'Przemysław', 'Dąbrowski', NULL, NULL, NULL, NULL, NULL, '500489624'),
(89, 170, 'Jacek', 'Tor', NULL, NULL, NULL, NULL, NULL, '663871507'),
(90, 171, 'Emilia', '', NULL, NULL, NULL, NULL, NULL, ''),
(91, 172, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(92, 173, 'Wojciech', 'Mucha', NULL, NULL, NULL, NULL, NULL, ''),
(93, 174, 'Leszek', 'Reder', NULL, NULL, NULL, NULL, NULL, '660870948'),
(94, 175, 'Paweł', 'Czaplicki', NULL, NULL, NULL, NULL, NULL, '796677616'),
(95, 176, 'Sebastian', 'Kieś', NULL, NULL, NULL, NULL, NULL, ''),
(96, 177, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(97, 178, 'Jakub', 'Lisiak', NULL, NULL, NULL, NULL, NULL, '663357364'),
(98, 179, 'test', 'testowy', NULL, NULL, NULL, NULL, NULL, '000-000-000'),
(99, 180, 'Izabela', 'Skonecka', NULL, NULL, NULL, NULL, NULL, ''),
(100, 181, 'Monika', 'Bąder', NULL, NULL, NULL, NULL, NULL, ''),
(101, 182, 'Monika', 'Rapacka', NULL, NULL, NULL, NULL, NULL, '660750467'),
(102, 184, 'Irek', 'Maslankiewicz', NULL, NULL, NULL, NULL, NULL, ''),
(103, 185, 'marcin', 'jakubowski', NULL, NULL, NULL, NULL, NULL, '573346720'),
(104, 186, 'dariusz', 'toczek', NULL, NULL, NULL, NULL, NULL, '502069902'),
(105, 187, 'adam', 'drożdż', NULL, NULL, NULL, NULL, NULL, '514118616'),
(106, 188, 'Agnieszka', '', NULL, NULL, NULL, NULL, NULL, ''),
(107, 189, 'Elżbieta', 'Adamiak', NULL, NULL, NULL, NULL, NULL, '123123123'),
(108, 190, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(109, 191, 'Wolfmoto', '', NULL, NULL, NULL, NULL, NULL, ''),
(110, 192, 'Wolfmoto', '', NULL, NULL, NULL, NULL, NULL, ''),
(111, 193, '', '', NULL, NULL, NULL, NULL, NULL, ''),
(112, 194, 'Piotr', 'Oszczyk', NULL, NULL, NULL, NULL, NULL, '+48602646174'),
(113, 195, 'Robert', 'Maciaszek', NULL, NULL, NULL, NULL, NULL, '500001601'),
(114, 196, 'Marcin', 'Konopa', NULL, NULL, NULL, NULL, NULL, '503 75 75 75'),
(115, 197, 'Lester', 'Kidson', NULL, NULL, NULL, NULL, NULL, ''),
(116, 198, 'Artur', 'Wróbel', NULL, NULL, NULL, NULL, NULL, '530406286'),
(117, 199, 'Pawel', 'M..', NULL, NULL, NULL, NULL, NULL, '+46707541238'),
(118, 200, 'Artur', 'Pokojski', NULL, NULL, NULL, NULL, NULL, '501297522'),
(119, 201, 'Jerzy', 'Barcinski', NULL, NULL, NULL, NULL, NULL, '662723750'),
(120, 202, 'Amelia', 'krzyk', NULL, NULL, NULL, NULL, NULL, '604549321'),
(121, 203, 'Natalia', 'Fruk', NULL, NULL, NULL, NULL, NULL, '794338975'),
(122, 204, 'Krzysztof', 'Rzemieniecki', NULL, NULL, NULL, NULL, NULL, '793523007'),
(123, 205, 'Aneta', 'Dobrowolska ', NULL, NULL, NULL, NULL, NULL, '604124324'),
(124, 206, 'Dawid', 'W', NULL, NULL, NULL, NULL, NULL, '664999839'),
(125, 207, 'Dawid', 'Wilkos', NULL, NULL, NULL, NULL, NULL, '664999839'),
(126, 208, 'Katarzyna', 'Spektrum', NULL, NULL, NULL, NULL, NULL, ' 530 359 070'),
(127, 209, 'test28', 'test', NULL, NULL, NULL, NULL, NULL, ''),
(128, 210, 'test2', 'test', NULL, NULL, NULL, NULL, NULL, ''),
(129, 211, 'TOMASZ', 'STANISZEWSKI', NULL, NULL, NULL, NULL, NULL, '603120830'),
(130, 212, 'Damian', 'Sobieski', NULL, NULL, NULL, NULL, NULL, '725406825'),
(131, 213, 'Damian', 'Sobieski', NULL, NULL, NULL, NULL, NULL, '725406825'),
(132, 214, 'mariusz', '', NULL, NULL, NULL, NULL, NULL, '792056423'),
(133, 215, 'Wojciech', 'Romanowski', NULL, NULL, NULL, NULL, NULL, '733463221'),
(134, 216, 'roland', 'ruchwa', NULL, NULL, NULL, NULL, NULL, '608547983'),
(135, 217, 'Romuald', 'Salinski', NULL, NULL, NULL, NULL, NULL, '512101882'),
(136, 218, 'Paulina', 'Jankowska', NULL, NULL, NULL, NULL, NULL, ''),
(137, 219, 'Arkadiusz', 'Kruczek', NULL, NULL, NULL, NULL, NULL, '695326018'),
(138, 220, 'Adrian', 'Bolimowski', NULL, NULL, NULL, NULL, NULL, '696487507'),
(139, 221, '', '', NULL, NULL, NULL, NULL, NULL, '');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_uzytkownik_firma`
--

CREATE TABLE `portal_uzytkownik_firma` (
  `ufa_id` int NOT NULL,
  `ufa_uzk_id` int NOT NULL,
  `ufa_nazwa` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_nip` varchar(20) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_adres_ulica` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_adres_dom` varchar(5) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_adres_lokal` varchar(5) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_miasto` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_kod` varchar(6) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `ufa_telefon` varchar(15) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_uzytkownik_firma`
--

INSERT INTO `portal_uzytkownik_firma` (`ufa_id`, `ufa_uzk_id`, `ufa_nazwa`, `ufa_nip`, `ufa_adres_ulica`, `ufa_adres_dom`, `ufa_adres_lokal`, `ufa_miasto`, `ufa_kod`, `ufa_telefon`) VALUES
(1, 130, NULL, '6372184198', '20-stu Straconych ', '1', '', 'Olkusz', '32-300', NULL),
(2, 148, NULL, '5262440369', 'Zagajnikowa', '1', '72', 'Piaseczno', '05-500', NULL),
(3, 153, NULL, '8761421268', 'Gierymskiego ', '38a', '', 'Grudziądz', '86-300', NULL),
(4, 183, 'Amracing', '7261294292', 'Cegielniana 31', '', '', 'Rzgów', '95-030', NULL),
(5, 201, NULL, 'NL236591174B02', 'Middelreuvelt', '33', '', 'Grubbenvorst (NL)', '5971DG', NULL),
(6, 203, NULL, '6482660435', 'Stalmacha', '7', '4', 'Zabrze', '41-800', NULL);

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_wartosc`
--

CREATE TABLE `portal_wartosc` (
  `wtc_id` int NOT NULL,
  `wtc_pochodzenie` tinyint NOT NULL DEFAULT '0',
  `wtc_cha_id` int NOT NULL,
  `wtc_nazwa` text COLLATE utf8mb3_polish_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Dumping data for table `portal_wartosc`
--

INSERT INTO `portal_wartosc` (`wtc_id`, `wtc_pochodzenie`, `wtc_cha_id`, `wtc_nazwa`) VALUES
(6, 0, 1, 'dolnośląskie'),
(25, 0, 1, 'kujawsko-pomorskie'),
(28, 0, 1, 'lubelskie'),
(29, 0, 1, 'lubuskie'),
(30, 0, 1, 'łódzkie'),
(31, 0, 1, 'małopolskie'),
(32, 0, 1, 'mazowieckie'),
(33, 0, 1, 'opolskie'),
(34, 0, 1, 'podkarpackie'),
(35, 0, 1, 'podlaskie'),
(36, 0, 1, 'pomorskie'),
(37, 0, 1, 'śląskie'),
(38, 0, 1, 'świętokrzyskie'),
(39, 0, 1, 'warmińsko-mazurskie'),
(40, 0, 1, 'wielkopolskie'),
(41, 0, 1, 'zachodniopomorskie');

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `portal_wydarzenie`
--

CREATE TABLE `portal_wydarzenie` (
  `wde_id` int NOT NULL,
  `wde_data` date NOT NULL,
  `wde_nazwa` varchar(50) COLLATE utf8mb3_polish_ci NOT NULL,
  `wde_miejsce` varchar(50) COLLATE utf8mb3_polish_ci NOT NULL,
  `wde_intro` text COLLATE utf8mb3_polish_ci,
  `wde_tekst` text COLLATE utf8mb3_polish_ci,
  `wde_widocznosc` tinyint NOT NULL DEFAULT '0',
  `wde_meta_tytul` varchar(150) COLLATE utf8mb3_polish_ci DEFAULT NULL,
  `wde_meta_opis` text COLLATE utf8mb3_polish_ci,
  `wde_meta_klucze` varchar(100) COLLATE utf8mb3_polish_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_polish_ci;

--
-- Indeksy dla zrzutów tabel
--

--
-- Indeksy dla tabeli `portal_aktualnosc`
--
ALTER TABLE `portal_aktualnosc`
  ADD PRIMARY KEY (`asc_id`);

--
-- Indeksy dla tabeli `portal_cecha`
--
ALTER TABLE `portal_cecha`
  ADD PRIMARY KEY (`cha_id`);

--
-- Indeksy dla tabeli `portal_dotpay_platnosc`
--
ALTER TABLE `portal_dotpay_platnosc`
  ADD PRIMARY KEY (`pac_id`);

--
-- Indeksy dla tabeli `portal_email`
--
ALTER TABLE `portal_email`
  ADD PRIMARY KEY (`eml_id`),
  ADD UNIQUE KEY `eml_nazwa` (`eml_nazwa`);

--
-- Indeksy dla tabeli `portal_info`
--
ALTER TABLE `portal_info`
  ADD PRIMARY KEY (`ino_id`),
  ADD KEY `ino_ino_id` (`ino_ino_id`);

--
-- Indeksy dla tabeli `portal_kategoria`
--
ALTER TABLE `portal_kategoria`
  ADD PRIMARY KEY (`kta_id`),
  ADD KEY `kta_kta_id` (`kta_kta_id`);

--
-- Indeksy dla tabeli `portal_kategoria_cecha`
--
ALTER TABLE `portal_kategoria_cecha`
  ADD PRIMARY KEY (`kca_id`),
  ADD UNIQUE KEY `kca_kta_id_2` (`kca_kta_id`,`kca_cha_id`),
  ADD KEY `kca_kta_id` (`kca_kta_id`),
  ADD KEY `kca_cha_id` (`kca_cha_id`);

--
-- Indeksy dla tabeli `portal_kategoria_usluga`
--
ALTER TABLE `portal_kategoria_usluga`
  ADD PRIMARY KEY (`kua_id`);

--
-- Indeksy dla tabeli `portal_newsletter`
--
ALTER TABLE `portal_newsletter`
  ADD PRIMARY KEY (`nst_id`);

--
-- Indeksy dla tabeli `portal_ogloszenie`
--
ALTER TABLE `portal_ogloszenie`
  ADD PRIMARY KEY (`oge_id`),
  ADD KEY `oge_kta_id` (`oge_kta_id`),
  ADD KEY `oge_uzk_id` (`oge_uzk_id`);

--
-- Indeksy dla tabeli `portal_ogloszenie_cecha`
--
ALTER TABLE `portal_ogloszenie_cecha`
  ADD PRIMARY KEY (`tca_id`),
  ADD UNIQUE KEY `tca_oge_id` (`tca_oge_id`,`tca_cha_id`),
  ADD KEY `tca_cha_id` (`tca_cha_id`),
  ADD KEY `tca_oge_id_2` (`tca_oge_id`);

--
-- Indeksy dla tabeli `portal_ogloszenie_wartosc`
--
ALTER TABLE `portal_ogloszenie_wartosc`
  ADD PRIMARY KEY (`twc_id`),
  ADD KEY `twc_oge_id` (`twc_oge_id`),
  ADD KEY `twc_wtc_id` (`twc_wtc_id`);

--
-- Indeksy dla tabeli `portal_pakiet`
--
ALTER TABLE `portal_pakiet`
  ADD PRIMARY KEY (`pkt_id`);

--
-- Indeksy dla tabeli `portal_platnosc_sms`
--
ALTER TABLE `portal_platnosc_sms`
  ADD PRIMARY KEY (`sms_id`);

--
-- Indeksy dla tabeli `portal_platnosc_usluga`
--
ALTER TABLE `portal_platnosc_usluga`
  ADD PRIMARY KEY (`usa_id`);

--
-- Indeksy dla tabeli `portal_powiadomienie`
--
ALTER TABLE `portal_powiadomienie`
  ADD PRIMARY KEY (`pow_id`);

--
-- Indeksy dla tabeli `portal_schowek_ogloszenie`
--
ALTER TABLE `portal_schowek_ogloszenie`
  ADD PRIMARY KEY (`sch_id`),
  ADD KEY `sch_oge_id` (`sch_oge_id`),
  ADD KEY `sch_uzk_id` (`sch_uzk_id`);

--
-- Indeksy dla tabeli `portal_subskrypcja`
--
ALTER TABLE `portal_subskrypcja`
  ADD PRIMARY KEY (`sub_id`),
  ADD UNIQUE KEY `sub_typ` (`sub_typ`,`sub_email`,`sub_filtr`);

--
-- Indeksy dla tabeli `portal_subskrypcja_zdarzenie`
--
ALTER TABLE `portal_subskrypcja_zdarzenie`
  ADD PRIMARY KEY (`suz_id`);

--
-- Indeksy dla tabeli `portal_uzytkownik`
--
ALTER TABLE `portal_uzytkownik`
  ADD PRIMARY KEY (`uzk_id`),
  ADD UNIQUE KEY `uzy_login` (`uzk_login`),
  ADD UNIQUE KEY `uzk_nick` (`uzk_nick`);

--
-- Indeksy dla tabeli `portal_uzytkownik_adres`
--
ALTER TABLE `portal_uzytkownik_adres`
  ADD PRIMARY KEY (`uas_id`),
  ADD UNIQUE KEY `uas_zme_id` (`uas_uzk_id`);

--
-- Indeksy dla tabeli `portal_uzytkownik_firma`
--
ALTER TABLE `portal_uzytkownik_firma`
  ADD PRIMARY KEY (`ufa_id`),
  ADD UNIQUE KEY `ufa_uzk_id` (`ufa_uzk_id`);

--
-- Indeksy dla tabeli `portal_wartosc`
--
ALTER TABLE `portal_wartosc`
  ADD PRIMARY KEY (`wtc_id`),
  ADD KEY `wtc_cha_id` (`wtc_cha_id`);

--
-- Indeksy dla tabeli `portal_wydarzenie`
--
ALTER TABLE `portal_wydarzenie`
  ADD PRIMARY KEY (`wde_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `portal_aktualnosc`
--
ALTER TABLE `portal_aktualnosc`
  MODIFY `asc_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `portal_cecha`
--
ALTER TABLE `portal_cecha`
  MODIFY `cha_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `portal_dotpay_platnosc`
--
ALTER TABLE `portal_dotpay_platnosc`
  MODIFY `pac_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=104;

--
-- AUTO_INCREMENT for table `portal_email`
--
ALTER TABLE `portal_email`
  MODIFY `eml_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `portal_info`
--
ALTER TABLE `portal_info`
  MODIFY `ino_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=97;

--
-- AUTO_INCREMENT for table `portal_kategoria`
--
ALTER TABLE `portal_kategoria`
  MODIFY `kta_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=317;

--
-- AUTO_INCREMENT for table `portal_kategoria_cecha`
--
ALTER TABLE `portal_kategoria_cecha`
  MODIFY `kca_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `portal_kategoria_usluga`
--
ALTER TABLE `portal_kategoria_usluga`
  MODIFY `kua_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=85;

--
-- AUTO_INCREMENT for table `portal_newsletter`
--
ALTER TABLE `portal_newsletter`
  MODIFY `nst_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=568;

--
-- AUTO_INCREMENT for table `portal_ogloszenie`
--
ALTER TABLE `portal_ogloszenie`
  MODIFY `oge_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portal_ogloszenie_cecha`
--
ALTER TABLE `portal_ogloszenie_cecha`
  MODIFY `tca_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portal_ogloszenie_wartosc`
--
ALTER TABLE `portal_ogloszenie_wartosc`
  MODIFY `twc_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portal_pakiet`
--
ALTER TABLE `portal_pakiet`
  MODIFY `pkt_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `portal_platnosc_sms`
--
ALTER TABLE `portal_platnosc_sms`
  MODIFY `sms_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `portal_platnosc_usluga`
--
ALTER TABLE `portal_platnosc_usluga`
  MODIFY `usa_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `portal_powiadomienie`
--
ALTER TABLE `portal_powiadomienie`
  MODIFY `pow_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=107;

--
-- AUTO_INCREMENT for table `portal_schowek_ogloszenie`
--
ALTER TABLE `portal_schowek_ogloszenie`
  MODIFY `sch_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portal_subskrypcja`
--
ALTER TABLE `portal_subskrypcja`
  MODIFY `sub_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `portal_subskrypcja_zdarzenie`
--
ALTER TABLE `portal_subskrypcja_zdarzenie`
  MODIFY `suz_id` int NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `portal_uzytkownik`
--
ALTER TABLE `portal_uzytkownik`
  MODIFY `uzk_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=222;

--
-- AUTO_INCREMENT for table `portal_uzytkownik_adres`
--
ALTER TABLE `portal_uzytkownik_adres`
  MODIFY `uas_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=140;

--
-- AUTO_INCREMENT for table `portal_uzytkownik_firma`
--
ALTER TABLE `portal_uzytkownik_firma`
  MODIFY `ufa_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `portal_wartosc`
--
ALTER TABLE `portal_wartosc`
  MODIFY `wtc_id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `portal_wydarzenie`
--
ALTER TABLE `portal_wydarzenie`
  MODIFY `wde_id` int NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `portal_kategoria`
--
ALTER TABLE `portal_kategoria`
  ADD CONSTRAINT `portal_kategoria_ibfk_1` FOREIGN KEY (`kta_kta_id`) REFERENCES `portal_kategoria` (`kta_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_kategoria_cecha`
--
ALTER TABLE `portal_kategoria_cecha`
  ADD CONSTRAINT `portal_kategoria_cecha_ibfk_1` FOREIGN KEY (`kca_kta_id`) REFERENCES `portal_kategoria` (`kta_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portal_kategoria_cecha_ibfk_2` FOREIGN KEY (`kca_cha_id`) REFERENCES `portal_cecha` (`cha_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_ogloszenie`
--
ALTER TABLE `portal_ogloszenie`
  ADD CONSTRAINT `portal_ogloszenie_ibfk_1` FOREIGN KEY (`oge_kta_id`) REFERENCES `portal_kategoria` (`kta_id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  ADD CONSTRAINT `portal_ogloszenie_ibfk_2` FOREIGN KEY (`oge_uzk_id`) REFERENCES `portal_uzytkownik` (`uzk_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_ogloszenie_cecha`
--
ALTER TABLE `portal_ogloszenie_cecha`
  ADD CONSTRAINT `portal_ogloszenie_cecha_ibfk_1` FOREIGN KEY (`tca_oge_id`) REFERENCES `portal_ogloszenie` (`oge_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portal_ogloszenie_cecha_ibfk_2` FOREIGN KEY (`tca_cha_id`) REFERENCES `portal_cecha` (`cha_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_ogloszenie_wartosc`
--
ALTER TABLE `portal_ogloszenie_wartosc`
  ADD CONSTRAINT `portal_ogloszenie_wartosc_ibfk_1` FOREIGN KEY (`twc_oge_id`) REFERENCES `portal_ogloszenie` (`oge_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portal_ogloszenie_wartosc_ibfk_2` FOREIGN KEY (`twc_wtc_id`) REFERENCES `portal_wartosc` (`wtc_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_schowek_ogloszenie`
--
ALTER TABLE `portal_schowek_ogloszenie`
  ADD CONSTRAINT `portal_schowek_ogloszenie_ibfk_1` FOREIGN KEY (`sch_uzk_id`) REFERENCES `portal_uzytkownik` (`uzk_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `portal_schowek_ogloszenie_ibfk_2` FOREIGN KEY (`sch_oge_id`) REFERENCES `portal_ogloszenie` (`oge_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_uzytkownik_adres`
--
ALTER TABLE `portal_uzytkownik_adres`
  ADD CONSTRAINT `portal_uzytkownik_adres_ibfk_1` FOREIGN KEY (`uas_uzk_id`) REFERENCES `portal_uzytkownik` (`uzk_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_uzytkownik_firma`
--
ALTER TABLE `portal_uzytkownik_firma`
  ADD CONSTRAINT `portal_uzytkownik_firma_ibfk_1` FOREIGN KEY (`ufa_uzk_id`) REFERENCES `portal_uzytkownik` (`uzk_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `portal_wartosc`
--
ALTER TABLE `portal_wartosc`
  ADD CONSTRAINT `portal_wartosc_ibfk_1` FOREIGN KEY (`wtc_cha_id`) REFERENCES `portal_cecha` (`cha_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
