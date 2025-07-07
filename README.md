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