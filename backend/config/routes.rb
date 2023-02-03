Rails.application.routes.draw do
  resources :turns
  resources :games
  resources :users
  resources :friendships
  resources :cards
  resources :card_sets
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
