const BASE_URL = "https://api.waifu.im/search";

const tagSelect = document.getElementById("tagSelect");
const loadBtn = document.getElementById("loadBtn");
const results = document.getElementById("results");
const loading = document.getElementById("loading");
const errorBox = document.getElementById("error");

function setLoading(state) {
  loading.classList.toggle("hidden", !state);
  loadBtn.disabled = state;
}

function showError(message) {
  errorBox.textContent = message;
  errorBox.classList.remove("hidden");
}

function clearError() {
  errorBox.classList.add("hidden");
}

async function fetchImages() {
  try {
    setLoading(true);
    clearError();
    results.innerHTML = "";

    const tag = tagSelect.value;
    const url = `${BASE_URL}?included_tags=${tag}&many=5`;

    const response = await fetch(url);
    if (!response.ok) throw new Error("Failed API call");

    const data = await response.json();
    if (!data.images || data.images.length === 0) {
      showError("No results found.");
      return;
    }

    displayImages(data.images);
  } catch (error) {
    showError(error.message);
  } finally {
    setLoading(false);
  }
}

function displayImages(images) {
  images.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const img = document.createElement("img");
    img.src = item.url;
    img.alt = "Anime Image";

    card.appendChild(img);
    results.appendChild(card);
  });
}

loadBtn.addEventListener("click", fetchImages);
