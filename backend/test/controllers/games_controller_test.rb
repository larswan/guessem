require "test_helper"

class GamesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @game = games(:one)
  end

  test "should get index" do
    get games_url, as: :json
    assert_response :success
  end

  test "should create game" do
    assert_difference("Game.count") do
      post games_url, params: { game: { cards: @game.cards, currentTurn: @game.currentTurn, inProgress: @game.inProgress, p1: @game.p1, p1SecretCard: @game.p1SecretCard, p1Turn: @game.p1Turn, p2: @game.p2, p2SecretCard: @game.p2SecretCard, p2Turn: @game.p2Turn, topic: @game.topic } }, as: :json
    end

    assert_response :created
  end

  test "should show game" do
    get game_url(@game), as: :json
    assert_response :success
  end

  test "should update game" do
    patch game_url(@game), params: { game: { cards: @game.cards, currentTurn: @game.currentTurn, inProgress: @game.inProgress, p1: @game.p1, p1SecretCard: @game.p1SecretCard, p1Turn: @game.p1Turn, p2: @game.p2, p2SecretCard: @game.p2SecretCard, p2Turn: @game.p2Turn, topic: @game.topic } }, as: :json
    assert_response :success
  end

  test "should destroy game" do
    assert_difference("Game.count", -1) do
      delete game_url(@game), as: :json
    end

    assert_response :no_content
  end
end
