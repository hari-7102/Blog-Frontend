
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import {lazy, Suspense } from "react"
import ProtectedAdminRoute from "./lib/ProtectedAdminRoute"


const Home = lazy(() => import('./pages/Home'))
const Login = lazy(() => import('./components/Login'))
const Register = lazy(() => import('./components/Register'))
const Blog = lazy(() => import('./components/Blog'))
const CreateBlog = lazy(() => import('./components/CreateBlog'))
const UpdateBlog = lazy(() => import('./components/UpdateBlog'))
const AdminUser = lazy(() => import('./components/AdminUser'))
const Notfound = lazy(() => import('./components/Notfound'))
const AdminUpdate = lazy(() => import('./components/AdminUpdate'))
const ForgotPassword = lazy(() => import('./components/ForgotPassword'))

const App = () => {

  

  return (
    <div>
      <Router>
        <Suspense fallback={<div>Loading page...</div>}>
        <Routes>
          <Route path="/home" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/forgot" element={<ForgotPassword/>} />
          <Route path="/" element={<ProtectedAdminRoute><Blog/></ProtectedAdminRoute>} />
          <Route path="/create" element={<ProtectedAdminRoute><CreateBlog/></ProtectedAdminRoute>} />
          <Route path="/update" element={<ProtectedAdminRoute><UpdateBlog/></ProtectedAdminRoute>} />
          <Route path="/404" element={<Notfound/>} />
          <Route path="/user" element={<ProtectedAdminRoute><AdminUser/></ProtectedAdminRoute>} />
          <Route path="/userup" element={<ProtectedAdminRoute><AdminUpdate/></ProtectedAdminRoute>} />
        </Routes>
        </Suspense>
      </Router>
    </div>
  )
}

export default App
