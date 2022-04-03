window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();     // Prevent the mini-infobar from appearing on mobile
    console.log('beforeinstallprompt', event);      // Stash event
    window.deferredPrompt = event;
    // installButton.classList.toggle('hidden', false); - show download button if installable; (for development purposes always visible)
    // notInstallable.classList.toggle('hidden', true); -  hide "not installable" (non-existent yet)
  });

  async function installPWA() {
    console.log('installButton');
    const promptEvent = window.deferredPrompt;
    if (!promptEvent) {     // The deferred prompt isn't available.
      return;
    }
    promptEvent.prompt();       // Show the install prompt.
    const result = await promptEvent.userChoice;
    console.log('userChoice', result);      // Log the result
    window.deferredPrompt = null;       // Reset the deferred prompt variable, since prompt() can only be called once
    // installButton.classList.toggle('hidden', true); - hide install button (for development purposes always visible)
  };

  window.addEventListener('appinstalled', (event) => {
    console.log('appinstalled', event);
    window.deferredPrompt = null;   // Clear the deferredPrompt
    window.location.replace("/esp32-smart-light-remote/pwa/installcomplete.html");      // set location to main app page (otherwise it would still be at the original download page when launched on desktop)
  });
