import React, { useState } from 'react'; 

import './Expenses.css'
import ExpensesFilter from './ExpensesFilter';
import Card from '../UI/Card';
import ExpensesList from './ExpensesList';

const Expenses = (props) => {
    const [filteredYear, setFilteredYear] = useState('2023')
    
    
    const filterChangeHandler = (year) => {
        console.log('Filter change handled by Expenses.js')
        console.log(year + ' in Expenses.js')
        setFilteredYear(year)
    }

    const filteredExpenses = props.expenses.filter((expense) => {
        return new Date(expense.date).getFullYear().toString() === filteredYear
    })


    /* Filters expenses by year */
      return (
        <Card className='expense-items_border'>
          <ExpensesFilter selected={filteredYear} onChangeFilter={filterChangeHandler}
          ></ExpensesFilter>
          <ExpensesList filteredExpenses={filteredExpenses} isLoading={props.isLoading}></ExpensesList>
    </Card>
    )
}
export default Expenses;