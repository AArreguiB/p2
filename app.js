import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-storage.js";

// Configuración de Firebase
const firebaseConfig = {
    apiKey: "AIzaSyCbR68RwBKlV9a_OE09H86pvD0rcwE3nzg",
    authDomain: "base-de-datos-html.firebaseapp.com",
    projectId: "base-de-datos-html",
    storageBucket: "base-de-datos-html.firebasestorage.app",
    messagingSenderId: "269728318136",
    appId: "1:269728318136:web:af1ceda9882c1df1ac2a4d",
    measurementId: "G-EP481S59T5"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

// Función para guardar la receta
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById("formReceta").addEventListener("submit", guardarReceta);
});
async function guardarReceta(event) {
    window.guardarReceta = guardarReceta;
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

// Asociar la función al evento del formulario
document.getElementById("formReceta").addEventListener("submit", guardarReceta);
