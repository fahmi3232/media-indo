document.addEventListener('DOMContentLoaded', async () => {
  const urlParams = new URLSearchParams(window.location.search);
  let articleUrl = urlParams.get('url');

  if (articleUrl) {

    articleUrl = 'https://www.cnnindonesia.com' + articleUrl;


    try {
      // Mengambil detail artikel dari server
      const response = await fetch('/article?url=' + encodeURIComponent(articleUrl));
      const article = await response.json();

      const detailTitle = document.getElementById('detail-title');
      const detailDate = document.getElementById('detail-date');
      const detailContent = document.getElementById('detail-content');
      const detailImage = document.getElementById('detail-image');
      const detailRelatedLinks = document.getElementById('detail-related-links');

      detailTitle.innerText = article.title;
      detailDate.innerText = article.date;
      detailContent.innerHTML = article.content;

      if (article.images && article.images.length > 0) {
        detailImage.src = article.images[0];
        detailImage.style.display = 'block';
      } else {
        detailImage.style.display = 'none';
      }

      // Menampilkan link terkait
      detailRelatedLinks.innerHTML = article.relatedLinks;

      console.log('ini adalah link', article.relatedLinks)

      const links = detailContent.getElementsByTagName('a');
      for (let link of links) {
        link.setAttribute('href', 'index.html'); // Mengarahkan ke halaman beranda
        link.setAttribute('target', '_self'); // Membuka di tab yang sama
      }
    } catch (error) {
      console.error('Error fetching article:', error);
    }
  } else {
    console.error('URL artikel tidak ditemukan');
  }
});
