import { Controller, Get, Param, Query } from "@nestjs/common";
import { ExperienceView, ProfileView } from "src/app/domain/view/views";
import { ViewProjector } from "src/app/usecase/projector/view.projector";

@Controller("api/query")
export class QueryController {
	constructor(private viewProjector: ViewProjector) {}

	@Get("profiles/:id")
	getProfile(@Param("id") id: string): Promise<ProfileView> {
		return this.viewProjector.getProfile(id);
	}

	@Get("profile")
	getProfileByUserId(@Query("uid") uid: string): Promise<ProfileView> {
		return this.viewProjector.getProfileByUid(uid);
	}

	@Get("experiences")
	getExperiences(@Query("profileId") profileId: string): Promise<ExperienceView[]> {
		return this.viewProjector.getExperienceByProfile(profileId);
	}
}
