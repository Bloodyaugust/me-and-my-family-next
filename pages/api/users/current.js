import { getUser } from '../../../util/user';

export default async function handler(req, res) {
  const { user } = await getUser(req);

  switch (req.method) {
    default:
      res.status(200).json(user);
      break;
  }
}
