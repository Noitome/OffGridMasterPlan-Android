# Add project specific ProGuard rules here.

# Keep Capacitor classes
-keep class com.getcapacitor.** { *; }
-keep class com.capacitor.** { *; }

# Keep native methods
-keepclassmembers class * {
    native <methods>;
}

# Keep AndroidX
-keep class androidx.** { *; }
-keep interface androidx.** { *; }

# Keep app classes
-keep class com.offgridmasterplan.app.** { *; }