import React from 'react';
import ExpenseItem from "./ExpenseItem";
import './ExpensesList.css'

const ExpensesList = (props) => {
    if(props.isLoading) {
        return <p className='expenses-list__fallback'><b>Fetching expenses data...</b></p>
    }

    if (props.filteredExpenses.length === 0) {
        return <p className='expenses-list__fallback'>No expenses found.</p>
    }
    
    /* Filters expenses by years */
    return (
        <ul className='expenses-list'>
            {
                props.filteredExpenses.map((expenses) => {
                    return <ExpenseItem
                        key={expenses.id}
                        title={expenses.title}
                        amount={expenses.amount}
                        date={expenses.date}
                    ></ExpenseItem>
                })
            }
        </ul>
    )
}
export default ExpensesList;