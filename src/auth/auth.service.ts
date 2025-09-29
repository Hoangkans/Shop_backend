import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Auth } from 'src/shared/database/mongo/schemas/auth.schema';
import { AuthDto, LoginDto } from 'src/shared/database/mongo/dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

export interface TokenResponse {
  access_token: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private authModel: Model<Auth>,
    private jwtService: JwtService,
  ) {}

  async register(authDto: AuthDto): Promise<TokenResponse> {
    const { email } = authDto;
    const existingUser = await this.authModel.findOne({ email });
    if (existingUser) {
      throw new ConflictException('Email already exists');
    }

    const { password, ...rest } = authDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.authModel.create({
      ...rest,
      password: hashedPassword,
    });
    return this.generateToken(user);
  }

  async login(loginDto: LoginDto): Promise<TokenResponse> {
    const { email, password } = loginDto;
    const user = await this.authModel.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.generateToken(user);
  }

  private generateToken(user: Auth): TokenResponse {
    const payload = { 
      email: user.email, 
      sub: user._id?.toString() || user.id 
    };
    return { access_token: this.jwtService.sign(payload) };
  }
}
