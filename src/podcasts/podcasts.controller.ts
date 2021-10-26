import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { PodcastsService } from './podcasts.service'
import { CreatePodcastInput, UpdatePodcastInput } from './dtos/podcast.dto'
import { CreateEpisodeInput, UpdateEpisodeInput } from './dtos/episode.dto'

@Controller('podcasts')
export class PodcastsController {
  constructor(private readonly podcastsService: PodcastsService) {}

  @Get()
  indexPodcasts() {
    return this.podcastsService.indexPodcasts()
  }

  @Post()
  createPodcast(@Body() input: CreatePodcastInput) {
    return this.podcastsService.createPodcast(input)
  }

  @Get('/:id')
  getPodcasts(@Param('id') id: string) {
    return this.podcastsService.getPodcast(Number(id))
  }

  @Patch('/:id')
  updatePodcasts(@Param('id') id: string, @Body() input: UpdatePodcastInput) {
    return this.podcastsService.updatePodcast(Number(id), input)
  }

  @Delete('/:id')
  deletePodcasts(@Param('id') id: string) {
    return this.podcastsService.deletePodcast(Number(id))
  }

  @Get('/:id/episodes')
  getEpisodes(@Param('id') podcastId: string) {
    return this.podcastsService.indexEpisodes(Number(podcastId))
  }

  @Post('/:id/episodes')
  createEpisode(
    @Param('id') podcastId: string,
    @Body() input: CreateEpisodeInput
  ) {
    return this.podcastsService.createEpisode(Number(podcastId), input)
  }

  @Patch('/:id/episodes/:episodeId')
  updateEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string,
    @Body() input: UpdateEpisodeInput
  ) {
    return this.podcastsService.updateEpisode(
      Number(podcastId),
      Number(episodeId),
      input
    )
  }

  @Delete('/:id/episodes/:episodeId')
  deleteEpisode(
    @Param('id') podcastId: string,
    @Param('episodeId') episodeId: string
  ) {
    return this.podcastsService.deleteEpisode(
      Number(podcastId),
      Number(episodeId)
    )
  }
}
