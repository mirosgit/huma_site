import { elementNamed, waitUntilInteractable } from '../utils/ui.utils.js';

const LINK_NAMES = Object.freeze({
    profile: 'Profile link',
});

const linkNameFor = (target) => {
    const name = LINK_NAMES[target];
    if (!name) {
        throw new Error('Unknown navbar target "' + target + '". Known: ' + Object.keys(LINK_NAMES).join(', '));
    }
    return name;
};

class NavbarComponent {
    get root() {
        return elementNamed('navigation bar');
    }

    get greeting() {
        return elementNamed('greeting');
    }

    get logoutButton() {
        return elementNamed('Log Out button');
    }

    link(target) {
        return elementNamed(linkNameFor(target));
    }

    async goTo(target) {
        const name = linkNameFor(target);
        await (await waitUntilInteractable(this.link(target), name)).click();
    }

    async logout() {
        await (await waitUntilInteractable(this.logoutButton, 'Log Out button')).click();
    }
}

export const navbar = new NavbarComponent();
