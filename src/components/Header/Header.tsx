import { Link, NavLink } from 'react-router-dom'
import { Navbar } from 'react-daisyui'

const { Start, End } = Navbar

const Header = () => {
  return (
    <Navbar className='bg-base-300 rounded-lg'>
      <Start>
        <Link to='/' className='text-3xl font-extralight'>
          D&amp;D DM Screen
        </Link>
      </Start>
      <End>
        <div className='flex items-stretch'>
          <NavLink
            to='/players'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Players
          </NavLink>
          <NavLink
            to='/initiative'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Initiative
          </NavLink>
          <NavLink
            to='/encounter-builder'
            className={({ isActive }) =>
              isActive
                ? 'btn btn-ghost btn-sm rounded-btn btn-active'
                : 'btn btn-ghost btn-sm rounded-btn'
            }
          >
            Encounter Builder
          </NavLink>
        </div>
      </End>
    </Navbar>
  )
}
export default Header
