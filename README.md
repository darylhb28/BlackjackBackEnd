1. Project Elevator Pitch
    A website/app for users to play blackjack while getting reccomdation on basic strategy moves as they play hands. With each hand they will get a message on a reccomended action.

2. Database Schema

    https://drawsql.app/teams/fullstack-academy-12/diagrams/blackjack-basics

3. List of API Endpoints - updated 7/7/25

        /users router

            POST /users/register
            Returns token
 
            POST /users/login
            Returns token
        
            🔒 GET /users/me
            Returns:
                {
                    "id": 2,
                    "email": "newuser1@mail.com",
                    "password": "$2b$10$.ZYLHWgcHT3ZvvcSDIR7NO6vv31DN1LN7OmETgFavhMYEfpR4L06O"
                }

        /shoe router

            POST /
            Returns:
            "Shoe loaded, hands cleared, ready for new game."

        /hand router

            🔒 POST /player
            deals one card from shoe to player's hand, req.body can include hand_num, otherwise defaults to 1
            Returns:
                {
                    "id": 52,
                    "rank": "A",
                    "suit": "spades",
                    "card_value": 11
                }   

            🔒 POST /dealer
            deals one card from shoe to dealer's hand
            Returns:
                {
                    "id": 1,
                    "rank": "2",
                    "suit": "hearts",
                    "card_value": 2
                }

            🔒 POST /split
            moves one card from current hand to a new hand, req.body requires the CURRENT hand_num
            Returns:
                [
                    {
                        "id": 13,
                        "card_id": 52,
                        "is_player": true,
                        "user_id": 2,
                        "hand_num": 2
                    }
                ]
            
        /strategy router

            POST /strategy 
            req.body:
                {
                    "players_hand" : "14",
                    "dealers_upcard" : "8",
                    "hand_type" : "hard"
                }
            returns:
                [
                    {
                        "recc_action": "H"
                    }
                ]

4. User story
 Only authenticated users can play and get tips






    