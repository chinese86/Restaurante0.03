import { useState } from "react";

export default function EntradaCategoria({ categorias, setCategorias }) {
    const [nuevaCategoria, setNuevaCategoria] = useState("");

    async function incluirCategoria() {
        
        if (!nuevaCategoria.trim()) {
            alert("Por favor, escribe un nombre para la categoría");
            return;
        }

        try {
           
            const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias/";
            const res = await fetch(API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "usuario_id": "5396",
                    "nombre": nuevaCategoria
                })
            });

            
            if (!res.ok) {
                throw new Error("Error al añadir categoría en el servidor");
            }

            
            const categoriaCreada = await res.json();

           
            let categoriasCopia = [...categorias];
            
            const categoria = {
                id: categoriaCreada.categoria_id, 
                nombre: nuevaCategoria,
            };

            categoriasCopia.push(categoria);
            setCategorias(categoriasCopia);

            setNuevaCategoria("");
            
        } catch (error) {
            console.error("Error al añadir categoría:", error);
            alert("No se pudo añadir la categoría");
        }
    }

    function onNuevaCategoria(nuevaCategoria) {
        setNuevaCategoria(nuevaCategoria);
    }

    return (
        <div className="entrada-categoria">
            <input 
                placeholder="Categoria..." 
                type="text"
                value={nuevaCategoria}
                onChange={(e) => onNuevaCategoria(e.target.value)} 
            />
            <button onClick={incluirCategoria}>Añadir categoría</button>
        </div>
    );
}