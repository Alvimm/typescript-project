import { NegotiationController } from './controllers/negotiationController.js';
const controller = new NegotiationController();
const form = document.querySelector('.form');
if (!form)
    throw new Error(`Couldn't initialize the application`);
form.addEventListener('submit', (e) => {
    e.preventDefault();
    controller.add();
});
const importButton = document.querySelector('#import-button');
if (!importButton)
    throw new Error(`Import button don't found`);
importButton.addEventListener('click', () => controller.importData());
//# sourceMappingURL=app.js.map