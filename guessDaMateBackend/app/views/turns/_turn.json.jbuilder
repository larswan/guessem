json.extract! turn, :id, :roundNum, :question, :answer, :winning, :flippedCards, :created_at, :updated_at
json.url turn_url(turn, format: :json)
