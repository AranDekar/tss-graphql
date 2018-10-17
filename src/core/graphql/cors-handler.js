import CORS from 'cors';

const corsOptions = {
  credentials: true,
  origin: ['http://localhost:3000'],
};

const middleware = CORS(corsOptions);

export default middleware;
