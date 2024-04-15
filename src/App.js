import "./App.css"
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { onAuthStateChanged } from "firebase/auth"
// context
import { AuthProvider } from "./context/AuthContext"
//hooks
import { useState, useEffect } from "react"
import { useAuthentication } from "./hooks/useAuthentication"
//pages
import About from "./pages/About/About"
import NavBar from "./components/NavBar"
import Footer from "./components/Footer"
import Login from "./pages/Login/Login"
import Register from "./pages/Register/Register"
import Dashboard from "./pages/Dashboard/Dashboard"
import CadFuncionario from "./pages/CadastroFuncionario/CadFuncionario"
import EditeCadFuncionario from "./pages/Edite/EditeCadFuncionario"
import VisualizaCad from "./pages/VisualizarCad/VisualizarCad"
import Promocao from "./pages/Promocao/Promocao"
import Home from "./pages/Home/Home"
function App() {
  const [user, setUser] = useState(undefined)
  const { auth } = useAuthentication()
  const loadingUser = user === undefined

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      setUser(user)
    })
  }, [auth])

  if (loadingUser) {
    return <p>Carregando...</p>
  }
  return (
    <div className="App">
      <AuthProvider value={{ user }}>
        <BrowserRouter>
          <NavBar />
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route
                path="/login"
                element={!user ? <Login /> : <Navigate to="/dashboard" />}
              />
              <Route
                path="/register"
                element={!user ? <Register /> : <Navigate to="/" />}
              />
              <Route
                path="/cads/CadFuncionario"
                element={user ? <CadFuncionario /> : <Navigate to="/" />}
              />
              <Route
                path="/dashboard"
                element={user ? <Dashboard /> : <Navigate to="/" />}
              />{" "}
              <Route
                path="/cads/EditeCadFuncionario/:id"
                element={
                  user ? <EditeCadFuncionario /> : <Navigate to="/login" />
                }
              />
              <Route
                path="/cads/Promocao/:id"
                element={user ? <Promocao /> : <Navigate to="/login" />}
              />
              <Route
                path="/cads/VisualizarCad/:id"
                element={user ? <VisualizaCad /> : <Navigate to="/login" />}
              />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </div>
  )
}

export default App
