// M-Analytics site — theme toggle.
// The flash-avoiding part (reading localStorage and stamping data-theme
// before first paint) lives in an inline <script> at the top of <head> in
// every page — it has to run synchronously and before styles.css is even
// requested, so it can't live in this deferred file. This file only wires
// up the toggle button's click handler once the page is parsed.
document.addEventListener("DOMContentLoaded", function () {
    var root = document.documentElement;
    var toggle = document.querySelector(".theme-toggle");
    if (!toggle) return;

    toggle.addEventListener("click", function () {
        var current = root.getAttribute("data-theme");
        if (!current) {
            var systemDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
            current = systemDark ? "dark" : "light";
        }
        var next = current === "dark" ? "light" : "dark";
        root.setAttribute("data-theme", next);
        try {
            localStorage.setItem("theme", next);
        } catch (e) {
            // Private browsing / storage disabled — the toggle still works
            // for this page view, it just won't persist across visits.
        }
    });
});
