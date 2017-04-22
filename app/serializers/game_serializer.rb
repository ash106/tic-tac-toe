class GameSerializer < ActiveModel::Serializer
  attributes :id, :winner, :history
end
