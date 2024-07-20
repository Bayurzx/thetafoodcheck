'use client'

import { useTheme } from '@/app/providers/theme'
import { BiSolidMoon, BiSun } from "react-icons/bi";


export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const sunIcon = () => <BiSun  className="h-12 w-12 text-gray-300" />
  
  const moonIcon = () => <BiSolidMoon  className="h-8 w-8 text-gray-300" />
  


  return (
    <button onClick={toggleTheme}>
      {theme === 'dark' ? moonIcon() : sunIcon()}
    </button>
  )
}
