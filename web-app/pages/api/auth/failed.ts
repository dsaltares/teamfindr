import type { NextApiHandler } from 'next';

const handler: NextApiHandler = async (req, res) => {
  res.status(401).json({ message: 'Failed to authenticate' });
};

export default handler;
