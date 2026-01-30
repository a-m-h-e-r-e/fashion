import categoriesRestHandlers from './categories'
import filtersRestHandlers from './filters'
import helloRestHandlers from './hello'
import productsRestHandlers from './products'
import promosRestHandlers from './promos'

const resetHandlers = [
  ...categoriesRestHandlers,
  ...filtersRestHandlers,
  ...helloRestHandlers,
  ...productsRestHandlers,
  ...promosRestHandlers,
]

export default resetHandlers
