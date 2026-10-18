// ---------- ফি ক্যালকুলেটর ----------
// তথ্যসূত্র: একাধিক সংবাদ/গাইড সাইট (অক্টোবর ২০২৬)। আবেদনের আগে epassport.gov.bd-তে মিলিয়ে নিন।
const FEES = {
  "48": { "5": [4025, 6325, 8625], "10": [5750, 8050, 10350] },
  "64": { "5": [6325, 8625, 12075], "10": [8050, 10350, 13800] }
};
const DAYS = ["১৫–২১ কার্যদিবস", "৭–১০ কার্যদিবস", "২ কার্যদিবস"];
const bn = n => n.toLocaleString("bn-BD");

function setupCalculator() {
  const age = document.getElementById("age");
  const pages = document.getElementById("pages");
  const validity = document.getElementById("validity");
  const speed = document.getElementById("speed");
  const amount = document.getElementById("amount");
  const time = document.getElementById("time");
  const note = document.getElementById("age-note");
  if (!age) return;

  function update() {
    const minor = age.value === "minor";
    if (minor) validity.value = "5";
    validity.querySelector('option[value="10"]').disabled = minor;
    note.style.display = minor ? "block" : "none";
    const fee = FEES[pages.value][validity.value][Number(speed.value)];
    amount.textContent = "৳ " + bn(fee);
    time.textContent = "ডেলিভারি সময়: প্রায় " + DAYS[Number(speed.value)];
  }
  [age, pages, validity, speed].forEach(el => el.addEventListener("change", update));
  update();
}

// ---------- ধাপে ধাপে গাইড ----------
const STEPS = [
  { t: "আগে কাগজ প্রস্তুত করুন", d: "আপনার জাতীয় পরিচয়পত্র (NID) অথবা ১৭ সংখ্যার অনলাইনে যাচাইযোগ্য জন্মনিবন্ধন সনদ লাগবে। জন্মনিবন্ধন everify.bdris.gov.bd থেকে যাচাই করে নিন।" },
  { t: "অনলাইনে আবেদন ফর্ম পূরণ", d: "epassport.gov.bd সাইটে গিয়ে 'Apply Online' দিন। নাম, জন্মতারিখ, ঠিকানা, পেশা, পিতা-মাতার তথ্য, জরুরি যোগাযোগের নম্বর দিতে হবে। জমা দেওয়ার পর আর বদলানো যায় না, তাই ভালো করে মিলিয়ে নিন।" },
  { t: "মেয়াদ ও ডেলিভারির ধরন বাছুন", d: "৪৮ বা ৬৪ পৃষ্ঠা, ৫ বা ১০ বছর, এবং সাধারণ/জরুরি/অতি জরুরি বেছে নিন। উপরের ক্যালকুলেটরে মোট ফি দেখে নিতে পারেন। ১৮ বছরের নিচে হলে শুধু ৫ বছর।" },
  { t: "ফি পরিশোধ করুন", d: "অনলাইনে পেমেন্ট করলে রসিদ নম্বর আবেদনের সঙ্গে স্বয়ংক্রিয়ভাবে যুক্ত হয়। পেমেন্টের রসিদ সংরক্ষণ করুন।" },
  { t: "আবেদনের সারসংক্ষেপ প্রিন্ট করুন", d: "আবেদন জমা দেওয়ার পর 'Application Summary' ও পূরণ করা ফর্ম ডাউনলোড করে প্রিন্ট নিন। এতে বায়োমেট্রিকের তারিখ ও সময় লেখা থাকবে।" },
  { t: "নির্ধারিত দিনে অফিসে যান", d: "প্রিন্ট করা সারসংক্ষেপ, ফর্ম, ফি-র রসিদ, NID বা জন্মনিবন্ধনের কপি নিয়ে নির্ধারিত পাসপোর্ট অফিসে যান। সেখানে আঙুলের ছাপ, ছবি ও আইরিস নেওয়া হবে।" },
  { t: "পাসপোর্ট সংগ্রহ", d: "বায়োমেট্রিক শেষে একটি স্লিপ পাবেন। ডেলিভারির ধরন অনুযায়ী নির্ধারিত সময়ে স্লিপ দেখিয়ে পাসপোর্ট সংগ্রহ করুন। স্ট্যাটাস epassport.gov.bd-তে দেখা যায়।" }
];

function setupSteps() {
  const box = document.getElementById("step-body");
  if (!box) return;
  const bar = document.getElementById("bar");
  const count = document.getElementById("step-count");
  const prev = document.getElementById("prev");
  const next = document.getElementById("next");
  let i = 0;
  function render() {
    const s = STEPS[i];
    box.innerHTML = "<h3></h3><p></p>";
    box.querySelector("h3").textContent = s.t;
    box.querySelector("p").textContent = s.d;
    count.textContent = "ধাপ " + bn(i + 1) + " / " + bn(STEPS.length);
    bar.style.width = ((i + 1) / STEPS.length * 100) + "%";
    prev.disabled = i === 0;
    next.textContent = i === STEPS.length - 1 ? "শুরু থেকে দেখুন" : "পরের ধাপ";
  }
  prev.addEventListener("click", () => { if (i > 0) { i--; render(); } });
  next.addEventListener("click", () => { i = i === STEPS.length - 1 ? 0 : i + 1; render(); });
  render();
}

setupCalculator();
setupSteps();
