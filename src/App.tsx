
import { BrowserRouter as Router , Routes , Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./components/Login";
import Blog from "./components/Blog";
import Register from "./components/Register";
import CreateBlog from "./components/CreateBlog";
import UpdateBlog from "./components/UpdateBlog";
import AdminUser from "./components/AdminUser";
import ProtectedAdminRoute from "./lib/ProtectedAdminRoute";
import Notfound from "./components/Notfound";
import AdminUpdate from "./components/AdminUpdate";
const App = () => {

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/blog" element={<Blog/>} />
          <Route path="/create" element={<CreateBlog/>} />
          <Route path="/update" element={<UpdateBlog/>} />
          <Route path="/404" element={<Notfound/>} />
          <Route path="/user" element={<ProtectedAdminRoute><AdminUser/></ProtectedAdminRoute>} />
          <Route path="/userup" element={<ProtectedAdminRoute><AdminUpdate/></ProtectedAdminRoute>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
