'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

  const isActive = (path: string) => {
    if (path === '/') return pathname === '/'
    return pathname.startsWith(path)
  }

  return (
    <header className="header">
      <div className="header-inner">
        <Link href="/" className="logo">
          灵活用工资讯
        </Link>
        <nav className="nav">
          <Link
            href="/"
            className={`nav-link ${pathname === '/' ? 'active' : ''}`}
          >
            全部文章
          </Link>
          <Link
            href="/popular"
            className={`nav-link ${pathname === '/popular' ? 'active' : ''}`}
          >
            热门推荐
          </Link>
          <Link
            href="/favorites"
            className={`nav-link ${pathname === '/favorites' ? 'active' : ''}`}
          >
            我的收藏
          </Link>
        </nav>
      </div>
    </header>
  )
}
