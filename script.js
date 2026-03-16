// ── DATA ────────────────────────────────────────────────
let alumniData = [
  { name: "Eisley Fuentes",   batch: "2023", strand: "STEM",  status: "College",    email: "icebabyfnts@gmail.com" },
  { name: "Gessilyn Negre",   batch: "2026", strand: "TVL",   status: "Employed",   email: "gessilynv@gmail.com"   },
];

// ── TOAST NOTIFICATION ──────────────────────────────────
function showToast(msg) {
  const toast = document.getElementById("toast");
  toast.textContent = msg;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3200);
}

// ── REGISTER ────────────────────────────────────────────
document.getElementById("btnRegister").addEventListener("click", function () {
  const name   = document.getElementById("name").value.trim();
  const batch  = document.getElementById("batch").value.trim();
  const strand = document.getElementById("strand").value;
  const status = document.getElementById("status").value;
  const email  = document.getElementById("email").value.trim();

  if (!name || !batch || !email) {
    showToast("⚠️ Please fill in all required fields.");
    return;
  }

  alumniData.push({ name, batch, strand, status, email });
  document.getElementById("regForm").reset();
  updateTable(alumniData);
  calculateAnalytics();
  showToast("✅ " + name + " has been registered successfully!");
});

// ── SURVEY ──────────────────────────────────────────────
document.getElementById("btnSurvey").addEventListener("click", function () {
  const answer = document.querySelector('input[name="related"]:checked');
  if (!answer) {
    showToast("⚠️ Please select an answer before submitting.");
    return;
  }
  showToast("📋 Survey submitted! Response: " + answer.value);
  document.getElementById("surveyForm").reset();
});

// ── SEARCH ──────────────────────────────────────────────
document.getElementById("btnSearch").addEventListener("click", function () {
  const query = document.getElementById("searchQuery").value.toLowerCase().trim();
  if (!query) {
    updateTable(alumniData);
    return;
  }
  const filtered = alumniData.filter(item =>
    item.batch.includes(query) ||
    item.strand.toLowerCase().includes(query) ||
    item.name.toLowerCase().includes(query) ||
    item.status.toLowerCase().includes(query)
  );
  updateTable(filtered);
  showToast(`🔍 Found ${filtered.length} result(s) for "${query}"`);
});

// Also search on Enter key
document.getElementById("searchQuery").addEventListener("keydown", function (e) {
  if (e.key === "Enter") document.getElementById("btnSearch").click();
});

// ── UPDATE TABLE ─────────────────────────────────────────
function updateTable(data) {
  const tbody = document.getElementById("tableBody");
  tbody.innerHTML = "";

  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="4" style="text-align:center;padding:24px;color:var(--gray-400);">No records found.</td></tr>`;
    return;
  }

  data.forEach((item, idx) => {
    const badgeClass = {
      College: "badge-college",
      Employed: "badge-employed",
      Vocational: "badge-vocational"
    }[item.status] || "";

    const row = document.createElement("tr");
    row.style.animationDelay = `${idx * 40}ms`;
    row.innerHTML = `
      <td><strong>${item.name}</strong></td>
      <td>${item.batch}</td>
      <td>${item.strand}</td>
      <td><span class="badge ${badgeClass}">${item.status}</span></td>
    `;
    tbody.appendChild(row);
  });
}

// ── ANALYTICS ────────────────────────────────────────────
function calculateAnalytics() {
  const total      = alumniData.length;
  const college    = alumniData.filter(a => a.status === "College").length;
  const employed   = alumniData.filter(a => a.status === "Employed").length;
  const vocational = alumniData.filter(a => a.status === "Vocational").length;

  const pct = (n) => total ? Math.round((n / total) * 100) : 0;

  // Stat cards
  document.getElementById("statTotal").textContent    = total;
  document.getElementById("statCollege").textContent  = college;
  document.getElementById("statEmployed").textContent = employed;

  // Progress bars
  setProgress("college",    pct(college));
  setProgress("employed",   pct(employed));
  setProgress("vocational", pct(vocational));
}

function setProgress(id, pct) {
  const fill  = document.getElementById("fill-" + id);
  const label = document.getElementById("pct-"  + id);
  if (fill)  fill.style.width   = pct + "%";
  if (label) label.textContent  = pct + "%";
}

// ── INIT ──────────────────────────────────────────────────
updateTable(alumniData);
calculateAnalytics();
