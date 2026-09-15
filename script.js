document.getElementById("year").textContent = new Date().getFullYear();

const latestVersion = "1.0.490";

// روابط التحميل المباشر من GitHub Release
const apkArm64 =
  "https://github.com/sbaimarouane3-oss/MR-VPN-TUNNEL-DOWNLOAD/releases/download/v1.0.490/app-arm64-v8a-release.apk";

const apkV7a =
  "https://github.com/sbaimarouane3-oss/MR-VPN-TUNNEL-DOWNLOAD/releases/download/v1.0.490/app-armeabi-v7a-release.apk";

document.getElementById("version").textContent = latestVersion;

document.getElementById("downloadBtn").addEventListener("click", function (e) {
    e.preventDefault();

    const choice = prompt(
        "اختر نسخة التطبيق:\n\n" +
        "1 - ARM64-v8a\n" +
        "2 - armeabi-v7a"
    );

    if (choice === "1") {
        window.location.href = apkArm64;
    } else if (choice === "2") {
        window.location.href = apkV7a;
    } else {
        alert("اختيار غير صحيح. اختر 1 أو 2.");
    }
});
