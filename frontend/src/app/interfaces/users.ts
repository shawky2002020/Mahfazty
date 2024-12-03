export class Users {
  _id?:string;
  email!:string;
  password!:string;
}

export class userResponse{
  token!:string ;
  data!:Users;
}