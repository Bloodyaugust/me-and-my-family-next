import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler({ query: { id } }, res) {
  res.status(200).json(await prisma.user.findUnique({
    where: {
      id: parseInt(id, 10)
    }
  }));
}
