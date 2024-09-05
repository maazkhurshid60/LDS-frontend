import React from 'react'
import Routing from './routing/routing'
import { Provider } from 'react-redux'
import  {store, persistor } from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './global.css'
function App() {
  return (
    <>
    <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <Routing/>
      {/* <ToastContainer /> */}
      <ToastContainer
            toastContainerClassName="toast-container z-[999999999999999999]"
            position="top-right"
            autoClose={5000}
            closeOnClick
            pauseOnHover
          />
      </PersistGate>  
    </Provider>
    </>
  )
}

export default App
