import { useState } from 'react'
import '../src/App.css'
import StaticList from './Component/Static'
import Routing from './Component/Routing'
import Daynamic from './Component/Dynamic'
import UseRef from './Component/Fragment-Usr'
import { Route, Routes } from 'react-router'

function App() {
  const [list] = useState(["Home", "Servise", "Blog", "About", "Contact", "Help"])
  return (
    <div>
      <Routes>
        <Route path='/Static' element={<StaticList list={list} />}></Route>
        <Route path='/Dynamic' element={<Daynamic list={list} />}></Route>
        <Route path='/*' element="404 Not Found"></Route>
      </Routes>

      <Routing/>
      <UseRef/>
    </div>
  )
}

export default App