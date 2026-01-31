# Safeguard Kids - Enterprise Parental Control Platform

## Overview
Safeguard Kids is an enterprise-grade parental control application designed to provide comprehensive monitoring and management features for parents. The platform is built with scalability, security, and performance in mind.

## Architecture
The project follows a Monorepo structure containing the following components:

### 1. Backend (`apps/backend`)
- **Technology**: Node.js, Express, TypeScript.
- **Role**: Core API Gateway, Authentication, Device Management, Real-time Data Processing.
- **Features**:
  - RESTful APIs
  - Real-time location tracking
  - Secure data storage (Future: PostgreSQL/MongoDB)

### 2. Web Dashboard (`apps/web`)
- **Technology**: Next.js (React), TypeScript.
- **Role**: Parent portal for monitoring and configuration.
- **Features**:
  - Real-time map view
  - Activity reports
  - Device settings management

### 3. Mobile App (`apps/mobile`)
- **Technology**: React Native (Expo).
- **Role**: Application for both Parent (Control) and Child (Monitoring) devices.
- **Features**:
  - Background location tracking
  - App usage monitoring
  - Push notifications

## Getting Started

### Prerequisites
- Node.js (v18+)
- npm or yarn

### Setup
1. Navigate to the specific app directory (e.g., `apps/backend`).
2. Run `npm install` to install dependencies.
3. Run `npm start` (or specific script) to launch the application.
