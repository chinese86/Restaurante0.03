import { useState } from 'react'
import './Contenedor.css'
import EntradaCategoria from './EntradaCategoria/EntradaCategoria'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import Products from './Products/ProductsCategory'
import Spacer from './Spacer/Spacer'

function Contenedor({categorias, setCategorias}) {
  console.log(categorias);
  
  return (
    <>
        <EntradaCategoria categorias={categorias} setCategorias={setCategorias}/>
        <Header />
        <Spacer />
        <Products estadoCategorias={categorias}
          setCategorias={setCategorias}/>
        <Spacer />
        <Footer />
    </>
    )
}

export default Contenedor
