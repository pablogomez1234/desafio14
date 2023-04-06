const { Router } = require('express')  
const productRouter = Router() 

const { products } = require('../class/productContainer')
const { mock5 } = require('../class/mockFaker')
const { logger, loggererr } = require('../log/logger')



/* ------------------ router productos ----------------- */
//------------- get productos
productRouter.get(
  '/productos',
  async (req, res) => {
    const allProducts = await products.getAll()
    logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
    res.json( allProducts )
  }
)


//------------ get producto segun id
productRouter.get(
  '/productos/:id',
  async (req, res) => {
    const id = Number(req.params.id)
    const product = await products.getById( id )
    if ( product ) {
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.json( product )
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
)


//--------------------- post producto
productRouter.post(
  '/productos',
  async (req, res) => {
    const productToAdd = req.body
    await products.add( productToAdd )
    logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
    res.redirect('/')
  }
)


//---------------------- put producto
productRouter.put(
  '/productos/:id',
  async (req, res) => {
    const id = Number(req.params.id)
    const productToModify = req.body
    if(await products.modifyById( id, productToModify )){
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.send({ message: 'producto modificado'})
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
)


//------------------------- delete producto
productRouter.delete(
  '/productos/:id',
  async (req, res) => {
    const id = req.params.id
    if (await products.deleteById(id)) {
      logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
      res.send({ message: 'producto borrado'})
    } else {
      loggererr.error(`Producto id: ${id} no encontrado`) 
      res.status(404).send({ error: 'producto no encontrado'})
    }
  }
) 


//---------------- get Test
//------------- get productos
productRouter.get(
  '/productos-test',
  async (req, res) => {
    const allProducts = await mock5.getAll()
    let tabla = '<table>'
    tabla += '<tr><th>Producto</th><th>Precio</th><th>Imagen</th></tr>'
    
    allProducts.forEach((fila) => {
      tabla += `
        <tr>
          <td>${fila.title}</td>
          <td>${fila.price}</td>
          <td><img src="${fila.thumbnail}" alt="${fila.title}" width="64" heigth="48"></td>
        </tr>`
     })
    tabla += '</table>'

    logger.info(`Ruta: /api${req.url}, metodo: ${req.method}`)
    res.send(tabla)

  }
)


module.exports = productRouter