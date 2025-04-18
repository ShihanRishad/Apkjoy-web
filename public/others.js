var isHeadContentExpanded = false;

function handleLeftDivClick(event) {
  var headContent = document.getElementById('headcontent');
  if (window.innerWidth < 471) {
    if (headContent) {
      headContent.style.height = '144px';
      isHeadContentExpanded = true;
      // Stop propagation so document click doesn't immediately revert
      event.stopPropagation();
    }
  } else {
    // For width >= 471, navigate to root
    window.location.href = '/';
    headContent.style.height = '72px';
  }
}

function handleDocumentClick() {
  var headContent = document.getElementById('headcontent');
  if (headContent && isHeadContentExpanded) {
    headContent.style.height = '';
    isHeadContentExpanded = false;
  }
}

function updateLeftDivListener() {
  var leftDiv = document.querySelector('.left');
  // Remove previous listeners
  if (leftDiv) {
    leftDiv.removeEventListener('click', handleLeftDivClick);
  }
  document.removeEventListener('click', handleDocumentClick);

  if (leftDiv) {
    leftDiv.addEventListener('click', handleLeftDivClick);
  }
  if (window.innerWidth < 471) {
    document.addEventListener('click', handleDocumentClick);
  } else {
    document.removeEventListener('click', handleDocumentClick);
    handleDocumentClick(); // Reset headContent height immediately
  }
}

document.addEventListener('DOMContentLoaded', function() {
  updateLeftDivListener();
});
window.addEventListener('resize', updateLeftDivListener);