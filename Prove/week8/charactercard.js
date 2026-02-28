
document.addEventListener('DOMContentLoaded', () => {
	const nameEl = document.querySelector('.name');
	const healthEl = document.getElementById('health');
	const levelEl = document.getElementById('level');
	const damageBtn = document.getElementById('damage-btn');
	const levelUpBtn = document.getElementById('level-up-btn');

	function parseNumber(el, fallback = 0) {
		if (!el) return fallback;
		const n = parseInt(el.textContent, 10);
		return Number.isNaN(n) ? fallback : n;
	}

	class Character {
		constructor(name, classValue, health = 0, level = 1, els = {}) {
			const _name = name;
			const _class = classValue;

			Object.defineProperty(this, 'name', {
				get() { return _name; },
				enumerable: true
			});

			Object.defineProperty(this, 'class', {
				get() { return _class; },
				enumerable: true
			});

			this.health = health;
			this.level = level;
			this.nameEl = els.nameEl || null;
			this.classEl = els.classEl || null;
			this.healthEl = els.healthEl || null;
			this.levelEl = els.levelEl || null;
			this.syncToDOM();
		}

		increaseHealth(amount = 1) {
			this.health += amount;
			this.syncToDOM();
		}

		levelUp(amount = 1) {
			this.level += amount;
			this.syncToDOM();
		}

		syncToDOM() {
			if (this.nameEl) this.nameEl.textContent = this.name;
			if (this.classEl) this.classEl.textContent = `Class: ${this['class']}`;
			if (this.healthEl) this.healthEl.textContent = this.health;
			if (this.levelEl) this.levelEl.textContent = this.level;
		}
	}

	const initName = nameEl ? nameEl.textContent.trim() : 'Unnamed';
	const initHealth = parseNumber(healthEl, 0);
	const initLevel = parseNumber(levelEl, 1);

	// find the class paragraph (first <p> inside .stats) and extract its text
	const classPara = document.querySelector('.stats p');
	let initClass = '';
	if (classPara) {
		// remove leading "Class:" label if present
		const txt = classPara.textContent.trim();
		initClass = txt.replace(/^Class:\s*/i, '') || txt;
	}

	const player = new Character(initName, initClass, initHealth, initLevel, { nameEl, classEl: classPara, healthEl, levelEl });

	if (damageBtn) {
		damageBtn.addEventListener('click', () => player.increaseHealth(1));
	}

	if (levelUpBtn) {
		levelUpBtn.addEventListener('click', () => player.levelUp(1));
	}
});

