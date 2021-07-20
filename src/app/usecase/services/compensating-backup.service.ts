import { Injectable, Logger } from "@nestjs/common";
import { BaseCompensating } from "src/app/domain/commands/compensating";

interface BackupItem {
	eventId: string;
	compensating: BaseCompensating;
}

@Injectable()
export class CompensatingBackupService {
	logger: Logger = new Logger();
	private backupStore: BackupItem[];

	constructor() {
		this.backupStore = [];
	}

	storeCompensating(compensating: BaseCompensating, eventId: string): void {
		this.logger.log(`Store compensating with eventId: ${eventId}`);
		this.backupStore.push({ eventId: eventId, compensating: compensating });
	}

	findCompensating(eventId: string): BaseCompensating {
		const found = this.backupStore.find(item => item.eventId === eventId);
		this.logger.log(`Compensating found: ${found.compensating} for event ${found.eventId}`);
		return found.compensating;
	}

	removeCompensating(eventId: string): void {
		this.logger.log(`Remove compensating with eventId: ${eventId}`);
		const compensating = this.backupStore.find(item => item.eventId === eventId);
		this.backupStore.splice(this.backupStore.indexOf(compensating), 1);
	}
}
