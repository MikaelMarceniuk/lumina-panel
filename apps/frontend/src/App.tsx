import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in/sign-in.screen'
import { DashboardScreen } from './components/screens/dashboard.screen'
import { QueryClientProvider } from './providers/query-client.provider'
import { Toaster } from './components/ui/sonner'
import { AppLayout } from './components/layout/app-layout'
import { AuthProvider } from './providers/auth.provider'

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <AuthProvider>
          <Routes>
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
            </Route>
          </Routes>
          <Toaster richColors />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
