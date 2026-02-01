# Safeguard Kids - Admin Mobile App

This directory contains the source code for the Android application used by parents/admins to monitor their children.

## Features
- **Login**: Secure access via JWT authentication.
- **Dashboard**: View list of child devices and their real-time location.
- **Geofences**: Create and list safe zones (Geofences).
- **App Usage**: Monitor application usage stats reported by child devices.

## Build Instructions

This project uses React Native (Expo).

### Prerequisites
- Node.js
- Android Studio (for Emulator) or Physical Device

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure API**:
   Edit `src/services/api.ts` and set `BASE_URL` to your backend server's IP.
   - Emulator: `http://10.0.2.2:3001/api`
   - Physical: `http://<YOUR_IP>:3001/api`

3. **Run App**:
   ```bash
   npm start
   ```
   - Press `a` to open in Android Emulator.
   - Scan QR code with Expo Go app on physical device.
