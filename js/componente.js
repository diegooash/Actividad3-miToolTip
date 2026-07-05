function crearTooltip(selector, texto, posicion = "top") {
    const target = document.querySelector(selector);
    if (!target) return;

    let tooltipDOM = null;

    target.addEventListener("mouseenter", function() {
        if (tooltipDOM) return;

        tooltipDOM = document.createElement("div");
        tooltipDOM.className = `tooltip-caja pos-${posicion}`;
        tooltipDOM.textContent = texto;
        document.body.appendChild(tooltipDOM);

        const rectTarget = target.getBoundingClientRect();
        const rectTooltip = tooltipDOM.getBoundingClientRect();

        let top = 0;
        const left = rectTarget.left + window.scrollX + (rectTarget.width / 2) - (rectTooltip.width / 2);
        const separacion = 8;

        if (posicion === "top") {
            top = rectTarget.top + window.scrollY - rectTooltip.height - separacion;
        } else {
            top = rectTarget.bottom + window.scrollY + separacion;
        }

        tooltipDOM.style.top = `${top}px`;
        tooltipDOM.style.left = `${left}px`;

        requestAnimationFrame(() => tooltipDOM.classList.add("visible"));
    });

    target.addEventListener("mouseleave", function() {
        if (tooltipDOM) {
            tooltipDOM.classList.remove("visible");
            const actualTooltip = tooltipDOM;
            tooltipDOM = null;
            setTimeout(() => {
                if (actualTooltip && actualTooltip.parentNode) {
                    actualTooltip.remove();
                }
            }, 200);
        }
    });
}