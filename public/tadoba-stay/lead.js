const number = "919921150541";
const params = new URLSearchParams(window.location.search);
const campaign = (params.get("utm_campaign") || "").replace(/[^a-zA-Z0-9_-]/g, "").slice(0, 48);
const source = campaign ? `Tadoba page / ${campaign}` : "Tadoba page / website";


document.querySelectorAll(".wa-direct").forEach((link) => {
  link.href = `https://wa.me/${number}?text=${encodeURIComponent(`Hello Gondwana, I'd like to ask about a Tadoba stay. Source: ${source}`)}`;

});


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
  window.gondwanaTrack?.("form_attempt", {form_id:"lead-form"});
  window.gondwanaTrack?.("contact_click", {channel:"whatsapp",section:"landing_form"});
  document.getElementById("form-status").textContent = "WhatsApp is opening. Press Send there to complete your request.";
  window.location.href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
});
