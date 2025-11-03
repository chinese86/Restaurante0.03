import Category from './Category/Category';
import './ProductsCategory.css'

function ProductsCategory({estadoCategorias, setCategorias}) {
    console.log("ProductsCategory");
    console.log(estadoCategorias);
    const listItems = estadoCategorias.map(category =>
        <Category 
            name={category.nombre} 
            products={category.products} 
            id={category.id} 
            estadoCategorias={estadoCategorias}
            setCategorias={setCategorias}
            key={category.id} 
            />
        
    );
    return (
        <ul>
            {listItems}
        </ul>
    )

}

export default ProductsCategory;
