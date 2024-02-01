import {useAuth} from '@clerk/nextjs'
import React, { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link, useLocation } from 'react-router-dom'
import { useToggle } from './dashboard.provider'

const style = {
  title: 'font-normal mx-4 text-sm',
  link: 'duration-200 flex font-thin items-center justify-start my-2 p-4 transition-colors text-gray-600 uppercase w-full lg:hover:text-primary-500',
  active: 'bg-gradient-to-r border-r-4 border-primary-500 border-r-4 from-white to-primary-100 text-primary-500',
  ref: 'block px-4 py-2 text-sm',
  button: 'block w-full text-left px-4 py-2 text-sm',
  active2: 'bg-gray-100 text-gray-900',
  inactive: 'text-gray-700'
}

export const DropdownNav: React.FC = () => {
  const auth = useAuth()
  const { menuItems } = useToggle()
  const { pathname } = useLocation()

  const logout = (): void => {
    void auth.signOut()
  }

  return (
    <Menu as='div' className='relative inline-block text-left'>
      <div>
        <Menu.Button className='inline-flex justify-center w-full rounded-md border border-primary-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-primary-500 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-primary-500'>
          <FontAwesomeIcon className='text-xl mr-2' icon={['fad', 'grid']} />
          Navigate
        </Menu.Button>
      </div>

      <Transition as={Fragment} enter='transition ease-out duration-100' enterFrom='transform opacity-0 scale-95' enterTo='transform opacity-100 scale-100' leave='transition ease-in duration-75' leaveFrom='transform opacity-100 scale-100' leaveTo='transform opacity-0 scale-95'>
        <Menu.Items className='origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none'>
          <div className='py-1'>
            {menuItems.map((item, idx) => (
              <Menu.Item key={idx}>
                {() => (
                  <Link to={item.link} key={idx}>
                    <span className={`${item.link === pathname ? style.active : ''} ${style.link}`}>
                      <span>{item.icon}</span>
                      <span className={style.title}>{item.title}</span>
                    </span>
                  </Link>
                )}
              </Menu.Item>
            ))}
            <Menu.Item>
              {({ active }) => (
                <button type='button' onClick={() => logout()} className={(active ? style.active2 : style.inactive, style.button)}>
                  <FontAwesomeIcon className='text-xl mr-2' icon={['fad', 'sign-out-alt']} />
                  Sign out
                </button>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  )
}

export default DropdownNav
