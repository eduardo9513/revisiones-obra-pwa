
// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('./service-worker.js')
            .catch(err => console.error('SW registration failed', err));
    });
}



        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, doc, setDoc, onSnapshot, setLogLevel, enableIndexedDbPersistence } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        window.firebase = {
            initializeApp,
            getAuth,
            signInAnonymously,
            signInWithCustomToken,
            onAuthStateChanged,
            getFirestore,
            doc,
            setDoc,
            onSnapshot,
            setLogLevel,
            enableIndexedDbPersistence 
        };
    