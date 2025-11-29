import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in/sign-in.screen'
import { DashboardScreen } from './components/screens/dashboard.screen'
import { QueryClientProvider } from './providers/query-client.provider'
import { Toaster } from './components/ui/sonner'
import { AppLayout } from './components/layout/app-layout'
import { AuthProvider } from './providers/auth.provider'
import { ProductScreen } from './components/screens/product/product.screen'
import { ThemeProvider } from './providers/theme.provider'
import { CreateProductScreen } from './components/screens/create-product/create-product.screen'
import { ProductDetailsScreen } from './components/screens/product-details/product-details.screen'
import { OrderScreen } from './components/screens/order/order.screen'
import { OrderDetailsScreen } from './components/screens/order-details/order-details.screen'
import { StoreScreen } from './components/screens/store/store.screen'
import { StoreDetailsScreen } from './components/screens/store-details/store-details.screen'
import { DelivererScreen } from './components/screens/deliverer/deliverer.screen'
import { DelivererDetailsScreen } from './components/screens/deliverer-details/deliverer-details.screen'

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

                <Route path="/dashboard/store" element={<StoreScreen />} />
                <Route
                  path="/dashboard/store/:id"
                  element={<StoreDetailsScreen />}
                />

                <Route
                  path="/dashboard/deliverer"
                  element={<DelivererScreen />}
                />
                <Route
                  path="/dashboard/deliverer/:id"
                  element={<DelivererDetailsScreen />}
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
                <Route
                  path="/dashboard/order/:id"
                  element={<OrderDetailsScreen />}
                />
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
