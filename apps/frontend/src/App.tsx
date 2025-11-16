import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in/sign-in.screen'
import { DashboardScreen } from './components/screens/dashboard.screen'
import { QueryClientProvider } from './providers/query-client.provider'
import { Toaster } from './components/ui/sonner'
import { AppLayout } from './components/layout/app-layout'
import { AuthProvider } from './providers/auth.provider'
import { CustomerScreen } from './components/screens/customer/customer.screen'
import { OrderScreen } from './components/screens/order.screen'
import { ProductScreen } from './components/screens/product/product.screen'
import { ThemeProvider } from './providers/theme.provider'
import { CustomerDetailsScreen } from './components/screens/customer-details/customer-details.screen'
import { CreateProductScreen } from './components/screens/create-product/create-product.screen'
import { ProductDetailsScreen } from './components/screens/product-details/product-details.screen'

const App = () => {
  return (
    <BrowserRouter>
      <QueryClientProvider>
        <AuthProvider>
          <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
            <Routes>
              <Route path="/sign-in" element={<SignInScreen />} />
              <Route element={<AppLayout />}>
                <Route path="/dashboard" element={<DashboardScreen />} />
                <Route
                  path="/dashboard/customer"
                  element={<CustomerScreen />}
                />
                <Route
                  path="/dashboard/customer/:id"
                  element={<CustomerDetailsScreen />}
                />

                <Route path="/dashboard/product" element={<ProductScreen />} />
                <Route
                  path="/dashboard/product/create"
                  element={<CreateProductScreen />}
                />
                <Route
                  path="/dashboard/product/:id"
                  element={<ProductDetailsScreen />}
                />

                <Route path="/dashboard/order" element={<OrderScreen />} />
              </Route>
            </Routes>
            <Toaster richColors />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
