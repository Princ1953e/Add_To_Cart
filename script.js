let prName = document.getElementById("name");
let prStock = document.getElementById("Stock");
let prCat = document.getElementById("Category");
let prPrice = document.getElementById("price");
let prDec = document.getElementById("description");
let printt = document.getElementById("print");
let cartPnt = document.getElementById("cartPrint");
let crtbtn = document.getElementById("cartBtn");
let isEdit = false;
let isIndex;

const getData = () => {
  let Data = JSON.parse(localStorage.getItem("Data"));

  if (Data) {
    return Data;
  } else {
    return [];
  }
};
let array = getData();

// create
const Data = () => {
  let obj = {
    id: isIndex ? isIndex : Math.floor(Math.random() * 1000),
    name: prName.value,
    stock: prStock.value,
    cat: prCat.value,
    price: prPrice.value,
    decs: prDec.value,
  };

  if (isEdit) {
    let data = [...array];

    const updateData = data.map((Recod) => {
      if (Recod.id == isIndex) {
        return (Recod = obj);
      } else {
        return Recod;
      }
    });

    array = updateData;

    isEdit = false;
    isIndex = undefined;
  } else {
    array = [...array, obj];
  }
  print();

  prName.value = "";
  prStock.value = "";
  prCat.value = "";
  prPrice.value = "";
  prDec.value = "";
  localStorage.setItem("Data", JSON.stringify(array));
  return false;
};

// Edit
const edit = (id) => {
  let EditData = [...array];

  let editData = EditData.filter((Edit) => {
    return Edit.id == id;
  });
  console.log(editData);
  prName.value = editData[0].name;
  prStock.value = editData[0].stock;
  prCat.value = editData[0].cat;
  prPrice.value = editData[0].price;
  prDec.value = editData[0].decs;

  isEdit = true;
  isIndex = id;
};

// delete
const deletedata = (id) => {
  console.log("id is", id);
  let data = [...array];

  let dltdata = data.filter((de) => {
    return de.id != id;
  });

  console.log(dltdata);
  array = dltdata;
  localStorage.setItem("Data", JSON.stringify(dltdata));
  array = getData();
  print();
};

// Get Cart Data
const getCartData = () => {
  let cartData = JSON.parse(localStorage.getItem("CartData"));
  return cartData ? cartData : [];
};
let cartData = getCartData();

// Count Items in Cart
const count = () => {
  crtbtn.innerHTML = cartData.length;
};
count();

// Add to Cart
const Cart = (id) => {
  let item = array.find((item) => item.id === id);

  if (item) {
    let cartItem = cartData.find((cartItem) => cartItem.id === id);
    if (cartItem) {
      cartItem.qty += 1;
      cartItem.total = cartItem.qty * cartItem.price;
    } else {
      item.qty = 1;
      item.total = item.price;
      cartData.push(item);
    }
    localStorage.setItem("CartData", JSON.stringify(cartData));
    printCart();
    count();
  }
};

// Total Of Item Price
const totalPrice = () => {
  let total = cartData.reduce((sum, item) => {
    return sum + item.price * item.qty;
  }, 0);
  return total;
};

// Print Cart
const printCart = () => {
  cartPnt.innerHTML = "";
  if (cartData.length > 0) {
    cartData.forEach((crt) => {
      cartPnt.innerHTML += `<tr class="mb-7">
                  <td class="capitalize text-center">${crt.name}</td>
                  <td class="text-center">${crt.price}</td>
                  <td class="text-center">
                    <button type="button" class="btn border btn text-black ease-in duration-300 rounded-lg border-black px-2 py-[2px]" onclick="return incrIment(${crt.id})">+</button>
                      <span class="mx-1">${crt.qty}</span>
                    <button type="button" class="btn border btn text-black ease-in duration-300 rounded-lg border-black px-2 py-[2px]" onclick="return decrIment(${crt.id})">-</button>
                  </td>
                  <td class="text-center">${crt.total}</td>
                  <td class="text-center">
                    <button class="p-3" onclick="return deleteCart(${crt.id})">
                       <i class="fa-solid fa-trash-can-arrow-up text-xl"></i>
                    </button>
                  </td>
                </tr>`;
    });
    cartPnt.innerHTML += `<tr class="text-center ">
                            <td colspan="5">Total Price: ${totalPrice()}</td>
                          </tr>`;
  } else {
    cartPnt.innerHTML = `<tr class="text-center">
                            <p class="text-lg">Your Cart Is Emty</p>
                          </tr>`;
  }
};
printCart();

// Print Data
const print = () => {
  printt.innerHTML = "";
  array.forEach((item) => {
    printt.innerHTML += `
                <tr>
                  <td class="text-center">${item.id}</td>
                  <td class="text-center">${item.name}</td>
                  <td class="text-center">${item.price}</td>
                  <td class="text-center">
                    <button onclick="return edit(${item.id})">
                        <i class="fa-solid fa-square-pen text-xl"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="p-3" onclick="return deletedata(${item.id})">
                      <i class="fa-solid fa-trash-can-arrow-up text-xl"></i>
                    </button>
                  </td>
                  <td class="text-center">
                    <button class="btn text-white text-center border-none" onclick="return Cart(${item.id})">
                      <i class="fa-solid fa-cart-plus text-xl"></i>
                    </button>
                  </td>
                </tr>`;
  });
};
print();

// Increment Quantity
const incrIment = (id) => {
  let item = cartData.find((pro) => pro.id == id);
  if (item) {
    item.qty += 1;
    item.total = item.qty * item.price;
    localStorage.setItem("CartData", JSON.stringify(cartData));
    printCart();
  }
};

// Decrement Quantity
const decrIment = (id) => {
  let item = cartData.find((pro) => pro.id == id);
  if (item && item.qty > 1) {
    item.qty -= 1;
    item.total = item.qty * item.price;
    localStorage.setItem("CartData", JSON.stringify(cartData));
    printCart();
  }
};

// Delete from Cart
const deleteCart = (id) => {
  cartData = cartData.filter((item) => item.id !== id);
  localStorage.setItem("CartData", JSON.stringify(cartData));
  printCart();
  count();
};
