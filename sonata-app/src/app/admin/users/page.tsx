'use client'

import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Header from '@/components/Header'

interface User {
  id: string
  email: string
  name: string
  role: string
  createdAt: string
}

export default function UsersPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [newUser, setNewUser] = useState({ email: '', password: '', name: '', role: 'SELLER' })

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login')
    }
  }, [status, router])

  useEffect(() => {
    if (session?.user?.role !== 'OWNER') {
      router.push('/dashboard')
    }
  }, [session, router])

  useEffect(() => {
    fetchUsers()
  }, [])

  async function fetchUsers() {
    try {
      const res = await fetch('/api/users')
      const data = await res.json()
      setUsers(data)
    } catch (error) {
      console.error('Error fetching users:', error)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreateUser(e: React.FormEvent) {
    e.preventDefault()
    
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newUser),
    })

    if (res.ok) {
      alert('Пользователь создан!')
      setShowForm(false)
      setNewUser({ email: '', password: '', name: '', role: 'SELLER' })
      fetchUsers()
    } else {
      alert('Ошибка при создании пользователя')
    }
  }

  async function handleDeleteUser(id: string) {
    if (!confirm('Вы уверены, что хотите удалить этого пользователя?')) return

    const res = await fetch(`/api/users?id=${id}`, {
      method: 'DELETE',
    })

    if (res.ok) {
      alert('Пользователь удален!')
      fetchUsers()
    } else {
      alert('Ошибка при удалении пользователя')
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
        <h1 className="text-3xl font-bold text-primary mb-6">Управление сотрудниками</h1>

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Список сотрудников</h2>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-primary hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              {showForm ? 'Отмена' : '+ Добавить сотрудника'}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleCreateUser} className="mb-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-bold mb-4">Новый сотрудник</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="ФИО"
                  value={newUser.name}
                  onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email}
                  onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <input
                  type="password"
                  placeholder="Пароль"
                  value={newUser.password}
                  onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                  required
                  className="px-4 py-2 border rounded-lg"
                />
                <select
                  value={newUser.role}
                  onChange={(e) => setNewUser({ ...newUser, role: e.target.value })}
                  className="px-4 py-2 border rounded-lg"
                >
                  <option value="SELLER">Продавец</option>
                  <option value="MANAGER">Менеджер</option>
                  <option value="OWNER">Собственник</option>
                </select>
              </div>
              <button type="submit" className="mt-4 bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition">
                Создать
              </button>
            </form>
          )}
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ФИО</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Роль</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Дата создания</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Действия</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{user.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{user.email}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        user.role === 'OWNER' ? 'bg-yellow-100 text-yellow-800' :
                        user.role === 'MANAGER' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {user.role === 'SELLER' ? 'Продавец' : user.role === 'MANAGER' ? 'Менеджер' : 'Собственник'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(user.createdAt).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {user.role !== 'OWNER' && (
                        <button
                          onClick={() => handleDeleteUser(user.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Удалить
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
