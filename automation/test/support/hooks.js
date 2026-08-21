import { After, Before } from '@cucumber/cucumber';
import { modal } from '../components/modal.component.js';
import { resetApplication } from '../utils/app.utils.js';

Before(async function () {
    await resetApplication();
});

After(async function () {
    await modal.closeIfOpen();
});
