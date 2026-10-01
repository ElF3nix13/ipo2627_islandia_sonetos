"use strict";

class SonetoController {
    constructor(model, view) {
        this.model = model;
        this.view = view;
    }

    async init(rutasSonetos) {
        try {
            await this.model.cargarSonetos(rutasSonetos);

            const sonetos = this.model.obtenerTodos();
            const activo = this.model.obtenerActivo();

            this.view.renderizarSelector(sonetos, activo?.id);
            this.view.renderizarSoneto(activo);

            // Conecta el cambio del selector con el manejador del controlador
            this.view.bindCambioSoneto(id => this.handleCambioSoneto(id));
        } catch (error) {
            console.error('Error durante la inicialización:', error);
        }
    }

    handleCambioSoneto(id) {
        const soneto = this.model.seleccionarPorId(id);
        this.view.renderizarSoneto(soneto);
    }
}

export { SonetoController };