/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  compress: false,
  
  // Привязка к localhost (на Beget нельзя 0.0.0.0)
  hostname: process.env.HOSTNAME || '127.0.0.1',
  port: parseInt(process.env.PORT, 10) || 3000,
  
  // Оптимизации для ограниченной памяти
  experimental: {
    serverComponentsExternalPackages: ['prisma'],
  },
  
  // Отключаем тяжелые фичи
  images: {
    unoptimized: true,
  },
  
  webpack: (config, { isServer }) => {
    // Оптимизации для shared-хостинга
    if (!isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        maxInitialRequests: 25,
        minSize: 20000,
      };
    }
    return config;
  },
};

module.exports = nextConfig;
