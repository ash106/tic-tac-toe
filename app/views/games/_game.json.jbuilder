json.extract! game, :id, :history, :winner, :created_at, :updated_at
json.url game_url(game, format: :json)
