class WelcomeController < ApplicationController
  def index
  end

  def stats
    @win_data = Game.stats
  end
end
