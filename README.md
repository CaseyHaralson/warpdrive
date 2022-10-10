# Warp Drive!
This project combines Next.js, Graphql, and Python Flask.

Most of the work is in the Next.js project. The Python project is just a stand-in for some sort of backend process that may or may not need to be triggered from the front end.

## Next.js App
The Next.js app has some examples of SSR (server side rendering), and SSR combined with CSR (client side rendering). It also has two different examples of using GraphQL. It uses the Apollo Client for client activities and GraphQL Yoga to define a server.

The UI exposes two different pages:
1. One of the pages is just a simple page displaying past SpaceX launches by using a public SpaceX GraphQL api. It is implemented with SSR.
2. The other page displays closing stock values from a database. This page simulates a more complicated scenario by hitting the defined GraphQL server api, and allowing new data to be added by hitting the Python flask server. The page starts by rendering with SSR and then filters data/adds new data by using CSR.

The app also uses Bootstrap for most of the styling and for some javascript things (tooltip and modal window).

## Python Flask App
The Python app exposes one Flask api for scraping stock data and saving it to the database.

## Database
The data is saved to files on the filesystem instead of using a database. I didn't want to have to install any database programs or have to work with any database ORM dependencies. I've done this in many different languages with many different databases, so didn't feel like I would be learning anything truely new.

## Running the Project
The easiest way to run the project is just run the Next.js app. This way you can do everything but add new stocks to the database. To run the projects, check the README from each project.
