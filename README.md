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
cd OffGridMasterPlan-Android
gradle wrapper
./gradlew assembleDebug
# APK: app/build/outputs/apk/debug/app-debug.apk
```

## Web App Integration

The app loads the PWA from:
- **Online:** `https://offgridmasterplan.lovable.app`
- **Offline:** `file:///android_asset/public/index.html`

To enable offline mode, build the Lovable app and copy `dist/*` to `app/src/main/assets/public/`

## License

Private - OffGridMasterPlan