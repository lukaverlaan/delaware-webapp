import {
  CanActivate,
  ExecutionContext,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class CheckUserAccessGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    if (!request.user) {
      throw new UnauthorizedException('Je moet ingelogd zijn');
    }

    const user = request.user;
    const paramId = request.params.id;

    if (paramId === 'me') {
      return true;
    }

    if (String(user.sub) === paramId) {
      return true;
    }

    if (user.rol === 'ADMINISTRATOR') {
      return true;
    }

    throw new NotFoundException('Gebruiker niet gevonden');
  }
}
