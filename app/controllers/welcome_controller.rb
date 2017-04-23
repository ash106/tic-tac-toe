class WelcomeController < ApplicationController
  def index
  end

  def stats
    @win_data = [Game.where(winner: "X").count, Game.where(winner: "O").count]
  end
end
