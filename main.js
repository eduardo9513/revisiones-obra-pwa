// Registro del Service Worker para PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('./service-worker.js')
      .then(registration => {
        console.log('[PWA] Service Worker registrado con éxito:', registration.scope);
      })
      .catch(error => {
        console.error('[PWA] Fallo al registrar Service Worker:', error);
      });
  });
}

// Configuración de Firebase para la app de Revisiones de Obra
const firebaseConfig = {
  "apiKey": "AIzaSyATtSjIlNxZaXEu3Y6iItr-NMnT91VFVZA",
  "authDomain": "entregaspostventa-eb048.firebaseapp.com",
  "projectId": "entregaspostventa-eb048",
  "storageBucket": "entregaspostventa-eb048.firebasestorage.app",
  "messagingSenderId": "674099281150",
  "appId": "1:674099281150:web:3d59377e1784e13e4ef9af",
  "measurementId": "G-XDLTR14LZD"
};

// Puente ESM → window.firebase para usar Firebase modular desde scripts clásicos
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
import {
  getAuth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  onSnapshot,
  enableIndexedDbPersistence,
  setLogLevel,
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

// Inicializar Firebase app (única instancia)
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Exponer config y funciones que necesita el script principal
window.__firebase_config = JSON.stringify(firebaseConfig);

window.firebase = {
  initializeApp,
  getAuth: () => auth,
  signInAnonymously,
  signInWithCustomToken,
  onAuthStateChanged,
  getFirestore: () => db,
  doc,
  setDoc,
  onSnapshot,
  setLogLevel,
  enableIndexedDbPersistence,
  collection,
  getDocs
};

console.log('[Firebase] Módulos cargados y expuestos en window.firebase');
window.dispatchEvent(new Event('firebase-ready'));

// Función para inicializar la app
function initApp() {
  // Ocultar todas las vistas
  const views = document.querySelectorAll('[class*="view-"]');
  views.forEach(view => {
    view.classList.add('view-hidden');
  });
  
  // Mostrar solo la vista de inicio
  const homeView = document.getElementById('view-0-home');
  if (homeView) {
    homeView.classList.remove('view-hidden');
  }
  
  // Inicializar listeners de botones
  const buttons = document.querySelectorAll('button[data-action]');
  buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
  });
}

// Llamar a initApp cuando el DOM esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}
