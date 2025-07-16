# Stage 1: Build the React frontend and Electron main/preload processes
FROM node:20-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install all dependencies (including dev for testing)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the React frontend
RUN npm run build

# Build the Electron main and preload processes
RUN npm run build:main && npm run build:preload

# Install Playwright browsers for E2E tests
RUN npx playwright install --with-deps


# Stage 2: Build the Electron application (for distribution)
FROM node:20-alpine AS electron-builder

WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package.json package-lock.json ./

# Install all dependencies for electron-builder
RUN npm install

# Copy built frontend and Electron processes from builder stage
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/dist-main ./dist-main
COPY --from=builder /app/main ./main
COPY --from=builder /app/preload ./preload
COPY --from=builder /app/public ./public

# Install electron-builder and build the application
RUN npm install electron-builder
RUN npx electron-builder --linux --win --mac --publish never

# Stage 3: Final production image (minimal)
FROM node:20-alpine

WORKDIR /app

# Copy the packaged application (e.g., for Linux)
# This path might vary based on electron-builder's output
COPY --from=electron-builder /app/dist_electron/linux-unpacked ./

# Command to run the Electron application
CMD ["./electron-app"]