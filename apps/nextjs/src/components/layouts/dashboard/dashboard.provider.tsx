import React, { type ReactElement, useMemo } from 'react'
import { useLocation } from 'react-router-dom'
import { User } from 'types/types'
import { BIPROXI_COMPANY_ID } from '~/components/App'
import { useUserStore } from '~/state/user/store'

export interface DashboardLink { title: string, icon?: ReactElement, link: string, screen?: JSX.Element, screenName?: string }

export let dashboardLinks: DashboardLink[] = []

const adminLinks: DashboardLink[] = []

interface DashboardProvided {
  menuItems: DashboardLink[]
  open: boolean
  //  ref: React.MutableRefObject<unknown>
  toggle: () => void
}

const DashboardContext = React.createContext<DashboardProvided>({
  menuItems: [],
  open: false,
  //  ref: null,
  toggle (): void {
    // do nothing
  }
})

export function DashboardProvider ({ children }: { children?: React.ReactNode}): JSX.Element {
  const user: User = useUserStore((state) => state.user)

  const menuItems = [
    ...dashboardLinks,
    ... user?.companyId === BIPROXI_COMPANY_ID ? adminLinks : []
  ]
  const [open, setOpen] = React.useState<boolean>(false)
  //  const ref = React.useRef(null)
  const location = useLocation()

  const toggle = React.useCallback(() => {
    setOpen((prevState) => !prevState)
  }, [])

  // set the html tag overflow to hidden
  // close side navigation when you click on a sidenav item. it's triggered when viewport is less than 1024px
  React.useEffect(() => {
    document.documentElement.style.overflow = 'hidden' // KH not SSR compatible, react-router-dom only
    return () => {
      if (open && window.innerWidth < 1024) {
        // KH not SSR compatible, react-router-dom only, hardcoded bs
        setOpen(false)
      }
    }
  }, [location, open])

  // close side navigation on click outside when viewport is less than 1024px
  React.useEffect(() => {
    const handleOutsideClick = (): void => {
      if (window.innerWidth < 1024) {
        // KH not SSR compatible, react-router-dom only

        //      if (!ref.current?.contains(event.target)) {
        if (!open) return
        setOpen(false)
        //      }
      }
    }
    window.addEventListener('click', handleOutsideClick)
    return () => window.removeEventListener('click', handleOutsideClick)
  }, [open]) // ]] [open, ref])

  const providerMemo = useMemo(() => ({ menuItems, open, toggle }), [menuItems, open, toggle])
  return <DashboardContext.Provider value={providerMemo}>{children}</DashboardContext.Provider>
}

// custom hook to consume all context values { open, ref, toggle }
export function useToggle (): DashboardProvided {
  return React.useContext(DashboardContext)
}
