const menuItems = [
  { name: "Brie no forno", category: "Entradinhas", description: "Brie derretido com jamon e geleia de frutas amarelas. Acompanha torradas.", price: 59 },
  { name: "Cestinha de pães com pastinhas", category: "Entradinhas", description: "Mix de pães com homus, tomatinho confit e guacamole.", price: 42 },
  { name: "Empada", category: "Entradinhas", description: "Sabores: frango, camarão e queijo do reino.", price: 15 },
  { name: "Mini coxinha", category: "Entradinhas", description: "Porção com 8 unidades.", price: 22 },
  { name: "Bolo do dia", category: "Docinhos", description: "Fatia de bolo. Consulte o sabor do dia.", price: 18 },
  { name: "Brownie com sorvete", category: "Docinhos", description: "Brownie de chocolate com sorvete de creme e calda de chocolate.", price: 28 },
  { name: "Cartola", category: "Docinhos", description: "Banana grelhada com queijo coalho assado, canela e açúcar.", price: 28 },
  { name: "Cookie vegano", category: "Docinhos", description: "Sem glúten, nos sabores tradicional e chocolate.", price: 15, tag: "Vegano · sem glúten" },
  { name: "Cuscuz temperado", category: "Regionais", description: "Escolha um acompanhamento: carne louca, queijo coalho, ovo frito ou cogumelos.", price: 26 },
  { name: "Tapioca rendada", category: "Regionais", description: "Opções de carne louca, coco com queijo coalho ou frango.", price: 27 },
  { name: "Omelete", category: "Ovos & toasts", description: "Muçarela com tomate confit ou frango com requeijão e tomate confit. Acompanha folhas.", price: 30, tag: "A partir de" },
  { name: "Ovos com bacon", category: "Ovos & toasts", description: "Pão de fermentação natural, ovos com gema mole e fatias de bacon.", price: 23 },
  { name: "Toast de brie e jamon", category: "Ovos & toasts", description: "Pão de fermentação natural, brie, jamon, tomatinho confit e pesto.", price: 29 },
  { name: "Toast vegana", category: "Ovos & toasts", description: "Pão de fermentação natural, homus, queijo de castanha, tomate confit e cogumelos.", price: 30, tag: "Vegano" },
  { name: "Brie com Parma", category: "Sanduíches", description: "Brie, parma e geleia de damasco. No pão ciabatta ou croissant.", price: 34 },
  { name: "Costelinha de porco", category: "Sanduíches", description: "Requeijão, cebola caramelizada e barbecue de goiabada da casa.", price: 35 },
  { name: "Vegano no ciabatta", category: "Sanduíches", description: "Homus, cogumelos, folhas, tomate confit e queijo de castanha.", price: 31, tag: "Vegano" },
  { name: "Camarão ao molho de tomate", category: "Pratos", description: "Penne ao molho de tomate, pesto e parmesão.", price: 54 },
  { name: "Picadinho", category: "Pratos", description: "Coxão mole, arroz alho e óleo, farofa panko, banana grelhada e ovo frito.", price: 42 },
  { name: "Risoto de alho-poró", category: "Pratos", description: "Arroz arbóreo e sete grãos, cogumelos, alho-poró, parmesão e amêndoas.", price: 49 },
  { name: "Tilápia grelhada", category: "Pratos", description: "Com cebola e alcaparras, espaguete de legumes e arroz de brócolis.", price: 41 },
  { name: "Aconchego", category: "Cafés", description: "Espresso, creme de chocolate branco, canela, leite vaporizado e chantilly · 150 ml.", price: 20 },
  { name: "Furdunço", category: "Cafés", description: "Espresso, creme toffee e leite vaporizado cremoso · 180 ml.", price: 19 },
  { name: "V60", category: "Cafés", description: "Café filtrado que realça acidez e doçura natural. Opção descafeinada.", price: 17 },
  { name: "Iced Latte Furdunço", category: "Cafés", description: "Espresso, toffee, leite gelado cremoso e gelo · 330 ml.", price: 19 },
  { name: "Cold Brew Citrus", category: "Cafés", description: "Café extraído a frio, água com gás, xarope de laranja e espuma de limão · 330 ml.", price: 20 },
  { name: "Afogatto", category: "Cafés", description: "Sorvete de creme, espresso e creme toffee · 230 ml.", price: 20 }
];

const categories = ["Tudo", ...new Set(menuItems.map((item) => item.category))];
const categoryList = document.querySelector("#category-list");
const menuGrid = document.querySelector("#menu-grid");
const searchInput = document.querySelector("#menu-search");
const status = document.querySelector("#menu-status");
let activeCategory = "Tudo";

function formatPrice(value) {
  return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);
}

function renderCategories() {
  categoryList.innerHTML = categories.map((category) => {
    const pressed = category === activeCategory;
    return `<button class="category-chip" type="button" data-category="${category}" aria-pressed="${pressed}">${category}</button>`;
  }).join("");
}

function getVisibleItems() {
  const query = searchInput.value.trim().toLocaleLowerCase("pt-BR");
  return menuItems.filter((item) => {
    const categoryMatches = activeCategory === "Tudo" || item.category === activeCategory;
    const searchMatches = !query || `${item.name} ${item.description} ${item.category} ${item.tag || ""}`.toLocaleLowerCase("pt-BR").includes(query);
    return categoryMatches && searchMatches;
  });
}

function renderMenu() {
  const visibleItems = getVisibleItems();
  status.textContent = `${visibleItems.length} ${visibleItems.length === 1 ? "item encontrado" : "itens encontrados"}.`;
  if (!visibleItems.length) {
    menuGrid.innerHTML = '<p class="no-results">Não encontrei nada com esse termo. Tente outra busca ou abra o cardápio oficial.</p>';
    return;
  }

  menuGrid.innerHTML = visibleItems.map((item) => `
    <article class="menu-card">
      <div class="menu-card-top"><span class="menu-category">${item.category}</span><span class="menu-price">${item.tag === "A partir de" ? "a partir de " : ""}${formatPrice(item.price)}</span></div>
      <div><h3>${item.name}</h3><p>${item.description}</p></div>
      <div class="menu-card-bottom"><span class="menu-tag">${item.tag && item.tag !== "A partir de" ? item.tag : ""}</span><span class="menu-category">FURDUNÇO</span></div>
    </article>`).join("");
}

categoryList.addEventListener("click", (event) => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  renderCategories();
  renderMenu();
});
searchInput.addEventListener("input", renderMenu);
renderCategories();
renderMenu();

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");
menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.querySelector(".sr-only").textContent = isOpen ? "Abrir menu" : "Fechar menu";
  mainNav.classList.toggle("is-open", !isOpen);
});
mainNav.addEventListener("click", (event) => {
  if (!event.target.closest("a")) return;
  menuToggle.setAttribute("aria-expanded", "false");
  menuToggle.querySelector(".sr-only").textContent = "Abrir menu";
  mainNav.classList.remove("is-open");
});

document.documentElement.classList.add("js");
const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if ("IntersectionObserver" in window && !prefersReducedMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -30px 0px" });
  document.querySelectorAll(".reveal").forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}
