onload = function() {
    let copyBtn  = document.querySelector('.copy');
    // manage icon state timer so repeated clicks reset the timer
    let iconResetTimer = null;

    // manage tooltip timer so repeated clicks reset the timer
    let tooltipTimer = null;

    function setIconToTickFor(duration = 3000) {
        if (!copyBtn) return;
        const icon = copyBtn.querySelector('.material-symbols-rounded');
        if (!icon) return;

        // swap to tick icon
        icon.textContent = 'task_alt';

        // show floating "Copied!" tooltip
        // if a tooltip already exists, remove it first so the animation restarts
        let tip = copyBtn.querySelector('.copy-tooltip');
        if (tip) {
            try { tip.parentNode.removeChild(tip); } catch (e) { /* ignore */ }
            tip = null;
        }

        // create new tooltip and start entrance animation
        tip = document.createElement('span');
        tip.className = 'copy-tooltip show';
        tip.textContent = 'Copied!';
        copyBtn.appendChild(tip);

        // clear previous timers if any
        if (iconResetTimer) clearTimeout(iconResetTimer);
        if (tooltipTimer) clearTimeout(tooltipTimer);

        iconResetTimer = setTimeout(() => {
            icon.textContent = 'content_copy';
            iconResetTimer = null;
        }, duration);

        // hide tooltip with exit animation before removing it so animation is visible
        tooltipTimer = setTimeout(() => {
            if (!tip) { tooltipTimer = null; return; }
            tip.classList.remove('show');
            tip.classList.add('hide');
            // remove after exit animation (match duration in CSS: 140ms)
            setTimeout(() => {
                if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
            }, 160);
            tooltipTimer = null;
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