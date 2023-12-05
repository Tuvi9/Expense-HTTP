import React, { useState, useEffect} from 'react'; 

import './App.css';
import Expenses from './components/Expenses/Expenses';
import NewExpense from './components/NewExpense/NewExpense';
import Error from './components/UI/Error';

const App = () => {
  /* Algselt kasutab DUMMY_EXPENSES andmestikuna */
  const [isFetching, setIsFetching] = useState(false)
  const [expenses, setExpenses] = useState([])
  const [error, setError] = useState(null)
  const [showError, setShowError] = useState(false)

  useEffect(() => {
    const getExpenses = async () => {
      setIsFetching(true)
      try {
        const response = await fetch('http://localhost:3005/expenses')
        const responseData = await response.json()
        if(!response.ok) {
          throw new Error('Failed fetching data')
        }
        setExpenses(responseData)
      } catch (error) {
        setError({
          title: 'An error accoured!',
          message: 'Failed fetching expenses data, please try again later.'
        })
        setShowError(true)
      }
      setIsFetching(false)
    }
    getExpenses()
  }, [])

  console.log(error)
  const errorHandler = () => {
    setError(null)
    setShowError(false)
  }

  const addExpensehandler = (expense) => {
    const addExpense = async () => {
      try {
        setExpenses([...expenses, expense])
        const response = await fetch('http://localhost:3005/add-expense', {
          method: 'POST',
          body: JSON.stringify(expense),
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!response.ok) {
          throw new Error('Failed saving data')
        }
      } catch (error) {
          setError({
            title: 'An error occurred!',
            message: 'Failed saving expense data, please try again later.'
          })
          setShowError(true)
        }
      }
      addExpense(expense)
    }

  return (
    <div className="App">
      { showError && (
        <Error
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />)
      }
      <NewExpense onAddExpense={addExpensehandler}></NewExpense>
      {/* Andmestik DUMMY_EXPENSES mis on suunatud läbi propsi Expenses */}
      <Expenses expenses={expenses} isLoading={isFetching}></Expenses>
    </div>
  );
}

export default App;
