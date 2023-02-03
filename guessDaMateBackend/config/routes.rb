Rails.application.routes.draw do
  resources :turns
  resources :cards
  resources :card_sets
  resources :games
  # post '/games/:data', to: 'games#create'

  resources :friendships
  resources :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
