import { BrowserRouter, Route, Routes } from 'react-router'
import { SignInScreen } from './components/screens/sign-in.screen'

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignInScreen />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
