import { Logger } from '@nestjs/common';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

import { ProvisioningTransactionService } from '../provisioning/provisioning-transaction/provisioning-transaction.service';
import { ProvisioningJobService } from '../provisioning-job/provisioning-job.service';

@Processor('provisioning')
export class ProvisioningProcessor extends WorkerHost {
  private readonly logger = new Logger(
    ProvisioningProcessor.name,
  );

  constructor(
    private readonly provisioningTransaction: ProvisioningTransactionService,
    private readonly provisioningJobService: ProvisioningJobService,
  ) {
    super();
  }

  async process(job: Job<any>): Promise<any> {
    this.logger.log(
      `Processing job ${job.id} (${job.name})`,
    );

    const dbJob = await this.findProvisioningJob(job.id?.toString());

    try {
      if (dbJob) {
        await this.provisioningJobService.updateStatus(
          dbJob.id,
          'PROCESSING',
        );
      }

      let result: any;

      switch (job.name) {
        case 'activate':
          result =
            await this.provisioningTransaction.activate(
              job.data.connectionId,
            );
          break;

        case 'suspend':
          result =
            await this.provisioningTransaction.suspend(
              job.data.connectionId,
            );
          break;

        case 'resume':
          result =
            await this.provisioningTransaction.resume(
              job.data.connectionId,
            );
          break;

        case 'disconnect':
          result =
            await this.provisioningTransaction.disconnect(
              job.data.connectionId,
            );
          break;

        case 'change-package':
          result =
            await this.provisioningTransaction.changePackage(
              job.data.connectionId,
              job.data.subscriptionId,
            );
          break;

        default:
          throw new Error(
            `Unknown provisioning job: ${job.name}`,
          );
      }

      if (dbJob) {
        await this.provisioningJobService.updateStatus(
          dbJob.id,
          'COMPLETED',
          result,
        );
      }

      return result;
    } catch (error) {
      this.logger.error(
        error instanceof Error
          ? error.stack
          : String(error),
      );

      if (dbJob) {
        await this.provisioningJobService.updateStatus(
          dbJob.id,
          'FAILED',
          null,
          error instanceof Error
            ? error.message
            : String(error),
        );
      }

      throw error;
    }
  }

  private async findProvisioningJob(
    queueJobId?: string,
  ) {
    if (!queueJobId) {
      return null;
    }

    const jobs =
      await this.provisioningJobService.findAll();

    return (
      jobs.find(
        (j) => j.queueJobId === queueJobId,
      ) ?? null
    );
  }
}