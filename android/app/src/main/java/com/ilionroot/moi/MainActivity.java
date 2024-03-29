package com.ilionroot.moi;

import android.app.NotificationManager;
import android.app.NotificationChannel;
import android.content.ContentResolver;
import android.media.AudioAttributes;
import android.net.Uri;
import android.os.Build;
import android.os.Bundle;

import androidx.core.app.NotificationCompat;

import org.devio.rn.splashscreen.SplashScreen;

import com.facebook.react.ReactActivity;
import com.facebook.react.ReactActivityDelegate;
import com.facebook.react.ReactRootView;

import expo.modules.ReactActivityDelegateWrapper;

public class MainActivity extends ReactActivity {
  @Override
  protected void onCreate(Bundle savedInstanceState) {
if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
          NotificationChannel defaultChannel = new NotificationChannel("missing-you", "🥰", NotificationManager.IMPORTANCE_HIGH);
          defaultChannel.setShowBadge(true);
          defaultChannel.setDescription("");
          AudioAttributes att = new AudioAttributes.Builder()
                  .setUsage(AudioAttributes.USAGE_NOTIFICATION)
                  .setContentType(AudioAttributes.CONTENT_TYPE_SPEECH)
                  .build();
          defaultChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/ai"), att);
          defaultChannel.enableVibration(true);
          defaultChannel.setVibrationPattern(new long[]{400, 400});
          defaultChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);
          NotificationManager manager = getSystemService(NotificationManager.class);

          manager.createNotificationChannel(defaultChannel);

          // Message Channel

          NotificationChannel messageChannel = new NotificationChannel("message", "Message Channel etchaaa", NotificationManager.IMPORTANCE_HIGH);
          messageChannel.setShowBadge(true);
          messageChannel.setDescription("");
          messageChannel.setSound(Uri.parse(ContentResolver.SCHEME_ANDROID_RESOURCE + "://" + getPackageName() + "/raw/ai"), att);
          messageChannel.enableVibration(true);
          messageChannel.setVibrationPattern(new long[]{400, 400});
          messageChannel.setLockscreenVisibility(NotificationCompat.VISIBILITY_PUBLIC);

          manager.createNotificationChannel(messageChannel);
      }

    // Set the theme to AppTheme BEFORE onCreate to support 
    // coloring the background, status bar, and navigation bar.
    // This is required for expo-splash-screen.
    setTheme(R.style.AppTheme);
    SplashScreen.show(this);
    super.onCreate(null);
  }

  /**
   * Returns the name of the main component registered from JavaScript.
   * This is used to schedule rendering of the component.
   */
  @Override
  protected String getMainComponentName() {
    return "main";
  }

  @Override
  protected ReactActivityDelegate createReactActivityDelegate() {
    return new ReactActivityDelegateWrapper(this,
      new ReactActivityDelegate(this, getMainComponentName())
    );
  }

  /**
   * Align the back button behavior with Android S
   * where moving root activities to background instead of finishing activities.
   * @see <a href="https://developer.android.com/reference/android/app/Activity#onBackPressed()">onBackPressed</a>
   */
  @Override
  public void invokeDefaultOnBackPressed() {
    if (Build.VERSION.SDK_INT <= Build.VERSION_CODES.R) {
      if (!moveTaskToBack(false)) {
        // For non-root activities, use the default implementation to finish them.
        super.invokeDefaultOnBackPressed();
      }
      return;
    }

    // Use the default back button implementation on Android S
    // because it's doing more than {@link Activity#moveTaskToBack} in fact.
    super.invokeDefaultOnBackPressed();
  }
}
