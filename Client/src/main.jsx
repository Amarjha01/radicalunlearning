// ⚠️ Add this at the very top of your entry file
import { Buffer } from 'buffer'
import process from 'process'

window.global = window
window.Buffer = Buffer
window.process = process




import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import routes from './routes/routes.jsx'
import {store} from './store/Store.jsx'
import { Provider } from 'react-redux'
import './index.css'
createRoot(document.getElementById('root')).render(
<Provider store={store}>
<RouterProvider router={routes} /> {/* Provides the router configuration */} 
</Provider>
)
