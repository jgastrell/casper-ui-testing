var page = require("webpage").create(),
    url = "https://experimental.webgis.frontec.net/home";

function onPageReady() {
    var htmlContent = page.evaluate(function () {
        return document.documentElement.outerHTML;
    });

    console.log(htmlContent);

    phantom.exit();
}

page.open(url, function (status) {
    function checkReadyState() {
        setTimeout(function () {
            var readyState = page.evaluate(function () {
                return document.readyState;
            });

            if ("complete" === readyState) {
                onPageReady();
            } else {
                checkReadyState();
            }
        });
    }

    checkReadyState();
});
