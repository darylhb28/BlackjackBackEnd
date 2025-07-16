DROP TABLE IF EXISTS games;
DROP TABLE IF EXISTS hand;
DROP TABLE IF EXISTS shoe;
DROP TABLE IF EXISTS cards CASCADE;
DROP TABLE IF EXISTS strategy;
DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password TEXT UNIQUE NOT NULL
);

CREATE TABLE cards (
    id SERIAL PRIMARY KEY,
    rank TEXT NOT NULL, 
    suit TEXT NOT NULL, 
    card_value INTEGER NOT NULL
);

CREATE TABLE strategy (
    id SERIAL PRIMARY KEY,
    players_hand TEXT NOT NULL,
    dealers_upcard TEXT NOT NULL, 
    recc_action TEXT NOT NULL, 
    hand_type TEXT NOT NULL
);

CREATE TABLE hand (
    id SERIAL PRIMARY KEY,
    card_id INTEGER NOT NULL, 
    FOREIGN KEY (card_id) REFERENCES cards(id)
    ON DELETE CASCADE,
    is_player BOOLEAN NOT NULL, 
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,
    hand_num INTEGER DEFAULT 1
);

CREATE TABLE shoe (
    id SERIAL PRIMARY KEY,
    card_id INTEGER NOT NULL, 
    FOREIGN KEY (card_id) REFERENCES cards(id)
    ON DELETE CASCADE,
    deck_num INTEGER NOT NULL, 
    drawn BOOLEAN DEFAULT FALSE
);

CREATE TABLE games (
    id SERIAL PRIMARY KEY, 
    user_id INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(id)
    ON DELETE CASCADE,  
    hands_lost INTEGER DEFAULT 0, 
    hands_won INTEGER DEFAULT 0, 
    hands_pushed INTEGER DEFAULT 0
);


