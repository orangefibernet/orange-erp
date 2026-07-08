import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { TenantContextService } from '../tenant/tenant-context.service';

@Injectable()
export class TenantInterceptor implements NestInterceptor {
  constructor(
    private readonly tenant: TenantContextService,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> {
    const request = context.switchToHttp().getRequest();

    if (request.user) {
      this.tenant.setUser(request.user);
    }

    return next.handle();
  }
}
