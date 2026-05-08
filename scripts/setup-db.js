// Script to create Neon database and get connection string
const { execSync } = require('child_process');

async function setup() {
  console.log('📦 Configurando banco PostgreSQL na Neon...');
  console.log('');
  console.log('Para configurar o banco, siga estes passos:');
  console.log('');
  console.log('1. Acesse: https://neon.tech');
  console.log('2. Faça login com GitHub (é grátis)');
  console.log('3. Clique "Create Project"');
  console.log('4. Nome: "ingles-srs"');
  console.log('5. Depois de criado, vá em "Connection Details"');
  console.log('6. Copie a string de conexão (pegue só a parte com sslmode)');
  console.log('');
  console.log('Depois de ter a string, preencha no arquivo .env:');
  console.log('DATABASE_URL="postgresql://user:password@host.neon.tech/ingles-srs?sslmode=require"');
  console.log('');
  console.log('E depois rode: npx prisma db push');
}

setup();