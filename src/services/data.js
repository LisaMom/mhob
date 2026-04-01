async function showAllRestaurants() {
    const response = await fetch('https://sombobaeb.cheat.casa/locations');
    const allRestaurants = await response.json(); 

    const container = document.getElementById('restaurant-list');
    container.innerHTML = ''; 
    allRestaurants.forEach(restaurant => {
        container.innerHTML += `
            <div class="card">
                <h3>${restaurant​.name}</h3>​​
                <p>${restaurant.description}</p>
                <img src="${restaurant.location_img}" width="200">
            </div>
        `;
    });​
}

showAllRestaurants();​​
async function autoGenerate25Locations() {
    for (let i = 1; i <= 25; i++) {
        const fakeData = {
            name: `ហាងអាហារទី ${i}`,
            description: `នេះគឺជាការពិពណ៌នាសម្រាប់ហាងទី ${i}`,
            city: "សៀមរាប",
            address: `ផ្លូវលេខ ${i}`,​​​​​
            phone: `012 000 0${i}`,
            latitude: 13.36,
            longitude: 103.85
        };
        
        // ហៅ API POST ដូចខាងលើ...
        await fetch('https://sombobaeb.cheat.casa/locations', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(fakeData)
        });
    }
}