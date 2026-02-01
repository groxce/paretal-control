package com.safeguard;

import android.app.Activity;
import android.content.ComponentName;
import android.content.pm.PackageManager;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class StealthModule extends ReactContextBaseJavaModule {

    StealthModule(ReactApplicationContext context) {
        super(context);
    }

    @Override
    public String getName() {
        return "StealthModule";
    }

    @ReactMethod
    public void hideAppIcon() {
        Activity activity = getCurrentActivity();
        if (activity != null) {
            PackageManager p = activity.getPackageManager();
            ComponentName componentName = new ComponentName(activity, activity.getClass());
            p.setComponentEnabledSetting(componentName,PackageManager.COMPONENT_ENABLED_STATE_DISABLED, PackageManager.DONT_KILL_APP);
        }
    }
}
