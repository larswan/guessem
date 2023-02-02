json.extract! card, :id, :image, :name, :cardSet, :created_at, :updated_at
json.url card_url(card, format: :json)
