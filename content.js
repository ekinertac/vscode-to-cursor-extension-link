function addStylishButtons($button) {
  let $wrapper = $button.closest('.ms-Fabric');
  if ($wrapper.length === 0) return;

  let $installHelpInfo = $wrapper.find('.installHelpInfo');
  let originalHref = $button.attr('href');
  if (originalHref && originalHref.startsWith('vscode:extension/')) {
    let cursorHref = originalHref.replace('vscode:', 'cursor:');

    let $newWrapper = $('<div>', {
      class: 'custom-install-buttons-wrapper',
    });

    let $vscodeButton = createStylishButton(originalHref, 'Install in VS Code', 'blue', getVSCodeIcon());
    let $cursorButton = createStylishButton(cursorHref, 'Install in Cursor', 'black', getCursorIcon());

    $newWrapper.append($vscodeButton, $cursorButton);

    if ($installHelpInfo.length > 0) {
      $newWrapper.append($installHelpInfo);
    }

    $wrapper.empty().append($newWrapper);
    console.log('Replaced original button with stylish buttons and kept installHelpInfo');
  }
}

function createStylishButton(href, text, color, icon) {
  let $button = $('<a>', {
    href: href,
    class: `custom-install-button ${color}`,
  }).append($(icon).addClass('icon'), $('<span>').text(text));

  if (color === 'black') {
    let $video = $button.find('video');
    $button.hover(
      function () {
        $video[0].play();
      },
      function () {
        $video[0].pause();
        $video[0].currentTime = 0;
      },
    );
  }

  return $button;
}

function getVSCodeIcon() {
  return '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white"><path d="M23.15 2.587L18.21.21a1.494 1.494 0 0 0-1.705.29l-9.46 8.63-4.12-3.128a.999.999 0 0 0-1.276.057L.327 7.261A1 1 0 0 0 .326 8.74L3.899 12 .326 15.26a1 1 0 0 0 .001 1.479L1.65 17.94a.999.999 0 0 0 1.276.057l4.12-3.128 9.46 8.63a1.492 1.492 0 0 0 1.704.29l4.942-2.377A1.5 1.5 0 0 0 24 20.06V3.939a1.5 1.5 0 0 0-.85-1.352zm-5.146 14.861L10.826 12l7.178-5.448v10.896z"/></svg>';
}

function getCursorIcon() {
  return '<video width="20" height="20" src="https://www.cursor.com/assets/images/logo-resized.mp4" muted loop playsinline></video>';
}

function observeDOM() {
  const targetNode = document.body;
  const config = { childList: true, subtree: true };

  const callback = function (mutationsList, observer) {
    for (let mutation of mutationsList) {
      if (mutation.type === 'childList') {
        $('.ms-Button.ux-button.install.ms-Button--default').each(function () {
          addStylishButtons($(this));
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(targetNode, config);
}

$(document).ready(function () {
  $('.ms-Button.ux-button.install.ms-Button--default').each(function () {
    addStylishButtons($(this));
  });

  observeDOM();
});
