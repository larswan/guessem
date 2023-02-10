# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2023_02_03_214142) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "card_sets", force: :cascade do |t|
    t.string "topicName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "cards", force: :cascade do |t|
    t.string "image"
    t.string "name"
    t.integer "cardSetId"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "friendships", force: :cascade do |t|
    t.integer "p1Id"
    t.integer "p2Id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "games", force: :cascade do |t|
    t.jsonb "cards", default: {}
    t.integer "p1"
    t.integer "p2"
    t.string "winningQuestion", default: ""
    t.string "winningAnswer", default: ""
    t.integer "winningCard"
    t.integer "winningUser"
    t.integer "p1SecretCard"
    t.integer "p2SecretCard"
    t.string "topic"
    t.integer "whosTurn"
    t.boolean "inProgress", default: true
    t.integer "currentTurn", default: 0
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "turns", force: :cascade do |t|
    t.string "status", default: "new"
    t.integer "gameId"
    t.integer "turn", default: 1
    t.integer "playerId"
    t.string "question"
    t.string "answer"
    t.integer "guessedCard"
    t.jsonb "flippedCards"
    t.boolean "winning", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "email"
    t.string "name"
    t.string "googleImageUrl"
    t.string "token"
    t.string "googleId"
    t.string "givenName"
    t.string "familyName"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

end
