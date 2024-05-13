import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  // Auth0 callback route
  @Get('auth0/callback')
  @UseGuards(AuthGuard('auth0'))
  async callback(@Request() req) {
    const user1 = req.user;
    const roleName = 'user';
    const roleId = await this.authService.getRoleId(roleName);
    if (roleId) {
      const roles = await this.authService.assignRoleToUser(
        user1.provider_id,
        roleId,
      );
      const permissions = await this.authService.getPermissionsForRole(roleId);
      await this.authService.updateUserMetadata(user1.provider_id, {
        roles,
        permissions,
      });
    } else {
      console.error('Role ID not found for role: ' + roleName);
    }
    return this.authService.login(user1);
  }

  @Get('auth0/login')
  @UseGuards(AuthGuard('auth0'))
  async auth0Login() {
    // AuthGuard handles the authentication flow
  }
}
