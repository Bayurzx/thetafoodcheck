'use client'

import { useTheme } from '@/app/providers/theme'
import { BiSolidMoon, BiSun } from "react-icons/bi"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button onClick={toggleTheme} aria-label="Toggle Theme">
      {theme === 'dark' ? (
        <BiSolidMoon className="h-8 w-8 text-gray-300" />
      ) : (
        <BiSun className="h-12 w-12 text-gray-300" />
      )}
    </button>
  )
}