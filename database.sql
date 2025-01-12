DROP DATABASE IF EXISTS DBVideoplayer;

CREATE DATABASE DBVideoplayer;

USE DBVideoplayer;

CREATE TABLE Account
(
    userId INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BIT NOT NULL DEFAULT 0,    
);

CREATE TABLE ContentType
(
    contentTypeId INT IDENTITY(1,1) PRIMARY KEY,
    name INT NOT NULL,
    description VARCHAR(200)
);

CREATE TABLE Content
(
    contentId INT IDENTITY(1,1) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    videoUrl VARCHAR(255),
    imageUrl VARCHAR(255),
    description VARCHAR(255),
    duration INT,
    contentTypeId INT NOT NULL,    
    CONSTRAINT fk_contentType_Content FOREIGN KEY (contentTypeId) REFERENCES ContentType(contentTypeId),
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Schedule
(
    scheduleId INT IDENTITY(1,1) PRIMARY KEY,
    contentId INT NOT NULL,
    startDate DATETIME NOT NULL,
    isActive BIT NOT NULL DEFAULT 0,
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);