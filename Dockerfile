# Gunakan base image Node.js
FROM node:22

# Set working directory
WORKDIR /app

# Copy package.json dan install dependencies
COPY package.json ./
RUN npm install

# Copy seluruh source code
COPY . .

# Jalankan aplikasi
CMD ["node", "index.js"]
