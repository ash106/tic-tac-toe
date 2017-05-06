class Game < ApplicationRecord
  def self.stats
    [Game.where(winner: "X").count, Game.where(winner: "O").count]
  end
end
