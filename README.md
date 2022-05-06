# Me and My Family

Starting the dev server:
`yarn dev`

Starting the dev backend:
`docker compose up -d`

After editing prisma schema:
`npx prisma migrate dev --name name-of-migration`

To update local db to latest schema:
`npx prisma db push`

To run the local db explorer:
`npx prisma studio`

To access the smtp4dev webapp:
[click here](http://localhost:5001/)
