import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';

export class AuthDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @MaxLength(100, { message: 'Email tối đa 100 ký tự' })
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu tối đa 32 ký tự' })
  @Matches(/(?=.*[a-z])/, { message: 'Mật khẩu phải có ít nhất 1 chữ thường' })
  @Matches(/(?=.*[A-Z])/, { message: 'Mật khẩu phải có ít nhất 1 chữ hoa' })
  @Matches(/(?=.*\d)/, { message: 'Mật khẩu phải có ít nhất 1 số' })
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  password: string;
}

export class LoginDto {
  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được bỏ trống' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu tối đa 32 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được bỏ trống' })
  password: string;
}
