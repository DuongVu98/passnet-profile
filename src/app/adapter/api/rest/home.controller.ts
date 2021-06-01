import { Controller, Get } from "@nestjs/common";

@Controller("")
export class HomeController {

    @Get("")
    home(): string {
        return "Welcome to Passnet Profile service";
    }
}