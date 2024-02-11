type Message = { pollOptionId: string, votes: number }
type Subscriber = (message: Message) => void

class VotingPubSub {
  private channels: Record<string, Subscriber[]> = {}

  subscribe(pollId: string, Subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = []
    }

    this.channels[pollId].push(Subscriber)
  }

  publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    for (const subscriber of this.channels[pollId]) {
      subscriber(message);
    }
  }
}

export const voting = new VotingPubSub()