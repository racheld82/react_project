import { useEffect, useState} from 'react'
import React from 'react'
import { BrowserRouter as Router, Route, Routes, useNavigate, Navigate, useParams } from 'react-router-dom';
import Home from './components/Home'
import Login from './components/Login'
import Registration from './components/Registration'
import Details from './components/Details';
import Info from './components/Info';
import Todos from './components/Todos';
import Posts from './components/Posts'
import Albums from './components/Albums'
import Album from './components/Album'
import Comments from './components/Comments';
import AddNewPost from './components/AddNewPost';
import UpdatePost from './components/UpdatePost';
import AddNewTodo from './components/AddNewTodo';
import UpdateTodo from './components/UpdateTodo'
import NotFound from './components/NotFound';


function App() {


  const { id } = useParams();
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/home/user/:userId" element={<Home />}/>
          {/* <Route index element={<Navigate to={`/home/user/${id}/info`} />} /> */}
          <Route path="/home/user/:userId/info" element={<Info />} />
          <Route path="/home/user/:userId/todos" element={<Todos />} />
          <Route path="/home/user/:userId/todos/add" element={<AddNewTodo />} />
          <Route path="/home/user/:userId/todos/:updateId/update" element={<UpdateTodo />} />
          <Route path="/home/user/:userId/posts" element={<Posts />} />
          <Route path="/home/user/:userId/posts/:commentId/comments" element={<Comments />} />
          <Route path="/home/user/:userId/posts/add" element={<AddNewPost />} />
          {/* <Route path="/home/user/:id/posts/:id/update" element={<UpdatePost />} /> */}


          <Route path="/home/user/:userId/albums" element={<Albums />} />
          <Route path="/home/user/:userId/albums/:albumId" element={<Album/>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />}/>
          <Route path="/register/details" element={<Details />} />
          <Route path='*' element={<NotFound/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
