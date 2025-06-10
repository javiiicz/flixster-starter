import { useState } from 'react'
import '../styles/App.css'
import MovieList from './MovieList'
import Header from './Header'
import Footer from './Footer'

const App = () => {

  return (
    <div className="App">
        <Header/>
        <MovieList/>
        <Footer/>
    </div>
  )
}

export default App
