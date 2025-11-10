import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in/sign-in.screen'
import { DashboardScreen } from './components/screens/dashboard.screen'
import { QueryClientProvider } from './providers/query-client.provider'
import { Toaster } from './components/ui/sonner'
import { AppLayout } from './components/layout/app-layout'
import { AuthProvider } from './providers/auth.provider'
import { ClientScreen } from './components/screens/client.screen'
import { OrderScreen } from './components/screens/order.screen'
import { ProductScreen } from './components/screens/product.screen'

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <AuthProvider>
          <Routes>
            <Route path="/sign-in" element={<SignInScreen />} />
            <Route element={<AppLayout />}>
              <Route path="/dashboard" element={<DashboardScreen />} />
              <Route path="/dashboard/client" element={<ClientScreen />} />
              <Route path="/dashboard/order" element={<OrderScreen />} />
              <Route path="/dashboard/product" element={<ProductScreen />} />
            </Route>
          </Routes>
          <Toaster richColors />
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
