const publicVapidKey = 'BP8xdy2-qfPrIBmEe9_l8J8vJmQyqGB8dOkvrozglsHXF3IK-840yRoKUdJvt8-B7zLG8v-nUmktHlig96_AS10';

if ('serviceWorker' in navigator) {
    send().catch(err => console.log(err));
}

async function send() {
    console.log('Registering service worker...');

    const register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    });

    console.log('Server worker registered...');

    const subcription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    });

    console.log(subcription);

    console.log('Push registered...');
    console.log('Sending push ...');

    await fetch('/subcribe', {
        method: 'POST',
        body: JSON.stringify(subcription),
        headers: {
            'content-type': 'application/json'
        }
    });

    console.log('Push sent...');
}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}