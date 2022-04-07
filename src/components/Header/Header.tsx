import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className=''>
      <h1>
        <Link to='/'>D&amp;D DM Screen</Link>
      </h1>
      <nav>
        <Link to='/players'>Players</Link>
        <Link to='/initiative'>Initiative</Link>
        <Link to='/encounter-builder'>Encounter Builder</Link>
      </nav>
    </header>
  )
}
export default Header
