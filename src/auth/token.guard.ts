import { CanActivate, ExecutionContext, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { GqlExecutionContext } from '@nestjs/graphql';
import { error, log } from 'console';

export const AUTHORIZATION_HEADER_KEY = 'authorization';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(private readonly authServise: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const bearerIdToken = request.headers[AUTHORIZATION_HEADER_KEY] as string | undefined
    if (bearerIdToken==undefined) throw new UnauthorizedException("Invalid Access:" + "401");
    const idToken = bearerIdToken.split(' ')[1];
    try {
      request['idTokenUser'] = await this.authServise.validateIdToken(idToken);
      // log("token guard successed");
      return true;
    } catch (error) {
      log("token guard profivted")
      throw new UnauthorizedException("Invalid Access:" + error.status);
    }
  }
}

@Injectable()
export class TokenSecretGuard implements CanActivate {
  constructor(private readonly authServise: AuthService) {}

  async canActivate(
    context: ExecutionContext,
  ): Promise<boolean>  {
    const ctx = GqlExecutionContext.create(context)
    const request = ctx.getContext().req
    const bearerIdToken = request.headers[AUTHORIZATION_HEADER_KEY] as string | undefined
    const idToken = bearerIdToken?.split(' ')[1];
    if (bearerIdToken==undefined || idToken==undefined) {
      request['idTokenUser'] = null
      // log("token guard escaped. no token");
      return true
      // throw new UnauthorizedException("Invalid Access:" + "401")
    }
    try {
      request['idTokenUser'] = await this.authServise.validateIdToken(idToken);
      // log("token guard successed");
      return true;
    } catch (error) {
      log("token guard profivted")
      throw new UnauthorizedException("Invalid Access:" + error.status);
    }
  }
}
