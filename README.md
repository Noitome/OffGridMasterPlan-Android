# OffGridMasterPlan Android App

Native Android application for the OffGridMasterPlan platform.

## Features

- **Native Android experience** - Full Kotlin implementation with Capacitor
- **Offline support** - PWA assets bundled for offline use
- **Deep linking** - Opens `offgridmasterplan.lovable.app` URLs
- **Dark theme** - Matches the web app's dark mode
- **Play Store ready** - Follows Google Play guidelines

## Tech Stack

- **Language:** Kotlin 1.9.20
- **Min SDK:** 24 (Android 7.0)
- **Target SDK:** 34 (Android 14)
- **Build System:** Gradle 8.2.0 with Android Gradle Plugin 8.2.0

## Project Structure

```
OffGridMasterPlan-Android/
├── app/
│   ├── src/main/
│   │   ├── java/com/offgridmasterplan/app/
│   │   │   └── MainActivity.kt          # Main Activity with Capacitor
│   │   ├── res/
│   │   │   ├── drawable/                # Icons and graphics
│   │   │   ├── mipmap-*/                # Launcher icons
│   │   │   └── values/                  # Colors, strings, themes
│   │   ├── assets/public/               # Web app assets (copy here)
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── build.gradle                          # Project-level
├── settings.gradle
├── gradle.properties
└── README.md
```

## Build Instructions

### Prerequisites

1. **Java 17** or higher installed
2. **Android SDK** with API 34
3. **Gradle** (or use gradlew wrapper)

### Quick Build

```bash
# Navigate to project directory
cd OffGridMasterPlan-Android

# Create gradle wrapper
gradle wrapper

# Build debug APK
./gradlew assembleDebug

# APK location: app/build/outputs/apk/debug/app-debug.apk
```

### Release Build

```bash
./gradlew assembleRelease
```

## Web App Integration

The app loads the PWA from:
1. **Primary:** `https://offgridmasterplan.lovable.app` (when online)
2. **Fallback:** `file:///android_asset/public/index.html` (offline)

### Bundling Web App Assets

To enable offline use:

1. Build the Lovable app: `npm run build`
2. Copy contents of `dist/` to `app/src/main/assets/public/`

```bash
# Example (from Lovable project)
npm run build
cp -r dist/* ../OffGridMasterPlan-Android/app/src/main/assets/public/
```

## Capacitor Integration

This app uses Capacitor 5.7.0. To update web content:

```bash
npm install @capacitor/cli @capacitor/android
npx cap sync
```

## Configuration

### App URL
Edit `MainActivity.kt` to change the default URL:
```kotlin
companion object {
    private const val APP_URL = "https://offgridmasterplan.lovable.app"
}
```

### Deep Linking
The app handles:
- `https://offgridmasterplan.lovable.app/*`
- Custom scheme can be added in AndroidManifest.xml

## Signing for Play Store

1. Create signing key:
```bash
keytool -genkey -v -keystore offgridmasterplan.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias offgridmasterplan
```

2. Configure signing in `app/build.gradle`:
```groovy
signingConfigs {
    release {
        storeFile file("offgridmasterplan.keystore")
        storePassword "your_password"
        keyAlias "offgridmasterplan"
        keyPassword "your_password"
    }
}
```

3. Build release APK with signing:
```bash
./gradlew assembleRelease
```

## License

Private - OffGridMasterPlan