onload = function() {
    let copyBtn  = document.querySelector('.copy');
function copy() {
    let pre = document.querySelector('pre');
    let code = pre.textContent;

    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Copied to clipboard!');
        }).catch(err => {
            console.error('Error copying code: ', err);
        });
    } else {
        let textarea = document.createElement('textarea');
        textarea.value = code;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand('copy');
            console.log('Code copied to clipboard!');
        } catch (err) {
            console.error('Error copying code: ', err);
        }
        document.body.removeChild(textarea);
    }
}
copyBtn.addEventListener('click', copy);
}