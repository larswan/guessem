Rails.application.routes.draw do
  resources :turns
  resources :games
  resources :users
  resources :friendships
  resources :cards
  resources :card_sets
  get '/active_games/:id', to: 'games#active_games'
  post '/first_turns', to: 'turns#first_turns'
  post "/newGame", to: 'games#newGame'
  post '/login', to: 'users#login'
  post '/sendQuestion', to: 'games#sendQuestion'
  post '/answerQuestion', to: 'games#answerQuestion'


  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
