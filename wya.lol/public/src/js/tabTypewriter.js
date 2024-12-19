document.addEventListener("DOMContentLoaded", () => {
    const prefix = "⠐ ";
    var titleText = (window.titleText || ['wya.lol on top'])[0]; // Use the global titleText if defined, otherwise default
    let index = 0;
    let isDeleting = false;

    function typeWriter() {
        document.title = prefix + titleText.substring(0, index);

        if (!isDeleting && index < titleText.length) {
            index++;
            setTimeout(typeWriter, 200);
        } else if (isDeleting && index > 0) {
            index--;
            setTimeout(typeWriter, 200);
        } else {
            isDeleting = !isDeleting;
            setTimeout(typeWriter, 1000);
        }
    }

    typeWriter();
});
