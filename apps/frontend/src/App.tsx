import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in/sign-in.screen'
import { DashboardScreen } from './components/screens/dashboard.screen'
import { QueryClientProvider } from './providers/query-client.provider'
import { Toaster } from './components/ui/sonner'

const App = () => {
  return (
    <QueryClientProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/sign-in" element={<SignInScreen />} />
          <Route path="/dashboard" element={<DashboardScreen />} />
        </Routes>
      </BrowserRouter>
      <Toaster richColors />
    </QueryClientProvider>
  )
}

export default App
