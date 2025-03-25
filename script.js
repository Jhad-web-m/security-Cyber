async function checkURL() {
    let urlInput = document.getElementById("urlInput").value;
    let resultText = document.getElementById("result");

    if (!urlInput) {
        resultText.innerHTML = "يرجى إدخال رابط!";
        resultText.style.color = "red";
        return;
    }

    let apiKey = "AIzaSyAAIo6J7vKfAeUn_xLNScyMLy7hpxc4IAI";  // ضع مفتاح API الخاص بك هنا
    let apiUrl = `https://safebrowsing.googleapis.com/v4/threatMatches:find?key=${apiKey}`;

    let requestData = {
        client: {
            clientId: "yourcompany",
            clientVersion: "1.0"
        },
        threatInfo: {
            threatTypes: ["MALWARE", "SOCIAL_ENGINEERING", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION"],
            platformTypes: ["ANY_PLATFORM"],
            threatEntryTypes: ["URL"],
            threatEntries: [{url: urlInput}]
        }
    };

    try {
        let response = await fetch(apiUrl, {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(requestData)
        });

        let data = await response.json();

        if (data.matches) {
            resultText.innerHTML = "⚠️ هذا الرابط قد يكون ضارًا!";
            resultText.style.color = "red";
        } else {
            resultText.innerHTML = "✅ الرابط آمن!";
            resultText.style.color = "green";
        }
    } catch (error) {
        resultText.innerHTML = "حدث خطأ أثناء الفحص!";
        resultText.style.color = "red";
    }
}