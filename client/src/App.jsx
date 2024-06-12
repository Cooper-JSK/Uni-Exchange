import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx'
import SignIn from './auth/SignIn.jsx'
import SignUp from './auth/SignUp.jsx'
import AskQuestion from './pages/AskQuestion.jsx'
import EditQuestion from './pages/EditQuestion.jsx'
import GiveAnswer from './pages/GiveAnswer.jsx'
import EditAnswer from './pages/EditAnswer.jsx'
import Header from './components/Header.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import About from './pages/About.jsx'


const App = () => {


  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUp />} />
        <Route path='/profile' element={<PrivateRoute element={Profile} />} />
        <Route path='/question/ask' element={<PrivateRoute element={AskQuestion} />} />
        <Route path='/question/edit' element={<PrivateRoute element={EditQuestion} />} />
        <Route path='/answer' element={<PrivateRoute element={GiveAnswer} />} />
        <Route path='/answer/edit' element={<PrivateRoute element={EditAnswer} />} />

      </Routes>
    </BrowserRouter>
  )
}

export default App