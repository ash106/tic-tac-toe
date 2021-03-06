Rails.application.routes.draw do
  root 'welcome#index'

  # Serve websocket cable requests in-process
  mount ActionCable.server => '/cable'
  
  resources :games
  get 'hello_world', to: 'hello_world#index'
  get 'stats', to: 'welcome#stats', as: :stats

  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
end
