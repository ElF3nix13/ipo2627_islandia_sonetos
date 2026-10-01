"use strict";

import { SonetoModel } from './models/SonetoModel.js';
import { SonetoView } from './views/SonetoView.js';
import { SonetoController } from './controllers/SonetoController.js';

document.addEventListener('DOMContentLoaded', () => {
    const rutasSonetos = [
        'data/sonetos/eraseUnHombre.md',
        'data/sonetos/escritoEstaEnMiAlma.md',
        'data/sonetos/mientrasPorCompetir.md',
        'data/sonetos/mireLosMuros.md',
        'data/sonetos/unSonetoMeManda.md'
    ];

    const model = new SonetoModel();
    const view = new SonetoView();
    const controller = new SonetoController(model, view);

    controller.init(rutasSonetos);
});