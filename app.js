document.addEventListener('DOMContentLoaded', ()=>{
    localStorage.getItem('cart') && (carrito = JSON.parse(localStorage.getItem('cart'))) && renderizarCarrito()
    
})

/*
fetch("/data.json")
.then((res)=>res.json())
.then((data)=>{
  data.forEach((producto)=> {
    const productContainer = document.getElementById("product-container");
       const card = document.createElement('card');
        card.innerHTML += `<h3 class="text-center">${producto.nombre}</h3>
                            <h5 class="text-center"> Nro:${producto.id}</h5>
                            <img src = "${producto.img}" class="img">
                            <h5 class="text-center">$${producto.precio}</h5>
                            <button class="d-flex flex-wrap item-button mt-5 btn btn-dark" id="button${producto.id}" type="button">Agregar al carrito</button>`;
    productContainer.appendChild(card);
    productContainer.classList.add("prod")
    

    const button = document.getElementById(`button${producto.id}`);
    button.setAttribute("marcador", producto.id);
    button.addEventListener("click", añadirProductoAlCart);
    })
  
})*/

fetch("/data.json")
.then((res)=>res.json())
.then((data)=>{
  data.forEach((producto)=> {
    const productContainer = document.getElementById("product-container");
       const card = document.createElement('card');
        card.innerHTML += `<h3 class="text-center">${producto.nombre}</h3>
                            <h5 class="text-center"> Nro:${producto.id}</h5>
                            <img src = "${producto.img}" class="img" >
                            <button class="d-flex flex-wrap item-button mt-5 btn btn-dark" id="button${producto.id}" type="button">Agregar al carrito</button>`;
    productContainer.appendChild(card);
    productContainer.classList.add("prod")
    

    const button = document.getElementById(`button${producto.id}`);
    button.setAttribute("marcador", producto.id);
    button.addEventListener("click", añadirProductoAlCart);
  })
})

let carrito = []
const carritoId = document.querySelector("#cart-container");
const total = document.querySelector("#total");
const botonVaciar = document.querySelector("#boton-vaciar");
const botonFinalizar = document.querySelector("#boton-final")


function añadirProductoAlCart (evento) {
    carrito.push(evento.target.getAttribute("marcador"));
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
  }

function renderizarCarrito(){
    carritoId.textContent = "";
    const carritoSinDuplicados = [...new Set(carrito)];

    fetch("/data.json")
    .then((res)=>res.json())
    .then((data)=>{
      carritoSinDuplicados.forEach((item) => {
          const elemento = data.filter ((itemBD)=>{
              return itemBD.id === parseInt (item)
          })
          const numeroUnid = carrito.reduce((total, itemId) =>{
              return itemId === item ? (total += 1) : total;
          },0)
          
          const li = document.createElement("li");
          li.textContent = `${numeroUnid} - ${elemento[0].nombre} :  $${elemento[0].precio * numeroUnid }  `;

          const BotonB = document.createElement("button");
      
          BotonB.textContent = "Borrar";
          BotonB.style.marginLeft = "1rem";
          BotonB.dataset.item = item;
          BotonB.addEventListener("click", borrarItemCarrito);

          li.appendChild(BotonB);
          carritoId.appendChild(li);
        
      }) 
    })   
    total.textContent = calcularTotal() 
    total.appendChild(total)
}

function borrarItemCarrito(e) {
    const id = e.target.dataset.item;
    carrito = carrito.filter((carritoId) => {
      return carritoId !== id;
    });
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
  }
 
  function calcularTotal(){
    fetch("/data.json")
    .then((res)=>res.json())
    .then((data)=>{
      return carrito
      .reduce((total, item) => {
        const miItem = data.filter((itemBaseDatos) => {
          return itemBaseDatos.id === parseInt(item);
        });
        return total + miItem[0].precio;
      }, 0)
      .toFixed(2);
      })
  }

  function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('cart', JSON.stringify(carrito))
    renderizarCarrito();
  }
  botonVaciar.addEventListener("click", vaciarCarrito);

  function finalizarCompra(){

    if (carrito.length === 0){
      swal("Carrito vacio")
    }else{
      swal("Compra finalizada","" ,"success")
      carrito = []
      renderizarCarrito()
    } 
  }
  botonFinalizar.addEventListener("click",finalizarCompra)

  //formulario
const formulario = document.getElementById("form");
const fname = document.getElementById ('fname');
const femail = document.getElementById('femail');
const text2 = document.querySelector("#warning");

formulario.addEventListener('submit', (e)=>{
    e.preventDefault();
    let name = document.getElementById('fname').value
    console.log(name);
    let mail = document.getElementById('femail').value
    console.log(mail);

  (fname.value === "" || femail.value === "") ? text2.textContent = 'Rellenar todos los campos' : swal(`El formulario fue enviado con éxito. Gracias ${fname.value}`);
});

renderizarCarrito();

