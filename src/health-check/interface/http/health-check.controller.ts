import { Controller, Get, HttpStatus, Request, Response } from '@nestjs/common';

@Controller('health-check')
export class HealthCheckController {

    @Get()
    index(@Request() request: Request, @Response() response) {
        response.status(HttpStatus.OK).json({ message: 'API is healthy.'});
    }
}
