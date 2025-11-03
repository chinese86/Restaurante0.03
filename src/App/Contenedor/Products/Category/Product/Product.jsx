import './Product.css'

function Product({name, price, id, categoriaID}) {
    return (
        <li className="product">
            <p className='name'>{name}</p>
            <p className='price'>{price.toFixed(2)}</p>
        </li>
    )

}

export default Product
