import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from 'react-query'

const querClient = new QueryClient()


createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={querClient}>
    <App />
  </QueryClientProvider>,
)
