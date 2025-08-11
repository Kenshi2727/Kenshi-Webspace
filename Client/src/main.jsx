import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { PostsProvider } from './context/PostsContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PostsProvider><App /></PostsProvider>
  </StrictMode>,
)
