"use strict";

class SonetoModel {
    constructor() {
        this.sonetos = [];
        this.sonetoActivo = null;
    }

    parseMarkdown(contenido, id) {
        const lineas = contenido
            .split('\n')
            .map(linea => linea.trim())
            .filter(linea => linea.length > 0);

        let titulo = '';
        let autor = '';
        const versos = [];

        const patronTitulo = /^t[ií]tulo:\s*"?/i;
        const patronAutor = /^autor:\s*"?/i;
        const patronSoneto = /^soneto:?\s*$/i;

        for (const linea of lineas) {
            if (patronTitulo.test(linea)) {
                titulo = linea.replace(patronTitulo, '').replace(/"?$/, '').trim();
            } else if (patronAutor.test(linea)) {
                autor = linea.replace(patronAutor, '').replace(/"?$/, '').trim();
            } else if (patronSoneto.test(linea)) {
                continue;
            } else {
                versos.push(linea);
            }
        }

        const estructuraSoneto = [4, 4, 3, 3];

        let inicio = 0;
        const estrofas = estructuraSoneto.map(tamaño => {
            const estrofa = versos.slice(inicio, inicio + tamaño);
            inicio += tamaño;
            return estrofa;
        });

        return { id: String(id), titulo, autor, estrofas };
    }

    async cargarSonetos(rutas) {
        const resultados = await Promise.all(
            rutas.map(async (ruta, index) => {
                try {
                    const respuesta = await fetch(ruta);
                    if (!respuesta.ok) {
                        return null;
                    } 
                    const texto = await respuesta.text();
                    return this.parseMarkdown(texto, index);
                } catch {
                    return null;
                }
            })
        );

        // Descartar archivos fallidos
        this.sonetos = resultados.filter(soneto => soneto !== null);

        if (this.sonetos.length > 0) {
            this.sonetoActivo = this.sonetos[0];
        }
    }

    obtenerTodos() {
        return this.sonetos;
    }

    obtenerActivo() {
        return this.sonetoActivo;
    }

    seleccionarPorId(id) {
        this.sonetoActivo = this.sonetos.find(s => s.id === String(id)) || null;
        return this.sonetoActivo;
    }
}

export { SonetoModel };