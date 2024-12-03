

export const BASEURL = 'http://localhost:5000';

//Charts urls
export const CHART_BASE = BASEURL + '/api/chart';
export const CHART_MONTH = CHART_BASE + '/month';
export const CHART_YEAR = BASEURL + CHART_BASE + '/year';
export const CHART_DAY = BASEURL + CHART_BASE + '/day';

//Expenses urls
export const Expense_BASE = BASEURL + '/api/expense';
export const ADD_EXPENSE = Expense_BASE + '/add'
export const SUBTYPE_EXPENSE = Expense_BASE + '/subtype'
export const TYPE_EXPENSE = Expense_BASE + '/type'
export const DELETE_EXPENSE = Expense_BASE + '/delete'


//Users urls
export const USERS_BASE = BASEURL + '/api/user';
export const USERS_REGISTER = USERS_BASE + '/register';
export const USERS_LOGIN = USERS_BASE + '/login';

//filter
export const FILTER_BASE = BASEURL + '/api/filter'
export const MONTH_FILTER = FILTER_BASE + '/filterMonth'