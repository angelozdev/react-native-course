export type Expense = {
  amount: number
  category: string
  name: string
  id: string
  createdAt: number
}

export type NewExpense = Omit<Expense, 'id' | 'createdAt'>
