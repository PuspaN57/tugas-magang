/**
 * 1. Mendefinisikan Endpoint API
 * Mengambil data produk dari Fake Store API.
 */
const API_URL = 'https://fakestoreapi.com/products';

/**
 * 2. Fungsi untuk Mengubah Objek Produk menjadi Elemen HTML (Card)
 * Ini adalah logika untuk "slicing" setiap item produk.
 * @param {object} product - Objek produk dari API.
 * @returns {string} - String HTML untuk satu kartu produk.
 */
function createProductCardHTML(product) {
    // Memformat harga ke Rupiah (simulasi)
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0
    }).format(product.price * 15000); // Mengalikan dengan kurs simulasi 15000

    // Template HTML untuk setiap kartu produk
    return `
        <div class="col">
            <div class="card product-card h-100 border-0">
                <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
                <div class="card-body p-2">
                    <p class="card-title product-title mb-1" title="${product.title}">
                        ${product.title}
                    </p>
                    <p class="product-price mb-1">
                        ${formattedPrice}
                    </p>
                    <small class="text-muted">Jakarta Utara</small>
                </div>
            </div>
        </div>
    `;
}

/**
 * 3. Fungsi Utama untuk Mengambil dan Menampilkan Produk
 */
async function fetchAndDisplayProducts() {
    // Cari elemen kontainer di HTML
    const productListContainer = document.getElementById('product-list');

    // Tampilkan pesan loading sementara
    productListContainer.innerHTML = '<p class="text-center w-100">Memuat produk...</p>';

    try {
        // 3.a. Fetch product data from the API
        const response = await fetch(API_URL);
        
        // Cek jika response OK (status 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        // Konversi response menjadi JSON
        const products = await response.json();

        // Kosongkan kontainer loading
        productListContainer.innerHTML = '';
        
        // 3.b. Loop melalui setiap produk dan masukkan ke HTML
        let allCardsHTML = '';
        
        products.forEach(product => {
            // Panggil fungsi pembuat kartu untuk setiap produk
            allCardsHTML += createProductCardHTML(product);
        });

        // Masukkan semua kartu yang sudah dibuat ke dalam DOM
        productListContainer.innerHTML = allCardsHTML;

    } catch (error) {
        // Tampilkan pesan error jika pengambilan data gagal
        console.error('Error fetching data:', error);
        productListContainer.innerHTML = `<p class="text-danger w-100">Gagal memuat produk. Cek konsol untuk detail error.</p>`;
    }
}

// Panggil fungsi utama saat halaman dimuat
fetchAndDisplayProducts();