// PolishedbyNos — minimal JS only.
// 1) Gallery filter with live counts (counts cards, never hardcodes overlapping numbers).
// 2) Demo enquiry form: prevents submission, shows a demonstration notice. No data leaves the page.
(function () {
  "use strict";

  // Gallery filter
  var buttons = document.querySelectorAll(".filter-btn[data-filter]");
  var cards = Array.prototype.slice.call(document.querySelectorAll(".style-card[data-cat]"));
  if (buttons.length && cards.length) {
    var countFor = function (filter) {
      if (filter === "all") return cards.length;
      return cards.filter(function (c) {
        return c.getAttribute("data-cat").split(" ").indexOf(filter) !== -1;
      }).length;
    };
    buttons.forEach(function (btn) {
      var filter = btn.getAttribute("data-filter");
      var label = btn.querySelector(".filter-label");
      if (label) label.textContent = label.textContent.replace(/\(\d+\)\s*$/, "").trim();
      var count = countFor(filter);
      btn.querySelector(".filter-count").textContent = "(" + count + ")";
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
        btn.setAttribute("aria-pressed", "true");
        cards.forEach(function (c) {
          var cats = c.getAttribute("data-cat").split(" ");
          c.hidden = filter !== "all" && cats.indexOf(filter) === -1;
        });
      });
    });
  }

  // Demo enquiry form
  var form = document.getElementById("enquiry-form");
  var notice = document.getElementById("demo-notice");
  if (form && notice) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      notice.classList.add("show");
      notice.focus();
    });
  }
})();
