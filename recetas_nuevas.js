// Importar los SDKs necesarios desde Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-app.js";
import { getFirestore, collection, getDocs } from "https://www.gstatic.com/firebasejs/11.3.0/firebase-firestore.js";

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

// Función para mostrar las recetas
async function displayRecipes() {
    const querySnapshot = await getDocs(collection(db, "recipes"));
    const recipesContainer = document.getElementById('recipes-container');
    recipesContainer.innerHTML = ''; // Limpiar contenido previo

    querySnapshot.forEach((doc) => {
        const recipe = doc.data();
        const recipeElement = document.createElement('div');
        recipeElement.classList.add('recipe');
        recipeElement.innerHTML = `
            <h3>${recipe.name}</h3>
            <img src="${recipe.imageUrl}" alt="${recipe.name}" style="width: 200px;">
            <p><strong>Ingredientes:</strong></p>
            <p>${recipe.ingredients}</p>
            <p><strong>Pasos:</strong></p>
            <p>${recipe.steps}</p>
        `;
        recipesContainer.appendChild(recipeElement);
    });
}

// Mostrar las recetas al cargar la página
window.onload = function () {
    displayRecipes();
};
