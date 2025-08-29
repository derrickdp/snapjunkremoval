window.addEventListener("load", function () {
    var submitbtn = document.querySelector(`form[name=contactform] button#submit`) || document.querySelector(`form[name=contactform] button[name=submit]`);
    submitbtn.style.display = "none";
    var lib = document.createElement("script");
    lib.async = true;
    lib.defer = true;
    lib.src = "https://www.google.com/recaptcha/api.js?render=6Lf7mtUZAAAAALRdG-q8KnHw9dh3ZZSxGMNz8zg1";
    document.body.appendChild(lib);
    lib.onload = function () {
        console.log("recaptcha loaded");
        submitbtn.style.display = "block";
        var cform = document.querySelector("[name=contactform]");
        submitbtn.onclick = function onSubmit(e) {
            e.preventDefault();

            /// if there's optin language, enforce it:
            var optin = document.getElementById("optin");
            if (optin) {
                if (!optin.checked) {
                    alert("You must opt in to submit the form.");
                    return false;
                }
            } else {
                optin = document.getElementsByName("optin");
                if (optin.length === 2) {
                    const optins = [...optin];
                    const yesradio = optins.find(o => o.value.trim().toLowerCase() === "yes");
                    if (!yesradio.checked) {
                        alert("You must opt in to submit the form.");
                        return false;
                    }
                }
            }

            grecaptcha.ready(function () {
                grecaptcha.execute("6Lf7mtUZAAAAALRdG-q8KnHw9dh3ZZSxGMNz8zg1", {
                    action: "submit",
                }).then(function(token) {
                    var cform = document.querySelector("[name=contactform]");
                    var recap = document.createElement("input");
                    recap.type = "hidden";
                    recap.name = "g-recaptcha-response";
                    recap.value = token;
                    cform.appendChild(recap);
                    setTimeout(function () {
                        document.createElement("form").submit.call(cform);
                    });
                });
            });
        }
    };
});
