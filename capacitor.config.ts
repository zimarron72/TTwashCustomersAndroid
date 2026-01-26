import type { CapacitorConfig } from '@capacitor/cli';
import { KeyboardResize, KeyboardStyle } from '@capacitor/keyboard';

const config: CapacitorConfig = {
  appId: 'com.appandroid.ttwash',
  appName: 'TTwash',
  webDir: 'www/browser',
  plugins: {
    SplashScreen: {
      launchShowDuration: 3000,
      launchAutoHide: true,

    },
    
    Keyboard: {
      resize: KeyboardResize.Body,
      style: KeyboardStyle.Dark,
      resizeOnFullScreen: true,
    },

CapacitorHttp: {
      enabled: true
    },

Capacitor: {},

SocialLogin: {
  providers: {
    google: true,      // Enabled
    facebook: false,   // Disabled (not bundled)
    apple: true,       // Disabled (not bundled)
    twitter: false     // Disabled (not bundled)
  }

  },

},
  

    android: {
       buildOptions: {
          keystorePath: 'undefined',
          keystoreAlias: 'undefined',
       }
    }
  };

export default config;
