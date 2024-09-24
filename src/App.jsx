import { Provider } from 'react-redux'
import { store } from './redux/store'
import Login from './components/Login'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import './index.css'
import Register from './components/Registration'

function App() {


  return (
    <>
      <Provider store={store}>
        <Router>
          <Routes>
            <Route path='/' element={<Login/>}/>
            <Route path='/signup' element={<Register/>}/>
          </Routes>
        </Router>
        
      </Provider>
    </>
  )
}

export default App
