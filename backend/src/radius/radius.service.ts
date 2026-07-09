import { Injectable } from '@nestjs/common';

import { PrismaService } from '../database/prisma.service';

@Injectable()
export class RadiusService {
  constructor(private readonly prisma: PrismaService) {}

  // ============================
  // User Management (radcheck)
  // ============================

  async createUser(
    username: string,
    password: string,
  ) {
    return this.prisma.radiusCheck.create({
      data: {
        username,
        attribute: 'Cleartext-Password',
        op: ':=',
        value: password,
      },
    });
  }

  async changePassword(
    username: string,
    password: string,
  ) {
    return this.prisma.radiusCheck.updateMany({
      where: {
        username,
        attribute: 'Cleartext-Password',
      },
      data: {
        value: password,
      },
    });
  }

  async deleteUser(username: string) {
    await this.removeGroups(username);

    return this.prisma.radiusCheck.deleteMany({
      where: {
        username,
      },
    });
  }

  async findUser(username: string) {
    return this.prisma.radiusCheck.findMany({
      where: {
        username,
      },
    });
  }

  async listUsers() {
    return this.prisma.radiusCheck.findMany({
      orderBy: {
        username: 'asc',
      },
    });
  }

  // ============================
  // User Groups (radusergroup)
  // ============================

  async assignGroup(
    username: string,
    groupname: string,
    priority = 1,
  ) {
    return this.prisma.radiusUserGroup.create({
      data: {
        username,
        groupname,
        priority,
      },
    });
  }

  async removeGroups(username: string) {
    return this.prisma.radiusUserGroup.deleteMany({
      where: {
        username,
      },
    });
  }

  async changeGroup(
    username: string,
    groupname: string,
    priority = 1,
  ) {
    await this.removeGroups(username);

    return this.assignGroup(
      username,
      groupname,
      priority,
    );
  }

  async listGroups(username: string) {
    return this.prisma.radiusUserGroup.findMany({
      where: {
        username,
      },
    });
  }

  // ============================
  // Group Replies (radgroupreply)
  // ============================

  async createGroupReply(
    groupname: string,
    attribute: string,
    value: string,
    op = ':=',
  ) {
    return this.prisma.radiusGroupReply.create({
      data: {
        groupname,
        attribute,
        op,
        value,
      },
    });
  }

  async listGroupReplies(groupname: string) {
    return this.prisma.radiusGroupReply.findMany({
      where: {
        groupname,
      },
      orderBy: {
        id: 'asc',
      },
    });
  }

  async deleteGroup(groupname: string) {
    await this.prisma.radiusGroupReply.deleteMany({
      where: {
        groupname,
      },
    });

    return this.prisma.radiusUserGroup.deleteMany({
      where: {
        groupname,
      },
    });
  }

  async replaceGroupReplies(
    groupname: string,
    replies: {
      attribute: string;
      value: string;
      op?: string;
    }[],
  ) {
    await this.prisma.radiusGroupReply.deleteMany({
      where: {
        groupname,
      },
    });

    return this.prisma.radiusGroupReply.createMany({
      data: replies.map((reply) => ({
        groupname,
        attribute: reply.attribute,
        value: reply.value,
        op: reply.op ?? ':=',
      })),
    });
  }

  // ============================
  // Provisioning Helpers
  // ============================

  async userExists(
    username: string,
  ): Promise<boolean> {
    const count =
      await this.prisma.radiusCheck.count({
        where: {
          username,
          attribute: 'Cleartext-Password',
        },
      });

    return count > 0;
  }

  async createOrUpdateUser(
    username: string,
    password: string,
  ) {
    const exists = await this.userExists(
      username,
    );

    if (exists) {
      await this.changePassword(
        username,
        password,
      );
    } else {
      await this.createUser(
        username,
        password,
      );
    }

    return this.findUser(username);
  }

  async provisionUser(
    username: string,
    password: string,
    groupname: string,
  ) {
    await this.createOrUpdateUser(
      username,
      password,
    );

    await this.changeGroup(
      username,
      groupname,
    );

    return {
      success: true,
      username,
      groupname,
    };
  }

  async deprovisionUser(
    username: string,
  ) {
    await this.deleteUser(username);

    return {
      success: true,
      username,
    };
  }
  async suspendUser(username: string) {
  await this.removeGroups(username);

  return {
    success: true,
    username,
  };
}
}