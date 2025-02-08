// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_FafwlV55Z2nveVppNu2hQzxTeVk2jPc",
  authDomain: "base-de-datos-93dfe.firebaseapp.com",
  projectId: "base-de-datos-93dfe",
  storageBucket: "base-de-datos-93dfe.firebasestorage.app",
  messagingSenderId: "613931429574",
  appId: "1:613931429574:web:c137a8cf1f604730c171c7",
  measurementId: "G-YQMWRE92ED"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Función para guardar la receta
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formReceta").addEventListener("submit", guardarReceta);
});
async function guardarReceta(event) {
    event.preventDefault();  // Evitar que el formulario se envíe por defecto

    // Recoger los datos del formulario

    const nombre = document.getElementById("nombre").value;
    const categoria = document.getElementById("categoria").value;
    const tiempo = document.getElementById("tiempo").value;
    const dificultad = document.getElementById("dificultad").value;
    const preparacion = document.getElementById("preparacion").value;
    
    // Ingredientes
    const ingredientes = [];
    const cantidades = [];
    const ingredientesInputs = document.querySelectorAll('input[name="ingredientes[]"]');
    const cantidadesInputs = document.querySelectorAll('input[name="cantidades[]"]');
    
    ingredientesInputs.forEach(input => ingredientes.push(input.value));
    cantidadesInputs.forEach(input => cantidades.push(input.value));

    // Obtener la imagen
    const imagenFile = document.getElementById("imagen").files[0];
    let imagenUrl = "";

    // Subir la imagen a Firebase Storage
    if (imagenFile) {
        const storageRef = ref(storage, `recetas/${imagenFile.name}`);
        await uploadBytes(storageRef, imagenFile);
        imagenUrl = await getDownloadURL(storageRef);  // Obtener la URL de la imagen
    }

    // Guardar la receta en Firestore
    try {
        const recetaRef = await addDoc(collection(db, "recipes"), {
            nombre,
            categoria,
            tiempo,
            dificultad,
            preparacion,
            ingredientes,
            cantidades,
            imagenUrl
        });

        alert("Receta guardada exitosamente!");
        document.getElementById("formReceta").reset();  // Limpiar el formulario
    } catch (e) {
        console.error("Error añadiendo la receta: ", e);
        alert("Hubo un error al guardar la receta.");
    }
}

