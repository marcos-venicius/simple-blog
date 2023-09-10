import { UserButton } from '@clerk/nextjs'
import { ThemeToggle } from './theme-toggle'

export function Header() {
  return (
    <header className='flex w-full h-16 items-center gap-2 justify-between sticky top-0 left-0 bg-background/10 backdrop-blur-sm px-5 z-10'>
      <h1 className='font-bold text-lg text-foreground'>Simple Blog</h1>

      <div className='flex items-center gap-8'>
        <ThemeToggle />
        <UserButton afterSignOutUrl='/' />
      </div>
    </header>
  )
}
