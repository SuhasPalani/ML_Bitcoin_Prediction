create database bitcoin_prediction;
use bitcoin_prediction;

CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(80) UNIQUE NOT NULL,
    password VARCHAR(80) NOT NULL
);

INSERT INTO users (username, password) VALUES ('suhas', 'bitcoin');
INSERT INTO users (username, password) VALUES ('sudhi', 'bitcoin');