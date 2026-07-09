import { Injectable } from '@nestjs/common';
import { Package } from '@prisma/client';

import { RadiusService } from '../../radius/radius.service';

@Injectable()
export class PackageProvisioningService {
  constructor(
    private readonly radiusService: RadiusService,
  ) {}

  async sync(pkg: Package) {
    if (!pkg.radiusGroup) {
      return;
    }

    await this.radiusService.replaceGroupReplies(
      pkg.radiusGroup,
      [
        {
          attribute: 'Mikrotik-Rate-Limit',
          value: `${pkg.downloadMbps}M/${pkg.uploadMbps}M`,
        },
        {
          attribute: 'Simultaneous-Use',
          value: String(pkg.simultaneousUse),
        },
        {
          attribute: 'Session-Timeout',
          value: String(
            pkg.sessionTimeout ??
              pkg.validityDays * 24 * 60 * 60,
          ),
        },
      ],
    );
  }

  async remove(pkg: Package) {
    if (!pkg.radiusGroup) {
      return;
    }

    await this.radiusService.deleteGroup(
      pkg.radiusGroup,
    );
  }
}