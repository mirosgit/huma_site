const DIALOG_TIMEOUT_MS = 5_000;

class ModalComponent {
    async waitUntilOpen() {
        await browser.waitUntil(async () => browser.isAlertOpen(), {
            timeout: DIALOG_TIMEOUT_MS,
            timeoutMsg: 'Expected a confirmation dialog, but none appeared',
        });
    }

    async message() {
        await this.waitUntilOpen();
        return browser.getAlertText();
    }

    async confirm() {
        await this.waitUntilOpen();
        await browser.acceptAlert();
    }

    async dismiss() {
        await this.waitUntilOpen();
        await browser.dismissAlert();
    }

    async closeIfOpen() {
        try {
            if (await browser.isAlertOpen()) {
                await browser.dismissAlert();
            }
        } catch (error) {
            process.stderr.write('Failed to dismiss a dialog during cleanup: ' + String(error) + '\n');
        }
    }
}

export const modal = new ModalComponent();
