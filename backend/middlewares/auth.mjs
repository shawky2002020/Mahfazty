import jwt from "jsonwebtoken";
const HTTP_UNAUTHORIZED = 450;
export default (req, res,next) => {
    
  const token = req.headers.access_token ;
  if(!token) return res.status(HTTP_UNAUTHORIZED).send();
  

  try {
      const decodedUser = jwt.verify(token, process.env.SECRET);
      req.user = decodedUser;
  } catch (error) {
      if (error.name === 'TokenExpiredError') {
          return res.status(HTTP_UNAUTHORIZED).send('Token expired');
        } else if (error.name === 'JsonWebTokenError') {
          return res.status(HTTP_UNAUTHORIZED).send('Invalid token');
        } else {
          return res.status(HTTP_UNAUTHORIZED).send('Token verification failed');
        }
  }

  return next();
}