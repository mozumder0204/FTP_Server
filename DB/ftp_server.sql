-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 18, 2019 at 05:21 PM
-- Server version: 10.1.35-MariaDB
-- PHP Version: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ftp_server`
--

-- --------------------------------------------------------

--
-- Table structure for table `admins`
--

CREATE TABLE `admins` (
  `A_ID` varchar(20) NOT NULL,
  `A_NAME` varchar(200) NOT NULL,
  `A_EMAIL` varchar(200) NOT NULL,
  `A_MOBILE` varchar(100) NOT NULL,
  `A_ADDRESS` varchar(500) NOT NULL,
  `A_IMAGE` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admins`
--

INSERT INTO `admins` (`A_ID`, `A_NAME`, `A_EMAIL`, `A_MOBILE`, `A_ADDRESS`, `A_IMAGE`) VALUES
('aa', 'Admin Nobel', 'admin1@gmail.com', '01702020203', 'Dhaka', '/pictures/image_1552835647172.jpg'),
('jj', 'Admin jj', 'admin01@gmail.com', '01702020202', 'Dhaka', '/pictures/image_1552913540740.jpg'),
('xx', 'Admin xx', 'adminxx@gmail.com', '01702020202', 'Comilla', '/pictures/image_1552913476602.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `moderator`
--

CREATE TABLE `moderator` (
  `M_ID` varchar(20) NOT NULL,
  `M_NAME` varchar(200) NOT NULL,
  `M_EMAIL` varchar(200) NOT NULL,
  `M_MOBILE` varchar(100) NOT NULL,
  `M_ADDRESS` varchar(500) NOT NULL,
  `M_IMAGE` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `moderator`
--

INSERT INTO `moderator` (`M_ID`, `M_NAME`, `M_EMAIL`, `M_MOBILE`, `M_ADDRESS`, `M_IMAGE`) VALUES
('ee', 'Moderator ee', 'Moderator01@gmail.com', 'Comilla', '01702020202', '/pictures/image_1552913521044.jpg'),
('ff', 'Moderator ff', 'Moderator01@gmail.cff', 'Dhaka', '01702020202', '/pictures/image_1552913446720.jpg'),
('mm', 'Moderator one', 'Moderator01@gmail.com', 'Comilla', '01702020202', '/pictures/image_1552838595980.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `requests`
--

CREATE TABLE `requests` (
  `R_ID` int(100) NOT NULL,
  `R_TIME` date NOT NULL,
  `R_TEXT` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `requests`
--

INSERT INTO `requests` (`R_ID`, `R_TIME`, `R_TEXT`) VALUES
(7, '2019-03-18', 'Please upload \"Game of Thrones 8\"'),
(8, '2019-03-18', 'rEQUEST tEST TWO');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `U_ID` varchar(20) NOT NULL,
  `U_PASSWORD` varchar(200) NOT NULL,
  `U_TYPE` varchar(20) NOT NULL,
  `STATUS` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`U_ID`, `U_PASSWORD`, `U_TYPE`, `STATUS`) VALUES
('aa', 'aa', 'ADMIN', 'ACTIVE'),
('ee', 'ee', 'MODERATOR', 'PENDING'),
('ff', 'ff', 'MODERATOR', 'PENDING'),
('jj', 'jj', 'ADMIN', 'PENDING'),
('mm', 'mm', 'MODERATOR', 'ACTIVE'),
('xx', 'xx', 'ADMIN', 'PENDING');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admins`
--
ALTER TABLE `admins`
  ADD PRIMARY KEY (`A_ID`);

--
-- Indexes for table `moderator`
--
ALTER TABLE `moderator`
  ADD PRIMARY KEY (`M_ID`);

--
-- Indexes for table `requests`
--
ALTER TABLE `requests`
  ADD PRIMARY KEY (`R_ID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`U_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `requests`
--
ALTER TABLE `requests`
  MODIFY `R_ID` int(100) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
