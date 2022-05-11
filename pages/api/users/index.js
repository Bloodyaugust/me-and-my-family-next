import { PrismaClient } from '@prisma/client'
import { getUser } from '../../../util/user';

const prisma = new PrismaClient();

export default async function handler(req, res) {
  const { user } = await getUser(req);

  switch (req.method) {
    case 'POST':
      const updatedUser = await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          name: req.body.name
        }
      })
      res.status(200).json(updatedUser);
      break;
    default:
      res.status(200).json(await prisma.user.findMany());
      break;
  }
}
