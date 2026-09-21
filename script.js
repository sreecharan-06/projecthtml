/**
 * CareerPath - Core Script
 * Preserves existing functions: goToSignup, signup, login, logout, and localStorage keys.
 * Adds modern toast notifications, modal interactions, search/filtering, and responsive menu.
 */

// Toast notification system
function showToast(message, type = 'success') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  
  let icon = '✓';
  if (type === 'warning') icon = '⚠';
  if (type === 'info') icon = 'ℹ';

  toast.innerHTML = `<span style="font-weight:bold; font-size:16px;">${icon}</span> <span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(10px)';
    toast.style.transition = 'all 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// Fallback replacement for window.alert to make the app feel modern
window.customAlert = function(msg) {
  showToast(msg, 'info');
};

document.addEventListener("DOMContentLoaded", function () {
  const loggedIn = localStorage.getItem("loggedIn");
  const userEmail = localStorage.getItem("userEmail") || "alex.student@domain.com";

  const signinBtn = document.getElementById("signin-btn");
  const signupBtn = document.getElementById("signup-btn");
  const signoutBtn = document.getElementById("signout-btn");
  const userBadge = document.getElementById("user-badge");

  if (loggedIn) {
    if (signinBtn) signinBtn.style.display = "none";
    if (signupBtn) signupBtn.style.display = "none";
    if (signoutBtn) signoutBtn.style.display = "inline-block";
    if (userBadge) {
      userBadge.style.display = "inline-flex";
      userBadge.innerHTML = `<span class="user-avatar-dot"></span> Welcome, ${userEmail.split('@')[0]}`;
    }
  } else {
    if (signinBtn) signinBtn.style.display = "inline-block";
    if (signupBtn) signupBtn.style.display = "inline-block";
    if (signoutBtn) signoutBtn.style.display = "none";
    if (userBadge) userBadge.style.display = "none";
  }

  // Mobile menu button hookup & auto-close
  const mobileToggle = document.querySelector(".mobile-toggle");
  const nav = document.querySelector("header nav");
  if (mobileToggle && nav) {
    mobileToggle.addEventListener("click", function (e) {
      e.stopPropagation();
      nav.classList.toggle("mobile-active");
    });

    // Close when clicking nav links
    nav.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => nav.classList.remove("mobile-active"));
    });

    // Close when clicking outside
    document.addEventListener("click", function(e) {
      if (!nav.contains(e.target) && !mobileToggle.contains(e.target)) {
        nav.classList.remove("mobile-active");
      }
    });
  }

  // Live career search on index.html
  const searchInput = document.getElementById("career-search");
  if (searchInput) {
    searchInput.addEventListener("input", function (e) {
      const term = e.target.value.toLowerCase().trim();
      const cardLinks = document.querySelectorAll("#careers .cards > .card-link");
      let visibleCount = 0;

      cardLinks.forEach(link => {
        const title = link.querySelector("h3") ? link.querySelector("h3").innerText.toLowerCase() : "";
        const desc = link.querySelector("p") ? link.querySelector("p").innerText.toLowerCase() : "";
        const tag = link.querySelector(".card-tag") ? link.querySelector(".card-tag").innerText.toLowerCase() : "";

        if (title.includes(term) || desc.includes(term) || tag.includes(term)) {
          link.style.display = "";
          visibleCount++;
        } else {
          link.style.display = "none";
        }
      });

      // Handle empty state message
      let emptyMsg = document.getElementById("career-search-empty");
      const cardsContainer = document.querySelector("#careers .cards");
      if (visibleCount === 0) {
        if (!emptyMsg && cardsContainer) {
          emptyMsg = document.createElement("div");
          emptyMsg.id = "career-search-empty";
          emptyMsg.style.cssText = "grid-column: 1 / -1; text-align: center; padding: 40px; background: rgba(255,255,255,0.03); border: 1px dashed var(--border-color); border-radius: var(--radius-lg);";
          emptyMsg.innerHTML = `
            <div style="font-size: 32px; margin-bottom: 8px;">🔍</div>
            <h4 style="color:#fff; font-size:18px; margin-bottom: 6px;">No matching career tracks found</h4>
            <p style="color:var(--text-muted); font-size:14px; margin-bottom: 14px;">Try searching for "Engineering", "Design", "Software", or "Medicine".</p>
            <button class="btn-secondary btn-sm" onclick="clearCareerSearch()">Reset Search</button>
          `;
          cardsContainer.appendChild(emptyMsg);
        }
      } else {
        if (emptyMsg) emptyMsg.remove();
      }
    });
  }

  // Scroll to top button injection
  const scrollBtn = document.createElement("button");
  scrollBtn.id = "back-to-top";
  scrollBtn.innerHTML = "↑";
  scrollBtn.setAttribute("aria-label", "Scroll to top");
  document.body.appendChild(scrollBtn);

  window.addEventListener("scroll", function() {
    if (window.scrollY > 400) {
      scrollBtn.classList.add("visible");
    } else {
      scrollBtn.classList.remove("visible");
    }
  });

  scrollBtn.addEventListener("click", function() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

function clearCareerSearch() {
  const searchInput = document.getElementById("career-search");
  if (searchInput) {
    searchInput.value = "";
    searchInput.dispatchEvent(new Event("input"));
  }
}

function goToSignup() {
  if (localStorage.getItem("loggedIn")) {
    showToast("You are already signed in to your portal!", "info");
    const careersSection = document.getElementById("careers");
    if (careersSection) {
      careersSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.href = "index.html#careers";
    }
  } else {
    window.location.href = "signup.html";
  }
}

function signup(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById("signup-email") || document.querySelector("input[type='email']");
  const email = emailInput && emailInput.value ? emailInput.value : "student@careerpath.edu";

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", email);
  showToast("Account created successfully! Redirecting to dashboard...", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

function login(event) {
  if (event) event.preventDefault();
  const emailInput = document.getElementById("login-email") || document.querySelector("input[type='email']");
  const email = emailInput && emailInput.value ? emailInput.value : "alex@careerpath.edu";

  localStorage.setItem("loggedIn", "true");
  localStorage.setItem("userEmail", email);
  showToast("Welcome back! Redirecting...", "success");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 1000);
}

function logout() {
  localStorage.removeItem("loggedIn");
  localStorage.removeItem("userEmail");
  showToast("Signed out successfully. Have a productive day!", "info");

  setTimeout(() => {
    window.location.href = "index.html";
  }, 800);
}

// Quick Demo autofill for viva / interview presentation
function fillDemoAuth(type) {
  if (type === 'signin') {
    const emailInput = document.querySelector("input[type='email']");
    const passInput = document.querySelector("input[type='password']");
    if (emailInput) emailInput.value = "alex.student@careerpath.edu";
    if (passInput) passInput.value = "SecurePass123!";
    showToast("Demo student credentials loaded!", "info");
  } else if (type === 'signup') {
    const nameInput = document.querySelector("input[type='text']");
    const emailInput = document.querySelector("input[type='email']");
    const passInput = document.querySelector("input[type='password']");
    if (nameInput) nameInput.value = "Alex Morgan";
    if (emailInput) emailInput.value = "alex.morgan@careerpath.edu";
    if (passInput) passInput.value = "Ready2Learn2025!";
    showToast("Demo sign-up data populated!", "info");
  }
}

// Counselor Consultation Booking Modal
function openBookingModal(counselorName) {
  let modal = document.getElementById("booking-modal");
  if (!modal) return;
  const nameSpan = document.getElementById("modal-counselor-name");
  if (nameSpan && counselorName) {
    nameSpan.innerText = counselorName;
  }
  modal.classList.add("active");
}

function closeBookingModal() {
  const modal = document.getElementById("booking-modal");
  if (modal) modal.classList.remove("active");
}

function confirmBooking(event) {
  if (event) event.preventDefault();
  const nameSpan = document.getElementById("modal-counselor-name");
  const advisor = nameSpan ? nameSpan.innerText : "Your Advisor";
  closeBookingModal();
  showToast(`Consultation confirmed with ${advisor}! Calendar invitation dispatched.`, "success");
}

// Contact form submission
function handleContactSubmit(event) {
  if (event) event.preventDefault();
  showToast("Thank you for reaching out! Our advisory team will respond within 24 hours.", "success");
  const form = event.target;
  if (form) form.reset();
}

// Filter counselors on counselor.html
function filterCounselors(category) {
  const tabs = document.querySelectorAll(".filter-tab");
  tabs.forEach(tab => tab.classList.remove("active"));
  
  const activeTab = Array.from(tabs).find(t => {
    if (category === 'all') return t.innerText.toLowerCase().includes('all');
    return t.innerText.toLowerCase().includes(category.toLowerCase());
  });
  if (activeTab) activeTab.classList.add("active");

  const cards = document.querySelectorAll(".counselor-card");
  cards.forEach(card => {
    const cardCat = card.getAttribute("data-category") || "all";
    if (category === "all" || cardCat.includes(category)) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}
