1. Project Elevator Pitch
    A website/app for users to play blackjack while getting reccomdation on basic strategy moves as they play hands. With each hand they will get a message on a reccomended action.

2. Database Schema

    https://drawsql.app/teams/fullstack-academy-12/diagrams/blackjack-basics

3. List of API Endpoints
        /users router

            POST /users/register
 
            POST /users/login
        
            🔒 GET /users/me
            Returns the currently logged-in user's data, game history?
        
        /strategy router

            🔒 POST /strategy 
            returns a reccommended action based on a users hand

        /shoe router

            🔒 GET /playerhand
            Gets card from shoe thats not drawn, marks it as drawn, adds card to player hand 
            (twice for initial deal, once for hit)

            🔒 GET /dealerhand
            Gets card from shoe thats not drawn, marks it as drawn, adds card to dealer hand
            (do this again for dealer down card reveal)

            🔒 GET /newgame
            Returns cards from hands back to shoe

4. User story
 Only authenticated users can play and get tips

 5. Routes and what they return:

    GET http://localhost:3000/users/me - returns users info
    returns:
        {
        "id": 2,
        "email": "newuser1@mail.com",
        "password": "$2b$10$.ZYLHWgcHT3ZvvcSDIR7NO6vv31DN1LN7OmETgFavhMYEfpR4L06O"
        }

    POST http://localhost:3000/users/login - logs in user, needs email and password
    returns:
        token

    POST http://localhost:3000/users/register - registers user
    returns:
        token

    POST http://localhost:3000/shoe
    returns:
        "Shoe loaded, hands cleared, ready for new game."

    POST http://localhost:3000/hand/player - requires auth, deals one card from shoe to player's hand, req.body can include hand_num, otherwise defaults to 1
    returns:
        {
        "id": 52,
        "rank": "A",
        "suit": "spades",
        "card_value": 11
        }   

    POST http://localhost:3000/hand/dealer - deals one card from shoe to dealer's hand
    returns:
        {
        "id": 1,
        "rank": "2",
        "suit": "hearts",
        "card_value": 2
        }

    POST http://localhost:3000/hand/split - requires auth, moves one card from current hand to a new hand, req.body requires the CURRENT hand_num
    returns:
        [
            {
                "id": 13,
                "card_id": 52,
                "is_player": true,
                "user_id": 2,
                "hand_num": 2
            }
        ]




    