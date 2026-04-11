'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

interface Excursion {
  id: string
  name: string
  description: string
  price: number
  active: boolean
}

export default function AdminPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [excursions, setExcursions] = useState<Excursion[]>([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('excursions')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.role !== 'MANAGER' && session?.user?.role !== 'OWNER') {
      router.push('/dashboard')
    }
  }, [session, router])

  useEffect(() => {
    fetchExcursions()
  }, [])

  async function fetchExcursions() {
    try {
      const res = await fetch('/api/excursions')
      const data = await res.json()
      setExcursions(data)
    } catch (error) {
      console.error('Error fetching excursions:', error)
    } finally {
      setLoading(false)
    }
  }

  if (status === 'loading' || loading) {
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
        <h1 className="text-3xl font-bold text-primary mb-6">Админ-панель</h1>

        <div className="mb-6 border-b border-gray-200">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('excursions')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'excursions'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Экскурсии
            </button>
            <button
              onClick={() => setActiveTab('drivers')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'drivers'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Водители
            </button>
            <button
              onClick={() => setActiveTab('guides')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'guides'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Экскурсоводы
            </button>
            <button
              onClick={() => setActiveTab('pickups')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'pickups'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Точки посадок
            </button>
            <button
              onClick={() => setActiveTab('points')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'points'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Точки продаж
            </button>
            <button
              onClick={() => setActiveTab('agents')}
              className={`pb-4 px-1 font-medium ${
                activeTab === 'agents'
                  ? 'border-b-2 border-primary text-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              Агенты
            </button>
          </nav>
        </div>

        {activeTab === 'excursions' && (
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Список экскурсий</h2>
              <button className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition">
                + Добавить экскурсию
              </button>
            </div>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Название</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Описание</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Цена (₽)</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Статус</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {excursions.map((excursion) => (
                    <tr key={excursion.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{excursion.name}</td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-md truncate">{excursion.description}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{excursion.price}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          excursion.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {excursion.active ? 'Активна' : 'Неактивна'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <button className="text-primary hover:text-blue-900 mr-3">Редактировать</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab !== 'excursions' && (
          <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
            <p>Раздел "{activeTab}" в разработке. Менеджер сможет управлять этими данными.</p>
          </div>
        )}
      </main>
    </div>
  )
}
