import axios from 'axios';
export async function regSw () {
  if ('serviceWorker' in navigator) {
    let url = process.env.PUBLIC_URL + '/service-worker.js';
    const reg = await navigator.serviceWorker.register ("./service-worker.js", {scope: '/'});
    console.log ('service config is', {reg});
    return reg;
  }
  throw Error ('serviceworker not supported');
}
export async function subscribe (serviceWorkerReg) {
  let subscription = await serviceWorkerReg.pushManager.getSubscription ();
  console.log ({subscription});
  if (subscription === null) {
    subscription = await serviceWorkerReg.pushManager.subscribe ({
      userVisibleOnly: true,
      applicationServerKey: 'BPfieU8LjMKyQSJIwofKOIUy79TCpgY7pMImJxojHPlC2NXMkTggmVshVz_L5qJlAYxTp4dorfmkgUISvibBxr8',
    });
    axios.post ('http://localhost:9000/notifications/subscribe', subscription);
  }
}
