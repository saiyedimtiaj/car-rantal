import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Route/Route'
import { ThemeProvider } from './utils/theme-provider'
import { Provider } from 'react-redux'
import { Toaster } from 'sonner'
import { PersistGate } from 'redux-persist/integration/react'
import { persistor, store } from './redux/store'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Toaster position='top-center' />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <RouterProvider router={router} />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>,
)
