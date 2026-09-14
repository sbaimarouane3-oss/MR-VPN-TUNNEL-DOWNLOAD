document.getElementById("year").textContent = new Date().getFullYear();

// Change these two values when releasing a new APK.
const latestVersion = "1.0.490";
const apkFile = "MR-VPN-TUNNEL.apk";

document.getElementById("version").textContent = latestVersion;
document.getElementById("downloadBtn").href = apkFile;
