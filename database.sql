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
    CreatedAt DATETIME DEFAULT GETDATE(),    
);

CREATE TABLE ContentType
(
    contentTypeId INT IDENTITY(1,1) PRIMARY KEY,
    name VARCHAR(200) NOT NULL,
    description VARCHAR(255)
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
    CONSTRAINT fk_contentType FOREIGN KEY (contentTypeId) REFERENCES ContentType(contentTypeId),
    createdAt DATETIME NOT NULL DEFAULT GETDATE()
);

CREATE TABLE Playlist
(
    playlistId INT PRIMARY KEY IDENTITY(1,1),   
    name VARCHAR(200) NOT NULL,
    description VARCHAR(255),
    CreatedAt DATETIME DEFAULT GETDATE(),    
);

CREATE TABLE Schedule
(
    scheduleId INT IDENTITY(1,1) PRIMARY KEY,
    contentId INT NOT NULL,
    playlistId INT NOT NULL,
    startDate DATETIME NOT NULL,
    isActive BIT NOT NULL DEFAULT 0,
    duration INT,
    createdAt DATETIME NOT NULL DEFAULT GETDATE(),   
    CONSTRAINT fk_content FOREIGN KEY (contentId) REFERENCES Content(contentId),
    CONSTRAINT fk_playlist FOREIGN KEY (playlistId) REFERENCES Playlist(playlistId)
);

INSERT INTO ContentType (name) VALUES ('Video con título (VT)');
INSERT INTO ContentType (name) VALUES ('Video con banner lateral (VBL)');
INSERT INTO ContentType (name) VALUES ('Banner con título (BT)');

INSERT INTO Playlist (name, description) VALUES ('PRINCIPAL','Este es el contenido que se muestra a los usuarios que no son administradores');
