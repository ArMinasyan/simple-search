import { Injectable } from '@nestjs/common';
import { IResponse } from '../../common/helpers/IResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { ProfileRepository } from './profile.repository';
import responseMessage from '../../common/helpers/response-message';

@Injectable()
export class ProfileService {
  constructor(
    @InjectRepository(ProfileRepository)
    private readonly profileRepository: ProfileRepository,
  ) {}

  async search(userInfo = {}): Promise<IResponse> {
    const profiles = await this.profileRepository.search(userInfo);
    return responseMessage({
      data: profiles,
    });
  }
}
