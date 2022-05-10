import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const session = await getSession({ req });
  console.log(session, { ...await prisma.user.findUnique({
    where: {
      email: session.user.email
    },
    select: {
      id: true
    }
  })})

  switch (req.method) {
    case 'POST':
      console.log('posting');
      const post = await prisma.post.create({
        data: {
          title: '',
          content: 'test content',
          author: {
            connect: {
              ...await prisma.user.findUnique({
                where: {
                  email: session.user.email
                },
                select: {
                  id: true
                }
              })
            }
          }
        }
      })
      res.status(200).json(post);
      break;
    default:
      res.status(200).json(await prisma.post.findMany());
      break;
  }
}
