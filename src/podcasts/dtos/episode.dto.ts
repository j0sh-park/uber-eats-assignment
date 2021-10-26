import { CoreOutput } from '../../common/dtos/output.dto'
import { Episode } from '../entities/episode.entity'

export class CreateEpisodeInput {
  no: number
}

export class UpdateEpisodeInput {
  no?: number
}

export class EpisodesOutput extends CoreOutput {
  static succeed(episodes?: Episode[]): EpisodesOutput {
    if (!episodes) throw Error('episodes is undefined')
    const output = new this()
    output.ok = true
    output.episodes = episodes
    return output
  }

  episodes?: Episode[]
}

export class EpisodeOutput extends CoreOutput {
  static succeed(episode?: Episode): EpisodeOutput {
    if (!episode) throw Error('episode is undefined')
    const output = new this()
    output.ok = true
    output.episode = episode
    return output
  }

  static notFound(): EpisodeOutput {
    return this.error('episode not found')
  }

  episode?: Episode
}
