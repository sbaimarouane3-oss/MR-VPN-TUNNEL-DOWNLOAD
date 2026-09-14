document.getElementById("year").textContent = new Date().getFullYear();

const latestVersion = "1.0.490";

const apkDownloadUrl =
  "https://drive.google.com/uc?export=download&id=1nzTPDwP1-Z23oGpoFR8wA93VSXknYYvQ";

document.getElementById("version").textContent = latestVersion;
document.getElementById("downloadBtn").href = apkDownloadUrl;
document.getElementById("downloadBtn").target = "_blank";
