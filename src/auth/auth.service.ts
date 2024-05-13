import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import axios from 'axios';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(
      (user) => user.username === username,
    );
    if (user && user.password === pass) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password: _, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateAuth0User({ username, id }: { username: string; id: string }) {
    let user = await this.usersService.findOne(
      (user) => user.provider === 'auth0' && user.provider_id === id,
    );
    if (!user) {
      user = await this.usersService.add({
        password: '',
        provider: 'auth0',
        username: username,
        provider_id: id,
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _, ...result } = user;
    return result;
  }

  async getRoleId(roleName: string): Promise<string | null> {
    const token = process.env.MANAGEMENT_API_TOKEN;
    const apiUrl = `https://dev-3epkelv4qmg8xy65.us.auth0.com/api/v2/roles`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const role = response.data.find((r: any) => r.name === roleName);
      return role ? role.id : null;
    } catch (error) {
      throw new Error('Failed to retrieve role ID');
    }
  }

  async getPermissionsForRole(roleId: string): Promise<string[] | null> {
    const token = process.env.MANAGEMENT_API_TOKEN;
    const apiUrl = `https://dev-3epkelv4qmg8xy65.us.auth0.com/api/v2/roles/${roleId}/permissions`;
    try {
      const response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      const permissions = response.data.map(
        (permission: any) => permission.permission_name,
      );
      return permissions;
    } catch (error) {
      throw new Error('Failed to retrieve permissions for the role');
    }
  }

  async assignRoleToUser(userId: string, roleId: string): Promise<void> {
    const token = process.env.MANAGEMENT_API_TOKEN;
    const apiUrl = `https://dev-3epkelv4qmg8xy65.us.auth0.com/api/v2/users/${userId}/roles`;
    try {
      const response = await axios.post(
        apiUrl,
        { roles: [roleId] },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
      console.log(response);
    } catch (error) {
      throw new Error('Failed to assign role to user');
    }
  }

  async assignPermissionsToRole(
    roleId: string,
    permissions: string[],
  ): Promise<void> {
    const token = 'process.env.MANAGEMENT_API_TOKEN';
    const apiUrl = `https://dev-3epkelv4qmg8xy65.us.auth0.com/api/v2/roles/${roleId}`;

    try {
      await axios.patch(
        apiUrl,
        { permissions },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      throw new Error('Failed to assign permissions to role');
    }
  }

  async updateUserMetadata(userId: string, metadata: object): Promise<void> {
    const token = process.env.MANAGEMENT_API_TOKEN;
    const apiUrl = `https://dev-3epkelv4qmg8xy65.us.auth0.com/api/v2/users/${userId}`;

    try {
      await axios.patch(
        apiUrl,
        { user_metadata: metadata },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );
    } catch (error) {
      throw new Error('Failed to update user metadata');
    }
  }
}

///reference --  https://auth0.com/docs/api/management/v2/users/post-user-roles
