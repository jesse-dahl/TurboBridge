import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import Image from 'next/image'
import { useToggle } from './dashboard.provider'
import css from './sidebar.module.css'

const style = {
  mobilePosition: {
    left: 'left-0',
    right: 'right-0'
  },
  container: 'pb-32 lg:pb-6',
  close: 'hidden lg:block lg:w-48 lg:z-auto',
  open: 'w-1/4 absolute z-40 sm:w-5/12 lg:hidden',
  default: 'duration-700 bg-white overflow-y-auto top-0 lg:relative flex-shrink-0',
  dark: 'duration-700 bg-[#262428] overflow-y-auto top-0 lg:relative flex-shrink-0',
  title: 'font-normal mx-4 text-sm',
  link: 'duration-200 flex font-thin items-center justify-start my-2 p-4 transition-colors uppercase w-full lg:hover:text-primary-500 text-white',
  active: 'border-r-4 border-primary-500 border-r-4 from-white text-primary-500 to-primary-100 text-white'
}

interface SidebarProps {
  mobilePosition: 'left' | 'right'
}

export const Sidebar: React.FC<SidebarProps> = ({ mobilePosition }) => {
  const { open, menuItems } = useToggle()
  const { pathname } = useLocation()

  return (
    <aside className={`${style.dark} ${style.mobilePosition[mobilePosition]} ${open ? style.open : style.close} ${css.scrollbar as string}`}>
      <div className={style.container}>
        <div className='flex flex-col items-center justify-center pt-8 sticky top-0 pb-6 z-10'>
          <Image src='/img/bcn-logo.svg' alt='Biproxi logo' height={28} width={230} priority />
        </div>
        <ul>
          <li>
            {menuItems.map((item) => (
              <Link to={item.link} key={item.title}>
                <span className={`${style.link} ${item.link === pathname ? style.active : ''}`}>
                  <span>{item.icon}</span>
                  <span className={style.title}>{item.title}</span>
                </span>
              </Link>
            ))}
          </li>
        </ul>
      </div>
    </aside>
  )
}

export default Sidebar
