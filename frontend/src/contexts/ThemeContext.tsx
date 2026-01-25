import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('dark')

  useEffect(() => {
    // Check localStorage, otherwise default to dark
    const saved = localStorage.getItem('carzone-theme') as Theme
    if (saved) {
      setTheme(saved)
    } else {
      // Default to dark theme instead of system preference
      setTheme('dark')
    }
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const body = document.body
    
    // Remove all theme classes
    root.classList.remove('light', 'dark')
    body.classList.remove('light', 'dark')
    
    // Add current theme class
    root.classList.add(theme)
    body.classList.add(theme)
    
    // Save to localStorage
    localStorage.setItem('carzone-theme', theme)
    
    console.log('Theme changed to:', theme, 'Classes:', root.classList.toString())
  }, [theme])

  const toggleTheme = () => {
    console.log('Toggling theme from:', theme)
    setTheme(prev => {
      const newTheme = prev === 'light' ? 'dark' : 'light'
      console.log('New theme will be:', newTheme)
      return newTheme
    })
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return context
}