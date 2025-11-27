const animeList = [
  "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken",
  "Tonikaku Kawaii",
  "Tonikaku Kawaii: SNS",
  "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen",
  "Horimiya",
  "Naruto: Shippuuden",
  "Hunter x Hunter (2011)",
  "One Piece",
  "Boku no Hero Academia",
  "Kimetsu no Yaiba",
  "Blue Lock",
  "Kuroko no Basket",
];

const container = document.getElementById("animeContainer");

const translations = {
  "Otonari no Tenshi-sama ni Itsunomanika Dame Ningen ni Sareteita Ken":
    "The Angel Next Door Spoils Me Rotten",
  "Kaguya-sama wa Kokurasetai? Tensai-tachi no Renai Zunousen":
    "Kaguya: Love is War",
};

// Hàm delay
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Lấy anime từng cái một
async function fetchAnimeSequential(animeList) {
  for (const name of animeList) {
    try {
      const res = await fetch(
        `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(name)}&limit=5`
      );
      const data = await res.json();

      if (data.data && data.data.length > 0) {
        // Lọc chính xác anime theo tên
        const filtered = data.data.filter(
          (anime) => anime.title.toLowerCase() === name.toLowerCase()
        );

        if (filtered.length > 0) {
          filtered.forEach((anime) => {
            const titleTranslated = translations[anime.title] || anime.title;
            container.innerHTML += `
              <div class="anime-card">
                <img style="height: 300px" src="${
                  anime.images.jpg.image_url
                }" alt="${anime.title}">
                <h3>${titleTranslated}</h3>
                <p>${
                  anime.synopsis
                    ? anime.synopsis.slice(0, 100) + "..."
                    : "Chưa có mô tả"
                }</p>
              </div>
            `;
          });
        } else {
          container.innerHTML += `
            <div class="anime-card">
              <h3>${name}</h3>
              <p>Không tìm thấy dữ liệu.</p>
            </div>
          `;
        }
      } else {
        container.innerHTML += `
          <div class="anime-card">
            <h3>${name}</h3>
            <p>Không tìm thấy dữ liệu.</p>
          </div>
        `;
      }

      await delay(750); // delay 1s giữa mỗi request
    } catch (err) {
      console.error(`Lỗi khi tải anime ${name}:`, err);
    }
  }
}

// Gọi hàm
fetchAnimeSequential(animeList);

// --- HÀM TÌM KIẾM BẰNG API JIKAN --- //
async function timKiemPhim() {
  const keyword = document.getElementById("searchInput").value.trim();

  if (!keyword) return;

  container.innerHTML = "<h3>Đang tìm kiếm...</h3>";

  try {
    const res = await fetch(
      `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(keyword)}&limit=12`
    );

    const data = await res.json();
    container.innerHTML = "";

    if (!data.data || data.data.length === 0) {
      container.innerHTML = "<h3>Không tìm thấy phim.</h3>";
      return;
    }

    data.data.forEach((anime) => {
      container.innerHTML += `
        <div class="anime-card">
          <img style="height: 300px" src="${anime.images.jpg.image_url}">
          <h3>${anime.title}</h3>
          <p>${
            anime.synopsis
              ? anime.synopsis.slice(0, 100) + "..."
              : "Chưa có mô tả"
          }</p>
        </div>
      `;
    });
  } catch (error) {
    console.error(error);
    container.innerHTML = "<h3>Lỗi khi tìm kiếm phim!</h3>";
  }
}
