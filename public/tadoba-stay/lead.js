const number = "919921150541";
const params = new URLSearchParams(window.location.search);
const campaign = (params.get("utm_campaign") || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
const source = campaign ? `Tadoba page / ${campaign}` : "Tadoba page / website";
const track = (event) => {
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, enquiry_source: source });
};

document.querySelectorAll(".wa-direct").forEach((link) => {
  link.href = `https://wa.me/${number}?text=${encodeURIComponent(`Hello Gondwana, I'd like to ask about a Tadoba stay. Source: ${source}`)}`;
  link.addEventListener("click", () => track("whatsapp_open"));
});
document.querySelectorAll(".call-link").forEach((link) => link.addEventListener("click", () => track("phone_click")));

document.getElementById("lead-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  const data = new FormData(form);
  if (data.get("website")) return;
  const message = [
    "Hello Gondwana, please check availability for my Tadoba stay.",
    `Name: ${data.get("name")}`,
    `Travel dates: ${data.get("dates")}`,
    `Guests: ${data.get("guests")}`,
    `Origin city: ${data.get("city")}`,
    `Notes: ${data.get("message") || "None"}`,
    `Source: ${source}`,
  ].join("\n");
  track("whatsapp_open");
  document.getElementById("form-status").textContent = "WhatsApp is opening. Press Send there to complete your request.";
  window.location.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
});

