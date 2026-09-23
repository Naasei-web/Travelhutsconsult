const WHATSAPP_NUMBER = "233540924789";

const packageData = {
  weekend: {
    title: "Weekend Getaway",
    destination: "[Destination]",
    duration: "[X days]",
    price: "Starting price: [TBD]",
    accommodation: "[Accommodation details]",
    flight: "[Flight details if applicable]",
    activities: ["[Activity 1]", "[Activity 2]", "[Activity 3]"],
    included: ["[Included item 1]", "[Included item 2]"],
    excluded: ["[Not included item 1]", "[Not included item 2]"],
    notes: ["[Important note 1]", "[Important note 2]"]
  },
  family: {
    title: "Family Holiday",
    destination: "[Destination]",
    duration: "[X days]",
    price: "Starting price: [TBD]",
    accommodation: "[Family accommodation details]",
    flight: "[Flight details if applicable]",
    activities: ["[Family activity 1]", "[Family activity 2]", "[Family activity 3]"],
    included: ["[Included item 1]", "[Included item 2]"],
    excluded: ["[Not included item 1]", "[Not included item 2]"],
    notes: ["[Important note 1]", "[Important note 2]"]
  },
  business: {
    title: "Business Travel",
    destination: "[Destination]",
    duration: "[X days]",
    price: "Starting price: [TBD]",
    accommodation: "[Business accommodation details]",
    flight: "[Flight details if applicable]",
    activities: ["[Business activity 1]", "[Business activity 2]", "[Business activity 3]"],
    included: ["[Included item 1]", "[Included item 2]"],
    excluded: ["[Not included item 1]", "[Not included item 2]"],
    notes: ["[Important note 1]", "[Important note 2]"]
  }
};

function buildWhatsAppLink(message) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
}

function setupWhatsAppLinks() {
  document.querySelectorAll('a[href*="wa.me"], a[href*="https://wa.me"]').forEach((link) => {
    const href = link.getAttribute('href');
    if (href && href.includes('233XXXXXXXXX')) {
      link.setAttribute('href', buildWhatsAppLink('Hello Travel Huts Consult, I am interested in your travel services. I would like to make an inquiry about [Service/Destination].'));
    }
  });
}

function openPackageModal(packageId) {
  const modal = document.getElementById('packageModal');
  const packageItem = packageData[packageId];
  if (!modal || !packageItem) return;

  document.getElementById('packageModalTitle').textContent = packageItem.title;
  document.getElementById('packageDestination').textContent = packageItem.destination;
  document.getElementById('packageDuration').textContent = packageItem.duration;
  document.getElementById('packageAccommodation').textContent = packageItem.accommodation;
  document.getElementById('packageFlight').textContent = packageItem.flight;
  document.getElementById('packagePrice').textContent = packageItem.price;

  const activityList = document.getElementById('packageActivities');
  const includedList = document.getElementById('packageIncluded');
  const excludedList = document.getElementById('packageExcluded');
  const notesList = document.getElementById('packageNotes');

  activityList.innerHTML = packageItem.activities.map((item) => `<li>${item}</li>`).join('');
  includedList.innerHTML = packageItem.included.map((item) => `<li>${item}</li>`).join('');
  excludedList.innerHTML = packageItem.excluded.map((item) => `<li>${item}</li>`).join('');
  notesList.innerHTML = packageItem.notes.map((item) => `<li>${item}</li>`).join('');

  const message = `Hello Travel Huts Consult, I would like to ask about the ${packageItem.title} package.`;
  const askButton = modal.querySelector('a');
  if (askButton) {
    askButton.href = buildWhatsAppLink(message);
  }

  modal.classList.add('is-open');
  modal.setAttribute('aria-hidden', 'false');
}

function closePackageModal() {
  const modal = document.getElementById('packageModal');
  if (!modal) return;
  modal.classList.remove('is-open');
  modal.setAttribute('aria-hidden', 'true');
}

function handleMenuToggle() {
  const nav = document.querySelector('.main-nav');
  const toggle = document.querySelector('.menu-toggle');
  if (!nav || !toggle) return;

  toggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

function handleInquiryForm() {
  const form = document.getElementById('travelForm');
  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const status = form.querySelector('.form-success');
    const name = form.elements.name.value.trim();

    if (status) {
      status.textContent = `Thank you, ${name || 'there'}! Your inquiry has been received. A travel consultant will be in touch soon.`;
    }

    form.reset();
  });
}

function attachPackageButtons() {
  document.querySelectorAll('.view-package').forEach((button) => {
    button.addEventListener('click', () => {
      const packageId = button.getAttribute('data-package-id');
      openPackageModal(packageId);
    });
  });

  const modal = document.getElementById('packageModal');
  if (!modal) return;

  modal.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement && event.target.dataset.closeModal === 'true') {
      closePackageModal();
    }
  });

  const closeButton = modal.querySelector('.modal-close');
  if (closeButton) {
    closeButton.addEventListener('click', closePackageModal);
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      closePackageModal();
    }
  });
}

function enhanceWhatsAppButtons() {
  const buttons = document.querySelectorAll('a[href*="wa.me"], a[href*="https://wa.me"]');
  buttons.forEach((button) => {
    const href = button.getAttribute('href');
    if (!href || !href.includes('233XXXXXXXXX')) return;
    const customMessage = button.textContent.trim();
    if (customMessage === 'Ask About This Trip' || customMessage === 'Chat With Us on WhatsApp' || customMessage === 'Start Your Travel Inquiry' || customMessage === 'Chat on WhatsApp' || customMessage === 'Prefer WhatsApp? Chat With Us' || customMessage === 'Talk to a Consultant' || customMessage === 'Ask About This Package on WhatsApp') {
      button.href = buildWhatsAppLink(
        'Hello Travel Huts Consult, I am interested in your travel services. I would like to make an inquiry about [Service/Destination].'
      );
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  handleMenuToggle();
  handleInquiryForm();
  attachPackageButtons();
  enhanceWhatsAppButtons();
  setupWhatsAppLinks();
});
