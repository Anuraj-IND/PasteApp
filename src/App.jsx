import './App.css'
import { createBrowserRouter } from 'react-router-dom'
import { RouterProvider } from 'react-router-dom'
import Paste from './components/Paste'
import ViewPaste from './components/ViewPaste'
import Navbar from './components/Navbar'
import Home from './components/Home'
import { Provider } from 'react-redux'
import { store } from './store.js'

const router = createBrowserRouter(
  [
    {
      path:'/',
      element:
      <div>
        <Navbar />
        <Home />
      </div>
    },
    {
      path:'/pastes',
      element:
      <div>
        <Navbar />
        <Paste />
      </div>
    },
    {
      path:'/pastes/:id',
      element:
      <div>
        <Navbar />
        <ViewPaste />
      </div>
    }
    ]
  )
function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
