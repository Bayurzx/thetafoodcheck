'use client'

import { useTheme } from '@/app/providers/theme'
import { BiSolidMoon, BiSun } from "react-icons/bi"

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle Theme"
      className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"

    >
      <span className="absolute -inset-1.5" />
      <span className="sr-only">View notifications</span>

      {theme === 'dark' ? (
        <BiSolidMoon className="h-6 w-6 text-gray-300" />
      ) : (
        <BiSun className="h-6 w-6 text-gray-300" />
      )}
    </button>
  )
}