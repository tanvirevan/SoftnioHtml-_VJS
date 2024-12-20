let cart = [];
let selectedColor = "purple";
let selectedSize = "";
let selectedQty = 0;
let selectedPrice = 0;


function qtySelector(Button)
  {
    const counterDisplay = document.querySelector(".Counter");

    if(Button === 'Increment')
      {
        selectedQty++;
      }
    else if(Button === 'Decrement')
      {
        if(selectedQty > 0) selectedQty--;
      }
    else if(Button === 'Reset')
      {
        selectedQty = 0;
      }
    counterDisplay.textContent = selectedQty;
  }


{
  const buttons = document.querySelectorAll('.color-btn');

  buttons.forEach(button => 
    {
      button.addEventListener('click', () => 
        {
          // Remove 'border-2' and Add 'hover:border-2' styles from all buttons
          buttons.forEach(btn => 
            {
              btn.classList.remove('border-2');
              btn.classList.add('hover:border-2');
            });

          const color = button.getAttribute('color-data');

          // Add 'border-2' and remove 'hover:border-2' styles to the clicked button
          button.classList.remove('hover:border-2');
          button.classList.add('border-2')
          button.style.borderColor = color;

        });
    });
}

function sizeButtonStyle(Button)
  {
    const buttons =document.querySelectorAll('.sizeBtn');

    buttons.forEach(btn =>
      {
        btn.classList.remove('border-blue-500');
        btn.classList.remove('text-blue-500');
        btn.classList.remove('font-bold');
        btn.classList.add('border-gray-300');
        btn.classList.add('text-gray-600');
      });

    Button.classList.add('border-blue-500');
    Button.classList.add('text-blue-500');
    Button.classList.add('font-bold');
    Button.classList.remove('border-gray-300');
    Button.classList.remove('text-gray-600');
  }

function setSelectedColor(Button, colorName, colorHex) 
  {
    const buttons = document.querySelectorAll('.color-btn');
    const imageElement = document.querySelector(".product-image");

    // Set the selected color
    selectedColor = colorName;

    // Reset styles for all buttons
    buttons.forEach(button => 
      {
        button.classList.remove('border-2'); 
        button.classList.add('hover:border-2');
      });

    // Apply active styles to the clicked button
    Button.classList.remove('hover:border-2');
    Button.classList.add('border-2');
    Button.classList.add(`border-[${colorHex}]`);

    // Update the product image
    imageElement.src = `image/${colorName}.png`;
  }

// selectedColor();

// Set selected Size and Price
function setSize(Button, size, price)
  {
    sizeButtonStyle(Button);
    selectedSize = size;
    selectedPrice = price;
  }
function reSetSizePrice (size, price)
  {
    selectedSize = size;
    selectedPrice = price;
  }

// Selected products add to Cart
function addToCart() 
{
  const newItem = 
    {
      id: cart.length + 1,
      color: selectedColor,
      size: selectedSize,
      price: selectedPrice,
      quantity: selectedQty,
      image: `image/${selectedColor}.png`,
      name: "Classy Modern Smart Watch"
    };

  if (selectedSize === '') 
    {
      Toastify({
        text: "Please Select A Size",
        duration: 1500,
        close: false, 
        gravity: "top",
        position: "center",
        borderRadius: "20px",
        backgroundColor: "red",
      }).showToast();
      
    } 
  else if (selectedQty < 1) 
    {
      Toastify({
        text: "Minimum order is 1 product",
        duration: 1500,
        close: false, 
        gravity: "top",
        position: "center",
        borderRadius: "20px",
        backgroundColor: "red",
      }).showToast();
    } 
  else 
    {
      cart.push(newItem);
      Toastify({
        text: "Products Added",
        duration: 1500,
        close: false, 
        gravity: "top",
        position: "center",
        borderRadius: "20px",
        backgroundColor: "green",
      }).showToast();
      updateCheckoutButton();

      // Reset only necessary fields
      qtySelector('Reset');
      reSetSizePrice('', '');
      sizeButtonStyle(null)
    }
}


function updateCheckoutButton() 
  {
    const floatingCheckout = document.querySelector(".floatingCheckout");
    const totalItemAdd = document.querySelector(".totalItem");

    floatingCheckout.classList.remove("hidden");
    totalItemAdd.textContent = `${cart.length}`;
  }

function openCart() 
  {
    let totalPrice = 0;
    let totalQty = 0;
    let cartItemsHTML = '';
  
    const cartModal = document.querySelector('.chakoutCart');
    const cartContent = document.querySelector('.cartContent');
  
    cart.sort((a, b) => b.id - a.id);
  
    cart.map((item) => 
      {
        totalQty += item.quantity;
        totalPrice += item.price * item.quantity;
    
        // Accumulate the HTML string for each item
        cartItemsHTML += 
          `
            <div class="flex justify-between items-center border-b pb-2 pt-2">
              <div class="flex w-1/2 items-center justify-start">
                <img src="${item.image}" alt="${item.name}" class="w-12 h-12 rounded mr-2">
                <p class="text-[14px] font-normal text-[#364A63] sm:text-[12px]">${item.name}</p>
              </div>
      
              <div class="flex text-[#364A63] text-[14px]">
                <div class="flex justify-evenly gap-3">
                  <p class="flex w-[30px] font-normal justify-center">${item.color.charAt(0).toUpperCase() + item.color.slice(1)}</p>
                  <p class="flex w-[30px] font-bold justify-center">${item.size.toUpperCase()}</p>
                  <p class="flex w-[30px] font-bold justify-center">${item.quantity}</p>
                </div>
                <div class="flex w-[80px] font-bold text-[16px] justify-end">$${(item.price * item.quantity).toFixed(2)}</div>
              </div>
            </div>
          `;
      });
  
    cartContent.innerHTML = cartItemsHTML;
  
    // Update the total quantity and total price
    document.querySelector('.totalQty').textContent = totalQty;
    document.querySelector('.totalAmount').textContent = totalPrice.toFixed(2);
  

    cartModal.showModal();
  }
  

function hideModal(event) 
  {
    event.preventDefault();
    const cartModal = document.querySelector('.chakoutCart');
    cartModal.close();
  }

function closeModal (event)
  {
    event.preventDefault();
    const cartModal = document.querySelector('.chakoutCart');
    Toastify({
      text: "CHECKOUT SUCCESSFUL",
      duration: 700,
      close: false, 
      gravity: "top",
      position: "center",
      borderRadius: "20px",
      backgroundColor: "red",
    }).showToast();
      
    // Use a timeout with the same duration as autoClose to close the modal after toast shows
    setTimeout(() => 
      {
        cartModal.close();
        window.location.reload();
      }, 800);
  }