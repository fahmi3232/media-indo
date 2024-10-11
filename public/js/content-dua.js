document.addEventListener('DOMContentLoaded', async () => {
  try {
    const response = await fetch('https://api-berita-indonesia.vercel.app/cnn/olahraga/');
    const data = await response.json();
    // console.log(data); // Lihat struktur data yang diterima
    
    const news = data.data.posts; // Akses array berita dalam data

    // console.log('ini data berita 1: ',news)
    
    const newsCards = document.getElementById('content-dua');
    
    news.slice(0,3).forEach(item => {
      const card = document.createElement('div');
      card.classList.add('card');

      const path = new URL(item.link).pathname; // Ambil path dari URL artikel
      
      card.innerHTML = `
      <div class="flex-1 bg-gray-100 p-4 text-center">
      <img data-url="${path}" src="${item.thumbnail}" alt="${item.title}" class="w-full h-36 object-cover mb-2">
      <p class="text-sm">${item.title}</p>
      </div>
      `;
      
      newsCards.appendChild(card);
    });

      // <img class="view-deta" data-url="${path}" src="${item.thumbnail}" alt="${item.title}">
      // <h2>${item.title}</h2>


      // <button class="view-deta" data-url="${path}">Lihat Selengkapnya</button>
      // <button class="view-details" data-url="${item.link}">View Details</button>
    
    // document.getElementById('see-more-btn').addEventListener('click', () => {
    //   window.location.href = 'all-news.html'; // Halaman untuk menampilkan semua berita
    // });

    document.querySelectorAll('.view-deta').forEach(butt => {
      butt.addEventListener('click', () => {
        const url = butt.getAttribute('data-url');
        window.location.href = `detail.html?url=${encodeURIComponent(url)}`;
        console.log('ini baru:', news)
      });
    });

    
  } catch (error) {
    console.error('Error fetching news:', error);
  }
});
