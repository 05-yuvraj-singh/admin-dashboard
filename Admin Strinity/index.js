 // Function to fetch product list from the server
 async function fetchProductList() {
  try {
      const response = await fetch('http://localhost:5001/api/products');

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const res = await response.json();
      return res.data;
  } catch (error) {
      console.error('Error fetching product list:', error.message);
      return [];
  }
}

// Function to update the product form based on the selected product
function updateFormForProduct(product) {
  console.log(product)
  document.getElementById('productId').value = product._id
  document.getElementById('productName').value = product.name;
  document.getElementById('productDescription').value = product.description || '';
  document.getElementById('productImage').value = product.image || '';
  document.getElementById('productPrice').value = product.price;
}

// Function to handle form submission
async function updateProduct(event) {
  event.preventDefault();

  const productId = document.getElementById('productId').value;
  const productName = document.getElementById('productName').value;
  const productDescription = document.getElementById('productDescription').value;
  const productImage = document.getElementById('productImage').value;
  const productPrice = parseFloat(document.getElementById('productPrice').value);

  const updateData = {
      name: productName,
      description: productDescription,
      image: productImage,
      price: productPrice
  };

  try {
      const response = await fetch(`http://localhost:5001/api/products/updateProduct/${productId}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify(updateData),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
      }

      alert("Product Updated : " + JSON.stringify(updateData))
      // const updatedProduct = await response.json();
      // Optionally, you can update the displayed product list after successful update
  } 
  catch (error) {
      console.error('Error updating product:', error.message);
  }
}


async function initializeUI() {
  const productList = await fetchProductList();

  // Display product list with only names
  const productListDiv = document.getElementById('product-list');
  productListDiv.innerHTML = '<h4>Click on a product to update:</h4>';
  productList.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.textContent = product.name; // Display only the name
    productDiv.style.cursor = 'pointer'; // Indicate clickability

    // Add click event to update form for the selected product
    productDiv.addEventListener('click', () => updateFormForProduct(product));

    productListDiv.appendChild(productDiv);
  });
  // Add event listener to the form
  document.getElementById('update-product-form').addEventListener('submit', updateProduct);
}

// Initialize the UI
initializeUI();

const apiUrl = 'http://localhost:5001/api/users';

async function getDataAndStoreInArray() {
const dataArray = await fetchData();

if (dataArray) {
createUserTable(dataArray.data.users);
} else {
console.log('Failed to fetch data.');
}
}

function createUserTable(users) {
const table = document.createElement('table');
table.classList.add('user-table'); // Add a class for styling

// Create table header
const headerRow = table.insertRow();
headerRow.insertCell().textContent = 'Name';
headerRow.insertCell().textContent = 'Email';
headerRow.insertCell().textContent = 'Role';

const numUsers = users.filter( item => {
  return item.role == 'user';
}).length;
const numAdmins = users.filter( item => {
  return item.role == 'admin';
}).length;



console.log(numUsers);
console.log(numAdmins);

// Populate table with user data
users.forEach(user => {
const row = table.insertRow();
row.insertCell().textContent = user.name;
row.insertCell().textContent = user.email;
row.insertCell().textContent = user.role;
});

// Append the table to a container element
const container = document.getElementById('user-data');
container.innerHTML = ''; // Clear any existing content

const details = document.createElement('h3');
details.textContent = `USERS : ${numUsers} \n ADMINS : ${numAdmins}`;
container.appendChild(details);
container.appendChild(table);
const closeBut = document.createElement('button');
closeBut.textContent = "Close";
closeBut.addEventListener('click', () => {
  table.remove();
  closeBut.remove();
});
container.appendChild(closeBut);
}




    // Function to fetch data from the server
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error('Error fetching data:', error.message);
        return null;
      }
    }

    
    // Add event listener to the button
    document.getElementById('fetch-button').addEventListener('click', getDataAndStoreInArray);


    async function addProduct(event) {
      event.preventDefault();
    
      const productName = document.getElementById('addProductName').value;
      const productDescription = document.getElementById('addProductDescription').value;
      const productImage = document.getElementById('addProductImage').value;
      const productPrice = parseFloat(document.getElementById('addProductPrice').value);
    
      const newProductData = {
        name: productName,
        description: productDescription,
        image: productImage,
        price: productPrice
      };
    
      try {
        const response = await fetch('http://localhost:5001/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newProductData),
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const addedProduct = await response.json();
        alert('Added Product:'+ JSON.stringify(addedProduct.data.product));
    
        // Add the new product to the UI (optional)
        const productList = document.getElementById('product-list');
        // ... (create a new product div and append it to the list)
    
        // Clear the form fields
        document.getElementById('product-form').reset();
      } catch (error) {
        console.error('Error adding product:', error.message);
        // Display an error message to the user (optional)
      }
    }
    async function initializeUI() {
  const productList = await fetchProductList();

  // Display product list with only names
  const productListDiv = document.getElementById('product-list');
  productListDiv.innerHTML = '<h4>Click on a product to update:</h4>';
  productList.forEach(product => {
    const productDiv = document.createElement('div');
    productDiv.textContent = product.name; // Display only the name
    productDiv.style.cursor = 'pointer'; // Indicate clickability

    // Add click event to update form for the selected product
    productDiv.addEventListener('click', () => updateFormForProduct(product));

    productListDiv.appendChild(productDiv);
  });
  // Add event listener to the form
  document.getElementById('update-product-form').addEventListener('submit', updateProduct);
}

    // Add event listener to the form
    document.getElementById('product-form').addEventListener('submit', addProduct);
    