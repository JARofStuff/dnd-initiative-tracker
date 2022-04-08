import { Routes, Route } from 'react-router-dom'
import Header from '@components/Header/Header'
import Home from '@views/Home/Home'
import EncounterBuilder from '@views/EncounterBuilder/EncounterBuilder'
import Initiative from '@views/Initiative/Initiative'
import Players from '@views/Players/Players'

import './App.css'

function App() {
  return (
    <div className='container p-4 mx-auto h-screen'>
      <Header />
      <main className='py-4 px-2 h-full'>
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
