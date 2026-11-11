const LINKS = [
  { href: "index.html", label: "Dashboard" },
  { href: "lessons.html", label: "Lessons" },
  { href: "review.html", label: "Review" },
  { href: "vocab.html", label: "Vocab" },
  { href: "reading.html", label: "Reading" },
  { href: "lists.html", label: "Lists" },
  { href: "speak.html", label: "Speak" },
  { href: "written.html", label: "Spoken vs Written" },
  { href: "radicals.html", label: "Radicals" },
  { href: "confusing.html", label: "Confusing" },
  { href: "settings.html", label: "Settings" },
];

export function renderNav(current) {
  const nav = document.createElement("nav");
  nav.className = "topnav";
  for (const link of LINKS) {
    const a = document.createElement("a");
    a.href = link.href;
    a.textContent = link.label;
    if (link.href === current) a.className = "active";
    nav.appendChild(a);
  }
  document.body.prepend(nav);
}

export function toast(msg) {
  let el = document.querySelector(".toast");
  if (!el) {
    el = document.createElement("div");
    el.className = "toast";
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add("show");
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove("show"), 1800);
}
