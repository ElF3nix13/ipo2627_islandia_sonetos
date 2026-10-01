"use strict";

class SonetoView {
    constructor() {
        this.select = document.querySelector('.selector__select');
        this.titulo = document.querySelector('.soneto__titulo');
        this.autor = document.querySelector('.soneto__autor');
        this.contenido = document.querySelector('.soneto__contenido');
    }

    renderizarSelector(sonetos, idSeleccionado) {
        this.select.innerHTML = sonetos
            .map(s => `<option value="${s.id}" ${s.id === idSeleccionado ? 'selected' : ''}>${s.titulo} - ${s.autor}</option>`)
            .join('');
    }

    renderizarSoneto(soneto) {
        if (!soneto) {
            this.titulo.textContent = '';
            this.autor.textContent = '';
            this.contenido.textContent = '';
            return;
        }

        this.titulo.textContent = soneto.titulo;
        this.autor.textContent = soneto.autor;

        this.contenido.innerHTML = soneto.estrofas
            .map((estrofa, index) => {
                const tipoClase = estrofa.length === 4
                    ? 'soneto__estrofa--cuarteto'
                    : 'soneto__estrofa--terceto';
                const versosHtml = estrofa
                    .map(verso => `<p class="soneto__verso">${verso}</p>`)
                    .join('');

                return `<div class="soneto__estrofa ${tipoClase}">${versosHtml}</div>`;
            })
            .join('');
    }

    bindCambioSoneto(manejarCambio) {
        this.select.addEventListener('change', (evento) => {
            manejarCambio(evento.target.value);
        });
    }
}

export { SonetoView };