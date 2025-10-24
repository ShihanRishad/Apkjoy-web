onload = function() {
    let copyBtn  = document.querySelector('.copy');
    // manage icon state timer so repeated clicks reset the timer
    let iconResetTimer = null;

    function setIconToTickFor(duration = 3000) {
        if (!copyBtn) return;
        const icon = copyBtn.querySelector('.material-symbols-rounded');
        if (!icon) return;

        // swap to tick icon
        icon.textContent = 'task_alt';

        // clear previous timer if any
        if (iconResetTimer) clearTimeout(iconResetTimer);

        iconResetTimer = setTimeout(() => {
            icon.textContent = 'content_copy';
            iconResetTimer = null;
        }, duration);
    }

    function copy() {
        if (!copyBtn) return;
        let pre = document.querySelector('pre');
        if (!pre) return;
        let code = pre.textContent;

        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(code).then(() => {
                setIconToTickFor(3000);
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
                setIconToTickFor(3000);
            } catch (err) {
                console.error('Error copying code: ', err);
            }
            document.body.removeChild(textarea);
        }
    }

    if (copyBtn) copyBtn.addEventListener('click', copy);
}