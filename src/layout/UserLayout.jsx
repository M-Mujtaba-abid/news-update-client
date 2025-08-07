import React from 'react'
import Navbar from '../shared/Navbar'
import Footer from '../shared/Footer'
import Home from '../landingpage/Home'
import { Route, Routes } from 'react-router-dom'
import About from '../landingpage/About'
import NewsArticleLayout from '../landingpage/newsArticles/NewsArticleLayout'
import SignUp from '../features/SignUp'
import Login from '../features/Login'
// import ProtectedRouting from '../layout/ProtectedRouting'

const UserLayout = () => {
  return (
    <div className='pt-[88px] '>
      <Navbar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />

        {/* <Route path='/newsarticles' element={<ProtectedRouting> <NewsArticleLayout /></ProtectedRouting>} /> */}
        <Route path='/newsarticles' element={<NewsArticleLayout/>}/>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>

      <Footer />
    </div>
  )
}

export default UserLayout
