package com.offgridmasterplan.app

import android.os.Bundle
import android.view.View
import android.webkit.WebView
import android.webkit.WebViewClient
import androidx.appcompat.app.AppCompatActivity
import androidx.core.view.WindowCompat
import androidx.core.view.WindowInsetsCompat
import androidx.core.view.WindowInsetsControllerCompat
import com.getcapacitor.BridgeActivity

/**
 * OffGridMasterPlan - Native Android App
 * 
 * This is a Capacitor-based Android app that wraps the OffGridMasterPlan PWA.
 * The web app is loaded from assets/public or from the remote URL.
 * 
 * Features:
 * - Full offline support via Service Worker
 * - Native Android integration
 * - Deep linking support
 * - Splash screen handling
 */
class MainActivity : BridgeActivity() {
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        // Hide system bars for immersive experience
        hideSystemBars()
    }
    
    private fun hideSystemBars() {
        val windowInsetsController = WindowCompat.getInsetsController(window, window.decorView)
        windowInsetsController.systemBarsBehavior = WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE
        
        // Optional: Hide status bar for fullscreen
        // windowInsetsController.hide(WindowInsetsCompat.Type.statusBars())
    }
    
    override fun onResume() {
        super.onResume()
        // Refresh content when resuming
    }
    
    override fun onPause() {
        super.onPause()
        // Save state if needed
    }
}

/**
 * Alternative implementation using standard WebView (no Capacitor)
 * Use this if you want simpler setup without npm/capacitor CLI
 */
class MainActivityWebView : AppCompatActivity() {
    
    private lateinit var webView: WebView
    
    companion object {
        private const val APP_URL = "https://offgridmasterplan.lovable.app"
        private const val OFFLINE_URL = "file:///android_asset/public/index.html"
    }
    
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        
        webView = WebView(this)
        setContentView(webView)
        
        setupWebView()
        loadUrl(APP_URL)
    }
    
    private fun setupWebView() {
        webView.apply {
            settings.apply {
                javaScriptEnabled = true
                domStorageEnabled = true
                databaseEnabled = true
                cacheMode = android.webkit.WebSettings.LOAD_DEFAULT
                setSupportZoom(true)
                builtInZoomControls = true
                displayZoomControls = false
                loadWithOverviewMode = true
                useWideViewPort = true
                allowFileAccess = true
                allowContentAccess = true
                mixedContentMode = android.webkit.WebSettings.MIXED_CONTENT_ALWAYS_ALLOW
            }
            
            webViewClient = object : WebViewClient() {
                override fun shouldOverrideUrlLoading(view: WebView?, url: String?): Boolean {
                    // Handle deep links
                    if (url?.contains("offgridmasterplan") == true) {
                        return false // Let WebView handle it
                    }
                    return false
                }
                
                override fun onPageFinished(view: WebView?, url: String?) {
                    super.onPageFinished(view, url)
                    // Inject CSS for native feel
                    injectNativeCSS()
                }
            }
        }
    }
    
    private fun loadUrl(url: String) {
        val connectivityManager = getSystemService(CONNECTIVITY_SERVICE) as android.net.ConnectivityManager
        val network = connectivityManager.activeNetwork
        val capabilities = connectivityManager.getNetworkCapabilities(network)
        
        if (capabilities?.hasCapability(android.net.NetworkCapabilities.NET_CAPABILITY_INTERNET) == true) {
            webView.loadUrl(url)
        } else {
            // Load offline version
            webView.loadUrl(OFFLINE_URL)
        }
    }
    
    private fun injectNativeCSS() {
        val css = """
            <style>
                /* Native Android feel improvements */
                :root {
                    --safe-area-inset-top: env(safe-area-inset-top);
                }
                html, body {
                    -webkit-overflow-scrolling: touch;
                }
                /* Hide Capacitor/PWA chrome when in app */
                body.app-capacitor {
                    padding-top: 0 !important;
                }
            </style>
        """.trimIndent()
        
        webView.evaluateJavascript(
            "(function() { var style = document.createElement('style'); style.innerHTML = `$css`; document.head.appendChild(style); })();",
            null
        )
    }
    
    override fun onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack()
        } else {
            super.onBackPressed()
        }
    }
}