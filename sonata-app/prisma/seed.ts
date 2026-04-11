import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Запуск заполнения базы данных...')

  // Создаем пользователей с простыми паролями
  const ownerPassword = await bcrypt.hash('owner123', 10)
  const managerPassword = await bcrypt.hash('manager123', 10)
  const sellerPassword = await bcrypt.hash('seller123', 10)

  await prisma.user.upsert({
    where: { email: 'owner@sonata.ru' },
    update: {},
    create: {
      email: 'owner@sonata.ru',
      password: ownerPassword,
      name: 'Собственник',
      role: 'OWNER',
    },
  })

  await prisma.user.upsert({
    where: { email: 'manager@sonata.ru' },
    update: {},
    create: {
      email: 'manager@sonata.ru',
      password: managerPassword,
      name: 'Менеджер',
      role: 'MANAGER',
    },
  })

  await prisma.user.upsert({
    where: { email: 'seller@sonata.ru' },
    update: {},
    create: {
      email: 'seller@sonata.ru',
      password: sellerPassword,
      name: 'Продавец',
      role: 'SELLER',
    },
  })

  console.log('✅ Пользователи созданы')

  // Импорт данных из import_data.json
  const data = require('../import_data.json')

  // Импорт экскурсий (с ценами по умолчанию)
  for (const name of data.excursions) {
    await prisma.excursion.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        description: `Экскурсия: ${name}`,
        price: 1500,
        active: true,
      },
    })
  }
  console.log(`✅ Экскурсий импортировано: ${data.excursions.length}`)

  // Импорт точек посадок
  for (const name of data.pickups) {
    await prisma.pickup.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        address: '',
        active: true,
      },
    })
  }
  console.log(`✅ Точек посадок импортировано: ${data.pickups.length}`)

  // Импорт водителей
  for (const driverStr of data.drivers) {
    let name = driverStr
    let phone = ''
    
    const phoneMatch = driverStr.match(/(\+?7?\d{10,11})/)
    if (phoneMatch) {
      phone = phoneMatch[0]
      name = driverStr.replace(phone, '').trim()
    }

    await prisma.driver.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        phone: phone || '',
        capacity: null,
        active: true,
      },
    })
  }
  console.log(`✅ Водителей импортировано: ${data.drivers.length}`)

  // Импорт экскурсоводов
  for (const guideStr of data.guides) {
    let name = guideStr
    let phone = ''
    
    const phoneMatch = guideStr.match(/(\+?7?\d{10,11})/)
    if (phoneMatch) {
      phone = phoneMatch[0]
      name = guideStr.replace(phone, '').trim()
    }

    await prisma.guide.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        phone: phone || '',
        active: true,
      },
    })
  }
  console.log(`✅ Экскурсоводов импортировано: ${data.guides.length}`)

  // Импорт точек продаж
  for (const name of data.points) {
    await prisma.point.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        active: true,
      },
    })
  }
  console.log(`✅ Точек продаж импортировано: ${data.points.length}`)

  // Импорт агентов
  for (const name of data.agents) {
    await prisma.agent.upsert({
      where: { name: name },
      update: {},
      create: {
        name: name,
        active: true,
      },
    })
  }
  console.log(`✅ Агентов импортировано: ${data.agents.length}`)

  console.log('\n🎉 База данных успешно заполнена!')
  console.log('\n📊 Итого:')
  console.log(`   - Пользователей: 3`)
  console.log(`   - Экскурсий: ${data.excursions.length}`)
  console.log(`   - Точек посадок: ${data.pickups.length}`)
  console.log(`   - Водителей: ${data.drivers.length}`)
  console.log(`   - Экскурсоводов: ${data.guides.length}`)
  console.log(`   - Точек продаж: ${data.points.length}`)
  console.log(`   - Агентов: ${data.agents.length}`)
}

main()
  .catch((e) => {
    console.error('❌ Ошибка:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
