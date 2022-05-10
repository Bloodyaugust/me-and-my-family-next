import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient();

export default async function handler({ query: { id } }, res) {
  res.status(200).json(await prisma.post.findUnique({
    where: {
      id
    }
  }));
}
