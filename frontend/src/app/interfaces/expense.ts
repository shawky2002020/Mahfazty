export interface Expense {
  _id?:string,
  amount:number,
  date:Date,
  subDate:subdate[],
  name:string,
  type:string,
  subType:string,
  userId?:string
}

export interface subdate{
  month:number,
  year:number
}