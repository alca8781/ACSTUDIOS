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
  cartListDisplay.innerHTML = '';

  if (isCartVisible) {
    if (cartItems.length > 0) {
      const heading = document.createElement('h3');
      heading.textContent = 'Cart Items:';
      cartListDisplay.appendChild(heading);

      const instructions = document.createElement('p');
      instructions.innerHTML = `Copy & paste cart selections<br> and email:<br>ac@allycadyphotography.com<br>---------------------------------`;
      cartListDisplay.appendChild(instructions);

      const list = document.createElement('ul');
      cartItems.forEach(itemName => {
        const listItem = document.createElement('li');
        listItem.textContent = itemName;
        list.appendChild(listItem);
      });
      cartListDisplay.appendChild(list);

      const buttonWrapper = document.createElement('div');
      buttonWrapper.style.display = 'flex';
      buttonWrapper.style.justifyContent = 'center';
      buttonWrapper.style.marginTop = '15px';

      const copyButton = document.createElement('button');
      copyButton.textContent = 'Copy';
      copyButton.style.padding = '8px 26px';
      copyButton.style.fontSize = '12px';
      copyButton.style.cursor = 'pointer';
      copyButton.style.border = '1px solid #888';
      copyButton.style.backgroundColor = '#eee';
      copyButton.style.borderRadius = '4px';

      copyButton.addEventListener('click', () => {
        const listText = cartItems.join('\n');
        navigator.clipboard.writeText(listText)
          .then(() => alert('Cart items copied to clipboard.'))
          .catch(err => {
            alert('Failed to copy cart items.');
            console.error(err);
          });
      });

      buttonWrapper.appendChild(copyButton);
      cartListDisplay.appendChild(buttonWrapper);

    } else {
      cartListDisplay.innerHTML = '<p>Cart is empty.</p>';
    }
  }
});

// Display Images from Contentful
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

// Display image with hover buttons
const ImageName = (container, imageAsset, name) => {
  const imgContainer = document.createElement('div');
  imgContainer.style.position = 'relative';
  imgContainer.style.display = 'inline-block';
  imgContainer.style.margin = '10px';
  imgContainer.style.overflow = 'hidden';

  const img = document.createElement('img');
  img.src = 'https:' + imageAsset.fields.file.url;
  img.style.width = '300px';
  img.style.transition = 'transform 0.3s ease';

  if (cartItems.includes(name)) {
    img.style.filter = 'opacity(60%)';
  }

  // Hover Buttons
  const buttonsContainer = document.createElement('div');
  buttonsContainer.style.position = 'absolute';
  buttonsContainer.style.top = '0';
  buttonsContainer.style.left = '0';
  buttonsContainer.style.width = '100%';
  buttonsContainer.style.height = '100%';
  buttonsContainer.style.display = 'flex';
  buttonsContainer.style.flexDirection = 'column';
  buttonsContainer.style.justifyContent = 'center';
  buttonsContainer.style.alignItems = 'center';
  buttonsContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
  buttonsContainer.style.opacity = '0';
  buttonsContainer.style.transition = 'opacity 0.3s ease';

  imgContainer.addEventListener('mouseenter', () => {
    buttonsContainer.style.opacity = '1';
  });
  imgContainer.addEventListener('mouseleave', () => {
    buttonsContainer.style.opacity = '0';
  });

  const addToCartButton = document.createElement('button');
  addToCartButton.textContent = cartItems.includes(name) ? 'Remove from Cart' : 'Add to Cart';
  styleHoverButton(addToCartButton);

  addToCartButton.addEventListener('click', (e) => {
    e.stopPropagation();
    if (cartItems.includes(name)) {
      img.style.filter = 'none';
      cartItems = cartItems.filter(item => item !== name);
      cartCount = Math.max(0, cartCount - 1);
      addToCartButton.textContent = 'Add to Cart';
    } else {
      img.style.filter = 'opacity(60%)';
      cartItems.push(name);
      cartCount++;
      addToCartButton.textContent = 'Remove from Cart';
    }
    cartCountText.textContent = ` ${cartCount}`;
    saveCartToLocalStorage();
    isCartVisible = false;
    cartListDisplay.innerHTML = '';
  });

  const zoomButton = document.createElement('button');
  zoomButton.textContent = 'Zoom In';
  styleHoverButton(zoomButton);
  zoomButton.addEventListener('click', (e) => {
    e.stopPropagation();
    openZoomModal(img.src, name);
  });

  buttonsContainer.appendChild(addToCartButton);
  buttonsContainer.appendChild(zoomButton);

  const caption = document.createElement('span');
  caption.textContent = name;
  caption.style.display = 'block';
  caption.style.textAlign = 'center';
  caption.style.fontFamily = 'Raleway';
  caption.style.fontSize = '8pt';

  imgContainer.appendChild(img);
  imgContainer.appendChild(buttonsContainer);
  imgContainer.appendChild(caption);
  container.appendChild(imgContainer);
};

// Button style helper
function styleHoverButton(button) {
  button.style.margin = '5px';
  button.style.padding = '8px 16px';
  button.style.fontSize = '12px';
  button.style.border = 'none';
  button.style.borderRadius = '4px';
  button.style.cursor = 'pointer';
  button.style.backgroundColor = '#ffffff';
  button.style.color = '#333';
  button.style.boxShadow = '0 2px 6px rgba(0,0,0,0.2)';
}

// Zoom Modal
function openZoomModal(src, alt) {
  const modal = document.getElementById('zoomModal');
  const zoomedImage = document.getElementById('zoomedImage');
  zoomedImage.src = src;
  zoomedImage.alt = alt;
  modal.style.display = 'flex';
}

document.getElementById('zoomModal').addEventListener('click', () => {
  document.getElementById('zoomModal').style.display = 'none';
});

// Reset Cart
const resetCartButton = document.getElementById('resetCartButton');
resetCartButton.addEventListener('click', () => {
  cartCount = 0;
  cartItems = [];
  cartCountText.textContent = ` ${cartCount}`;
  saveCartToLocalStorage();
  const images = document.querySelectorAll('#SleepyHollow_content img, #Bristol_content img, #Rehearsal_content img, #FunnyFam_content img, #Weppler_content img, #Larson_content img, #Kelly_content img, #Maddy_content img');
  images.forEach(img => {
    img.style.filter = 'none';
  });
  cartListDisplay.innerHTML = '';
  isCartVisible = false;
});

// Display images from Contentful fields
DisplayImages('SleepyHollow_content', 'sleepyHollow');
DisplayImages('Bristol_content', 'bristol_id');
DisplayImages('Rehearsal_content', 'RehearsalDinner');
DisplayImages('FunnyFam_content', 'FunnyFamPhoto');
DisplayImages('Weppler_content', 'weppler');
DisplayImages('Larson_content', 'larsonFamily');
DisplayImages('Kelly_content', 'Kelly');
DisplayImages('Nalven_content', 'nalven');
DisplayImages('Maddy_content', 'maddySeniorPhotos');