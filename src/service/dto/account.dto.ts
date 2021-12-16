import { ApiProperty } from '@nestjs/swagger';
/**
 * An User DTO object.
 */
export class AccountDTO {

    @ApiProperty({ uniqueItems: true, example: 'myuser', description: 'id' })
    _id?: string;

    @ApiProperty({ uniqueItems: true, example: 'myuser', description: 'id' })
    id?: string;

    @ApiProperty({ uniqueItems: true, example: 'myuser', description: 'User login' })
    login: string;

    @ApiProperty({ example: 'MyUser', description: 'User first name', required: false })
    firstName?: string;

    @ApiProperty({ example: 'MyUser', description: 'User last name', required: false })
    lastName?: string;

    @ApiProperty({ example: 'my full name', description: 'User full name', required: false })
    fullName?: string;

    @ApiProperty({ example: 'myuser@localhost.it', description: 'User email' })
    email: string;

}
