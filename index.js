function theme(color) {
  ui("theme", color || "#ff6c6c");
}

window.addEventListener("DOMContentLoaded", () => theme());
let product = [
  {
    id: 1,
    name: "𝑻𝒐𝒘𝒆𝒍 𝑪𝒂𝒌𝒆 𝑴𝒂𝒏𝒈𝒈𝒂",
    img: "img/mango.jpeg",
    price: 13000,
  },
  {
    id: 2,
    name: "𝑻𝒐𝒘𝒆𝒍 𝑪𝒂𝒌𝒆 𝑺𝒕𝒓𝒂𝒘𝒃𝒆𝒓𝒓𝒚",
    img: "img/strawberry.jpeg",
    price: 13000,
  },
  {
    id: 3,
    name: "𝑻𝒐𝒘𝒆𝒍 𝑪𝒂𝒌𝒆 𝑫𝒖𝒓𝒊𝒂𝒏",
    img: "img/duren.jpeg",
    price: 18000,
  },
  {
    id: 4,
    name: "𝑲𝒆𝒓𝒊𝒑𝒊𝒌 𝑲𝒂𝒄𝒂 𝑨𝒔𝒊𝒏",
    img: "img/kripca_ori.jpeg",
    price: 5000,
  },
  {
    id: 5,
    name: "𝑲𝒆𝒓𝒊𝒑𝒊𝒌 𝑲𝒂𝒄𝒂 𝑷𝒆𝒅𝒂𝒔",
    img: "img/kripca_pedas.jpeg",
    price: 5000,
  },
];

function  displayProducts(){
  const productList = document.getElementById("product-list");
  productList.innerHTML = '';


product.forEach(product => {
  const productCard = document.createElement("div");
  productCard.className = "product-card";
  productCard.innerHTML = `
  <article class="no-padding">
  <img class="responsive small" src="${product.img}" />
  <div class="padding">
  <h5>${product.name}</h5>
  <p>Harga: Rp.${product.price}</p>
  <nav>
  <button onclick="tambahKeranjang(${product.id})">Check Out</button>
  </nav>
  
  </div>
</article>`;

  productList.append(productCard);
});
}

window.onload = displayProducts;

var cart = [];


function kurangKeranjang(id) {
  let index = cart.findIndex(item => item.id == id);

  if(index !== -1){
    cart[index].qty -= 1;

    if (cart[index].qty <= 0) {
      cart.splice(index, 1);
    }
  }
  updateKeranjang()

}
function tambahKeranjang(id) {
  // arrow function
  let produk_yang_dipilih = product.find((product) => product.id == id);

  //apakah sudah ada di keranjang
  let produk_di_keranjang = cart.find((item) => item.id == id);

  if (produk_di_keranjang) {
    produk_di_keranjang.qty += 1;
  } else{


  cart.push({
    id: produk_yang_dipilih.id,
    name: produk_yang_dipilih.name,
    price: produk_yang_dipilih.price,
    qty: 1,
  });
} 

updateKeranjang()

}

function updateKeranjang() {
  
// Update tampilan keranjang
let cart_items = document.getElementById("cart-items");
cart_items.innerHTML = "";

cart.forEach((item) => {
  const items = document.createElement("div");

  items.innerHTML = `
    <h4>${item.name}</h4>
    <p>${item.price.toLocaleString()} x ${item.qty}</p>
    <p>Total: ${(item.price * item.qty).toLocaleString()}</p>

    <div class="container-button">
      <button onclick="tambahKeranjang(${item.id})">+</button>
      <button onclick="kurangKeranjang(${item.id})">-</button>
    </div>
  `;

  cart_items.append(items);
});
const total = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
const totalElement = document.createElement("div");
totalElement.style.marginTop = "20px";
totalElement.style.fontWeight = "bold";

totalElement.innerHTML = `Total Pesanan : Rp. ${total.toLocaleString()}`;
cart_items.append(totalElement);
  
const buttonCheckout = document.createElement("button");
buttonCheckout.innerText = "Checkout Via Whatsapp";
buttonCheckout.onclick = checkoutToWhatsapp;

cart_items.append(buttonCheckout);
}
function checkoutToWhatsapp(){
  let pesan = "Halo, saya mau beli ";
  cart.forEach( (produk, index) =>{
    pesan += `${index + 1}. ${produk.name} x ${produk.qty} \n`
});

  window.open(`https://wa.me/6289671479778?text=${pesan}`);
}


  // cart.push(produk_ke_keranjang);
  let cart_items = document.getElementById("cart-items");

  

  cart.forEach(produk_di_keranjang => {
    let items = document.createElement("div");

    items.innerHTML = `
    <h6> ${produk_di_keranjang.name} </h6>
    <p>${produk_di_keranjang.price.toLocaleString()} x ${produk_di_keranjang.qty} pcs</p>
    <p>Total : ${(produk_di_keranjang.price * produk_di_keranjang.qty).toLocaleString()} </p>
    `;

    cart_items.append(items);
  })

  
