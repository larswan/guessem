json.extract! user, :id, :email, :name, :googleImageUrl, :token, :created_at, :updated_at
json.url user_url(user, format: :json)
