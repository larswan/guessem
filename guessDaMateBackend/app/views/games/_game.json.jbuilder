json.extract! game, :id, :p2, :p1, :p1SecretCard, :p2SecretCard, :p1Cards, :p2Cards, :iinProgress, :whosTurn, :created_at, :updated_at
json.url game_url(game, format: :json)
