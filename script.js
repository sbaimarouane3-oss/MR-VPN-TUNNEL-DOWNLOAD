document.getElementById("year").textContent = new Date().getFullYear();

const latestVersion = "537";

const apkArm64 =
  "https://github.com/sbaimarouane3-oss/MR-VPN-TUNNEL-DOWNLOAD/releases/download/v537/App-arm64-v8a.apk";

const apkV7a =
  "https://github.com/sbaimarouane3-oss/MR-VPN-TUNNEL-DOWNLOAD/releases/download/v537/app-armeabi-v7a.apk";

document.getElementById("version").textContent = latestVersion;

const downloadBtn = document.getElementById("downloadBtn");
const progressBox = document.getElementById("downloadProgress");
const progressBar = document.getElementById("progressBar");
const downloadPercent = document.getElementById("downloadPercent");
const downloadStatus = document.getElementById("downloadStatus");
const downloadSize = document.getElementById("downloadSize");

function formatSize(bytes) {
    if (bytes < 1024 * 1024) {
        return (bytes / 1024).toFixed(1) + " KB";
    }

    return (bytes / 1024 / 1024).toFixed(2) + " MB";
}

async function downloadApk(url, filename) {
    progressBox.style.display = "block";
    downloadBtn.style.pointerEvents = "none";
    downloadBtn.style.opacity = "0.6";

    downloadStatus.textContent = "Downloading...";
    downloadPercent.textContent = "0%";
    progressBar.style.width = "0%";
    downloadSize.textContent = "";

    try {
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error("Download failed");
        }

        const total = Number(response.headers.get("Content-Length")) || 0;
        let loaded = 0;

        const reader = response.body.getReader();
        const chunks = [];

        while (true) {
            const { done, value } = await reader.read();

            if (done) break;

            chunks.push(value);
            loaded += value.length;

            if (total > 0) {
                const percent = Math.min(
                    100,
                    Math.round((loaded / total) * 100)
                );

                progressBar.style.width = percent + "%";
                downloadPercent.textContent = percent + "%";

                downloadSize.textContent =
                    formatSize(loaded) + " / " + formatSize(total);
            } else {
                downloadSize.textContent =
                    formatSize(loaded) + " downloaded";
            }
        }

        const blob = new Blob(chunks, {
            type: "application/vnd.android.package-archive"
        });

        const blobUrl = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = blobUrl;
        link.download = filename;
        document.body.appendChild(link);
        link.click();
        link.remove();

        URL.revokeObjectURL(blobUrl);

        progressBar.style.width = "100%";
        downloadPercent.textContent = "100%";
        downloadStatus.textContent = "Download complete";
        downloadSize.textContent = total
            ? formatSize(total)
            : formatSize(loaded);

    } catch (error) {
        console.error(error);

        progressBox.style.display = "none";

        downloadBtn.style.pointerEvents = "auto";
        downloadBtn.style.opacity = "1";

        /*
         * GitHub may block browser fetch through CORS.
         * In that case use the normal GitHub download.
         */
        window.location.href = url;
    }
}

downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const choice = prompt(
        "Choose APK version:\n\n" +
        "1 - ARM64-v8a\n" +
        "2 - armeabi-v7a"
    );

    if (choice === "1") {
        downloadApk(apkArm64, "App-arm64-v8a.apk");
    } else if (choice === "2") {
        downloadApk(apkV7a, "app-armeabi-v7a.apk");
    } else {
        alert("Invalid choice. Choose 1 or 2.");
    }
});
