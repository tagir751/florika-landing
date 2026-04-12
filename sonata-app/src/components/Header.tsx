'use client'

import { useSession, signOut } from 'next-auth/react'
import Link from 'next/link'
import Image from 'next/image'
import { getRoleDisplayName } from '@/utils/auth'

export default function Header() {
  const { data: session } = useSession()

  return (
    <header className="bg-primary text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Image src="/logo.png" alt="Логотип Соната-Крым" width={60} height={60} className="rounded-lg" />
            <h1 className="text-xl font-bold">Соната-Крым</h1>
          </div>
          
          <nav className="flex items-center space-x-6">
            {session ? (
              <>
                <Link href="/dashboard" className="hover:text-accent transition">Главная</Link>
                {session.user?.role === 'MANAGER' && (
                  <Link href="/admin" className="hover:text-accent transition">Админ-панель</Link>
                )}
                {session.user?.role === 'OWNER' && (
                  <Link href="/admin/users" className="hover:text-accent transition">Управление сотрудниками</Link>
                )}
                <span className="text-sm">
                  {session.user?.name} ({getRoleDisplayName(session.user?.role)})
                </span>
                <button
                  onClick={() => signOut({ callbackUrl: '/login' })}
                  className="bg-accent hover:bg-yellow-600 px-4 py-2 rounded transition"
                >
                  Выйти
                </button>
              </>
            ) : (
              <Link href="/login" className="hover:text-accent transition">Вход</Link>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
