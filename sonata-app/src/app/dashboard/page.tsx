'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Header from '@/components/Header'

export default function DashboardPage() {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Загрузка...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-primary mb-4">Добро пожаловать, {session?.user?.name}!</h2>
          <p className="text-gray-600 mb-4">
            Ваша роль: <span className="font-semibold">
              {session?.user?.role === 'SELLER' ? 'Продавец' : 
               session?.user?.role === 'MANAGER' ? 'Менеджер' : 'Собственник'}
            </span>
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Экскурсии</h3>
            <p className="text-3xl font-bold text-primary">48</p>
            <p className="text-sm text-gray-500 mt-2">Доступных направлений</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Водители</h3>
            <p className="text-3xl font-bold text-secondary">113</p>
            <p className="text-sm text-gray-500 mt-2">В автопарке</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Экскурсоводы</h3>
            <p className="text-3xl font-bold text-accent">29</p>
            <p className="text-sm text-gray-500 mt-2">В штате</p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Точки посадок</h3>
            <p className="text-3xl font-bold text-green-600">39</p>
            <p className="text-sm text-gray-500 mt-2">По всему Крыму</p>
          </div>
        </div>

        {session?.user?.role === 'MANAGER' && (
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-primary mb-4">Панель менеджера</h3>
            <p className="text-gray-700 mb-4">
              У вас есть доступ к управлению всеми данными: экскурсии, водители, экскурсоводы, 
              точки продаж, агенты. Вы можете создавать новые записи, редактировать существующие 
              и печатать отчеты для водителей.
            </p>
            <a href="/admin" className="inline-block bg-primary hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition">
              Перейти в админ-панель
            </a>
          </div>
        )}

        {session?.user?.role === 'OWNER' && (
          <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <h3 className="text-xl font-bold text-accent mb-4">Панель собственника</h3>
            <p className="text-gray-700 mb-4">
              Вы можете управлять всеми сотрудниками: добавлять новых работников, 
              менять пароли, удалять старых сотрудников и контролировать доступ.
            </p>
            <a href="/admin/users" className="inline-block bg-accent hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition">
              Управление сотрудниками
            </a>
          </div>
        )}
      </main>
    </div>
  )
}
