import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  MaxLength,
  Matches,
  IsOptional,
  IsIn,
} from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Họ tên phải là chuỗi' })
  @IsNotEmpty({ message: 'Họ tên không được để trống' })
  @MaxLength(50, { message: 'Họ tên tối đa 50 ký tự' })
  fullName: string;

  @IsEmail({}, { message: 'Email không hợp lệ' })
  @IsNotEmpty({ message: 'Email không được để trống' })
  @MaxLength(100, { message: 'Email tối đa 100 ký tự' })
  email: string;

  @IsString({ message: 'Mật khẩu phải là chuỗi' })
  @MinLength(6, { message: 'Mật khẩu tối thiểu 6 ký tự' })
  @MaxLength(32, { message: 'Mật khẩu tối đa 32 ký tự' })
  @IsNotEmpty({ message: 'Mật khẩu không được để trống' })
  password: string;

  @IsString({ message: 'Số điện thoại phải là chuỗi' })
  @Matches(/^(0|\+84)[0-9]{9}$/, {
    message: 'Số điện thoại không hợp lệ',
  })
  @IsNotEmpty({ message: 'Số điện thoại không được để trống' })
  phone: string;

  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ được là active hoặc inactive',
  })
  @IsNotEmpty({ message: 'Trạng thái không được để trống' })
  status: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString({ message: 'Họ tên phải là chuỗi' })
  @MaxLength(50, { message: 'Họ tên tối đa 50 ký tự' })
  fullName?: string;

  @IsOptional()
  @IsString({ message: 'Trạng thái phải là chuỗi' })
  @IsIn(['active', 'inactive'], {
    message: 'Trạng thái chỉ được là active hoặc inactive',
  })
  status?: string;
}
