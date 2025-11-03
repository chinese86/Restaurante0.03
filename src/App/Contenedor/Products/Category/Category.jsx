import Product from './Product/Product';
import './Category.css'
import CategoriaLectura from './CategoriaLectura';
import { useState } from 'react';
import CategoriaEscritura from './CategoriaEscritura';

function Category({name, products, id, estadoCategorias, setCategorias}) {
    const [editable, setEditable] = useState(false);
    const [nombreBotonModificar, setNombreBotonModificar] = useState("Modificar");
    const [nuevaCategoria, setNuevaCategoria] = useState(name);

    
    async function borrarCategoria() {
        try {
           
            const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias";
            const res = await fetch(`${API_URL}/${id}?usuario_id=5396`, {
                method: "DELETE"
            });

            if (!res.ok) {
                throw new Error("Error al eliminar la categoría en el servidor");
            }

            let categoriasCopia = [...estadoCategorias]; 
            
            for (let i = 0; i < categoriasCopia.length; i++) {
                if (categoriasCopia[i].id == id) {
                    categoriasCopia.splice(i, 1); 
                    break;
                }
            }

           
            setCategorias(categoriasCopia);
            
        } catch (error) {
            console.error("Error al borrar categoría:", error);
            alert("No se pudo eliminar la categoría");
        }
    }

    async function modificarCategoria() {
        if (editable) {
          
            try {
                const API_URL = "https://jlorenzo.ddns.net/carta_restaurante/categorias";
                const res = await fetch(`${API_URL}/${id}`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "usuario_id": "5396",
                        "nombre": nuevaCategoria
                    })
                });

                
                if (!res.ok) {
                    throw new Error("Error al modificar la categoría en el servidor");
                }

                let categoriasCopia = [...estadoCategorias];
                
                for (let i = 0; i < categoriasCopia.length; i++) {
                    if (categoriasCopia[i].id == id) {
                        categoriasCopia[i].nombre = nuevaCategoria;
                        break;
                    }
                }

                setCategorias(categoriasCopia);
                setNombreBotonModificar("Modificar");
                
            } catch (error) {
                console.error("Error al modificar categoría:", error);
                alert("No se pudo modificar la categoría");
            }
        } else {
            setNombreBotonModificar("Guardar");
        }
        
        setEditable(!editable);
    }

    let content = <></>;
    if (editable) {
        content = <CategoriaEscritura name={name}
            nuevaCategoria={nuevaCategoria}
            setNuevaCategoria={setNuevaCategoria} />;
    } else {
        content = <CategoriaLectura name={nuevaCategoria} />; 
    }

    return (
        <li>
            <div className="contenedor-categoria">
                {content}
                <button className="borrar" onClick={borrarCategoria}>Borrar</button>
                <button className="modificar" onClick={modificarCategoria}>{nombreBotonModificar}</button>
            </div>
        </li>
    )
}

export default Category