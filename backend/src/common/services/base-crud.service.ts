import { NotFoundException } from '@nestjs/common';

export abstract class BaseCrudService {
  protected throwIfNotFound<T>(entity: T | null, message: string): T {
    if (!entity) {
      throw new NotFoundException(message);
    }

    return entity;
  }
}