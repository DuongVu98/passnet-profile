import { Controller, Get, Param, Query } from "@nestjs/common";
import { ViewProjector } from "src/app/usecase/projector/view.projector";

@Controller("api/query")
export class QueryController {
	constructor(private viewProjector: ViewProjector) {}

	@Get("profiles/:id")
	getProfile(@Param("id") id: string): Promise<any> {
		return this.viewProjector.getProfile(id);
	}

	@Get("profile")
	getProfileByUserId(@Query("uid") uid: string): Promise<any> {
		return this.viewProjector.getProfileByUid(uid);
	}
}
