import { Injectable } from '@nestjs/common'
import { Podcast } from './entities/podcast.entity'
import {
  CreatePodcastInput,
  UpdatePodcastInput,
  PodcastOutput,
  PodcastsOutput,
} from './dtos/podcast.dto'
import { CoreOutput } from '../common/dtos/output.dto'
import {
  CreateEpisodeInput,
  EpisodeOutput,
  EpisodesOutput,
  UpdateEpisodeInput,
} from './dtos/episode.dto'

@Injectable()
export class PodcastsService {
  private podcasts: Podcast[] = []
  private lastPodcastIndex = -1
  private lastEpisodeIndex = -1

  createPodcast(input: CreatePodcastInput) {
    this.lastPodcastIndex++
    const podcast = {
      id: this.lastPodcastIndex,
      episodes: [],
      ...input,
    }
    this.podcasts.push(podcast)
    return PodcastOutput.succeed(podcast)
  }

  indexPodcasts() {
    return PodcastsOutput.succeed(this.podcasts)
  }

  getPodcast(id: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === id)
    if (!podcast) return PodcastOutput.notFound()
    return PodcastOutput.succeed(
      this.podcasts.find((podcast) => podcast.id === id)
    )
  }

  updatePodcast(id: number, input: UpdatePodcastInput) {
    const podcast = this.podcasts.find((podcast) => podcast.id === id)
    if (!podcast) return PodcastOutput.notFound()
    if (input.title) podcast.title = input.title
    if (input.category) podcast.category = input.category
    if (input.rating) podcast.rating = input.rating
    return PodcastOutput.succeed(podcast)
  }

  deletePodcast(id: number) {
    const index = this.podcasts.findIndex((podcast) => podcast.id === id)
    if (index < 0) return PodcastOutput.notFound()
    this.podcasts.splice(index, 1)
    return CoreOutput.succeed()
  }

  createEpisode(podcastId: number, input: CreateEpisodeInput) {
    const podcast = this.podcasts.find((podcast) => podcast.id === podcastId)
    if (!podcast) return PodcastOutput.notFound()
    this.lastEpisodeIndex++
    const episode = {
      id: this.lastEpisodeIndex,
      ...input,
    }
    podcast.episodes.push(episode)
    return EpisodeOutput.succeed(episode)
  }

  indexEpisodes(podcastId: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === podcastId)
    if (!podcast) return PodcastOutput.notFound()
    return EpisodesOutput.succeed(podcast.episodes)
  }

  updateEpisode(
    podcastId: number,
    episodeId: number,
    input: UpdateEpisodeInput
  ) {
    const podcast = this.podcasts.find((podcast) => podcast.id === podcastId)
    if (!podcast) return PodcastOutput.notFound()
    const episode = podcast.episodes.find((episode) => episode.id === episodeId)
    if (!episode) return EpisodeOutput.notFound()
    if (input.no) episode.no = input.no
    return EpisodeOutput.succeed(episode)
  }

  deleteEpisode(podcastId: number, episodeId: number) {
    const podcast = this.podcasts.find((podcast) => podcast.id === podcastId)
    if (!podcast) return PodcastOutput.notFound()
    const index = podcast.episodes.findIndex(
      (episode) => episode.id === episodeId
    )
    if (index < 0) return EpisodeOutput.notFound()
    podcast.episodes.splice(index, 1)
    return CoreOutput.succeed()
  }
}
