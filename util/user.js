import { PrismaClient } from '@prisma/client'
import { getSession } from 'next-auth/react'

const prisma = new PrismaClient();

export async function getUser(req) {
  const session = await getSession({ req });
  let user;

  if (session) {
    user = await prisma.user.findUnique({
      where: {
        email: session.user.email
      }
    });
  }

  return { session, user };
}
