'use client'

import { Check, Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

const THEMES = {
  light: 'Claro',
  dark: 'Escuro',
  system: 'Sistema'
}

type Themes = (keyof typeof THEMES)[]

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className='rounded-full bg-transparent border-0'
          variant='outline'
          size='icon'>
          <Sun className='h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0' />
          <Moon className='absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100' />
          <span className='sr-only'>Alterar tema</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        {(Object.keys(THEMES) as Themes).map(key => (
          <DropdownMenuItem
            key={key}
            onClick={setTheme.bind(null, key)}
            className='flex items-center justify-between'>
            {THEMES[key]}
            {theme === key && <Check className='w-4 h-4' />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
