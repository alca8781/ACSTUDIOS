const client = contentful.createClient({
  space: 'xyzx0flf1kvl',
  accessToken: 'YZEFnaM1EF0Yn0iwF8ZasRzJrJ7r7_GI0Aa8APUDDns'
});

// CART 
let cartCount = parseInt(localStorage.getItem('cartCount')) || 0;
let cartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
let isCartVisible = false;

// Cart count display
const cartCountDisplay = document.getElementById('cartCountContainer');
const cartCountText = document.createElement('span');
cartCountText.style.marginLeft = '-10px';
cartCountText.style.marginTop = '20px';
cartCountText.style.fontSize = '18px';
cartCountText.textContent = ` ${cartCount}`;
cartCountDisplay.appendChild(cartCountText);

// Cart list 
const cartListDisplay = document.getElementById('cartListContainer');
const viewCartButton = document.getElementById('viewCartButton');

// Save cart items to localStorage
function saveCartToLocalStorage() {
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
  localStorage.setItem('cartCount', cartCount.toString());
}

// Cart display on click
viewCartButton.addEventListener('click', () => {
  isCartVisible = !isCartVisible;

  if (isCartVisible) {
    cartListDisplay.innerHTML = '';
    if (cartItems.length > 0) {
      cartListDisplay.innerHTML = '<h3>Cart Items:</h3>';
      const list = document.createElement('ul');
      cartItems.forEach(itemName => {
        const listItem = document.createElement('li');
        listItem.textContent = itemName;
        list.appendChild(listItem);
        cartListDisplay.innerHTML = '<p> copy & paste cart selections <br> and email <br> ac@allycadyphotography.com <br> ---------------------------------</p>';

      });
      cartListDisplay.appendChild(list);
    } else {
      cartListDisplay.innerHTML = '<p> cart is empty.</p>';
    }
  } else {
    cartListDisplay.innerHTML = '';
  }
});


// IMAGES 
const DisplayImages = (containerId, fieldKey) => {
  const container = document.getElementById(containerId);

  client.getEntries().then(function (entries) {
    entries.items.forEach(function (entry) {
      if (entry.fields[fieldKey]) {
        entry.fields[fieldKey].forEach(function (imageAsset) {
          const name = imageAsset.fields.title || "No name available";
          ImageName(container, imageAsset, name);
        });
      }
    });
  });
};

// Display image with name 
const ImageName = (container, imageAsset, name) => {
  const imgContainer = document.createElement('div');
  imgContainer.style.display = 'inline-block';
  imgContainer.style.margin = '5px';

  const img = document.createElement('img');
  img.src = 'https:' + imageAsset.fields.file.url;
  img.style.width = '320px';


  // img.style.transition = 'transform 0.3s ease, z-index 0.3s ease';
  // img.style.cursor = 'pointer';
  // img.style.zIndex = '1';
  // img.style.position = 'relative';

  // // Make image zoom significantly on hover
  // img.addEventListener('mouseover', () => {
  //   img.style.transform = 'scale(1.8)';
  //   img.style.zIndex = '10'; // bring to front
  //   img.style.filter = 'opacity(100%)';
  // });

  // img.addEventListener('mouseleave', () => {
  //   img.style.transform = 'scale(1)';
  //   img.style.zIndex = '1';
  // });



  // Check if item is already in cart (saved from localStorage) and apply opacity
  if (cartItems.includes(name)) {
    img.style.filter = 'opacity(60%)';
    // img.style.boxShadow = '0 0 0px 4px rgb(117, 241, 132)';

  }

  // Click add/remove from cart
  img.addEventListener('click', () => {
    if (img.style.filter === 'opacity(60%)') {
      img.style.filter = 'none';
      img.style.boxShadow = 'none';

      // Ensure cartCount does not go below zero
      if (cartCount > 0) {
        cartCount--;
      }
      cartItems = cartItems.filter(item => item !== name); // Remove image name from cart
    }
    else {
      img.style.filter = 'opacity(60%)';
      cartCount++;
      // img.style.boxShadow = '0 0 0px 4px rgb(117, 241, 132)';
      cartItems.push(name); // Add image name to cart
    }
    // Update the cart count text and save to localStorage
    cartCountText.textContent = ` ${cartCount}`;
    saveCartToLocalStorage();

    // Hide cart when an item is added or removed
    isCartVisible = false;
    cartListDisplay.innerHTML = '';

  });


  // Display image name
  const caption = document.createElement('span');
  caption.textContent = name;
  caption.style.display = 'block';
  caption.style.textAlign = 'center';
  caption.style.fontFamily = 'Raleway';
  caption.style.fontSize = '8pt';

  imgContainer.appendChild(img);
  imgContainer.appendChild(caption);
  container.appendChild(imgContainer);
};

// Reset Cart
const resetCartButton = document.getElementById('resetCartButton');
resetCartButton.addEventListener('click', () => {
  // Clear cart items and count
  cartCount = 0;
  cartItems = [];
  cartCountText.textContent = ` ${cartCount}`;

  // Save the empty cart to localStorage
  saveCartToLocalStorage();

  // Reset image opacities
  const images = document.querySelectorAll('#SleepyHollow_content img, #Bristol_content img, #Rehearsal_content img, #FunnyFam_content img, #Weppler_content img, #Larson_content img, #Kelly_content img');
  images.forEach(img => {
    img.style.filter = 'none';
  });
  cartListDisplay.innerHTML = '';
  isCartVisible = false;
});


// Call DisplayImages for fields
DisplayImages('SleepyHollow_content', 'sleepyHollow');
DisplayImages('Bristol_content', 'bristol_id');
DisplayImages('Rehearsal_content', 'RehearsalDinner');
DisplayImages('FunnyFam_content', 'FunnyFamPhoto');
DisplayImages('Weppler_content', 'weppler');
DisplayImages('Larson_content', 'larsonFamily');
DisplayImages('Kelly_content', 'Kelly')
DisplayImages('Nalven_content', 'nalven')