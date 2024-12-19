function copyAddress(id) {
    const svgElement = document.getElementById(id + 'Input');
    const title = svgElement.getAttribute('title');

    navigator.clipboard.writeText(title).then(() => {
        alert('copied to clipboard: ' + title);
    }).catch(err => {
        console.error('Failed to copy: ', err);
    });
}