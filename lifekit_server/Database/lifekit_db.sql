DROP TABLE IF EXISTS assister;
DROP TABLE IF EXISTS emergency;
DROP TABLE IF EXISTS userinfo;

CREATE TABLE userinfo(
    userid INT NOT NULL AUTO_INCREMENT,
    phone_number VARCHAR(10) NOT NULL,
    refresh_token VARCHAR(100) NOT NULL,
    access_token VARCHAR(100),
    access_token_expiration DATETIME,
    last_lat FLOAT,
    last_lng FLOAT,
    PRIMARY KEY (userid)
);

CREATE TABLE emergency(
    emergencyid INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    user_nickname VARCHAR(100),
    status BOOLEAN NOT NULL,
    emergency_lat FLOAT NOT NULL,
    emergency_lng FLOAT NOT NULL,
    emergency_address VARCHAR(1000),
    started_at DATETIME NOT NULL,
    ended_at DATETIME,
    PRIMARY KEY (emergencyid),
    FOREIGN KEY (userid) REFERENCES userinfo(userid)
);

CREATE TABLE assister(
    id INT NOT NULL AUTO_INCREMENT,
    userid INT NOT NULL,
    emergencyid INT NOT NULL,
    response BOOLEAN NOT NULL,
    com VARCHAR(100),
    PRIMARY KEY (id),
    FOREIGN KEY (userid) REFERENCES userinfo(userid),
    FOREIGN KEY (emergencyid) REFERENCES emergency(emergencyid)
);

