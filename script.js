function agregarFila() {
    // Obtiene el cuerpo de la tabla
    var table = document.getElementById("tablaIngredientes").getElementsByTagName('tbody')[0];

    // Crea una nueva fila
    var newRow = table.insertRow();

    // Crea las celdas para la fila
    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);

    // Añade los inputs para ingrediente y cantidad en las celdas
    cell1.innerHTML = '<input type="text" name="ingredientes[]" required>';
    cell2.innerHTML = '<input type="text" name="cantidades[]" required>';
    cell3.innerHTML = '<button type="button" onclick="eliminarFila(this)">🗑️</button>';
}
        
function eliminarFila(boton) {
    // Elimina la fila en la que está el botón de eliminar
    var row = boton.parentNode.parentNode;
    row.parentNode.removeChild(row);
}


