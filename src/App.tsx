import SignUpPage from '@/page/auth/SignUpPage'
import DefaultHomeContent from '@/page/home/DefaultHomeContent'
import HomeContent from '@/page/home/HomeContent'
import HomePage from '@/page/home/HomePage'
import { getTheme, themeAsClass } from '@/theme/theme'
import { useEffect } from 'react'
import { Navigate, Route, Routes } from "react-router-dom"
import './App.css'
import SignInPage from './page/auth/SignInPage'

function App() {

  useEffect(() => {
    const theme = getTheme()
    document.body.classList.value = themeAsClass(theme)
  }, [])

  return (
    <Routes>
      <Route
        path="/"
        element={
          <SignInPage />
        }
      />
      <Route
        path="/signup"
        element={
          <SignUpPage />
        }
      />

      <Route
        path="/home"
        element={
          <HomePage/>
        }
      >
        <Route
          index element={
            <DefaultHomeContent />
          }
        />
        <Route
          path=":parent/:id"
          element={
            <HomeContent/>
          }
        />
      </Route>

      <Route
        path="*"
        element={
          <Navigate to="/" />
        }
      />

    </Routes>
  )

}

export default App
