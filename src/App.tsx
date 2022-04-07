import { Routes, Route } from 'react-router-dom'
import Header from '@components/Header/Header'
import Home from '@views/Home/Home'
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder'
import Initiative from '@views/Initiative/Initiative'
import Players from '@views/Players/Players'

import './App.scss'

function App() {
  return (
    <div className='App'>
      <Header />
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/players' element={<Players />} />
          <Route path='/initiative' element={<Initiative />} />
          <Route path='/encounter-builder' element={<EncounterBuilder />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
