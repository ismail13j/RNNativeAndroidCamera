package com.rntest

import android.annotation.SuppressLint
import android.app.Activity
import android.app.Activity.*
import android.content.ActivityNotFoundException
import android.content.ContentValues
import android.content.Intent
import android.content.pm.PackageManager
import android.net.Uri
import android.os.Environment
import android.provider.MediaStore
import android.util.Log
import androidx.core.content.ContentProviderCompat.requireContext
import androidx.core.content.FileProvider
import com.facebook.react.bridge.ActivityEventListener
import com.facebook.react.bridge.Callback
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod
import java.io.File
import java.io.IOException
import java.text.SimpleDateFormat
import java.util.Date

class CameraModule(reactContext: ReactApplicationContext) : ReactContextBaseJavaModule(reactContext), ActivityEventListener  {
    private val IMAGE_CAPTURE_CODE = 1001
    val REQUEST_IMAGE_CAPTURE: Int = 1
    var vFilename: String = ""
    val activityLauncher = null
    var imageCallback: Callback? = null
    private var photoFile: File? = null
    lateinit var currentPhotoPath: String

    init {
        reactContext.addActivityEventListener(this)
    }

    override fun getName() = "CameraModule"

    @SuppressLint("SimpleDateFormat", "SdCardPath")
    @ReactMethod
    fun openCamera(imageID: String, CallbackFunction: Callback) {
        val context = reactApplicationContext
        val values = ContentValues()
        imageCallback = CallbackFunction

        values.put(MediaStore.Images.Media.TITLE, "New Picture")
        values.put(MediaStore.Images.Media.DESCRIPTION, "From the Camera")
        dispatchTakePictureIntent()
    }

    @SuppressLint("SimpleDateFormat")
    @Throws(IOException::class)
    private fun createImageFile(): File {
        // Create an image file name
        val timeStamp: String = SimpleDateFormat("yyyyMMdd_HHmmss").format(Date())
        val storageDir: File? = currentActivity?.getExternalFilesDir(Environment.DIRECTORY_PICTURES)
        return File.createTempFile(
            "JPEG_${timeStamp}_", /* prefix */
            ".jpg", /* suffix */
            storageDir /* directory */
        ).apply {
            // Save a file: path for use with ACTION_VIEW intents
            currentPhotoPath = absolutePath
        }
    }

    private fun dispatchTakePictureIntent() {
        val takePictureIntent = Intent(MediaStore.ACTION_IMAGE_CAPTURE)
        // Create the File where the photo should go
        photoFile = createImageFile()
        currentActivity?. let {
            // Continue only if the File was successfully created
            if(photoFile != null){
                val photoURI = FileProvider.getUriForFile(it,
                    BuildConfig.APPLICATION_ID + ".provider", photoFile!!
                );
                takePictureIntent.putExtra(MediaStore.EXTRA_OUTPUT, photoURI)
            }
            if (it.getPackageManager().hasSystemFeature(PackageManager.FEATURE_CAMERA_ANY)) {
                // Start the image capture intent to take photo
                it.startActivityForResult(takePictureIntent, REQUEST_IMAGE_CAPTURE)
            }
        }
    }

    override fun onActivityResult(p0: Activity?,requestCode: Int, resultCode: Int, data: Intent?) {
        Log.d("on Activity Result", requestCode.toString())

        if (resultCode == RESULT_OK) {
            Log.d("on Activity check", "Inside check ")
            photoFile?.let{
                if( it.exists()){
                    val photoURI = FileProvider.getUriForFile(currentActivity!!,
                        BuildConfig.APPLICATION_ID + ".provider", photoFile!!
                    );
                    Log.d("on Activity photoURI", photoURI.toString())
                    imageCallback?.let { it(photoURI.toString()) }
                }
            }
        }
    }

    override fun onNewIntent(p0: Intent?) {
    }
}