package com.hengcai88.hengcai;

import android.app.ProgressDialog;
import android.content.Context;
import android.content.Intent;
import android.content.SharedPreferences;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Bundle;
import android.os.Environment;
import android.os.Handler;
import android.os.Message;
import android.support.v4.app.ActivityCompat;
import android.support.v7.app.AppCompatActivity;
import android.view.View;
import android.webkit.JavascriptInterface;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.widget.Toast;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;

public class MainActivity extends AppCompatActivity {

    private static Handler handler;
    private WebView webView;
    private long exitTime = 0;
    private static String SHARE_APP_TAG;
    private String h5Url;
    String sdCardRoot = Environment.getExternalStorageDirectory().getAbsolutePath();
    private static final int REQUEST_EXTERNAL_STORAGE = 1;
    private static String[] PERMISSIONS_STORAGE = {
            "android.permission.READ_EXTERNAL_STORAGE",
            "android.permission.WRITE_EXTERNAL_STORAGE"};
    private ProgressDialog mSaveDialog = null;
    private HttpDown http;
    private String msg;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        try {
            //检测是否有写的权限
            int permission = ActivityCompat.checkSelfPermission(this,
                    "android.permission.WRITE_EXTERNAL_STORAGE");
            if (permission != PackageManager.PERMISSION_GRANTED) {
                // 没有写的权限，去申请写的权限，会弹出对话框
                ActivityCompat.requestPermissions(this, PERMISSIONS_STORAGE, REQUEST_EXTERNAL_STORAGE);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        // 是否第一次进入app
        SharedPreferences setting = getSharedPreferences(SHARE_APP_TAG, 0);
        Boolean user_first = setting.getBoolean("FIRST", true);
        if (user_first) {//第一次
            setting.edit().putBoolean("FIRST", false).commit();
            h5Url = "file:///android_asset/dist/index.html";
            FileUtils.getInstance(this).copyAssetsToSD("dist", "hc");
        } else {
            // 判断当前是否有h5资源文件
            if (!isFileExist("index.html", Environment.getExternalStorageDirectory() + "/hc/")) {
                h5Url = "file:///android_asset/dist/index.html";
                FileUtils.getInstance(this).copyAssetsToSD("dist", "hc");
            } else {
                h5Url = "file:///mnt/sdcard/hc/index.html";
            }
        }

        webView = new WebView(this);
        webView.setWebViewClient(new WebViewClient() {
            //设置在webView点击打开的新网页在当前界面显示,而不跳转到新的浏览器中
            @Override
            public boolean shouldOverrideUrlLoading(WebView view, String url) {
                view.loadUrl(url);
                return true;
            }
        });
        webView.getSettings().setJavaScriptEnabled(true);  //设置WebView属性,运行执行js脚本
        webView.getSettings().setDomStorageEnabled(true);//设置WebView属性,开启h5 storage 本地存储
        // Set cache size to 8 mb by default. should be more than enough
        webView.getSettings().setAppCacheMaxSize(1024 * 1024 * 8);

        // This next one is crazy. It's the DEFAULT location for your app's cache
        // But it didn't work for me without this line.
        // UPDATE: no hardcoded path. Thanks to Kevin Hawkins
        String appCachePath = getApplicationContext().getCacheDir().getAbsolutePath();
        webView.getSettings().setAppCachePath(appCachePath);
        webView.getSettings().setAllowFileAccess(true);
        webView.getSettings().setAppCacheEnabled(true);
        //java与js回调，自定义方法
        //1.java调用js
        //2.js调用java
        //首先java暴露接口，供js调用
        /**
         * obj:暴露的要调用的对象
         * interfaceName：对象的映射名称 ,object的对象名，在js中可以直接调用
         * 在html的js中：JSTest.showToast(msg)
         * 可以直接访问JSTest，这是因为JSTest挂载到js的window对象下了
         */
//        webView.addJavascriptInterface(new Object() {
//            //定义要调用的方法
//            //msg由js调用的时候传递
//            @JavascriptInterface
//            public void showToast(String msg) {
//                Toast.makeText(getApplicationContext(),
//                        msg, Toast.LENGTH_SHORT).show();
//            }
//
//        }, "JSBridge");
//        webView.addJavascriptInterface(new Object() {
//            //定义要调用的方法
//            //url由js调用的时候传递
//            @JavascriptInterface
//            public void openBrowse(String url) {
//                //从其他浏览器打开
//                Intent intent = new Intent();
//                intent.setAction(Intent.ACTION_VIEW);
//                Uri content_url = Uri.parse(url);
//                intent.setData(content_url);
//                startActivity(Intent.createChooser(intent, "请选择浏览器"));
//            }
//        }, "JSBridge");
        webView.addJavascriptInterface(new Object() {
            //定义要调用的方法
            // 下载
            @JavascriptInterface
            public void goDownLoad(String url) {
                downLoad(url);
            }

            // 外部浏览器打开
            @JavascriptInterface
            public void openBrowser(String url) {
                //从其他浏览器打开
                Intent intent = new Intent();
                intent.setAction(Intent.ACTION_VIEW);
                Uri content_url = Uri.parse(url);
                intent.setData(content_url);
                startActivity(Intent.createChooser(intent, "请选择浏览器"));
            }

            // 关闭程序
            @JavascriptInterface
            public void shutDown() {
                android.os.Process.killProcess(android.os.Process.myPid());
            }

            // 获取文件大小
            @JavascriptInterface
            public int getFileSize(String strUrl) {
                URL url = null;
                try {
                    url = new URL(strUrl);
                } catch (MalformedURLException e) {
                    e.printStackTrace();
                }
                HttpURLConnection conn = null;
                try {
                    conn = (HttpURLConnection) url.openConnection();
                } catch (IOException e) {
                    e.printStackTrace();
                }
                return conn.getContentLength();
            }

            //msg由js调用的时候传递
            @JavascriptInterface
            public void showToast(String msg) {
                System.out.println("server:" + msg);
                Toast.makeText(getApplicationContext(),
                        msg, Toast.LENGTH_SHORT).show();
            }

        }, "JSBridge");
        webView.loadUrl(h5Url);          //调用loadUrl方法为WebView加入链接
//        webView.loadUrl("file:///android_asset/dist/index.html");          //调用assets
//        webView.loadUrl("http://10.63.34.42:8091");          //开发
        setContentView(webView);                           //调用Activity提供的setContentView将webView显示出来
    }

    //我们需要重写回退按钮的时间,当用户点击回退按钮：
    //1.webView.canGoBack()判断网页是否能后退,可以则goback()
    //2.如果不可以连续点击两次退出App,否则弹出提示Toast
    @Override
    public void onBackPressed() {
        if (webView.canGoBack()) {
            webView.goBack();
        } else {
            if ((System.currentTimeMillis() - exitTime) > 2000) {
                Toast.makeText(getApplicationContext(), "再按一次退出程序",
                        Toast.LENGTH_SHORT).show();
                exitTime = System.currentTimeMillis();
            } else {
                super.onBackPressed();
            }
        }
    }

    /**
     * 判断SD卡上文件是否存在
     */
    public boolean isFileExist(String fileName, String path) {
        File file = new File(path + fileName);
        return file.exists();
    }

    /**
     * 复制asset文件到指定目录
     *
     * @param oldPath asset下的路径
     * @param newPath SD卡下保存路径
     */
    public static void CopyAssets(Context context, String oldPath, String newPath) {
        try {
            String fileNames[] = context.getAssets().list(oldPath);// 获取assets目录下的所有文件及目录名
            if (fileNames.length > 0) {// 如果是目录
                File file = new File(newPath);
                file.mkdirs();// 如果文件夹不存在，则递归
                for (String fileName : fileNames) {
                    CopyAssets(context, oldPath + "/" + fileName, newPath + "/" + fileName);
                }
            } else {// 如果是文件
                InputStream is = context.getAssets().open(oldPath);
                FileOutputStream fos = new FileOutputStream(new File(newPath));
                byte[] buffer = new byte[1024];
                int byteCount = 0;
                while ((byteCount = is.read(buffer)) != -1) {// 循环从输入流读取
                    // buffer字节
                    fos.write(buffer, 0, byteCount);// 将读取的输入流写入到输出流
                }
                fos.flush();// 刷新缓冲区
                is.close();
                fos.close();
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    public void downLoad(final String strUrl) {
        mSaveDialog = ProgressDialog.show(MainActivity.this, "更新", "文件正在保存中，请稍等...", true);
        //开启一个新的线程执行下载任务
        new Thread(
                new Runnable() {
                    @Override
                    public void run() {
                        http = new HttpDown();
                        //获得SD卡路径
                        String sdpath = Environment.getExternalStorageDirectory() + "/hc/";
                        String httpStr = strUrl;
                        System.out.println(httpStr);
                        try {
                            //检测是否有写的权限
                            int permission = ActivityCompat.checkSelfPermission(MainActivity.this,
                                    "android.permission.WRITE_EXTERNAL_STORAGE");

                            if (permission != PackageManager.PERMISSION_GRANTED) {
                                Toast.makeText(getApplicationContext(),
                                        "下载失败，请开启手机权限！", Toast.LENGTH_SHORT).show();
                                // 没有写的权限，去申请写的权限，会弹出对话框
                                ActivityCompat.requestPermissions(MainActivity.this, PERMISSIONS_STORAGE, REQUEST_EXTERNAL_STORAGE);
                            }
                        } catch (Exception e) {
                            e.printStackTrace();
                        }
                        msg = http.download(httpStr, sdpath, "hc.zip");
                        if (msg.equals("success")) {
                            try {
                                ZipUtils.UnZipFolder(sdpath + "hc.zip", sdpath);
                                Intent mainIntent = new Intent(MainActivity.this,
                                        MainActivity.class);
                                MainActivity.this.startActivity(mainIntent);
                                MainActivity.this.finish();
                            } catch (Exception e) {
                                e.printStackTrace();
                            }
                        }
//                        messageHandler.sendMessage(messageHandler.obtainMessage());
                    }
                }
        ).start();
    }
}
