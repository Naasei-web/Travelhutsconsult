const WHATSAPP_NUMBER = "233540924789";

const packageData = {
  dubai: {
    title: "Dubai Getaway",
    destination: "Dubai, UAE",
    duration: "5 Days / 4 Nights",
    overview: "A flexible sample travel package for exploring Dubai with support for the key arrangements before you travel.",
    included: ["Flight booking assistance", "Hotel reservation", "Airport transfer guidance", "Travel insurance assistance"],
    notes: ["This is a sample package for demonstration.", "Actual availability, destinations, inclusions, requirements and pricing must be confirmed with Travel Huts Consult.", "Travel Huts Consult does not guarantee visa approval, entry, flights or any other third-party outcome."],
    inquiryMessage: "Hello Travel Huts Consult, I'm interested in the Dubai Getaway package. Please tell me more about the current availability, requirements and pricing."
  },
  uk: {
    title: "UK Travel Package",
    destination: "London, United Kingdom",
    duration: "7 Days / 6 Nights",
    overview: "A flexible sample package for planning a London trip with practical travel, accommodation and visa support.",
    included: ["Flight booking assistance", "Hotel reservation", "Travel insurance guidance", "Visa application support"],
    notes: ["This is a sample package for demonstration.", "Actual availability, destinations, inclusions, requirements and pricing must be confirmed with Travel Huts Consult.", "Travel Huts Consult does not guarantee visa approval, entry, flights or any other third-party outcome."],
    inquiryMessage: "Hello Travel Huts Consult, I'm interested in the UK Travel Package. Please tell me more about the current availability, requirements and pricing."
  },
  canada: {
    title: "Canada Travel Support",
    destination: "Toronto, Canada",
    duration: "Flexible",
    overview: "A flexible sample support package for planning travel to Toronto with guidance around applications, flights and accommodation.",
    included: ["Visa application guidance", "Flight booking assistance", "Travel insurance guidance", "Accommodation planning"],
    notes: ["This is a sample package for demonstration.", "Actual availability, destinations, inclusions, requirements and pricing must be confirmed with Travel Huts Consult.", "Travel Huts Consult does not guarantee visa approval, entry, flights or any other third-party outcome."],
    inquiryMessage: "Hello Travel Huts Consult, I'm interested in the Canada Travel Support package. Please tell me more about the current requirements and services."
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
  document.getElementById('packageOverview').textContent = packageItem.overview;

  const activityList = document.getElementById('packageActivities');
  const includedList = document.getElementById('packageIncluded');
  const notesList = document.getElementById('packageNotes');

  includedList.innerHTML = packageItem.included.map((item) => `<li>${item}</li>`).join('');
  notesList.innerHTML = packageItem.notes.map((item) => `<li>${item}</li>`).join('');

  const askButton = modal.querySelector('a');
  if (askButton) {
    askButton.href = buildWhatsAppLink(packageItem.inquiryMessage);
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
