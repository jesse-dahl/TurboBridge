import React from 'react'
import { Outlet } from 'react-router-dom'
import { Navbar } from './navbar'
import { Sidebar } from './sidebar'
import { useToggle } from './dashboard.provider'
// import { ToastProvider } from '../../components/toast/ToastProvider'

const style = {
  open: 'lg:w-full',
  close: 'lg:w-99',
  container: 'bg-gray-200 flex flex-row flex-grow min-h-screen max-h-screen min-w-full max-w-full overflow-none',
  mainContainer: 'flex flex-col flex-grow overflow-hidden space-y-2',
  main: 'flex-grow overflow-auto !m-0 p-[12px] bg-[#333036]'
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
interface DashboardLayoutProps {}

export const DashboardLayout: React.FC<DashboardLayoutProps> = () => {
  const { open } = useToggle()

  return (
    // <ToastProvider variant={"top_right"}>
    <div className={style.container}>
      <Sidebar mobilePosition='left' />
      <div className={`${style.mainContainer} ${open ? style.open : style.close}`}>
        <Navbar />
        <main className={style.main}>
          <Outlet />
        </main>
      </div>
    </div>
    // </ToastProvider>
  )
}

export default DashboardLayout
