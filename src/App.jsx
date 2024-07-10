import React from 'react'
import Routing from './routing/routing'
import { Provider } from 'react-redux'
import  {store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
function App() {
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routing/>
      </PersistGate>  
    </Provider>
    </>
  )
}

export default App
