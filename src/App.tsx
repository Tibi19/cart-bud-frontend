import './App.css'
import { Routes, Route, Navigate } from "react-router-dom"
import SignInPage from './page/auth/SignInPage'
import { useEffect } from 'react'
import { getTheme, themeAsClass } from '@/theme/theme'
import SignUpPage from '@/page/auth/SignUpPage'

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
          <div /> // Home container (navbar and group/list content)
        }
      >
        <Route
          path="navbar"
          element={
            <div /> // Navbar
          }
        />
        <Route
          path=":parent/:id"
          element={
            <div /> // Group/List content
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

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.tsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

export default App
