cd /home/t/tagir7ow/sonata.tagir75.ru/public_html
echo "=== package.json ==="
cat package.json
echo ""
echo "=== prisma/schema.prisma ==="
cat prisma/schema.prisma
echo ""
echo "=== src/app/api/auth/[...nextauth]/route.ts ==="
cat src/app/api/auth/\[...nextauth\]/route.ts 2>/dev/null || echo "File not found"
