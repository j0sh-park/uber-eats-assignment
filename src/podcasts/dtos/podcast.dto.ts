import { CoreOutput } from '../../common/dtos/output.dto'
import { Podcast } from '../entities/podcast.entity'

export class CreatePodcastInput {
  title: string
  category: string
  rating: number
}

export class UpdatePodcastInput {
  title?: string
  category?: string
  rating?: number
}

export class PodcastsOutput extends CoreOutput {
  static succeed(podcasts?: Podcast[]): PodcastsOutput {
    if (!podcasts) throw Error('podcasts is undefined')
    const output = new this()
    output.ok = true
    output.podcasts = podcasts
    return output
  }

  podcasts?: Podcast[]
}

export class PodcastOutput extends CoreOutput {
  static succeed(podcast?: Podcast): PodcastOutput {
    if (!podcast) throw Error('podcast is undefined')
    const output = new this()
    output.ok = true
    output.podcast = podcast
    return output
  }

  static notFound(): PodcastOutput {
    return this.error('podcast not found')
  }

  podcast?: Podcast
}
