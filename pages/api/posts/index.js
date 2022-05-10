import { PrismaClient } from '@prisma/client'
import { getUser } from '../../../util/user';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { user } = await getUser(req);

  switch (req.method) {
    case 'POST':
      const post = await prisma.post.create({
        data: {
          title: '',
          content: 'test content',
          author: {
            connect: {
              id: user.id
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
