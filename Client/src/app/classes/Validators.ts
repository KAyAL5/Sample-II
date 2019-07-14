import { Validators } from '@angular/forms';

export class MessageValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.required
				],
			),
		];
	}
}

export class PasswordValidator {
	constructor() {
		return [
			'',
			Validators.compose(
				[
					Validators.pattern(/[0-9]+/),
					Validators.pattern(/[a-z]+/),
					Validators.minLength(5),
					Validators.required
				],
			)
		];
	}
}